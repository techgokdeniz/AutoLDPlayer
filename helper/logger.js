class Logger {
  info(message) {
    console.log("\x1b[34m%s\x1b[0m", message);
  }

  error(message) {
    console.log("\x1b[31m%s\x1b[0m", message);
  }

  warn(message) {
    console.log("\x1b[33m%s\x1b[0m", message);
  }

  succes(message) {
    console.log("\x1b[32m%s\x1b[0m", message);
  }
}

var logger = new Logger();

export default logger;
