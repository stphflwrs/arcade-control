import { Light } from '../typings/light';


const lightToName = (light: Light): string => {
  return {
    [Light.Ambiance]: 'Arcade Ambiance'
  }[light];
};

export { lightToName };
