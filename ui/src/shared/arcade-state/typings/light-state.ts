import { HasPowerState } from './has-power-state';
import { HasBrightness } from './has-brightness';


export type LightState = HasPowerState & HasBrightness;
