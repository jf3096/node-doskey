import {DOSKEYS_PATH} from '../constants/index';
import * as fs from 'fs';

export interface IDoskey {
  value: string;
  disable?: boolean;
}

export interface IDoskeys {
  [key: string]: IDoskey;
}

export default class Doskeys {

  public static getInstance(): Doskeys {
    if (!Doskeys.instance) {
      Doskeys.instance = new Doskeys();
    }
    return Doskeys.instance;
  }

  private static instance: Doskeys;

  private static formatJSON(obj: object): string {
    return JSON.stringify(obj, null, 2);
  }

  private doskeys: IDoskeys;

  private constructor() {
    this.doskeys = require(DOSKEYS_PATH);
  }

  public get (): IDoskeys {
    return require(DOSKEYS_PATH);
  }

  public set (doskeys: IDoskeys): void {
    this.doskeys = doskeys;
    fs.writeFileSync(DOSKEYS_PATH, Doskeys.formatJSON(doskeys));
  }

  public update(doskeys: IDoskeys): void {
    Object.assign(this.doskeys, doskeys);
    this.set(this.doskeys);
  }

  public add(doskeys: IDoskeys): void {
    this.update(doskeys);
  }

  public del(key: string): void {
    delete this.doskeys[key];
    this.set(this.doskeys);
  }
}
