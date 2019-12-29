import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Book } from '@core/models/book.model';
import { BookService } from '@core/services/book.service';
import { SwalService } from '@core/services/swal.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class BookDetailComponent implements OnInit {

  book$: Observable<Book>;
  form: FormGroup;
  isEdit = false;
  sending = false;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private swalService: SwalService,
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.build();
      }
    });
  }

  ngOnInit() {
    this.build();
  }
  build() {
    this.buildForm();
    this.id = +(this.route.snapshot.paramMap.get('bookID'));
    this.book$ = this.bookService.getBook(this.id);
    this.book$.subscribe(
      result => this.buildForm(result)
    );
  }

  buildForm(data = {} as Book): void {
    this.form = this.formBuilder.group({
      id: [data.id, []],
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

      this.bookService.partialUpdateBook(this.id, this.form.value).pipe(
        delay(10000)
      ).subscribe(
        result => {
          this.swalService.alert('成功', 'success');
          this.book$ = this.bookService.getBook(this.id);
          this.onCancel();
        },
        err => {
          this.swalService.alert('失敗', 'error', err);
          this.sending = false;
        },
        () => this.sending = false
      );

    });
  }

  onEdit() {
    this.isEdit = true;
  }

  onCancel() {
    this.isEdit = false;
    this.book$.subscribe(
      result => this.buildForm(result)
    );
  }

  onDelete() {
    this.swalService.swal.fire({
      icon: 'question',
      title: '確認要刪除嗎?',
      showCancelButton: true,
      confirmButtonColor: '#008000',
      confirmButtonText: '確定',
      cancelButtonColor: '#d33',
      cancelButtonText: '取消',
      heightAuto: false
    }).then((send) => {
      if (send.value) {
        this.bookService.deleteBook(this.form.value.id).pipe(
          delay(1000)
        ).subscribe(
          result => {
            this.swalService.alert('成功', 'success');
            this.bookService.getBooks();
            this.router.navigate(['/'], { relativeTo: this.route });
          },
          err => {
            this.swalService.alert('失敗', 'error', err);
          },
          () => { }
        );
      }
    });
  }
}
