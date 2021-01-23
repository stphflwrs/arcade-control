import express, { Express } from 'express';
import { WemoManager } from './managers/wemo-manager';
import * as dotenv from 'dotenv';
import { HueManager } from './managers/hue-manager';
import { setupGetState } from './handlers/get-state';
import bodyParser from 'body-parser';
import cors from 'cors';
import { setupSetState } from './handlers/set-state';


dotenv.config();
const main = async () => {
  const app: Express = express();
  app.use(bodyParser.json());
  app.use(cors());

  const wemoManager: WemoManager = new WemoManager();
  await wemoManager.initialize(['Astro City', 'DDR Solo', 'MÚSECA']);
  const hueManager: HueManager = new HueManager();
  await hueManager.initialize();

  setupGetState(app, hueManager, wemoManager);
  setupSetState(app, hueManager, wemoManager);

  app.listen(3000, () => {
    console.log('app starteded');
  });
};

main();
