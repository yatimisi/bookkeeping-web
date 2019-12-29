import { Component, OnInit } from '@angular/core';

import { Book } from '@core/models/book.model';
import { BookService } from '@core/services/book.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dashboard = { title: '儀表板' } as Book;

  constructor(
    public bookService: BookService,
  ) { }

  ngOnInit() {
    this.bookService.books$ = this.bookService.books$ || this.bookService.getBooks();
  }
}
