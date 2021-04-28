import { ComponentFactoryResolver, ComponentRef, Directive, DoCheck, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { ControlErrorsComponent } from '../components';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[formControlName], [formControl], [ngModel]'
})
export class ControlErrorValidationDirective implements OnInit, OnDestroy, DoCheck {

  private componentRef: ComponentRef<ControlErrorsComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private control: NgControl,
  ) { }

  ngOnInit(): void {
    this.createComponent();
  }

  ngOnDestroy(): void {
    this.destroyComponent();
  }

  ngDoCheck(): void {
    this.componentRef?.instance?.check();
  }

  createComponent(): void {
    this.viewContainer.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(ControlErrorsComponent);
    this.componentRef = this.viewContainer.createComponent(factory);
    this.componentRef.instance.control = this.control.control as AbstractControl;
  }

  destroyComponent(): void {
    this.componentRef.destroy();
  }

}
