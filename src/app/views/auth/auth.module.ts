import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ThemeModule } from '@theme/theme.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    AuthRoutingModule,
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
  ],
})
export class AuthModule { }
