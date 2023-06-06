import LDPlayer from "../LDPlayer.js";

const LDPlayerPath = "C:\\LDPlayer\\LDPlayer64\\ldconsole.exe";

(async function () {
  /**
   * * Create a LDPlayer instance and launch it by name after 5 seconds and rename it after 5 seconds
   */

  const player = new LDPlayer(LDPlayerPath, false);
  player.start();

  player.cretaInstance("TestInstance");

  player.launchName("TestInstance");
  await new Promise((resolve) => setTimeout(resolve, 5000));

  player.renameByName("TestInstance", "TestInstanceRenamed");

  await new Promise((resolve) => setTimeout(resolve, 5000));
})();
