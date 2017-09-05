"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../constants/index");
const fs = require("fs");
class Doskeys {
    static getInstance() {
        if (!Doskeys.instance) {
            Doskeys.instance = new Doskeys();
        }
        return Doskeys.instance;
    }
    static formatJSON(obj) {
        return JSON.stringify(obj, null, 2);
    }
    constructor() {
        this.doskeys = require(index_1.DOSKEYS_PATH);
    }
    get() {
        return require(index_1.DOSKEYS_PATH);
    }
    set(doskeys) {
        this.doskeys = doskeys;
        fs.writeFileSync(index_1.DOSKEYS_PATH, Doskeys.formatJSON(doskeys));
    }
    update(doskeys) {
        Object.assign(this.doskeys, doskeys);
        this.set(this.doskeys);
    }
    add(doskeys) {
        this.update(doskeys);
    }
    del(key) {
        delete this.doskeys[key];
        this.set(this.doskeys);
    }
}
exports.default = Doskeys;
//# sourceMappingURL=index.js.map