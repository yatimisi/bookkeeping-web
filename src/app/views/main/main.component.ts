import { Component, OnInit } from '@angular/core';

import { BookService } from '@core/services/book.service';

@Component({
  selector: 'app-main',
  template: `
    <app-two-column-layout>
      <!-- <app-menu></app-menu> -->
      <router-outlet></router-outlet>
    </app-two-column-layout>
  `,
})
export class MainComponent implements OnInit {
  constructor(
    private bookService: BookService,
  ) { }

  ngOnInit() {
    this.bookService.getBooks().subscribe(
      result => console.log(result)
    );
  }

}
