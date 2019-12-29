import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from '@core/models/book.model';


@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class MenuOptionComponent {

  @Input() title: string;
  @Input() icon: string;
  @Input() bookID: string;
  @Input() url: string;
  @Input() more = true;

  margin: SafeStyle;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  conversionRouter(routerUrl: string) {
    // this.router.navigate([routerUrl], { relativeTo: this.route });
    console.log(routerUrl);
  }

  goMore(id: string) {
    // TODO: Detail, Delete, update book for new window.
    console.log('more', id);
  }
}
