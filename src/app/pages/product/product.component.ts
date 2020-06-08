import { ToasterService } from './../../shared/toaster.service';
import { ProductModel } from './../../models/product.model';
import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = ['action', 'name', 'price', 'location', 'qty'];
  displayedAddCartColumns: string[] = ['name', 'price', 'location', 'qty'];
  dataSource: MatTableDataSource<ProductModel>;
  addDataSource: MatTableDataSource<ProductModel>;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  @ViewChildren(MatPaginator) paginatorAdd = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sortAdd = new QueryList<MatSort>();
  private unsubscribeAll: Subject<any> = new Subject();
  quantity: number;
  constructor(
    private httpClient: HttpClient,
    private toasterService: ToasterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getProductList();
  }

  getProductList(): void {
    this.httpClient.get('http://localhost:3000/product').pipe(takeUntil(this.unsubscribeAll)).subscribe((res: ProductModel[]) => {
      const resFilter = res.filter(qty => qty.qty !== 0);
      this.gridSetAddCart(resFilter);
      this.gridSet(res);
    });
  }

  gridSet(data: ProductModel[]): void {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator.toArray()[0];
    this.dataSource.sort = this.sort.toArray()[0];
  }

  gridSetAddCart(data: ProductModel[]): void {
    this.addDataSource = new MatTableDataSource(data);
    this.addDataSource.paginator = this.paginatorAdd.toArray()[1];
    this.addDataSource.sort = this.sortAdd.toArray()[1];
  }

  addToCart(id, type): void {
    let count = id.qty;
    if (type === 'add') {
      count++;
    } else {
      count--;
    }
    const product = {
      name: id.name,
      location: id.location,
      qty: count,
      price: id.price,
      id: id.id
    };
    this.httpClient.put('http://localhost:3000/product/' + id.id, product).pipe(takeUntil(this.unsubscribeAll)).subscribe((res) => {
      if (type === 'add') {
        this.toasterService.displaySnackBar('product is Add to cart successfully', 'success');
      } else {
        this.toasterService.displaySnackBar('product is Remove to cart successfully', 'success');
      }
      this.getProductList();
    },
      (error) => {
        this.toasterService.displaySnackBar(error.message, 'error');
      }
    );
  }

  logout(): void {
    this.router.navigate(['/auth/login']);
    localStorage.removeItem('user');
    this.toasterService.displaySnackBar('logOut successfully', 'success');
  }
}
