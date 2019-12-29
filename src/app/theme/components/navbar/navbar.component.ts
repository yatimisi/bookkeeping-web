import { Component, Input, Output, EventEmitter } from '@angular/core';

import { NavbarMod } from '@core/enums/navbar.mod.enums';


@Component({
  selector: 'app-navbar',
  template: `
    <ng-container [ngSwitch]="navMod">
      <app-not-auth *ngSwitchCase="NavbarMod.nonAuthenticated"></app-not-auth>
      <app-website *ngSwitchCase="NavbarMod.isAuthenticated" (sidenav)="switch($event);"></app-website>
    </ng-container>
  `
})
export class NavbarComponent {
  @Input() navMod: NavbarMod;
  @Output() sidenav = new EventEmitter();

  NavbarMod = NavbarMod;

  switch() {
    this.sidenav.emit();
  }
}
