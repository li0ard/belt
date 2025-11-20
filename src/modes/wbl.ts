import { BLOCK_SIZE } from "../const.js";
import { Belt } from "../index.js";
import { numberToBytesLE } from "../utils.js";

/**
 * Encrypts data using the Wide block (WBL) mode
 * @param key Encryption key
 * @param in_ Data to be encrypted
 */
export const encryptWBL = (key: Uint8Array, in_: Uint8Array): Uint8Array => {
    const cipher = new Belt(key);

    const data = new Uint8Array(in_);
    if (data.length < 2 * BLOCK_SIZE || data.length % BLOCK_SIZE !== 0) throw new Error("Data length must be >= 32 and multiple of 16");

    const n = data.length / BLOCK_SIZE;

    for (let round = 1; round <= 2 * n; round++) {
        const s = new Uint8Array(BLOCK_SIZE);
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < BLOCK_SIZE; j++) s[j] ^= data[i * BLOCK_SIZE + j];
        }
        data.set(data.subarray(BLOCK_SIZE), 0);
        data.set(s, (n - 1) * BLOCK_SIZE);

        const encryptedS = cipher.encrypt(s);
        const i128 = numberToBytesLE(round, BLOCK_SIZE);

        const block = new Uint8Array(BLOCK_SIZE);
        for (let j = 0; j < BLOCK_SIZE; j++) block[j] = encryptedS[j] ^ i128[j];
        for (let j = 0; j < BLOCK_SIZE; j++) data[(n - 2) * BLOCK_SIZE + j] ^= block[j];
    }

    return data;
}

/**
 * Decrypts data using the Wide block (WBL) mode
 * @param key Encryption key
 * @param in_ Data to be decrypted
 */
export const decryptWBL = (key: Uint8Array, in_: Uint8Array): Uint8Array => {
    const cipher = new Belt(key);

    const data = new Uint8Array(in_);
    if (data.length < 2 * BLOCK_SIZE || data.length % BLOCK_SIZE !== 0) throw new Error("Data length must be >= 32 and multiple of 16");

    const n = data.length / BLOCK_SIZE;

    for (let round = 2 * n; round >= 1; round--) {
        const s = new Uint8Array(data.subarray((n - 1) * BLOCK_SIZE, n * BLOCK_SIZE));
        data.set(data.subarray(0, (n - 1) * BLOCK_SIZE), BLOCK_SIZE);
        data.set(s, 0);

        const encryptedS = cipher.encrypt(s);
        const i128 = numberToBytesLE(round, BLOCK_SIZE);

        const block = new Uint8Array(BLOCK_SIZE);
        for (let j = 0; j < BLOCK_SIZE; j++) block[j] = encryptedS[j] ^ i128[j];
        for (let j = 0; j < BLOCK_SIZE; j++) data[(n - 1) * BLOCK_SIZE + j] ^= block[j];
        for (let i = 1; i < n - 1; i++) {
            for (let j = 0; j < BLOCK_SIZE; j++) data[j] ^= data[i * BLOCK_SIZE + j];
        }
    }

    return data;
}