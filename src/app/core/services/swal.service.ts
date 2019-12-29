import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SwalService {

  private settings = {
    displayTime: 2000,
  };

  defaultAlert = {
    next: (value) => this.alert('swal.Success', 'success'),
    error: (error) => this.alert('swal.Fail', 'error'),
    complete: () => { }
  };

  swal = Swal.mixin({
    heightAuto: false,
  });

  private mobileAlert = Swal.mixin({
    showConfirmButton: false,
    timer: this.settings.displayTime,
    heightAuto: false,
  });

  private webAlert = Swal.mixin({
    showConfirmButton: false,
    timer: this.settings.displayTime,
    toast: true,
    position: 'top-end',
  });

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }

  alert(message: string, alertIcon?: SweetAlertIcon, error?: HttpErrorResponse) {

    const alert = (this.breakpointObserver.isMatched('(max-width: 576px)') ? this.mobileAlert : this.webAlert);
    alert.fire({
      icon: alertIcon,
      title: message,
      html: (error ? this.getErrorMessage(error) : '')
    });
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    let message = '';
    Object.keys(error.error).forEach(key => {
      switch (key) {
        case 'required':
          message += `這個欄位是必須填的.${key}<br>`;
          break;
        case 'min':
          message += `不能小於${key}.<br>`;
          break;
        case 'max':
          message += `長度不能大於${key}.<br>`;
          break;
        case 'minlength':
          message += `長度不能小於${key}.<br>`;
          break;
        case 'maxlength':
          message += `長度不能大於${key}.<br>`;
          break;
        case 'email':
          switch (error.error.email[0]) {
            case 'user with this email address already exists.':
              message += `這個 Email 已存在.<br>`;
              break;
            case 'Enter a valid email address.':
              message += `這個欄位必須符合${key}的格式.<br>`;
              break;
          }
          break;
        default:
          message += `欄位錯誤: ${key}.<br>`;
          break;
      }
    });

    return `<div style='text-align: left;'>${message}</div>`;
  }
}
