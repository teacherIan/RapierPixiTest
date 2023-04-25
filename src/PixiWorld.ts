import settings from './settings';
import { Application, Container, Graphics, Sprite, Texture } from 'pixi.js';

export default class PixiWorld {
  app: Application;
  stage: Container;
  circleTexture: Texture;

  constructor() {
    this.app = new Application<HTMLCanvasElement>({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xffffff,
      antialias: false,
      // resolution: Math.min(2, window.devicePixelRatio),
      resolution: 1,
      autoDensity: true,
      resizeTo: window,
      backgroundAlpha: 0,
    });
    this.stage = this.app.stage;

    document.body.appendChild(this.app.view as any); // add the canvas to the html document

    this.circleTexture = this.createCircleTexture();
  }

  public createCircleSprite(
    size: number,
    app: Application,
    stage: Container,
    texture: Texture,
    tint: number
  ) {
    let sprite = new Sprite(texture);
    sprite.anchor.set(0.5, 0.5);
    sprite.cullable = true;
    stage.addChild(sprite);
    sprite.tint = tint;
    return sprite;
  }

  public createRectangleSprite(
    width: number,
    height: number,
    app: Application,
    stage: Container
  ) {
    const rectangleGraphic = new Graphics();
    rectangleGraphic.beginFill(0x000000);
    rectangleGraphic.drawRect(0, 0, width, height);
    rectangleGraphic.endFill();
    let texture = app.renderer.generateTexture(rectangleGraphic);
    rectangleGraphic.destroy();
    let sprite = new Sprite(texture);
    sprite.anchor.set(0.5, 0.5);
    sprite.cullable = true;
    stage.addChild(sprite);

    return sprite;
  }

  private createCircleTexture() {
    const circleGraphic = new Graphics();
    circleGraphic.beginFill(0xffffff);
    circleGraphic.drawCircle(0, 0, settings.ballRadius);
    circleGraphic.endFill();
    let texture = this.app.renderer.generateTexture(circleGraphic);
    circleGraphic.destroy();
    return texture;
  }
}
