import { ToasterService } from './../../shared/toaster.service';
import { RegisterFormModel } from 'src/app/models/register.model';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { LoginFormModel } from 'src/app/models/login.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showPassword: boolean = Boolean(true);
  loginForm: LoginFormModel = new LoginFormModel();
  private unsubscribeAll: Subject<any> = new Subject();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
  }

  userLogin(): void {
    this.httpClient.get('http://localhost:3000/user').pipe(takeUntil(this.unsubscribeAll)).subscribe((res: RegisterFormModel) => {
      const responseArray: any = res;
      const index = responseArray.find(user => (user.email === this.loginForm.email && user.passWord === this.loginForm.passWord));
      if (index !== undefined) {
        localStorage.setItem('user', JSON.stringify(index));
        this.toasterService.displaySnackBar('User is login successfully', 'success');
        this.router.navigate(['/pages/product']);
      } else {
        alert('User no found');
      }
    });
  }

}
