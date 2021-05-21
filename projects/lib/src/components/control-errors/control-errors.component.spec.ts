import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ControlErrorsComponent } from './control-errors.component';
import { ErrorValidationConfig } from '../../configs';
import { FormControl, Validators } from '@angular/forms';

describe('ControlErrorsComponent', () => {
  let spectator: Spectator<ControlErrorsComponent>;

  const createComponent = createComponentFactory({
    component: ControlErrorsComponent,
  });

  let control: FormControl;
  let config: ErrorValidationConfig;

  beforeEach(() => {
    control = new FormControl(null, [Validators.required]);
    spectator = createComponent({
      props: { control },
      providers: [
        { provide: ErrorValidationConfig, useValue: new ErrorValidationConfig() }
      ]
    });

    config = spectator.inject(ErrorValidationConfig);
  });

  it('should create a instance', () => {
    expect(spectator).toBeTruthy();
  });

  describe('#detectChanges', () => {
    it('should update component.errors', () => {
      expect(spectator.component.errors).toBeFalsy();
      spyOn(spectator.component, 'getErrorsFromControl').and.stub();
      spectator.component.detectChanges();
      expect(spectator.component.getErrorsFromControl).toHaveBeenCalledTimes(1);
    });
  });

  describe('#checkCanReturnErrors', () => {
    it('should return false when !control', () => {
      spectator.component.control = null;
      const result = spectator.component.checkCanReturnErrors();
      expect( result ).toBeFalsy();
    });

    it('should return false when !control.touched', () => {
      const result = spectator.component.checkCanReturnErrors() ;
      expect( result ).toBeFalsy();
    });

    it('should return false when !control.invalid', () => {
      control.markAsTouched();
      control.setValue('test');
      const result = spectator.component.checkCanReturnErrors();
      expect( result ).toBeFalsy();
    });
  });

  describe('#getErrorsFromControl', () => {
    beforeEach(() => {
      spyOn(spectator.component, 'checkCanReturnErrors').and.returnValue(true);
    });

    it('should return required message', () => {
      control.setErrors({ required: true });

      spyOn(spectator.component, 'getErrorMessage').and.returnValue('message');
      const result = spectator.component.getErrorsFromControl();

      expect(spectator.component.getErrorMessage).toHaveBeenCalledTimes(1);
      expect(spectator.component.getErrorMessage).toHaveBeenCalledWith({ key: 'required', value: true });
      expect(result).toEqual([ 'message' ]);
    });

    it('should return nothing when no error message', () => {
      control.setErrors({ required: true });

      spyOn(spectator.component, 'getErrorMessage').and.returnValue(null);
      const result = spectator.component.getErrorsFromControl();

      expect(spectator.component.getErrorMessage).toHaveBeenCalledTimes(1);
      expect(spectator.component.getErrorMessage).toHaveBeenCalledWith({ key: 'required', value: true });
      expect(result.length).toEqual(0);
    });

    it('should return max errors from config.maxErrors', () => {
      config.maxErrors = 1;
      control.setErrors({ error1: true, error2: true, error3: true });

      spyOn(spectator.component, 'getErrorMessage').and.returnValue('teste');
      const result = spectator.component.getErrorsFromControl();

      expect(result.length).toEqual(1);
    });
  });


  describe('#getErrorMessage', () => {
    it('should return message when ErrorValidationMessage is string', () => {
      spyOn(spectator.component, 'getErrorValidationMessageFromError').and.returnValue('message');
      const result = spectator.component.getErrorMessage({ key: 'required', value: true });
      expect(result).toEqual('message');
    });

    it('should return message when ErrorValidationMessage is function', () => {
      const messageFn = (key: string) => key;
      spyOn(spectator.component, 'getErrorValidationMessageFromError').and.returnValue( messageFn );

      const result = spectator.component.getErrorMessage({ key: 'required', value: 'value' });
      expect(result).toEqual('value');
    });

    it('should return undefined when ErrorValidationMessage is undefined', () => {
      spyOn(spectator.component, 'getErrorValidationMessageFromError').and.returnValue( null );

      const result = spectator.component.getErrorMessage({ key: 'required', value: 'value' });
      expect(result).toBeFalsy();
    });
  });

  describe('#getErrorValidationMessageFromError', () => {

    const errorMessages = { required: 'required' };
    beforeEach(() => {
      config.messages = errorMessages;
    });

    it('should get message from controlMessages', () => {
      spectator.component.controlMessages = errorMessages;
      const result = spectator.component.getErrorMessage({ key: 'required', value: true });
      expect( result ).toEqual( 'required' );
    });

    it('should get message from formMessages', () => {
      spectator.component.controlMessages = undefined;
      spectator.component.formMessages = errorMessages;
      const result = spectator.component.getErrorMessage({ key: 'required', value: true });
      expect( result ).toEqual( 'required' );
    });

    it('should get message from config.messages when no controlMessages and formMessages', () => {
      spectator.component.controlMessages = undefined;
      spectator.component.formMessages = undefined;
      const result = spectator.component.getErrorMessage({ key: 'required', value: true });
      expect( result ).toEqual( 'required' );
    });

    it('should get undefined when no messages', () => {
      spectator.component.controlMessages = undefined;
      spectator.component.formMessages = undefined;
      config.messages = undefined;
      const result = spectator.component.getErrorMessage({ key: 'required', value: true });
      expect( result ).toEqual( undefined );
    });
  });
});
