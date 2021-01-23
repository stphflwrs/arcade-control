import Api from 'node-hue-api/lib/api/Api';
import { v3 } from 'node-hue-api';
import { env } from 'process';
import { PowerState } from '../typings/power-state';


class HueManager {
  private api: Api;

  public async getBrightness(name: string): Promise<number> {
    try {
      let light: any = await this.api.lights.getLightByName(name);
      let lightState: any = await this.api.lights.getLightState(light);
      return Math.round(lightState.bri / 254 * 100);
    } catch (error) {
      console.error(error);
      return -1;
    }
  }

  public async setBrightness(name: string, brightness: number): Promise<void> {
    if (brightness < 1 || brightness > 100) {
      throw new TypeError('Brightness must be in range [1, 100]');
    }

    try {
      let light: any = await this.api.lights.getLightByName(name);
      let lightState: any = await this.api.lights.getLightState(light);
      if (lightState.on) {
        await this.api.lights.setLightState(light.id, {
          bri: (brightness - 1) * (254 - 1) / (100 - 1) + 1,
        });
      } else {
        console.info(`Brightness of ${name} not updated, light must be on`);
      }
    } catch (error) {
      console.error(error);
      throw new Error(`Could not update brightness of ${name} to value ${brightness}`);
    }
  }

  public async getPowerState(name: string): Promise<PowerState> {
    try {
      let light: any = await this.api.lights.getLightByName(name);
      let lightState: any = await this.api.lights.getLightState(light);
      return lightState.on ? PowerState.On : PowerState.Off;
    } catch (error) {
      console.error(error);
      return PowerState.Unavailable;
    }
  }

  public async setPowerState(name: string, powerState: PowerState): Promise<void> {
    if (powerState === PowerState.Unavailable) {
      throw new TypeError('Power state cannot be assigned to PowerState.Unavailable');
    }

    try {
      let light: any = await this.api.lights.getLightByName(name);
      await this.api.lights.setLightState(light.id, {
        on: powerState === PowerState.On
      });
    } catch (error) {
      throw new Error(`Could not update power state of ${name} to value ${powerState}`);
    }
  }

  public async initialize(): Promise<void> {
    let results: any[] = await v3.discovery.nupnpSearch();
    this.api = await v3.api.createLocal(results[0].ipaddress).connect(env.HUE_BRIDGE_USER, env.HUE_BRIDGE_CLIENT_KEY);
  }
}

export { HueManager };
