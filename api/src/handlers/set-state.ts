import { Express } from 'express';
import { HueManager } from '../managers/hue-manager';
import { WemoManager } from '../managers/wemo-manager';
import { ArcadeState } from '../typings/arcade-state';
import { Light } from '../typings/light';
import { Game } from '../typings/game';
import { gameToName } from '../util/game-to-name';
import { lightToName } from '../util/light-to-name';


const setupSetState = (app: Express, hueManager: HueManager, wemoManager: WemoManager) => {
  app.post('/set-state', async (req, res) => {
    const arcadeState: ArcadeState = req.body;

    await Promise.all([
      await wemoManager.setPowerState(gameToName(Game.AstroCity), arcadeState[Game.AstroCity].power),
      await wemoManager.setPowerState(gameToName(Game.DdrSolo), arcadeState[Game.DdrSolo].power),
      await wemoManager.setPowerState(gameToName(Game.Museca), arcadeState[Game.Museca].power),

      await hueManager.setPowerState(lightToName(Light.Ambiance), arcadeState[Light.Ambiance].power),
      await hueManager.setBrightness(lightToName(Light.Ambiance), arcadeState[Light.Ambiance].brightness),
    ]);

    res.json({
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
    });
  });
};

export { setupSetState };
