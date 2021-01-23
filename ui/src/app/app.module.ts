import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from '../shared/shared.module';
import { GamesComponent } from './arcade-state/games.component';
import { StatePanelComponent } from './state-panel/state-panel.component';
import { StatePanelControlsModule } from './state-panel-controls/state-panel-controls.module';


@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    StatePanelComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    StatePanelControlsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
