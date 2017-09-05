"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../doskey/index");
const inquirer = require("inquirer");
const open = require("open");
const index_2 = require("../constants/index");
const invariant = require("invariant");
const util_1 = require("util");
const index_3 = require("../logs/index");
const os_1 = require("os");
const doskey_utils_1 = require("../doskey-runner/doskey-utils");
class DoskeyCli {
    static invariantKey(key) {
        invariant(key, `key cannot be empty`);
        invariant(key.indexOf('=') === -1, `key cannot end with '='`);
    }
    static invariantValue(value) {
        DoskeyCli.invariantEmpty(value, `value`);
    }
    static invariantEmpty(input, name) {
        invariant(input, `${name} cannot be empty`);
    }
    constructor() {
        Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach((key) => {
            if (key.startsWith(`on`)) {
                this[key] = this[key].bind(this);
            }
        });
    }
    onList() {
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
    onAdd(key, value, disable = false) {
        index_3.default.debug(value);
        DoskeyCli.invariantKey(key);
        DoskeyCli.invariantValue(value);
        disable = !!(util_1.isString(disable) && disable.trim() === 'true');
        value = value.trim();
        if (value.indexOf(' ')) {
            if (value.endsWith(' $*')) {
                value = value.slice(value.length - 3);
            }
            value = `"${value}" $*`;
        }
        const doskeys = this.geAllDosKeys();
        if (doskeys.hasOwnProperty(key)) {
            index_3.default.info(`Found ${key}. This action will overwrite the value`);
        }
        const newDoskey = {
            value,
            disable
        };
        index_1.default.getInstance().add({
            [key.trim()]: newDoskey
        });
        index_3.default.info(`Add complete`);
        this.onList();
    }
    onEdit() {
        return __awaiter(this, void 0, void 0, function* () {
            const doskeys = this.geAllDosKeys();
            const doskeysList = Object.keys(doskeys);
            const choices = doskeysList.map((key) => {
                const doskey = doskeys[key];
                return {
                    name: `${key}=${doskey.value}`,
                    value: key,
                    checked: !doskey.disable
                };
            });
            const { cmdKeyList } = yield inquirer.prompt([
                {
                    type: 'checkbox',
                    name: 'cmdKeyList',
                    message: 'update doskeys: ',
                    choices
                }
            ]);
            const { newDoskeys } = doskeysList.reduce(({ cmdKeyList, newDoskeys }, key) => {
                const filterList = cmdKeyList.filter((newKey) => newKey !== key);
                const hasFound = cmdKeyList.length !== filterList.length;
                if (hasFound) {
                    cmdKeyList = filterList;
                }
                newDoskeys[key].disable = !hasFound;
                return { cmdKeyList, newDoskeys };
            }, { cmdKeyList, newDoskeys: Object.assign({}, doskeys) });
            index_1.default.getInstance().set(newDoskeys);
            index_3.default.info(`Edit complete`);
            this.onList();
        });
    }
    onDel(key) {
        const doskeys = this.geAllDosKeys();
        if (!doskeys.hasOwnProperty(key)) {
            return;
        }
        index_1.default.getInstance().del(key);
        index_3.default.info(`Delete complete`);
        this.onList();
    }
    onOpen() {
        open(index_2.DOSKEYS_PATH);
    }
    onActivate() {
        return __awaiter(this, void 0, void 0, function* () {
            const doskeys = index_1.default.getInstance().get();
            const scripts = Object.keys(doskeys).reduce((result, key) => {
                const { value, disable } = doskeys[key];
                if (!disable) {
                    result.push(`echo doskey ${key}=${value}`);
                }
                return result;
            }, []).join(os_1.EOL);
            yield doskey_utils_1.default.rewriteDoskeyBatchProcess(index_2.EXEC_BATCH_SCRIPT_PATH, scripts);
            /**
             * TODO: double check this
             */
            require('child_process').exec(`cmd /c "${index_2.EXEC_BATCH_SCRIPT_PATH}"`, (err) => {
                if (err) {
                    index_3.default.error(err);
                }
                index_3.default.info(`Activate complete`);
                this.onList();
            });
        });
    }
    displayCurrentStatus() {
        throw new Error('no implementation');
    }
    print(infoList) {
        infoList.forEach((info) => index_3.default.log(info));
    }
    geAllDosKeys() {
        return index_1.default.getInstance().get();
    }
    hyphen(str, len) {
        const hyphen = new Array(Math.max(1, len - str.length)).join('-');
        return ` ${hyphen} `;
    }
}
const doskeyCli = new DoskeyCli();
exports.default = doskeyCli;
//# sourceMappingURL=index.js.map