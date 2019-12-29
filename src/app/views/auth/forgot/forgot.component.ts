import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '@core/services/auth.service';
import { SwalService } from '@core/services/swal.service';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  form: FormGroup;
  sending = false;

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
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.swalService.alert('請重新檢查輸入.', 'warning');
      Object.keys(this.form.controls)
        .map(key => this.form.get(key).markAsTouched());
      return;
    }

    this.sending = true;

    this.authService.forgot(this.form.value).subscribe(
      result => {
        this.swalService.alert('我們已將重設密碼信寄出，請檢查您的信箱', 'info');
        this.router.navigate(['../login'], { relativeTo: this.route });
      },
      err => {
        this.swalService.alert('找不到該電子信箱，請再確認一次', 'warning');
        this.sending = false;
        this.form.controls.email.reset();
      },
      () => {}
    );
  }

  login() {
    this.router.navigate(['../login'], { relativeTo: this.route });
  }
}
