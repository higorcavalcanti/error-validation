import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ControlErrorComponent } from './control-error.component';

describe('ControlErrorComponent', () => {
  let spectator: Spectator<ControlErrorComponent>;
  const createComponent = createComponentFactory(ControlErrorComponent);

  beforeEach(() => spectator = createComponent());

  it('should create a instance', () => {
    expect(spectator).toBeTruthy();
  });
});
