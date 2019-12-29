import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-not-auth',
  templateUrl: './not-auth.component.html',
  styleUrls: ['./not-auth.component.scss']
})
export class NotAuthComponent {

  localRoute = location.hash.split('/')[1];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  conversionRouter(routerUrl: string) {
    this.router.navigate([routerUrl], { relativeTo: this.route });
  }
}
