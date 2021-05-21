import { ControlErrorValidationDirective } from './control-error-validation.directive';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlErrorsComponent } from '../components';
import { ErrorValidationModule } from '../error-validation.module';
import { SimpleChange } from '@angular/core';
import { ErrorValidationMessages } from '../configs';

describe('ControlErrorValidationDirective', () => {
  let spectator: SpectatorDirective<ControlErrorValidationDirective>;
  const createDirective = createDirectiveFactory({
    directive: ControlErrorValidationDirective,
    imports: [
      ErrorValidationModule.forRoot(),
      ReactiveFormsModule
    ],
  });

  let formGroup: FormGroup;

  beforeEach(() => {
    formGroup = new FormGroup({
      input: new FormControl(null, [ Validators.required ])
    });

    spectator = createDirective('<form [formGroup]="formGroup" errorValidation> <input formControlName="input"/> </form>', {
      hostProps: { formGroup },
    });
  });

  it('should create a instance', () => {
    expect(spectator.directive).toBeTruthy();
  });

  it('should create control-errors-component', () => {
    const errorValidationComponent = spectator.query(ControlErrorsComponent);
    expect(errorValidationComponent).toBeTruthy();
  });

  describe('#ngOnDestroy', () => {
    it('should stop validate', () => {
      spyOn(spectator.directive, 'stopValidate').and.stub();
      spectator.directive.ngOnDestroy();
      expect(spectator.directive.stopValidate).toHaveBeenCalledTimes(1);
    });
  });

  describe('#ngDoCheck', () => {
    it('should detect changes', () => {
      spyOn(spectator.directive, 'componentDetectChanges').and.stub();
      spectator.directive.ngDoCheck();
      expect(spectator.directive.componentDetectChanges).toHaveBeenCalledTimes(1);
    });
  });

  describe('#ngOnChanges', () => {
    it('should call checkErrorValidationChanges', () => {
      spyOn(spectator.directive, 'checkErrorValidationChanges').and.stub();
      spectator.directive.ngOnChanges({});
      expect(spectator.directive.checkErrorValidationChanges).toHaveBeenCalledTimes(1);
    });

    it('should call setControlMessages if changes have errorValidationMessages', () => {
      spyOn(spectator.directive, 'setControlMessages').and.stub();
      spectator.directive.ngOnChanges({ errorValidationMessages: null });
      expect(spectator.directive.setControlMessages).toHaveBeenCalledTimes(1);
    });
  });

  describe('#checkErrorValidationChanges', () => {
    it('should nothing if SimpleChange is null', () => {
      spyOn(spectator.directive, 'initValidate').and.stub();
      spyOn(spectator.directive, 'stopValidate').and.stub();

      spectator.directive.checkErrorValidationChanges(null);

      expect(spectator.directive.initValidate).toHaveBeenCalledTimes(0);
      expect(spectator.directive.stopValidate).toHaveBeenCalledTimes(0);
    });

    it('should initValidate if input errorValidation', () => {
      spyOn(spectator.directive, 'initValidate').and.stub();
      const change = new SimpleChange(null, true,  false);
      spectator.directive.checkErrorValidationChanges( change );
      expect(spectator.directive.initValidate).toHaveBeenCalledTimes(1);
    });

    it('should stopValidate if input errorValidation is removed', () => {
      spyOn(spectator.directive, 'stopValidate').and.stub();
      const change = new SimpleChange(true, null,  false);
      spectator.directive.checkErrorValidationChanges( change );
      expect(spectator.directive.stopValidate).toHaveBeenCalledTimes(1);
    });
  });

  describe('#initValidate', () => {
    it('should nothing if already initialized', () => {
      spectator.directive.initValidate();
      const expectedResult = spectator.directive.componentRef;

      spectator.directive.initValidate();
      expect( spectator.directive.componentRef ).toBe( expectedResult as any );
    });
  });

  describe('#stopValidate', () => {
    it('should nothing if not initialized', () => {
      spectator.directive.stopValidate();
      expect(spectator.directive.componentRef).toBeFalsy();
    });
  });

  describe('#componentDetectChanges', () => {

  });

  describe('#setControlMessages', () => {
    it('should nothing if hasnt initlized', () => {
      spectator.directive.stopValidate();
      spectator.directive.setControlMessages();
      expect(spectator.directive.componentRef).toBeFalsy();
    });

    it('should update component instance controlMessages', () => {
      spectator.directive.errorValidationMessages = {
        required: 'required'
      };
      spectator.directive.setControlMessages();
      expect(spectator.directive.componentRef.instance.controlMessages)
        .toBe(spectator.directive.errorValidationMessages);
    });
  });

  describe('#setFormMessages', () => {
    it('should update formValidationMessages', () => {
      spectator.directive.formValidationMessages = undefined;

      const messages: ErrorValidationMessages = {
        required: 'required'
      };
      spectator.directive.setFormMessages(messages);

      expect(spectator.directive.formValidationMessages).toBe(messages);
    });
  });
});
