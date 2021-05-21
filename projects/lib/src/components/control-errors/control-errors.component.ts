import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ErrorValidationConfig, ErrorValidationMessage, ErrorValidationMessages } from '../../configs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'control-errors',
  templateUrl: './control-errors.component.html',
  styleUrls: ['./control-errors.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    this.errors = this.getErrorsFromControl();
    this.cdr.detectChanges();
  }

  checkCanReturnErrors(): boolean {
    return this.control &&
      this.control.touched &&
      this.control.invalid;
  }

  getErrorsFromControl(): string[] {
    if ( !this.checkCanReturnErrors() ) {
      return [];
    }

    return Object.entries( this.control.errors )
      .map(arr => ({ key: arr[0], value: arr[1] }))
      .map(error => this.getErrorMessage(error))
      .filter(x => x?.length)
      .slice(0, this.config?.maxErrors ?? undefined);
  }

  getErrorMessage(error: { key: string, value: any }): string {
    const message = this.getErrorValidationMessageFromError(error);
    if ( typeof message === 'string' ) {
      return message;
    }
    return message?.( error.value );
  }

  getErrorValidationMessageFromError(error: { key: string, value: any }): ErrorValidationMessage {
    return this.controlMessages?.[ error.key ] ??
      this.formMessages?.[ error.key ] ??
      this.config?.messages?.[ error.key ];
  }
}
