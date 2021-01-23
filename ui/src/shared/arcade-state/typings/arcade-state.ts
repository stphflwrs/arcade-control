import { Game } from './game';
import { Light } from './light';
import { GameState } from './game-state';
import { LightState } from './light-state';


export interface ArcadeState {
  [Game.AstroCity]: GameState,
  [Game.DdrSolo]: GameState,
  [Game.Museca]: GameState,
  [Light.Ambiance]: LightState
}
