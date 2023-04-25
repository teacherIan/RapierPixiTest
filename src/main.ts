import settings from './settings';
import './style.css';
import { initPhysics } from './physics';
import { createPhysicsBall, createPhysicsWall } from './physics';
import PixiWorld from './PixiWorld';
import * as PIXI from 'pixi.js';
import RAPIER from '@dimforge/rapier2d-compat';

// let circles: {
//   circle: { body: RAPIER.RigidBody; collider: RAPIER.Collider };
//   circleSprite: PIXI.Sprite;
// }[] = [];

let rubyCircles: {
  circle: { body: RAPIER.RigidBody; collider: RAPIER.Collider };
  circleSprite: PIXI.Sprite;
}[] = [];

let amberCircles: {
  circle: { body: RAPIER.RigidBody; collider: RAPIER.Collider };
  circleSprite: PIXI.Sprite;
}[] = [];

let pearlCircles: {
  circle: { body: RAPIER.RigidBody; collider: RAPIER.Collider };
  circleSprite: PIXI.Sprite;
}[] = [];

let sapphireCircles: {
  circle: { body: RAPIER.RigidBody; collider: RAPIER.Collider };
  circleSprite: PIXI.Sprite;
}[] = [];

let currentRubyCircle = 0;
let currentAmberCircle = 0;
let currentPearlCircle = 0;
let currentSapphireCircle = 0;

start();

