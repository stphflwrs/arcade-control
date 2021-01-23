import Wemo from 'wemo-client';
import { PowerState } from '../typings/power-state';
import { rejects } from 'assert';


class WemoManager {
  private readonly wemo: any;
  private readonly clients: Map<string, any>;

  public constructor() {
    this.wemo = new Wemo();
    this.clients = new Map<string, any>();
  }

  public async getPowerState(name: string): Promise<PowerState> {
    return new Promise((resolve) => {
      this.clients.get(name).getBinaryState((error, state: any) => {
        if (!!error) {
          console.error(error);
          resolve(PowerState.Unavailable);
          return;
        }

        resolve(state === "1" ? PowerState.On : PowerState.Off);
      });
    });
  }

  public async setPowerState(name: string, powerState: PowerState): Promise<void> {
    return new Promise((resolve, reject) => {
      if (powerState === PowerState.Unavailable) {
        reject(new TypeError('Power state cannot be assigned to PowerState.Unavailable'));
      }

      this.clients.get(name).setBinaryState(powerState === PowerState.On ? 1 : 0, (error) => {
        resolve();
        if (!!error) {
          reject(new Error(`Could not update power state of ${name} to value ${powerState}`));
        }
      });
    });
  }

  public async initialize(names: string[]): Promise<void> {
    return new Promise((resolve) => {
      let remainingClients: number = names.length;
      this.wemo.discover((error, deviceInfo) => {
        if (error) {
          console.log(error);
        }

        if (names.includes(deviceInfo.friendlyName)) {
          this.registerClient(deviceInfo);
          remainingClients -= 1;
        }

        if (remainingClients === 0) {
          resolve();
        }
      });
    });
  }

  private registerClient(deviceInfo: any): void {
    const name: string = deviceInfo.friendlyName;
    const client: any = this.wemo.client(deviceInfo);
    this.clients.set(name, client);
    this.setupLogging(name, client);
  }

  private setupLogging(name: string, client: any): void {
    client.on('error', (error) => {
      console.error(`[${name}] Error: %s`, error.code);
    });

    client.on('binaryState', (value) => {
      console.info(`[${name}] Binary State changed to: %s`, value);
    });
  }
}

export { WemoManager };
