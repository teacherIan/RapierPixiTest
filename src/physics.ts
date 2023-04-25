import settings from './settings';
import * as RAPIER from '@dimforge/rapier2d-compat';

// OR using the await syntax:
async function run_simulation() {
  await RAPIER.init();
  return RAPIER as typeof RAPIER;
}

export async function initPhysics() {
  const RAPIER = await run_simulation();

  const world = new RAPIER.World(new RAPIER.Vector2(0.0, settings.gravityY));

  function step(delta: number) {
    world.timestep = delta;
    world.step();
  }

  return { RAPIER, step, world };
}

export function createPhysicsBall(
  radius: number,
  world: RAPIER.World,
  house: string
) {
  let rigidBodyDesc: RAPIER.RigidBodyDesc =
    RAPIER.RigidBodyDesc.dynamic().setTranslation(100, 0);
  let colliderDesc: RAPIER.ColliderDesc = RAPIER.ColliderDesc.ball(radius);

  let body = world.createRigidBody(rigidBodyDesc);

  let collider = world.createCollider(colliderDesc, body);
  collider.setRestitution(settings.restitution);
  if (house == 'ruby') {
    collider.setCollisionGroups(0x00010001);
  }

  if (house == 'amber') {
    collider.setCollisionGroups(0x00020002);
  }

  if (house == 'pearl') {
    collider.setCollisionGroups(0x00040004);
  }

  if (house == 'sapphire') {
    collider.setCollisionGroups(0x00080008);
  }

  return { body, collider };
}

export function createPhysicsWall(
  width: number,
  height: number,
  world: RAPIER.World
) {
  let rigidBodyDesc: RAPIER.RigidBodyDesc = RAPIER.RigidBodyDesc.fixed();
  let colliderDesc: RAPIER.ColliderDesc = RAPIER.ColliderDesc.cuboid(
    width / 2,
    height / 2
  );
  let body = world.createRigidBody(rigidBodyDesc);
  let collider = world.createCollider(colliderDesc, body);
  collider.setCollisionGroups(0x000f000f);
  collider.setRestitution(1);

  return { body, collider };
}
