import logger from "./logger.js";
import { spawn } from "child_process";

class AutoLDPlayer {
  /**
   * Create a AutoLDPlayer instance
   * @param {string} ldPlayerPath - Path to LDPlayer.exe
   */
  constructor(ldPlayerPath) {
    this.ldPlayerPath = ldPlayerPath;
  }

  /**
   * Return start message
   */
  async start() {
    logger.succes(`${this.ldPlayerPath} started`);
  }

  async quaitAll() {
    this.executeCommand("quitall");
  }

  async executeCommand(command) {
    logger.info(`Executing command: ${command}`);

    const cmd = spawn(this.ldPlayerPath, [command], {
      shell: true,
      windowsHide: true,
    });

    cmd.stdout.on("data", (data) => {
      console.log(`${data}`);
    });

    cmd.stderr.on("data", (data) => {
      console.error(`${data}`);
    });

    cmd.on("exit", (code, signal) => {
      if (code === 0) {
        logger.succes(`Command executed: ${command}`);
      } else {
        logger.error(
          `Command failed: ${command} code : ${code} signal: ${signal}`
        );
      }
    });
  }
}

export default AutoLDPlayer;
