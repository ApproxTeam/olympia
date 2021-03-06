import { initialiseGame, initialiseLoader } from '../gameRender/game.js';
import { recognizeEvent } from '../gameRender/controller.js';
import { conditionallySendActivate } from '../gameRender/controller.js';

export const socketConfiguration = {
  url: "ws://approxteam.ddns.net:7777/AntColosseumServer/game",
  onOpen: function(event) {
    initialiseLoader();
    conditionallySendActivate();
  },
  onClose: function(event) {
    console.log(event);
  },
  onMessage: function(event) {
    recognizeEvent(event);
  },
  onError: function(event) {
    alert("Please try again later");
  }
}
