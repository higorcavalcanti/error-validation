import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ErrorValidationConfig, ErrorValidationMessage, ErrorValidationMessages } from '../../configs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'control-errors',
  templateUrl: './control-errors.component.html',
  styleUrls: ['./control-errors.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlErrorsComponent {

  control: AbstractControl;
  errors: string[];

  formMessages: ErrorValidationMessages;
  controlMessages: ErrorValidationMessages;

  constructor(
    private config: ErrorValidationConfig,
    private cdr: ChangeDetectorRef,
  ) { }

  detectChanges(): void {
    this.errors = this.getErrorsFromControl( this.control );
    this.cdr.detectChanges();
  }

  getErrorsFromControl(control: AbstractControl): string[] {
    if ( !control?.touched || !control?.invalid || !control?.errors  ) {
      return [];
    }

    return Object.entries( control.errors )
      .map(arr => ({ key: arr[0], value: arr[1] }))
      .map(error => this.getErrorMessage(error))
      .filter(x => x?.length)
      .slice(0, this.config?.maxErrors ?? undefined);
  }

  getErrorMessage(error: any): string {
    const message: ErrorValidationMessage =
      this.controlMessages?.[ error.key ] ??
      this.formMessages?.[ error.key ] ??
      this.config?.messages?.[ error.key ];

    if ( typeof message === 'string' ) {
      return message;
    }
    return message?.( error.value );
  }
}
