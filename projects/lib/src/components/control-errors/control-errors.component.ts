import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ErrorValidationConfig, ErrorValidationMessage } from '../../configs';

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

  constructor(
    private config: ErrorValidationConfig,
    private cdr: ChangeDetectorRef,
  ) { }

  check(): void {
    this.errors = this.getErrorsFromControl( this.control );
    this.cdr.markForCheck();
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
    const message: ErrorValidationMessage = this.config?.messages?.[ error.key ];

    if ( typeof message === 'string' ) {
      return message;
    }
    return message?.( error.value );
  }
}
