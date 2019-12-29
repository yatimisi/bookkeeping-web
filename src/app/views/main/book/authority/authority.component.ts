import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { Observable, from } from 'rxjs';
import { delay, switchMap, mergeMap, map, toArray } from 'rxjs/operators';

import { reader, leave } from '@core/enums/status-keys.enum';
import { Authority } from '@core/models/authority.model';
import { UserService } from '@core/services/user.service';
import { AuthorityService } from '@core/services/authority.service';
import { SwalService } from '@core/services/swal.service';


@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.scss'],
})
export class BookAuthorityComponent implements OnInit {

  authorities$: Observable<any[]>;
  form: FormGroup;
  sending = false;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authorityService: AuthorityService,
    private userService: UserService,
    private swalService: SwalService,
  ) { }

  ngOnInit() {
    this.build();
  }
  build() {
    this.buildForm();
    this.id = +(this.route.snapshot.paramMap.get('bookID'));
    this.authorities$ = this.authorityService.getAuthoritiesFromBook(`${this.id}`).pipe(
      switchMap(authorities => from(authorities).pipe(

        // Get organizations
        mergeMap(authority => this.userService.getUsers().pipe(
          map(users => users.filter(user => user.id === authority.user).pop()),
        )),
        toArray(),

        // Join
        map(users =>
          authorities.map((authority, index) => {
            return {
              id: authority.id,
              authority: authority.authority,
              book: authority.book,
              user: authority.user,
              email: users[index].email,
            };
          })
        ),
      )),
      map(dataSet => dataSet.filter(data => data.authority !== leave)),
    );
  }

  buildForm(data = {} as Authority): void {
    this.form = this.formBuilder.group({
      book: [+(this.route.snapshot.paramMap.get('bookID')), [Validators.required]],
      user: [data.user, [Validators.required, Validators.email]],
      authority: [reader, [Validators.required]],
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
      this.userService.getUsersFromEmail(this.form.value.user).subscribe(
        result => {
          if (result.length < 1) {
            this.swalService.alert('失敗: 無此帳號d或已重複', 'error');
            return;
          }

          this.authorityService.createAuthority({
            user: result[0].id,
            book: this.id,
            authority: reader,
          } as Authority).pipe(
            delay(1000)
          ).subscribe(
            result2 => {
              this.swalService.alert('成功', 'success');
              this.authorities$ = this.authorityService.getAuthoritiesFromBook(`${this.id}`).pipe(
                switchMap(authorities => from(authorities).pipe(

                  // Get organizations
                  mergeMap(authority => this.userService.getUsers().pipe(
                    map(users => users.filter(user => user.id === authority.user).pop()),
                  )),
                  toArray(),

                  // Join
                  map(users =>
                    authorities.map((authority, index) => {
                      return {
                        id: authority.id,
                        authority: authority.authority,
                        book: authority.book,
                        user: authority.user,
                        email: users[index].email,
                      };
                    })
                  ),
                )),
                map(dataSet => dataSet.filter(data => data.authority !== leave)),
              );
            },
            err => {
              this.swalService.alert('失敗: 無此帳號或已重複', 'error');
              this.sending = false;
            },
            () => {
              this.sending = false;
              this.form.controls.user.reset();
            }
          );
        }
      );


    });
  }

  onInfo() {
    this.router.navigate(['..', 'detail'], { relativeTo: this.route });
  }

  onCategories() {
    this.router.navigate(['..', 'categories'], { relativeTo: this.route });
  }

  // onModify(id: number) {
  //   this.categoryService.getCategory(id).subscribe(
  //     result => this.swalService.swal.fire({
  //       title: '修改分類',
  //       input: 'text',
  //       inputValue: result.name,
  //       showCancelButton: true,
  //       confirmButtonColor: '#008000',
  //       confirmButtonText: '確定',
  //       cancelButtonColor: '#d33',
  //       cancelButtonText: '取消',
  //       heightAuto: false,
  //       inputValidator: (value) => {
  //         if (!value) {
  //           return '請輸入些內容.';
  //         }
  //       }
  //     }).then((send) => {
  //       if (send.value) {
  //         this.categoryService.partialUpdateCategory(id, { name: send.value } as Category).subscribe(
  //           results => {
  //             this.swalService.alert('成功', 'success');
  //             this.categories$ = this.categoryService.getCategoriesFromBook(`${this.id}`);
  //           },
  //           err => {
  //             this.swalService.alert('失敗', 'error', err);
  //           },
  //           () => { }
  //         );
  //       }
  //     })
  //   );
  // }

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

        this.authorityService.deleteAuthority(id).pipe(
          delay(1000)
        ).subscribe(
          result => {
            this.swalService.alert('成功', 'success');
            this.authorities$ = this.authorityService.getAuthoritiesFromBook(`${this.id}`).pipe(
              switchMap(authorities => from(authorities).pipe(

                // Get organizations
                mergeMap(authority => this.userService.getUsers().pipe(
                  map(users => users.filter(user => user.id === authority.user).pop()),
                )),
                toArray(),

                // Join
                map(users =>
                  authorities.map((authority, index) => {
                    return {
                      id: authority.id,
                      authority: authority.authority,
                      book: authority.book,
                      user: authority.user,
                      email: users[index].email,
                    };
                  })
                ),
              )),
              map(dataSet => dataSet.filter(data => data.authority !== leave)),
            );
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
