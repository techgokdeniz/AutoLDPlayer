import LDPlayer from "./LDPlayer.js";

const LDPlayerPath = "C:\\LDPlayer\\LDPlayer64\\ldconsole.exe";

(function () {
  const player = new LDPlayer(LDPlayerPath);
  player.start();
  player.quaitAll();
})();
