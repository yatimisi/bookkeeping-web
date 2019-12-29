import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

import { Book } from '@core/models/book.model';
import { BookService } from '@core/services/book.service';
import { SwalService } from '@core/services/swal.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class BookAddComponent implements OnInit {

  public form: FormGroup;
  public sending = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private swalService: SwalService,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(data = {} as Book): void {
    this.form = this.formBuilder.group({
      title: [data.title, [Validators.required, Validators.maxLength(50)]],
      description: [(data.description ? data.description : ''), []],
    });
  }

  onSubmin(): void {
    if (this.form.invalid) {
      this.swalService.alert('請重新檢查輸入.', 'warning');
      Object.keys(this.form.controls)
        .map(key => this.form.get(key).markAsTouched());
      return;
    }

    this.sending = true;

    this.swalService.swal.fire({
      icon: 'question',
      title: '確認要送出嗎?',
      showCancelButton: true,
      confirmButtonColor: '#008000',
      confirmButtonText: '確定',
      cancelButtonColor: '#d33',
      cancelButtonText: '取消',
      heightAuto: false
    }).then((send) => {

      if (send.dismiss) {
        this.sending = false;
        return;
      }

      this.bookService.createBook(this.form.value).pipe(
        delay(1000)
      ).subscribe(
        result => {
          this.swalService.alert('成功', 'success');
          console.log(result.id, 'detail');
          this.router.navigate(['../', result.id, 'detail'], { relativeTo: this.route });
        },
        err => {
          this.swalService.alert('失敗', 'error', err);
          this.sending = false;
        },
        () => { }
      );

    });
  }
}
