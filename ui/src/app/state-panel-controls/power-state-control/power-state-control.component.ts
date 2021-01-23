import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { faPowerOff, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { HasPowerState } from '../../../shared/arcade-state/typings/has-power-state';
import { PowerState } from '../../../shared/arcade-state/typings/power-state';
import { StatePanelControl } from '../state-panel-control';
import { ArcadeStateService } from '../../../shared/arcade-state/arcade-state.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'cafe-pause-arcade-power-state-control',
  templateUrl: './power-state-control.component.html',
  styleUrls: ['../control.scss', './power-state-control.component.scss'],
})
export class PowerStateControlComponent implements OnDestroy, OnInit, StatePanelControl<HasPowerState> {
  private readonly onUnsubscribe: Subject<void>;

  public readonly PowerState: typeof PowerState = PowerState;
  public readonly faPowerOff: IconDefinition = faPowerOff;

  @Input()
  public state: HasPowerState;

  @Output()
  public changeState: EventEmitter<HasPowerState>;

  public disabled: boolean;

  public constructor(
    private arcadeStateService: ArcadeStateService,
  ) {
    this.onUnsubscribe = new Subject<void>();
    this.changeState = new EventEmitter<HasPowerState>();

    this.disabled = false;
  }

  public clickPowerButton(): void {
    this.disabled = true;
    const newPowerState: PowerState = this.state.power === PowerState.Off ? PowerState.On : PowerState.Off;
    this.changeState.emit({ power: newPowerState });
  }

  public ngOnDestroy(): void {
    this.onUnsubscribe.next();
    this.onUnsubscribe.complete();
  }

  public ngOnInit(): void {
    this.arcadeStateService.stateRefreshComplete.pipe(
      takeUntil(this.onUnsubscribe),
    ).subscribe(() => {
      this.disabled = false;
    });
  }
}
