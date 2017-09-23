import { gameGlobal } from './game';
import { preDefinedSounds } from './soundUtils';
import { getAntSprite, antTypes } from './ant';

export const stages = {
  mainMenu : new PIXI.Container(),
}

export function loadMainMenu() {
  let ant = getAntSprite(antTypes.fireAnt);
  console.log(ant.type);
  ant.textures = ant.type.down;
  ant.loop = true;
  ant.play();
  ant.interactive = true;

  let center = getCenterOfWindow();
  ant.x = center[0];
  ant.y = center[1];
  ant.anchor.set(0.5);
  ant.scale.set(1.5, 1.5);
  stages.mainMenu.addChild(ant);
  stages.mainMenu.ticker = new PIXI.ticker.Ticker();
  preDefinedSounds.entryOfGladiatorsEntry.play();
  preDefinedSounds.entryOfGladiatorsEntry.once('end', function() {
    preDefinedSounds.entryOfGladiatorLooped.play();
    stages.mainMenu.addChild(getMainMenuAntsContainer());
    stages.mainMenu.ticker.add(moveMainMenuAnts);
  });
  stages.mainMenu.ticker.stop();
  stages.mainMenu.ticker.add((deltaTime) => {
    ant.y += 0.3;
  });
  stages.mainMenu.ticker.start();
}

const mainMenuAnts = [];

function getMainMenuAntsContainer() {
  let container = new PIXI.Container();
  let rendererWidth = getRendererWidth();
  let ants = rendererWidth / 128;
  for(let i = 0; i <= ants; i++) {
    let ant = getAntSprite(antTypes.fireAnt);
    ant.x = i * 128;
    ant.y = -100;
    ant.textures = ant.type.down;
    ant.loop = true;
    ant.play();
    mainMenuAnts.push(ant);
    container.addChild(ant);
  }
  return container;
}

let timePassed = 0;
let even = false;
function moveMainMenuAnts(deltaTime) {
  timePassed += deltaTime;
  mainMenuAnts.forEach(function(ant) {
    ant.y += 0.5;
    if(even) {
      ant.y += 0.2;
      if(timePassed > 150) {
        timePassed = 0;
      }
    } else if(!even && timePassed <= 50) {
      ant.y += 0.4;
    }
    even = !even;
    console.log(timePassed);
  });
}

function getCenterOfWindow() {
  return [getRendererWidth() / 2, getRendererHeight() / 2]
}

function getRendererWidth() {
  return gameGlobal.app.renderer.width;
}

function getRendererHeight() {
  return gameGlobal.app.renderer.height;
}
