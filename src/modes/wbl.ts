import { Belt } from "../index";

/**
 * Encrypts data using the Wide block (WBL) mode
 * @param key Encryption key
 * @param in_ Data to be encrypted
 */
export const encryptWBL = (key: Uint8Array, in_: Uint8Array): Uint8Array => {
    const cipher = new Belt(key);
    const blockSize = cipher.blockLen;
    
    let data = new Uint8Array(in_);
    if (data.length < 2 * blockSize || data.length % blockSize !== 0) throw new Error("Data length must be >= 32 and multiple of 16");
    
    const n = data.length / blockSize;

    for (let round = 1; round <= 2 * n; round++) {
        const s = new Uint8Array(blockSize);
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < blockSize; j++) s[j] ^= data[i * blockSize + j];
        }
        data.set(data.subarray(blockSize), 0);
        data.set(s, (n - 1) * blockSize);

        const encryptedS = cipher.encrypt(s);
        const i128 = new Uint8Array(blockSize);
        i128[0] = round & 0xff;
        i128[1] = (round >> 8) & 0xff;
        i128[2] = (round >> 16) & 0xff;
        i128[3] = (round >> 24) & 0xff;

        const block = new Uint8Array(blockSize);
        for (let j = 0; j < blockSize; j++) block[j] = encryptedS[j] ^ i128[j];

        const secondLastStart = (n - 2) * blockSize;
        for (let j = 0; j < blockSize; j++) data[secondLastStart + j] ^= block[j];
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
    const blockSize = cipher.blockLen;
    
    let data = new Uint8Array(in_);
    if (data.length < 2 * blockSize || data.length % blockSize !== 0) throw new Error("Data length must be >= 32 and multiple of 16");
    
    const n = data.length / blockSize;

    for (let round = 2 * n; round >= 1; round--) {
        const s = new Uint8Array(data.subarray((n - 1) * blockSize, n * blockSize));
        data.set(data.subarray(0, (n - 1) * blockSize), blockSize);
        data.set(s, 0);

        const encryptedS = cipher.encrypt(s);
        const i128 = new Uint8Array(blockSize);
        i128[0] = round & 0xff;
        i128[1] = (round >> 8) & 0xff;
        i128[2] = (round >> 16) & 0xff;
        i128[3] = (round >> 24) & 0xff;

        const block = new Uint8Array(blockSize);
        for (let j = 0; j < blockSize; j++) block[j] = encryptedS[j] ^ i128[j];
        for (let j = 0; j < blockSize; j++) data[(n - 1) * blockSize + j] ^= block[j];
        for (let i = 1; i < n - 1; i++) {
            for (let j = 0; j < blockSize; j++) data[j] ^= data[i * blockSize + j];
        }
    }

    return data;
}