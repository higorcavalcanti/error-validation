import { ControlErrorValidationDirective } from './control-error-validation.directive';
import { Component } from '@angular/core';

@Component({
  selector: 'lib-test-component',
  template: '<input formControlName="a">'
})
class TestComponent {}

describe('ControlErrorValidationDirective', () => {
  it('should create an instance', () => {
    const directive = new ControlErrorValidationDirective(null, null, null);
    expect(directive).toBeTruthy();
  });
});
