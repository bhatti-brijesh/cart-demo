import { ToasterService } from './../../shared/toaster.service';
import { Component, OnInit } from '@angular/core';
import { RegisterFormModel } from 'src/app/models/register.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: RegisterFormModel = new RegisterFormModel();
  showPassword: boolean = Boolean(true);
  fileName: any;
  private unsubscribeAll: Subject<any> = new Subject();
  documentName: any;

  constructor(
    private httpClient: HttpClient,
    private toasterService: ToasterService) { }

  ngOnInit() {
  }

  userRegister(): void {
    const params = {
      email: this.registerForm.email,
      lastname: this.registerForm.lastName,
      firstName: this.registerForm.firstName,
      passWord: this.registerForm.passWord,
      image: this.registerForm.image,
      address: this.registerForm.address,
      phone: this.registerForm.phone,
      dob: this.registerForm.dob,
      gender: this.registerForm.gender,
      document: this.registerForm.document,
      imageName: this.fileName
    };
    this.httpClient.post('http://localhost:3000/user', params).pipe(takeUntil(this.unsubscribeAll)).subscribe((res) => {
      this.toasterService.displaySnackBar('New user register successfully', 'success');
    },
      (error) => {
        if (error.status === '404') {
          this.toasterService.displaySnackBar('Not found', 'error');
        } else if (error.status === '500') {
          this.toasterService.displaySnackBar('Internal server error', 'error');
        } else if (error.status === '801') {
          this.toasterService.displaySnackBar('Parameters are missing', 'error');
        } else if (error.status === '805') {
          this.toasterService.displaySnackBar('User are already exist', 'error');
        } else {
          this.toasterService.displaySnackBar(error.message, 'error');
        }
      }
    );
  }

  uploadImage(event, type): void {
    const file = event[0];
    if (file.type === 'image/png' || file.type === 'image/jpeg') {
      const reader = new FileReader();
      reader.readAsDataURL(file); // read file as data url
      reader.onload = (eve) => { // called once readAsDataURL is completed
        if (type === 'image') {
          // this.file = eve.target.result;
          this.registerForm.image = eve.target.result;
          this.fileName = file.name;
        } else {
          // this.document = eve.target.result;
          this.registerForm.document = eve.target.result;
          this.documentName = file.name;
        }
      };
    } else {
      this.toasterService.displaySnackBar('Upload valid Image type', 'error');
    }
  }

}
