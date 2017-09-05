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
const fs = require("fs");
const path = require("path");
const index_1 = require("../constants/index");
class DoskeyUtils {
    // public static async createTmpFile
    // (settings = {prefix: 'doskey-tmp-', postfix: '.bat'}): Promise<SynchrounousResult> {
    //   return tmp.fileSync(settings);
    // }
    static rewriteDoskeyBatchProcess(abs, scripts) {
        return __awaiter(this, void 0, void 0, function* () {
            const doskeyBatchProcess = yield DoskeyUtils.getDoskeyBatchProcess(scripts);
            yield DoskeyUtils.writeFile(abs, doskeyBatchProcess);
        });
    }
    static getDoskeyBatchProcess(scripts) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawDoskeyBatchProcess = yield DoskeyUtils.getDoskeyBatchProcessTpl();
            return rawDoskeyBatchProcess.replace(`@@SCRIPTS@@`, scripts);
        });
    }
    static getDoskeyBatchConfigs() {
        const targetDoskeyConfigPath = path.join(__dirname, '../cmd-doskey.bat');
        return DoskeyUtils.readFile(targetDoskeyConfigPath);
    }
    static getDoskeyBatchProcessTpl() {
        return DoskeyUtils.readFile(index_1.EXEC_BATCH_SCRIPT_TPL_PATH);
    }
    static readFile(abs) {
        return new Promise((resolve, reject) => {
            fs.readFile(abs, (error, data) => {
                error ? reject(error) : resolve(data.toString());
            });
        });
    }
    static writeFile(abs, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(abs, data, (error) => {
                error ? reject(error) : resolve();
            });
        });
    }
}
exports.default = DoskeyUtils;
//# sourceMappingURL=doskey-utils.js.map