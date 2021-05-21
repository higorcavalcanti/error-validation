import { ControlErrorValidationDirective } from './control-error-validation.directive';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlErrorsComponent } from '../components';
import { ErrorValidationModule } from '../error-validation.module';

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
});
