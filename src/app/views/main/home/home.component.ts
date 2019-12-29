import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { Book } from '@core/models/book.model';
import { BookService } from '@core/services/book.service';


@Component({
  selector: 'app-home',
  templateUrl: `./home.component.html`,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  books$: Observable<Book[]>;

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.books$ = this.bookService.getBooks();
  }

  goBook(id: number) {
    this.router.navigate(['..', 'books', id], { relativeTo: this.route });
  }
}
