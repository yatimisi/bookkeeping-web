import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';

import { NavbarMod } from '@core/enums/navbar.mod.enums';


@Component({
  selector: 'app-two-column-layout',
  styleUrls: ['./two-column.layout.scss'],
  template: `
  <div class="container">
    <div class="row header">
      <div class="col-12">
        <app-navbar [navMod]="NavbarMod.isAuthenticated" (sidenav)="onSidenav()"></app-navbar>
      </div>
    </div>

    <mat-sidenav-container class="row body sidenav-container">
      <mat-sidenav #sidenav [mode]="mode">
        <ng-content select="app-menu"></ng-content>
      </mat-sidenav>

      <mat-sidenav-content>
        <ng-content select="router-outlet"></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
  </div>
  `,
})
export class TwoColumnLayoutComponent implements OnInit {
  mode = 'side';
  NavbarMod = NavbarMod;

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.mode = (this.breakpointObserver.isMatched('(max-width: 576px)') ? 'over' : 'side');
  }

  onSidenav() {
    this.mode = (this.breakpointObserver.isMatched('(max-width: 576px)') ? 'over' : 'side');
    this.sidenav.toggle();
  }
}
