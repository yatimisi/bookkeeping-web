import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Category } from '@core/models/category.model';
import { CategoryService } from '@core/services/category.service';
import { SwalService } from '@core/services/swal.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class BookCategoryComponent implements OnInit {

  categories$: Observable<Category[]>;
  form: FormGroup;
  sending = false;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private swalService: SwalService,
  ) { }

  ngOnInit() {
    this.build();
  }
  build() {
    this.buildForm();
    this.id = +(this.route.snapshot.paramMap.get('bookID'));
    this.categories$ = this.categoryService.getCategoriesFromBook(`${this.id}`);
  }

  buildForm(data = {} as Category): void {
    this.form = this.formBuilder.group({
      book: [+(this.route.snapshot.paramMap.get('bookID')), [Validators.required]],
      name: [data.name, [Validators.required, Validators.maxLength(50)]],
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

      this.categoryService.createCategory(this.form.value).pipe(
        delay(1000)
      ).subscribe(
        result => {
          this.swalService.alert('成功', 'success');
          this.categories$ = this.categoryService.getCategoriesFromBook(`${this.id}`);
        },
        err => {
          this.swalService.alert('失敗: 分類重複', 'error');
          this.sending = false;
        },
        () => {
          this.sending = false;
          this.form.controls.name.reset();
        }
      );

    });
  }

  onInfo() {
    this.router.navigate(['..', 'detail'], { relativeTo: this.route });
  }

  onAuthorities() {
    this.router.navigate(['..', 'authorities'], { relativeTo: this.route });
  }

  onModify(id: number) {
    this.categoryService.getCategory(id).subscribe(
      result => this.swalService.swal.fire({
        title: '修改分類',
        input: 'text',
        inputValue: result.name,
        showCancelButton: true,
        confirmButtonColor: '#008000',
        confirmButtonText: '確定',
        cancelButtonColor: '#d33',
        cancelButtonText: '取消',
        heightAuto: false,
        inputValidator: (value) => {
          if (!value) {
            return '請輸入些內容.';
          }
        }
      }).then((send) => {
        if (send.value) {
          this.categoryService.partialUpdateCategory(id, { name: send.value } as Category).subscribe(
            results => {
              this.swalService.alert('成功', 'success');
              this.categories$ = this.categoryService.getCategoriesFromBook(`${this.id}`);
            },
            err => {
              this.swalService.alert('失敗', 'error', err);
            },
            () => { }
          );
        }
      })
    );
  }

  onDelete(id: number) {
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

        this.categoryService.deleteCategory(id).pipe(
          delay(1000)
        ).subscribe(
          result => {
            this.swalService.alert('成功', 'success');
            this.categories$ = this.categoryService.getCategoriesFromBook(`${this.id}`);
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
