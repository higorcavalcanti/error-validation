import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormErrorValidationDirective } from './directives';
import { ControlErrorValidationDirective } from './directives';

import { ControlErrorsComponent } from './components';
import { ControlErrorComponent } from './components';
import { ErrorValidationConfig } from './configs';

@NgModule({
  declarations: [
    FormErrorValidationDirective,
    ControlErrorValidationDirective,
    ControlErrorsComponent,
    ControlErrorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ControlErrorValidationDirective
  ],
})
export class ErrorValidationModule {

  static forRoot(config?: Partial<ErrorValidationConfig>): ModuleWithProviders<ErrorValidationModule> {
    return {
      ngModule: ErrorValidationModule,
      providers: [
        { provide: ErrorValidationConfig, useValue: new ErrorValidationConfig(config) }
      ]
    };
  }

}
