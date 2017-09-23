import { getSkeletonSprite, skeletonAttack } from './skeleton';
import { getAntSprite, antTypes } from './ant';
import { doSend } from '../sockets/socketHandler';
import { getSoundAsset, preDefinedSounds } from './soundUtils';
import { loadAnimateFrame, initTexturesPreloader } from './textures';
import { getRandomArbitrary, randomBoolean } from './randomUtils';
import { loadMainMenu, stages } from './stage';

export const gameGlobal = {
  app: initApplication(),
  soundsLoaded: false,
  loader: PIXI.loader,
}

function initApplication() {
  let mainCanvas = document.getElementById("mainGame");
  let rendererOptions = {
    antialiasing: false,
    transparent: false,
    resolution: window.devicePixelRatio,
    autoResize: true,
  }
  let ratio = window.innerWidth / window.innerHeight;
  let app = new PIXI.Application(window.innerWidth, window.innerHeight, {view: mainCanvas}, rendererOptions);
  window.onresize = function(event) {
      resize(app.renderer, ratio);
  };
  return app;
}

export function initialiseLoader() {
  soundsLoader();
}

export function hidePreloaderAndStartGame() {
  jQuery(".preLoader").fadeOut();
  jQuery("#mainGame").fadeIn();
  initialiseGame();
}

function gameLoader() {
  initTexturesPreloader();
}

function soundsLoader() {
  sleep(100).then((() => {
    isSoundsLoaded();
    if(!gameGlobal.soundsLoaded) {
      soundsLoader();
    } else {
      gameLoader();
    }
  }));
}

export function initialiseGame() {
  loadMainMenu();
  gameGlobal.app.stage.addChild(stages.mainMenu);
}

function getAnt() {
  let ant = undefined;
  if(randomBoolean()) {
    ant = getAntSprite(antTypes.iceAnt);
  } else {
    ant = getAntSprite(antTypes.fireAnt);
  }
  ant.x = getRandomArbitrary(0, window.innerWidth);
  ant.y = getRandomArbitrary(0, window.innerHeight);
  return ant;
}

function resize(renderer, ratio) {
    if (window.innerWidth / window.innerHeight >= ratio) {
        var w = window.innerHeight * ratio;
        var h = window.innerHeight;
    } else {
        var w = window.innerWidth;
        var h = window.innerWidth / ratio;
    }
    renderer.view.style.width = w + 'px';
    renderer.view.style.height = h + 'px';
}


function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function isSoundsLoaded() {
  for(var property in preDefinedSounds) {
    if(preDefinedSounds[property].state() !== 'loaded') {
      gameGlobal.soundsLoaded = false;
    }
  }
  gameGlobal.soundsLoaded = true;
}
