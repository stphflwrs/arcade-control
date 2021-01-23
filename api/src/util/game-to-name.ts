import { Game } from '../typings/game';


const gameToName = (game: Game): string => {
  return {
    [Game.AstroCity]: 'Astro City',
    [Game.DdrSolo]: 'DDR Solo',
    [Game.Museca]: 'MÚSECA'
  }[game];
};

export { gameToName };
