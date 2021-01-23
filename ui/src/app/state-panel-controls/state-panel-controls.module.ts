import { NgModule } from '@angular/core';
import { PowerStateControlComponent } from './power-state-control/power-state-control.component';
import { SharedModule } from '../../shared/shared.module';
import { BrightnessControlComponent } from './brightness-control/brightness-control.component';


@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    BrightnessControlComponent,
    PowerStateControlComponent
  ],
  exports: [
    BrightnessControlComponent,
    PowerStateControlComponent
  ]
})
export class StatePanelControlsModule {}
