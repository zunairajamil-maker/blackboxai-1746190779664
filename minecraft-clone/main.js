import { Game } from './game.js';

window.addEventListener('DOMContentLoaded', () => {
  const game = new Game('game-container');
  game.init();
  game.start();
});
