import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { shareReplay } from 'rxjs/operators';

import { UserService } from '@core/services/user.service';


@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss']
})
export class WebsiteComponent implements OnInit {

  @Output() sidenav = new EventEmitter();

  constructor(
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    if (!this.userService.me$) {
      this.userService.me$ = this.userService.me().pipe(shareReplay(1));
    }
    this.userService.me$.subscribe(
      result => console.log(result)
    );
  }

  conversionRouter(routerUrl: string) {
    this.router.navigate([routerUrl], { relativeTo: this.route });
  }

  switch() {
    this.sidenav.emit();
  }
}
