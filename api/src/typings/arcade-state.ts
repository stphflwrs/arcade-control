import { LightState } from './light-state';
import { Light } from './light';
import { Game } from './game';
import { GameState } from './game-state';


interface ArcadeState {
  [Game.AstroCity]: GameState,
  [Game.DdrSolo]: GameState,
  [Game.Museca]: GameState,
  [Light.Ambiance]: LightState,
}

export { ArcadeState };
