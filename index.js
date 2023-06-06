import LDPlayer from "./LDPlayer.js";

const LDPlayerPath = "C:\\LDPlayer\\LDPlayer64\\ldconsole.exe";

(async function () {
  // const player = new LDPlayer(LDPlayerPath, false);
  // player.start();
  // player.launchName("LDPlayer");
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  // player.isRunningByName("LDPlayer");
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  // player.isRunningByIndex("LDPlayer");
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  // player.quitName("LDPlayer");

  const player = new LDPlayer(LDPlayerPath, false);
  player.start();
  player.launchName("LDPlayer");
  await new Promise((resolve) => setTimeout(resolve, 10000));
  player.isRunningByName("LDPlayer");
})();
