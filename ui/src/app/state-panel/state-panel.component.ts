import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { StateEntry } from '../../shared/arcade-state/typings/state-entry';
import { StateMapperService } from '../../shared/arcade-state/parser/state-mapper.service';
import { ArcadeStateService } from '../../shared/arcade-state/arcade-state.service';


@Component({
  selector: 'cafe-pause-arcade-state-panel',
  templateUrl: 'state-panel.component.html',
  styleUrls: ['state-panel.component.scss'],
})
export class StatePanelComponent implements OnInit {
  @Input()
  public state: any;
  @Input()
  public stateEntry: StateEntry;

  @ContentChild('controls', { static: true })
  public controlRef: TemplateRef<any>;

  public label: string;

  public constructor(
    private arcadeStateService: ArcadeStateService,
    private stateMapperService: StateMapperService
  ) {
    this.label = '';
    this.changeState = this.changeState.bind(this);
  }

  public changeState(newState: any): void {
    this.arcadeStateService.updateStateEntry(this.stateEntry, {
      ...this.state,
      ...newState
    });
  }

  public ngOnInit(): void {
    this.label = this.stateMapperService.stateEntryToLabel(this.stateEntry);
  }
}
