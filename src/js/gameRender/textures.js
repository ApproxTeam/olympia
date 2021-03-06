import { gameGlobal, hidePreloaderAndStartGame, updateProgressBar } from './game';
import { loadAnts } from './ant';

export function loadAnimateFrame(assetPrefix, assetTime, assetMax, assetMin, viceVersa) {
  viceVersa = (typeof viceVersa === 'undefined') ? false : true;
  let loader = PIXI.loader;
  let frameSet = [];
  for (let i = assetMin; i <= assetMax; i++){
    let frame = {
        texture: loader.resources[`${assetPrefix}_${i}`].texture,
        time: assetTime
    };
    frameSet.push(frame);
  }
  if(viceVersa) {
    for (let i = assetMax; i >= assetMin; i--){
      let frame = {
          texture: loader.resources[`${assetPrefix}_${i}`].texture,
          time: assetTime
      };
      frameSet.push(frame);
    }
  }
  return frameSet;

}

export function initTexturesPreloader() {
  addBundleToLoader("ant/fireant", "fireant", 0, 255);
  addBundleToLoader("ant/iceant", "iceant", 0, 255);
  gameGlobal.loader.on("progress", progressFunction);
  gameGlobal.loader.load(function() {
    loadAnts();
    hidePreloaderAndStartGame();
  })
}

function progressFunction(progress) {
  updateProgressBar(30 + progress.progress * 0.8);
}

function addBundleToLoader(assetsFolder, assetsPrefix, min, max) {
  for (let i = min; i <= max; i++){
    gameGlobal.loader.add(`${assetsPrefix}_${i}`, `./assets/${assetsFolder}/${assetsPrefix}_${i}.png`);
  }

}
