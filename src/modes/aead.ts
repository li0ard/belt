import { concatBytes, xor } from "@li0ard/gost3413/dist/utils.js";
import { BLOCK_SIZE, H } from "../const.js";
import { Belt, ctr } from "../index.js";
import { pad1 } from "@li0ard/gost3413";
import { equalBytes, numberToBytesLE, gf2mMul, mulC } from "../utils.js";

/**
 * Encrypts data using the Datawrap (DWP) mode
 * @param key Encryption key
 * @param data Data to be encrypted
 * @param iv Initialization vector
 * @param ad Data to be authenticated
 */
export const encryptDWP = (key: Uint8Array, data: Uint8Array, iv: Uint8Array, ad: Uint8Array): Uint8Array => {
    const cipher = new Belt(key);
    const r = cipher.encrypt(cipher.encrypt(iv));
    let t: Uint8Array = new Uint8Array(H.slice(0, BLOCK_SIZE));

    for (let i = 0; i < ad.length; i += BLOCK_SIZE) {
        const blockLen = Math.min(BLOCK_SIZE, ad.length - i);
        const Ii = ad.slice(i, i + blockLen);

        t = xor(t, pad1(Ii, BLOCK_SIZE));
        t = gf2mMul(t, r);
    }

    const Y = ctr(key, data, iv);
      
    for (let i = 0; i < Y.length; i += BLOCK_SIZE) {
        const blockLen = Math.min(BLOCK_SIZE, Y.length - i);
        const Yi = Y.slice(i, i + blockLen);

        t = xor(t, pad1(Yi, BLOCK_SIZE));
        t = gf2mMul(t, r);
    }

    const lenBlock = concatBytes(numberToBytesLE(ad.length * 8, 8), numberToBytesLE(data.length * 8, 8));

    t = xor(t, lenBlock);
    t = gf2mMul(t, r);
    t = cipher.encrypt(t).slice(0, 8);

    return concatBytes(Y, t);
}

/**
 * Decrypts data using the Datawrap (DWP) mode
 * @param key Encryption key
 * @param data Data to be decrypted
 * @param iv Initialization vector
 * @param ad Data to be authenticated
 */
export const decryptDWP = (key: Uint8Array, data: Uint8Array, iv: Uint8Array, ad: Uint8Array): Uint8Array => {
    const cipher = new Belt(key);
    const r = cipher.encrypt(cipher.encrypt(iv));
    let t: Uint8Array = new Uint8Array(H.slice(0, BLOCK_SIZE));

    for (let i = 0; i < ad.length; i += BLOCK_SIZE) {
        const blockLen = Math.min(BLOCK_SIZE, ad.length - i);
        const Ii = ad.slice(i, i + blockLen);

        t = xor(t, pad1(Ii, BLOCK_SIZE));
        t = gf2mMul(t, r);
    }

    const ct = data.slice(0, -8);
    const tC = data.slice(-8);
    const Y = ctr(key, ct, iv);

    for (let i = 0; i < ct.length; i += BLOCK_SIZE) {
        const blockLen = Math.min(BLOCK_SIZE, ct.length - i);
        const Yi = ct.slice(i, i + blockLen);
        
        t = xor(t, pad1(Yi, BLOCK_SIZE));
        t = gf2mMul(t, r);
    }

    const lenBlock = concatBytes(numberToBytesLE(ad.length * 8, 8), numberToBytesLE(ct.length * 8, 8));

    t = xor(t, lenBlock);
    t = gf2mMul(t, r);
    t = cipher.encrypt(t).slice(0, 8);
    if(!equalBytes(tC, t)) throw new Error("Incorrect MAC");

    return Y;
}

/** Modified CTR */
const ctr2 = (key: Uint8Array, data: Uint8Array, iv: Uint8Array): Uint8Array => {
    const cipher = new Belt(key);
    if (iv.length !== cipher.blockLen) throw new Error("Invalid IV size");

    const keystreamBlocks: Uint8Array[] = [];
    const ctr = cipher.encrypt(iv);
    const ctr32 = new Uint32Array(ctr.buffer);

    for (let i = 0; i < Math.ceil(data.length / cipher.blockLen); i++) {
        // s ← (s*C) ^ 0x01
        mulC(ctr32);
        ctr[0] ^= 0x1;
        keystreamBlocks.push(cipher.encrypt(ctr));
    }

    return xor(concatBytes(...keystreamBlocks), data);
}

/**
 * Encrypts data using the Ctr-Hash-Encrypt (CHE) mode
 * @param key Encryption key
 * @param data Data to be encrypted
 * @param iv Initialization vector
 * @param ad Data to be authenticated
 */
export const encryptCHE = (key: Uint8Array, data: Uint8Array, iv: Uint8Array, ad: Uint8Array): Uint8Array => {
    const cipher = new Belt(key);
    const r = cipher.encrypt(iv);
    let t: Uint8Array = new Uint8Array(H.slice(0, BLOCK_SIZE));

    for (let i = 0; i < ad.length; i += BLOCK_SIZE) {
        const blockLen = Math.min(BLOCK_SIZE, ad.length - i);
        const Ii = ad.slice(i, i + blockLen);

        t = xor(t, pad1(Ii, BLOCK_SIZE));
        t = gf2mMul(t, r);
    }

    const Y = ctr2(key, data, iv);

    for (let i = 0; i < Y.length; i += BLOCK_SIZE) {
        const blockLen = Math.min(BLOCK_SIZE, Y.length - i);
        const Yi = Y.slice(i, i + blockLen);

        t = xor(t, pad1(Yi, BLOCK_SIZE));
        t = gf2mMul(t, r);
    }

    const lenBlock = concatBytes(numberToBytesLE(ad.length * 8, 8), numberToBytesLE(data.length * 8, 8));
    t = xor(t, lenBlock);
    t = gf2mMul(t, r);
    t = cipher.encrypt(t).slice(0, 8);

    return concatBytes(Y, t);
}

/**
 * Decrypts data using the Ctr-Hash-Encrypt (CHE) mode
 * @param key Encryption key
 * @param data Data to be decrypted
 * @param iv Initialization vector
 * @param ad Data to be authenticated
 */
export const decryptCHE = (key: Uint8Array, data: Uint8Array, iv: Uint8Array, ad: Uint8Array): Uint8Array => {
    const cipher = new Belt(key);
    const r = cipher.encrypt(iv);
    let t: Uint8Array = new Uint8Array(H.slice(0, BLOCK_SIZE));

    for (let i = 0; i < ad.length; i += BLOCK_SIZE) {
        const blockLen = Math.min(BLOCK_SIZE, ad.length - i);
        const Ii = ad.slice(i, i + blockLen);

        t = xor(t, pad1(Ii, BLOCK_SIZE));
        t = gf2mMul(t, r);
    }

    const ct = data.slice(0, -8);
    const tC = data.slice(-8);
    const Y = ctr2(key, ct, iv);

    for (let i = 0; i < ct.length; i += BLOCK_SIZE) {
        const blockLen = Math.min(BLOCK_SIZE, ct.length - i);
        const Yi = ct.slice(i, i + blockLen);

        t = xor(t, pad1(Yi, BLOCK_SIZE));
        t = gf2mMul(t, r);
    }

    const lenBlock = concatBytes(numberToBytesLE(ad.length * 8, 8), numberToBytesLE(ct.length * 8, 8));

    t = xor(t, lenBlock);
    t = gf2mMul(t, r);
    t = cipher.encrypt(t).slice(0, 8);
    if(!equalBytes(tC, t)) throw new Error("Incorrect MAC");

    return Y;
}