import { FormErrorValidationDirective } from './form-error-validation.directive';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorValidationModule } from '../error-validation.module';
import { Component, Input } from '@angular/core';

@Component({ template: '' })
class CustomHostComponent {
  formGroup: FormGroup = new FormGroup({
    input: new FormControl(null, Validators.required),
    input2: new FormControl(null, Validators.required),
    input3: new FormControl(null, Validators.required),
  });

  @Input() showFirstInput = true;
  @Input() showSecondInput: boolean;
  @Input() showThirdInput: boolean;
}

describe('FormErrorValidationDirective', () => {
  let spectator: SpectatorDirective<FormErrorValidationDirective, CustomHostComponent>;

  const createDirective = createDirectiveFactory<FormErrorValidationDirective>({
    directive: FormErrorValidationDirective,
    host: CustomHostComponent,
    template: `
    <form [formGroup]="formGroup" errorValidation>
        <input formControlName="input" *ngIf="showFirstInput"/>
        <input formControlName="input2" *ngIf="showSecondInput"/>
        <input formControlName="input3" *ngIf="showThirdInput"/>
    </form>`,
    imports: [
      ErrorValidationModule.forRoot(),
      ReactiveFormsModule
    ],
  });

  beforeEach(() => {
    spectator = createDirective();
  });

  it('should create a instance', () => {
    expect(spectator.directive).toBeTruthy();
  });

  it('should create control-errors-component and show 1 control validator', () => {
    expect(spectator.directive.controls.length).toEqual(1);
  });

  it('should create control-errors-component and show 2 control validator', () => {
    spectator.setHostInput('showSecondInput', true);
    spectator.detectChanges();
    expect(spectator.directive.controls.length).toEqual(2);
  });

  it('should create control-errors-component and show 3 control validator', () => {
    spectator.setHostInput('showSecondInput', true);
    spectator.setHostInput('showThirdInput', true);
    spectator.detectChanges();
    expect(spectator.directive.controls.length).toEqual(3);
  });

  it('should call controls[?].setFormMessages on update formValidationMessages', () => {
    const messages = { required: 'required error' };

    spectator.directive.controls.forEach(control => spyOn(control, 'setFormMessages').and.stub());
    spectator.setInput('errorValidationMessages', messages);
    spectator.directive.controls.forEach(control => expect(control.setFormMessages).toHaveBeenCalledOnceWith(messages));
  });
});
