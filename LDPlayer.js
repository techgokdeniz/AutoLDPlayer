import logger from "./helper/logger.js";
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
   * Reboot a LDPlayer instance by name
   * LDPlayer isim ile yeniden başlat
   * @param {String} name
   */
  async rebootByName(name) {
    this.executeCommand(`reboot --name ${name}`);
  }

  /**
   * Reboot a LDPlayer instance by index
   * LDPlayer index ile yeniden başlat
   * @param {Number} index
   */
  async rebootByIndex(index) {
    this.executeCommand(`reboot --index ${index}`);
  }

  /**
   * Rename LDPlayer instance by name
   * LDPlayer isim ile yeniden adlandır
   * @param {String} name
   * @param {String} newName
   */
  async renameByName(name, newName) {
    this.executeCommand(`rename --name ${name} --title ${newName}`);
  }

  /**
   * Rename LDPlayer instance by index
   * LDPlayer index ile yeniden adlandır
   * @param {Number} index
   * @param {String} newName
   */
  async renameByIndex(index, newName) {
    this.executeCommand(`rename --index ${index} --title ${newName}`);
  }

  /**
   * List all running LDPlayer instances
   * Çalışan tüm LDPlayer'ları listele
   */
  async runningList() {
    this.executeCommand("runninglist");
  }

  /**
   * Check if a LDPlayer instance is running by name
   * LDPlayer isim ile çalışıyor mu kontrol et
   * @param {String} name
   */
  async isRunningByName(name) {
    this.executeCommand(`isrunning --name ${name}`);
  }

  /**
   * Check if a LDPlayer instance is running by index
   * LDPlayer index ile çalışıyor mu kontrol et
   * @param {Number} index
   */
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
   * @param {Number} PlayerIndex
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
   * @param {Number} index
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
   * @param {Number} PlayerIndex
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

  ///////////////////////// MODİFY SECTION /////////////////////////

  /**
   * Modify resulation a LDPlayer instance name
   * LDPlayerin çözünürlüğünü değiştirir
   * @param {String} name
   * @param {Number} width
   * @param {Number} height
   * @param {Number} dpi
   */
  async modifyResolutionName(name, width, height, dpi) {
    this.executeCommand(
      `modify --name ${name} --resolution ${width},${height},${dpi}`
    );
  }

  /**
   * Modify resulation a LDPlayer instance index
   * LDPlayerin çözünürlüğünü değiştirir
   * @param {String} name
   * @param {Number} width
   * @param {Number} height
   * @param {Number} dpi
   */
  async modifyResolutionIndex(index, width, height, dpi) {
    this.executeCommand(
      `modify --index ${index} --resolution ${width},${height},${dpi}`
    );
  }

  /**
   * Modify CPU count of a LDPlayer instance by name
   * LDPlayerin CPU sayısını değiştirir
   * @param {String} name
   * @param {Number} cpu
   */
  async modifyCpuName(name, cpu) {
    if (cpu < 1 || cpu > 4)
      throw new Error("CPU count must be between 1 and 4");
    this.executeCommand(`modify --name ${name} --cpu ${cpu}`);
  }

  /**
   * Modify CPU count of a LDPlayer instance by index
   * LDPlayerin CPU sayısını değiştirir
   * @param {String} name
   * @param {Number} cpu
   */
  async modifyCpuIndex(index, cpu) {
    if (cpu < 1 || cpu > 4)
      throw new Error("CPU count must be between 1 and 4");
    this.executeCommand(`modify --index ${index} --cpu ${cpu}`);
  }

  /**
   * Modify memory of a LDPlayer instance by name
   * LDPlayerin RAM miktarını değiştirir
   * @param {String} name
   * @param {Number} memory
   */
  async modifyMemoryName(name, memory) {
    if (memory % 512 !== 0 || memory < 512)
      throw new Error(
        "Memory must be a multiple of 512 and can take a minimum of 512mb."
      );
    this.executeCommand(`modify --name ${name} --memory ${memory}`);
  }

  /**
   *
   * @param {Number} index
   * @param {Number} memory
   */
  async modifyMemoryIndex(index, memory) {
    if (memory % 512 !== 0 || memory < 512)
      throw new Error(
        "Memory must be a multiple of 512 and can take a minimum of 512mb."
      );
    this.executeCommand(`modify --index ${index} --memory ${memory}`);
  }

  /**
   * Execute a command
   * Komut çalıştır
   * @param {string} command
   */
  async executeCommand(command) {
    if (this.debug) {
      logger.info("--------------------");
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
          logger.info("--------------------");
        } else {
          logger.error(
            `Command failed: ${command} code : ${code} signal: ${signal}`
          );
          logger.info("--------------------");
        }
      }
    });
  }
}

export default AutoLDPlayer;
