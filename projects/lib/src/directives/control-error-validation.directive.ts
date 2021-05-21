import { ComponentFactoryResolver, ComponentRef, Directive, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges, ViewContainerRef } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { ControlErrorsComponent } from '../components';
import { ErrorValidationConfig, ErrorValidationMessages } from '../configs';

// tslint:disable-next-line:no-conflicting-lifecycle
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '' +
    '[formControlName]:not([ignoreErrorValidation]),' +
    '[formControl]:not([ignoreErrorValidation]),' +
    '[formArrayName]:not([ignoreErrorValidation]),' +
    '[formArray]:not([ignoreErrorValidation]),' +
    '[ngModel]:not([ignoreErrorValidation])',
})
export class ControlErrorValidationDirective implements OnInit, OnDestroy, OnChanges, DoCheck {

  @Input() errorValidation: any;
  @Input() errorValidationMessages: ErrorValidationMessages;

  formValidationMessages: ErrorValidationMessages;

  componentRef: ComponentRef<ControlErrorsComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private control: NgControl,
    private config: ErrorValidationConfig,
  ) { }

  ngOnInit(): void {
    if ( this.config.validateAllInputs ) {
      this.initValidate();
    }
  }

  ngOnDestroy(): void {
    this.stopValidate();
  }

  ngDoCheck(): void {
    this.componentDetectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkErrorValidationChanges( changes.errorValidation );

    if ( 'errorValidationMessages' in changes ) {
      this.setControlMessages();
    }
  }

  checkErrorValidationChanges(errorValidation: SimpleChange): void {
    if ( !errorValidation ) {
      return;
    }

    if ( errorValidation.currentValue != null && errorValidation.previousValue == null ) {
      this.initValidate();
    }
    if ( errorValidation.currentValue == null && errorValidation.previousValue != null ) {
      this.stopValidate();
    }
  }

  initValidate(): void {
    if ( this.componentRef ) {
      return;
    }

    this.viewContainer.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(ControlErrorsComponent);
    this.componentRef = this.viewContainer.createComponent(factory);
    this.componentRef.instance.control = this.control.control as AbstractControl;
    this.componentRef.instance.formMessages = this.formValidationMessages;
    this.componentRef.instance.controlMessages = this.errorValidationMessages;
  }

  stopValidate(): void {
    this.componentRef?.destroy();
    this.componentRef = undefined;
  }

  componentDetectChanges(): void {
    this.componentRef?.instance?.detectChanges();
  }

  setControlMessages(): void {
    if ( !this.componentRef ) {
      return;
    }
    this.componentRef.instance.controlMessages = this.errorValidationMessages;
    this.componentDetectChanges();
  }

  setFormMessages(messages: ErrorValidationMessages): void {
    this.formValidationMessages = messages;

    if ( !this.componentRef ) {
      return;
    }
    this.componentRef.instance.formMessages = messages;
    this.componentDetectChanges();
  }

}
