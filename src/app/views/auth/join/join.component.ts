import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '@core/services/auth.service';
import { SwalService } from '@core/services/swal.service';


@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss'],
})
export class JoinComponent implements OnInit {
  form: FormGroup;
  joining = false;

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

    this.joining = true;

    this.authService.join(this.form.value).subscribe(
      result => {
        this.swalService.alert('註冊成功，請至信箱收信開通帳號.', 'info');
        this.router.navigate(['../login'], { relativeTo: this.route });
      },
      err => {
        this.swalService.alert('請在嘗試一次.', 'warning');
        this.joining = false;
        this.form.controls.email.reset();
      },
      () => {}
    );
  }

  login() {
    this.router.navigate(['../login'], { relativeTo: this.route });
  }
}
