import { AfterViewInit, ContentChildren, Directive, Input, OnChanges, QueryList, SimpleChanges } from '@angular/core';
import { ControlErrorValidationDirective } from './control-error-validation.directive';
import { ErrorValidationMessages } from '../configs';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '' +
    '[formGroup][errorValidation],' +
    '[formGroupName][errorValidation]'
})
export class FormErrorValidationDirective implements AfterViewInit, OnChanges {

  @ContentChildren(ControlErrorValidationDirective, { descendants: true })
  controls: QueryList<ControlErrorValidationDirective>;

  @Input() errorValidationMessages: ErrorValidationMessages;

  constructor() { }

  ngAfterViewInit(): void {
    this.controls.forEach(control => {
      control.setFormMessages(this.errorValidationMessages);
      control.initValidate();
    });

    this.controls.changes.subscribe(() => {
      this.controls.forEach(control => {
        control.setFormMessages(this.errorValidationMessages);
        control.initValidate();
        control.componentDetectChanges();
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.controls?.forEach(control => control.setFormMessages(this.errorValidationMessages));
  }
}
