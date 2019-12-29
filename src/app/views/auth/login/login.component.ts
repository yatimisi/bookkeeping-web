import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '@core/services/auth.service';
import { SwalService } from '@core/services/swal.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  logining = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private swalService: SwalService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.swalService.alert('請重新檢查輸入.', 'warning');
      Object.keys(this.form.controls)
        .map(key => this.form.get(key).markAsTouched());
      return;
    }

    this.logining = true;

    this.authService.login(this.form.value).subscribe(
      result => { },
      err => {
        this.swalService.alert('帳號或密碼錯誤.', 'warning');
        this.form.controls.password.reset();
        this.logining = false;
      },
      () => this.router.navigate(['/'])
    );
  }

  forgot() {
    this.router.navigate(['../forgot'], { relativeTo: this.route });
  }

  join() {
    this.router.navigate(['../join'], { relativeTo: this.route });
  }
}
