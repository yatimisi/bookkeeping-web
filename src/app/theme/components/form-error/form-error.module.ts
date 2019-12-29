import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PipesModule } from '@theme/pipes/pipes.module';
import { FormErrorComponent } from './form-error.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  exports: [FormErrorComponent],
  declarations: [FormErrorComponent],
})
export class FormErrorModule { }