async function start() {
  let { app, stage, createCircleSprite, createRectangleSprite, circleTexture } =
    new PixiWorld();

  // let fps = app.stage.addChild(FPS);
  // fps.x = 50;
  // fps.y = 10;

  // let ballAmountText = app.stage.addChild(ballAmount);
  // ballAmountText.x = 50;
  // ballAmountText.y = 40;

  const { RAPIER, step, world } = await initPhysics();
  //wait until initPhysics is initialized before running the rest of the code

  const createCircleObject = (ballSize: number, house: string) => {
    let circle = createPhysicsBall(ballSize, world, house);
    let tint;
    if (house == 'sapphire') {
      tint = 0x1271b5;
      circle.body.setTranslation(
        new RAPIER.Vector2(
          0.75 * window.innerWidth +
            window.innerWidth * 0.23 * Math.random() +
            2,
          -Math.random() * 1000 - 100
        ),
        true
      );
    } else if (house == 'ruby') {
      tint = 0xc11c22;
      circle.body.setTranslation(
        new RAPIER.Vector2(
          0 * window.innerWidth + window.innerWidth * 0.23 * Math.random() + 2,
          -Math.random() * 1000 - 100
        ),
        true
      );
    } else if (house == 'amber') {
      tint = 0xe46725;
      circle.body.setTranslation(
        new RAPIER.Vector2(
          0.25 * window.innerWidth +
            window.innerWidth * 0.23 * Math.random() +
            2,
          -Math.random() * 1000 - 100
        ),
        true
      );
    } else {
      tint = 0x000000;
      circle.body.setTranslation(
        new RAPIER.Vector2(
          0.5 * window.innerWidth +
            window.innerWidth * 0.23 * Math.random() +
            2,
          -Math.random() * 1000 - 100
        ),
        true
      );
    }

    let circleSprite = createCircleSprite(
      ballSize,
      app,
      stage,
      circleTexture,
      tint
    );

    circle.body.setEnabled(false);
    if (house == 'sapphire') {
      sapphireCircles.push({ circle, circleSprite });
    } else if (house == 'ruby') {
      rubyCircles.push({ circle, circleSprite });
    } else if (house == 'amber') {
      amberCircles.push({ circle, circleSprite });
    } else {
      pearlCircles.push({ circle, circleSprite });
    }
  };

  const createWallObject = (
    width: number,
    height: number,
    isFloor: boolean
  ) => {
    let wall = createPhysicsWall(width, height, world);
    let sprite: PIXI.Sprite;
    if (isFloor) {
      wall.body.setTranslation(
        new RAPIER.Vector2(window.innerWidth / 2, window.innerHeight),
        true
      );
      sprite = createRectangleSprite(width, height, app, stage);
      sprite.x = wall.body.translation().x;
      sprite.y = wall.body.translation().y;
    } else {
      wall.body.setTranslation(
        new RAPIER.Vector2(0, window.innerHeight / 2),
        true
      );
      sprite = createRectangleSprite(width, height, app, stage);
      sprite.x = wall.body.translation().x;
      sprite.y = wall.body.translation().y;
    }
    return { wall, sprite };
  };
  //sapphire Balls
  for (let i = 0; i < settings.sapphireAmount; i++) {
    createCircleObject(settings.ballRadius, 'sapphire');
  }

  //ruby Balls
  for (let i = 0; i < settings.rubyAmount; i++) {
    createCircleObject(settings.ballRadius, 'ruby');
  }

  //amber Balls
  for (let i = 0; i < settings.amberAmount; i++) {
    createCircleObject(settings.ballRadius, 'amber');
  }

  //pearl Balls
  for (let i = 0; i < settings.pearlAmount; i++) {
    createCircleObject(settings.ballRadius, 'pearl');
  }

  //create walls
  //floor
  createWallObject(window.innerWidth, 50, true);
  //left wall
  createWallObject(10, window.innerHeight * 3, false);
  let rightWall = createWallObject(10, window.innerHeight * 3, false);
  let middleWall = createWallObject(10, window.innerHeight * 3, false);
  middleWall.wall.body.setTranslation(
    new RAPIER.Vector2(window.innerWidth / 2 - 1, window.innerHeight / 2),
    true
  );

  let betweenMiddleLeftWall = createWallObject(
    10,
    window.innerHeight * 3,
    false
  );
  betweenMiddleLeftWall.wall.body.setTranslation(
    new RAPIER.Vector2(window.innerWidth / 4, window.innerHeight / 2),
    false
  );
  betweenMiddleLeftWall.sprite.x =
    betweenMiddleLeftWall.wall.body.translation().x;
  betweenMiddleLeftWall.sprite.y =
    betweenMiddleLeftWall.wall.body.translation().y;

  let betweenMiddleRightWall = createWallObject(
    10,
    window.innerHeight * 3,
    false
  );
  betweenMiddleRightWall.wall.body.setTranslation(
    new RAPIER.Vector2(
      window.innerWidth / 2 + window.innerWidth / 4,
      window.innerHeight / 2
    ),
    false
  );
  betweenMiddleRightWall.sprite.x =
    betweenMiddleRightWall.wall.body.translation().x;
  betweenMiddleRightWall.sprite.y =
    betweenMiddleRightWall.wall.body.translation().y;

  middleWall.sprite.x = middleWall.wall.body.translation().x;
  middleWall.sprite.y = middleWall.wall.body.translation().y;

  rightWall.wall.body.setTranslation(
    new RAPIER.Vector2(window.innerWidth, window.innerHeight / 2),
    true
  );

  rightWall.sprite.x = rightWall.wall.body.translation().x;
  rightWall.sprite.y = rightWall.wall.body.translation().y;

  // activate circles one by one
  function circleCreator() {
    let sapphireInterval = setInterval(() => {
      let sapphireCircle = sapphireCircles[currentSapphireCircle];
      setTimeout(() => {
        sapphireCircle.circle.body.setBodyType(1, true);
      }, settings.setStaticTimeout);

      sapphireCircle.circle.body.setEnabled(true);

      currentSapphireCircle++;
      if (currentSapphireCircle >= sapphireCircles.length)
        clearInterval(sapphireInterval);
    }, settings.gameSpeed);

    let rubyInterval = setInterval(() => {
      let rubyCircle = rubyCircles[currentRubyCircle];
      setTimeout(() => {
        rubyCircle.circle.body.setBodyType(1, true);
      }, settings.setStaticTimeout);

      rubyCircle.circle.body.setEnabled(true);

      currentRubyCircle++;
      if (currentRubyCircle >= rubyCircles.length) clearInterval(rubyInterval);
    }, settings.gameSpeed);

    let amberInterval = setInterval(() => {
      let amberCircle = amberCircles[currentAmberCircle];
      setTimeout(() => {
        amberCircle.circle.body.setBodyType(1, true);
      }, settings.setStaticTimeout);

      amberCircle.circle.body.setEnabled(true);

      currentAmberCircle++;
      if (currentAmberCircle >= amberCircles.length)
        clearInterval(amberInterval);
    }, settings.gameSpeed);

    let pearlInterval = setInterval(() => {
      let pearlCircle = pearlCircles[currentPearlCircle];
      setTimeout(() => {
        pearlCircle.circle.body.setBodyType(1, true);
      }, settings.setStaticTimeout);

      pearlCircle.circle.body.setEnabled(true);

      currentPearlCircle++;
      if (currentPearlCircle >= pearlCircles.length)
        clearInterval(pearlInterval);
    }, settings.gameSpeed);
  }

  circleCreator();

  app.ticker.add((delta) => {
    const d = delta * 0.1;

    rubyCircles.forEach((circle) => {
      circle.circleSprite.x = circle.circle.body.translation().x;
      circle.circleSprite.y = circle.circle.body.translation().y;
    });

    amberCircles.forEach((circle) => {
      circle.circleSprite.x = circle.circle.body.translation().x;
      circle.circleSprite.y = circle.circle.body.translation().y;
    });

    pearlCircles.forEach((circle) => {
      circle.circleSprite.x = circle.circle.body.translation().x;
      circle.circleSprite.y = circle.circle.body.translation().y;
    });

    sapphireCircles.forEach((circle) => {
      circle.circleSprite.x = circle.circle.body.translation().x;
      circle.circleSprite.y = circle.circle.body.translation().y;
    });
    app.render();
    step(d);
  });
}
