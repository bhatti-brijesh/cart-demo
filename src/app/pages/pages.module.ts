import { ToasterService } from './../shared/toaster.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';



const authRoutes: Routes = [
  {
    path: '',
    redirectTo: 'product',
    pathMatch: 'full'
  },
  { path: 'product', component: ProductComponent },
];

@NgModule({
  declarations: [ProductComponent],
  imports: [
    RouterModule.forChild(authRoutes),
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule

  ],
  providers: [ToasterService]
})
export class PagesModule { }
