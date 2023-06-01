import logger from "./logger.js";
import { spawn } from "child_process";

class AutoLDPlayer {
  /**
   * Create a AutoLDPlayer instance
   * @param {string} ldPlayerPath - Path to LDPlayer.exe
   * @param {boolean} debug - Enable debug mode
   */
  constructor(ldPlayerPath, debug) {
    this.debug = debug;
    this.ldPlayerPath = ldPlayerPath;
  }

  /**
   * Return start message
   * Başlangıç mesajını döndür
   */
  async start() {
    logger.succes(`${this.ldPlayerPath} path injected`);
  }

  /**
   * List all LDPlayer instances
   * Tüm LDPlayer'ları listele
   */
  async list() {
    this.executeCommand("list");
  }

  /**
   * List all LDPlayer instances
   * Tüm LDPlayer'ları detaylı bir şekilde listele
   */
  async listAll() {
    this.executeCommand("list2");
  }

  /**
   * List all running LDPlayer instances
   * Çalışan tüm LDPlayer'ları listele
   */
  async runningList() {
    this.executeCommand("runninglist");
  }

  async isRunningByName(name) {
    this.executeCommand(`isrunning --name ${name}`);
  }

  async isRunningByIndex(index) {
    this.executeCommand(`isrunning --index ${index}`);
  }

  /**
   * Close all LDPlayer instances
   * Tüm LDPlayer'ları kapat
   */
  async quaitAll() {
    this.executeCommand("quitall");
  }

  /**
   * Launch a LDPlayer instance by name
   * LDPlayer isim ile aç
   * @param {string} PlayerName
   */
  async launchName(name) {
    this.executeCommand(`launch --name ${name}`);
  }

  /**
   * Launch a LDPlayer instance by index
   * LDPlayer index ile aç
   * @param {int} PlayerIndex
   */
  async launchIndex(index) {
    this.executeCommand(`launch --index ${index}`);
  }

  /**
   * Close a LDPlayer instance by name
   * LDPlayer isim ile kapat
   * @param {string} PlayerName
   */
  async quitName(name) {
    this.executeCommand(`quit --name ${name}`);
  }

  /**
   * Close a LDPlayer instance by index
   * LDPlayer index ile kapat
   * @param {int} index
   */
  async quitIndex(index) {
    this.executeCommand(`quit --index ${index}`);
  }

  /**
   * Create a LDPlayer instance
   * LDPlayer oluştur
   * @param {string} PlayerName
   */
  async cretaInstance(name) {
    this.executeCommand(`add --name ${name}`);
  }

  /**
   * Delete a LDPlayer instance by name
   * LdPlayer isim ile sil
   * @param {string} PlayerName
   */
  async deleteInstanceName(name) {
    this.executeCommand(`remove --name ${name}`);
  }

  /**
   * Delete a LDPlayer instance by index
   * LdPlayer index ile sil
   * @param {int} PlayerIndex
   */
  async deleteInstanceIndex(index) {
    this.executeCommand(`remove --index ${index}`);
  }

  /**
   * Copy a LDPlayer instance name
   * LDPlayer isim kopyalamaya yarar name yeni player ismini InstanceName ise kopyalanacak player ismini belirtir
   * @param {string} name
   * @param {string} InstanceName
   */
  async CopyInstanceName(name, InstanceName) {
    this.executeCommand(`copy --name ${name} --from ${InstanceName}`);
  }

  /**
   * Execute a command
   * Komut çalıştır
   * @param {string} command
   */
  async executeCommand(command) {
    if (this.debug) {
      logger.info(`Executing command: ${command}`);
    }

    const cmd = spawn(this.ldPlayerPath, [command], {
      shell: true,
      windowsHide: true,
    });

    cmd.stdout.on("data", (data) => {
      logger.succes(`${data}`);
    });

    cmd.stderr.on("data", (data) => {
      logger.error(`${data}`);
    });

    cmd.on("exit", (code, signal) => {
      if (this.debug) {
        if (code === 0) {
          logger.succes(`Command executed: ${command}`);
        } else {
          logger.error(
            `Command failed: ${command} code : ${code} signal: ${signal}`
          );
        }
      }
    });
  }
}

export default AutoLDPlayer;
