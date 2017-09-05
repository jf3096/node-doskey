import * as fs from 'fs';
import * as path from 'path';
import Logger from '../logs/index';
import {EXEC_BATCH_SCRIPT_TPL_PATH} from '../constants/index';

export default class DoskeyUtils {
  // public static async createTmpFile
  // (settings = {prefix: 'doskey-tmp-', postfix: '.bat'}): Promise<SynchrounousResult> {
  //   return tmp.fileSync(settings);
  // }

  public static async rewriteDoskeyBatchProcess(abs: string, scripts: string): Promise<void> {
    const doskeyBatchProcess = await DoskeyUtils.getDoskeyBatchProcess(scripts);
    await DoskeyUtils.writeFile(abs, doskeyBatchProcess);
  }

  public static async getDoskeyBatchProcess(scripts: string): Promise<string> {
    const rawDoskeyBatchProcess = await DoskeyUtils.getDoskeyBatchProcessTpl();
    return rawDoskeyBatchProcess.replace(`@@SCRIPTS@@`, scripts);
  }

  private static getDoskeyBatchConfigs(): Promise<string> {
    const targetDoskeyConfigPath = path.join(__dirname, '../cmd-doskey.bat');
    return DoskeyUtils.readFile(targetDoskeyConfigPath);
  }

  private static getDoskeyBatchProcessTpl(): Promise<string> {
    return DoskeyUtils.readFile(EXEC_BATCH_SCRIPT_TPL_PATH);
  }

  private static readFile(abs: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(abs, (error: Error, data: Buffer) => {
        error ? reject(error) : resolve(data.toString());
      });
    });
  }

  private static writeFile(abs: string, data: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(abs, data, (error: Error) => {
        error ? reject(error) : resolve();
      });
    });
  }
}
