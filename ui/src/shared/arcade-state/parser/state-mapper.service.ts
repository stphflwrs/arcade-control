import { Injectable } from '@angular/core';
import { StateEntry } from '../typings/state-entry';
import { Game } from '../typings/game';
import { Light } from '../typings/light';


@Injectable({ providedIn: 'root' })
export class StateMapperService {
  public stateEntryToLabel(stateEntry: StateEntry): string {
    return {
      [Game.AstroCity]: 'Astro City',
      [Game.DdrSolo]: 'DDR Solo',
      [Game.Museca]: 'MÚSECA',
      [Light.Ambiance]: 'Ambiance',
    }[stateEntry];
  }
}
