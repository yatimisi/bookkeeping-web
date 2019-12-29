import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from '@core/models/book.model';


@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class MenuOptionComponent implements OnInit {

  @Input() book: Book;
  @Input() level: number;
  @Input() more = true;

  margin: SafeStyle;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.margin = this.sanitizer.bypassSecurityTrustStyle(`0px 0px 0px ${this.level * 15}px`);
    this.level += 1;
  }
  title(id: number) {
    this.router.navigate([(id ? `/books/${id}` : '/dashboard')], { relativeTo: this.route });
  }
  goMore(id: number) {
    // TODO: Detail, Delete, update book for new window.
    console.log('more', id);
  }
}
