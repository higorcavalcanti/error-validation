import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ControlErrorsComponent } from './control-errors.component';
import { ErrorValidationConfig } from '../../configs';

describe('ControlErrorsComponent', () => {
  let spectator: Spectator<ControlErrorsComponent>;
  const createComponent = createComponentFactory(ControlErrorsComponent);

  beforeEach(() => spectator = createComponent({
    providers: [
      { provide: ErrorValidationConfig, useValue: new ErrorValidationConfig() }
    ]
  }));

  it('should create a instance', () => {
    expect(spectator).toBeTruthy();
  });
});
