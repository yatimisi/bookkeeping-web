import { Component } from '@angular/core';

import { NavbarMod } from '@core/enums/navbar.mod.enums';


@Component({
  selector: 'app-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
  <div class="container">
    <div class="row header">
      <div class="col-12">
        <app-navbar [navMod]="NavbarMod.nonAuthenticated"></app-navbar>
      </div>
    </div>
    <div class="row body">
      <div class="col-12">
        <ng-content select="router-outlet"></ng-content>
      </div>
    </div>
  </div>
  `,
})
export class OneColumnLayoutComponent {
  NavbarMod = NavbarMod;
}
