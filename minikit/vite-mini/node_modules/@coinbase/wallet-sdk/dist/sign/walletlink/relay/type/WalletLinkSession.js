// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
import { sha256 } from '@noble/hashes/sha256';
import { bytesToHex } from '@noble/hashes/utils';
import { randomBytesHex } from '../../../../core/type/util.js';
const STORAGE_KEY_SESSION_ID = 'session:id';
const STORAGE_KEY_SESSION_SECRET = 'session:secret';
const STORAGE_KEY_SESSION_LINKED = 'session:linked';
export class WalletLinkSession {
    constructor(storage, id, secret, linked = false) {
        this.storage = storage;
        this.id = id;
        this.secret = secret;
        this.key = bytesToHex(sha256(`${id}, ${secret} WalletLink`));
        this._linked = !!linked;
    }
    static create(storage) {
        const id = randomBytesHex(16);
        const secret = randomBytesHex(32);
        return new WalletLinkSession(storage, id, secret).save();
    }
    static load(storage) {
        const id = storage.getItem(STORAGE_KEY_SESSION_ID);
        const linked = storage.getItem(STORAGE_KEY_SESSION_LINKED);
        const secret = storage.getItem(STORAGE_KEY_SESSION_SECRET);
        if (id && secret) {
            return new WalletLinkSession(storage, id, secret, linked === '1');
        }
        return null;
    }
    get linked() {
        return this._linked;
    }
    set linked(val) {
        this._linked = val;
        this.persistLinked();
    }
    save() {
        this.storage.setItem(STORAGE_KEY_SESSION_ID, this.id);
        this.storage.setItem(STORAGE_KEY_SESSION_SECRET, this.secret);
        this.persistLinked();
        return this;
    }
    persistLinked() {
        this.storage.setItem(STORAGE_KEY_SESSION_LINKED, this._linked ? '1' : '0');
    }
}
//# sourceMappingURL=WalletLinkSession.js.map