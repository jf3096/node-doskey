import doskeyCli from './index';
import Doskeys from '../doskey/index';
import {expect} from 'chai';

describe('doskey-cli', () => {
  it('onList', () => {
    doskeyCli.onList();
  });
  it('onAdd', () => {
    doskeyCli.onAdd('ws', 'webstorm');
    expect(Doskeys.getInstance().get().ws.value).to.be.equal('webstorm');
    doskeyCli.onList();
  });
  it('onDel', () => {
    doskeyCli.onAdd('ws', 'webstorm');
    expect(Doskeys.getInstance().get().ws.value).to.be.equal('webstorm');
    doskeyCli.onDel('ws');
    expect(Doskeys.getInstance().get().ws).to.be.equal(undefined);
    doskeyCli.onList();
  });
  it('onEdit', () => {
    return doskeyCli.onEdit();
  });
});
