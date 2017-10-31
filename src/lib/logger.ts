import * as fs from "fs-extra";
import * as path from "path";

export class Logger {
  constructor(private rootDir?: string) {
    if (!this.rootDir) {
      this.rootDir = "./log";
    }
    fs.ensureDirSync(this.rootDir);
  }

  public write(logMsg: any): void {
    this.write2File(`${this.getDailyName()}.log`, logMsg);
  }

  public write2File(logFile: string, logMsg: any): void {
    // ensure the path existing
    logFile = path.join(this.rootDir, logFile);
    const logFolder = path.dirname(logFile);
    fs.ensureDirSync(logFolder);

    // convert the json object
    if (logMsg instanceof Object) {
      let header = "";
      let value = "";
      for (const key in logMsg) {
        if (logMsg.hasOwnProperty(key)) {
          header += `${key},`;
          let val = logMsg[key];
          if (val instanceof Object) {
            val = JSON.stringify(val);
          } else if (val) {
            val = val.toString();
          } else {
            val = "";
          }
          if (val.indexOf(",") >= 0) {
            val = val.replace(/"/g, "\"");
            val = `"${val}"`;
          }
          value += `${val},`;
        }
      }
      logMsg = value;

      // write header for log
      if (!fs.existsSync(logFile)) {
        fs.writeFile(logFile, header + "\r\n", {
          "flag": "a",
        }, (err) => {
          console.error(logMsg);
          if (err) {
            throw err;
          }
        });
      }
    }

    // write msg to file
    fs.writeFile(logFile, logMsg + "\r\n", {
      "flag": "a",
    }, (err) => {
      console.error(logMsg);
      if (err) {
        throw err;
      }
    });
  }

  public write2Folder(logFolder: string, logMsg: any): void {
    const file = path.join(logFolder, `${this.getDailyName()}.log`);
    this.write2File(file, logMsg);
  }

  private getDailyName(): string {
    return new Date().toISOString().split("T")[0];
  }
}

