import { concatBytes, xor } from "@li0ard/gost3413/dist/utils.js";
import { Belt } from "../index.js";
import { getPadLength } from "@li0ard/gost3413";

/**
 * Encrypts data using the Cipher Feedback (CFB) mode
 * @param key Encryption key
 * @param data Data to be encrypted
 * @param iv Initialization vector
 */
export const encryptCFB = (key: Uint8Array, data: Uint8Array, iv: Uint8Array): Uint8Array => {
    const cipher = new Belt(key);
    if (iv.length == 0 || iv.length % cipher.blockLen !== 0) throw new Error("Invalid IV size");

    let r: Uint8Array[] = [];
    for (let i = 0; i < iv.length; i += cipher.blockLen) r.push(iv.slice(i, i + cipher.blockLen));

    const result: Uint8Array[] = [];
    for(let i = 0; i < (data.length + getPadLength(data.length, cipher.blockLen)); i += cipher.blockLen) {
        result.push(xor(cipher.encrypt(r[0]), data.slice(i, i + cipher.blockLen)));
        r = r.slice(1).concat([result[result.length - 1]]);
    }

    return concatBytes(...result);
}

/**
 * Decrypts data using the Cipher Feedback (CFB) mode
 * @param key Encryption key
 * @param data Data to be decrypted
 * @param iv Initialization vector
 */
export const decryptCFB = (key: Uint8Array, data: Uint8Array, iv: Uint8Array): Uint8Array => {
    const cipher = new Belt(key);
    if (iv.length == 0 || iv.length % cipher.blockLen !== 0) throw new Error("Invalid IV size");

    let r: Uint8Array[] = [];
    for (let i = 0; i < iv.length; i += cipher.blockLen) r.push(iv.slice(i, i + cipher.blockLen));

    const result: Uint8Array[] = [];
    for (let i = 0; i < data.length; i += cipher.blockLen) {
        const encryptedBlock = data.slice(i, i + cipher.blockLen);
        result.push(xor(cipher.encrypt(r[0]), encryptedBlock));
        r = r.slice(1).concat([encryptedBlock]);
    }

    return concatBytes(...result);
}