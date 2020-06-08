import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  toasterMessage: string;
  msg: string;
  constructor(
    public matToaster: MatSnackBar,
  ) {

  }

  /**
   * Common snackbar to display toastr messages
   * @ param message Message to display
   * @ param type Type of toastr
   */
  displaySnackBar(message: any, type: 'error' | 'success' | 'warning' | 'ok' | any): any {
    if (this.msg === undefined) {
      this.msg = message;
    }
    this.matToaster.open(this.msg, type, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  success(message): void {
    this.matToaster.open(message, 'success', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2000,
    });
  }
  error(message): void {
    this.matToaster.open(message, 'error', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2000,
    });
  }
  warning(message): void {
    this.matToaster.open(message, 'warning', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2000,
    });
  }
}
