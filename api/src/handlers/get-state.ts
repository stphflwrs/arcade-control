import { Express } from 'express';
import { WemoManager } from '../managers/wemo-manager';
import { HueManager } from '../managers/hue-manager';
import { ArcadeState } from '../typings/arcade-state';
import { Game } from '../typings/game';
import { Light } from '../typings/light';
import { gameToName } from '../util/game-to-name';
import { lightToName } from '../util/light-to-name';


const setupGetState = (app: Express, hueManager: HueManager, wemoManager: WemoManager) => {
  app.use('/get-state', async (req, res) => {
    const state: ArcadeState = {
      [Game.AstroCity]: {
        power: await wemoManager.getPowerState(gameToName(Game.AstroCity)),
      },
      [Game.DdrSolo]: {
        power: await wemoManager.getPowerState(gameToName(Game.DdrSolo)),
      },
      [Game.Museca]: {
        power: await wemoManager.getPowerState(gameToName(Game.Museca)),
      },
      [Light.Ambiance]: {
        brightness: await hueManager.getBrightness(lightToName(Light.Ambiance)),
        power: await hueManager.getPowerState(lightToName(Light.Ambiance)),
      },
    };

    res.json(state);
  });
};

export { setupGetState };
