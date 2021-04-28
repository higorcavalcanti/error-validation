import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyRoutingModule } from './lazy-routing.module';
import { LazyComponent } from './lazy.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorValidationModule } from '../../../../lib/src/error-validation.module';


@NgModule({
  declarations: [
    LazyComponent
  ],
  imports: [
    CommonModule,
    LazyRoutingModule,
    ReactiveFormsModule,
    ErrorValidationModule
  ]
})
export class LazyModule { }
