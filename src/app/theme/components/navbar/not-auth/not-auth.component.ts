import { Component } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-not-auth',
  templateUrl: './not-auth.component.html',
  styleUrls: ['./not-auth.component.scss']
})
export class NotAuthComponent {

  localRoute = location.hash.replace('#/', '');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.localRoute = location.hash.replace('#/', '');
      }
    });
  }

  conversionRouter(routerUrl: string) {
    this.router.navigate([routerUrl], { relativeTo: this.route });
  }
}
