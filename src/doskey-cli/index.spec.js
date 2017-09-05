"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const index_2 = require("../doskey/index");
const chai_1 = require("chai");
describe('doskey-cli', () => {
    it('onList', () => {
        index_1.default.onList();
    });
    it('onAdd', () => {
        index_1.default.onAdd('ws', 'webstorm');
        chai_1.expect(index_2.default.getInstance().get().ws.value).to.be.equal('webstorm');
        index_1.default.onList();
    });
    it('onDel', () => {
        index_1.default.onAdd('ws', 'webstorm');
        chai_1.expect(index_2.default.getInstance().get().ws.value).to.be.equal('webstorm');
        index_1.default.onDel('ws');
        chai_1.expect(index_2.default.getInstance().get().ws).to.be.equal(undefined);
        index_1.default.onList();
    });
    it('onEdit', () => {
        return index_1.default.onEdit();
    });
});
//# sourceMappingURL=index.spec.js.map