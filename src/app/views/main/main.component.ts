import { Component } from '@angular/core';


@Component({
  selector: 'app-main',
  template: `
    <app-two-column-layout>
      <app-menu></app-menu>
      <router-outlet></router-outlet>
    </app-two-column-layout>
  `,
})
export class MainComponent { }
