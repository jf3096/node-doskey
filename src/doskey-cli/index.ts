import {IDoskeyCli} from '../../bin/index';
import {default as Doskeys, IDoskey, IDoskeys} from '../doskey/index';
import * as inquirer from 'inquirer';
import {objects} from 'inquirer';
import * as open from 'open';
import {DOSKEYS_PATH, EXEC_BATCH_SCRIPT_PATH} from '../constants/index';
import * as invariant from 'invariant';
import {isString} from 'util';
import Logger from '../logs/index';
import {EOL} from 'os';
import DoskeyUtils from '../doskey-runner/doskey-utils';

class DoskeyCli implements IDoskeyCli {

  private static invariantKey(key: string): void {
    invariant(key, `key cannot be empty`);
    invariant(key.indexOf('=') === -1, `key cannot end with '='`);
  }

  private static invariantValue(value: string): void {
    DoskeyCli.invariantEmpty(value, `value`);
  }

  private static invariantEmpty(input: string, name: string): void {
    invariant(input, `${name} cannot be empty`);
  }

  constructor() {
    Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach((key) => {
      if (key.startsWith(`on`)) {
        this[key] = this[key].bind(this);
      }
    });
  }

  public onList(): void {
    const doskeys = this.geAllDosKeys();
    this.print([
      '',
      ...Object.keys(doskeys).map((key) => {

        const item = doskeys[key];
        const prefix = !item.disable ? '* ' : '  ';
        return (prefix + key + this.hyphen(key, 12) + item.value);
      }),
      ''
    ]);
  }

  public onAdd(key: string, value: string, disable: boolean = false): void {
    Logger.debug(value);
    DoskeyCli.invariantKey(key);
    DoskeyCli.invariantValue(value);

    disable = !!(isString(disable) && disable.trim() === 'true');

    value = value.trim();

    if (value.indexOf(' ')) {
      if (value.endsWith(' $*')) {
        value = value.slice(value.length - 3);
      }
      value = `"${value}" $*`;
    }

    const doskeys = this.geAllDosKeys();
    if (doskeys.hasOwnProperty(key)) {
      Logger.info(`Found ${key}. This action will overwrite the value`);
    }
    const newDoskey: IDoskey = {
      value,
      disable
    };
    Doskeys.getInstance().add({
      [key.trim()]: newDoskey
    });
    Logger.info(`Add complete`);
    this.onList();
  }

  public async onEdit(): Promise<void> {
    const doskeys = this.geAllDosKeys();
    const doskeysList = Object.keys(doskeys);
    const choices = doskeysList.map((key) => {
      const doskey: IDoskey = doskeys[key];
      return {
        name: `${key}=${doskey.value}`,
        value: key,
        checked: !doskey.disable
      } as objects.ChoiceOption;
    });
    const {cmdKeyList} = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'cmdKeyList',
        message: 'update doskeys: ',
        choices
      }
    ]);
    const {newDoskeys} = doskeysList.reduce(({cmdKeyList, newDoskeys}, key) => {
      const filterList = cmdKeyList.filter((newKey) => newKey !== key);
      const hasFound = cmdKeyList.length !== filterList.length;
      if (hasFound) {
        cmdKeyList = filterList;
      }
      newDoskeys[key].disable = !hasFound;
      return {cmdKeyList, newDoskeys};
    }, {cmdKeyList, newDoskeys: {...doskeys}});
    Doskeys.getInstance().set(newDoskeys);
    Logger.info(`Edit complete`);
    this.onList();
  }

  public onDel(key: string): void {
    const doskeys = this.geAllDosKeys();
    if (!doskeys.hasOwnProperty(key)) {
      return;
    }
    Doskeys.getInstance().del(key);
    Logger.info(`Delete complete`);
    this.onList();
  }

  public onOpen(): void {
    open(DOSKEYS_PATH);
  }

  public async onActivate(): Promise<void> {
    const doskeys = Doskeys.getInstance().get();
    const scripts = Object.keys(doskeys).reduce((result, key) => {
      const {value, disable} = doskeys[key];
      if (!disable) {
        result.push(`echo doskey ${key}=${value}`);
      }
      return result;
    }, []).join(EOL);
    await DoskeyUtils.rewriteDoskeyBatchProcess(EXEC_BATCH_SCRIPT_PATH, scripts);
    /**
     * TODO: double check this
     */
    require('child_process').exec(`cmd /c "${EXEC_BATCH_SCRIPT_PATH}"`, (err) => {
      if (err) {
        Logger.error(err);
      }
      Logger.info(`Activate complete`);
      this.onList();
    });

  }

  public displayCurrentStatus(): void {
    throw new Error('no implementation');
  }

  private print(infoList: string[]): void {
    infoList.forEach((info) => Logger.log(info));
  }

  private geAllDosKeys(): IDoskeys {
    return Doskeys.getInstance().get();
  }

  private hyphen(str: string, len: number): string {
    const hyphen = new Array(Math.max(1, len - str.length)).join('-');
    return ` ${hyphen} `;
  }
}

const doskeyCli = new DoskeyCli();
export default doskeyCli;
