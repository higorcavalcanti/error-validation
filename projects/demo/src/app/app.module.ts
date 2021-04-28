import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ErrorValidationModule } from '../../../lib/src/error-validation.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ErrorValidationModule
      .forRoot({
        messages: {
          required: 'Required field!',
          email: 'Invalid Email!',
          min: ({ actual, min }) => `Value ${actual} must be higher than ${min}`,
          minlength: 'minlength error message',
        }
      })
    ,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
