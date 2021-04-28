import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlErrorComponent {

}
