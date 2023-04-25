import * as PIXI from 'pixi.js';

const style = new PIXI.TextStyle({
  fill: '#ff0000',
});
export const FPS = new PIXI.Text('Hello World', style);
export const ballAmount = new PIXI.Text('Balls: ', style);
