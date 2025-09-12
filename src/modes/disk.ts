import { concatBytes, xor } from "@li0ard/gost3413/dist/utils";
import { Belt, decryptWBL, encryptWBL } from "../index";
import { mulC } from "../utils";

/**
 * Encrypts data using the Blockwise disk encryption (BDE) mode
 * @param key Encryption key
 * @param data Data to be encrypted
 * @param iv Initialization vector
 */
export const encryptBDE = (key: Uint8Array, data: Uint8Array, iv: Uint8Array): Uint8Array => {
    const cipher = new Belt(key);
    const eS = cipher.encrypt(iv);
    let s = new Uint8Array(eS);
    let s32 = new Uint32Array(s.buffer, s.byteOffset);

    const result: Uint8Array[] = []
    for(let i = 0; i < data.length; i += 16) {
        mulC(s32);
        result.push(xor(cipher.encrypt(xor(data.slice(i, i + 16), s)), s));
    }

    return concatBytes(...result);
}

/**
 * Decrypts data using the Blockwise disk encryption (BDE) mode
 * @param key Encryption key
 * @param data Data to be decrypted
 * @param iv Initialization vector
 */
export const decryptBDE = (key: Uint8Array, data: Uint8Array, iv: Uint8Array): Uint8Array => {
    const cipher = new Belt(key);
    const eS = cipher.encrypt(iv);
    let s = new Uint8Array(eS);
    let s32 = new Uint32Array(s.buffer, s.byteOffset);

    const result: Uint8Array[] = []
    for(let i = 0; i < data.length; i += 16) {
        mulC(s32);
        result.push(xor(cipher.decrypt(xor(data.slice(i, i + 16), s)), s));
    }

    return concatBytes(...result);
}

/**
 * Encrypts data using the Sectorwise disk encryption (SDE) mode
 * @param key Encryption key
 * @param data Data to be encrypted
 * @param iv Initialization vector
 */
export const encryptSDE = (key: Uint8Array, data: Uint8Array, iv: Uint8Array): Uint8Array => {
    const cipher = new Belt(key);
    const s = cipher.encrypt(iv);
    
    const result = new Uint8Array(data);
    result.set(xor(result, s));
    
    const encrypted = encryptWBL(key, result);
    encrypted.set(xor(encrypted, s));
    
    return encrypted;
}

/**
 * Decrypts data using the Sectorwise disk encryption (SDE) mode
 * @param key Encryption key
 * @param data Data to be decrypted
 * @param iv Initialization vector
 */
export const decryptSDE = (key: Uint8Array, data: Uint8Array, iv: Uint8Array): Uint8Array => {
    const cipher = new Belt(key);
    const s = cipher.encrypt(iv);
    
    const result = new Uint8Array(data);
    result.set(xor(result, s));
    
    const encrypted = decryptWBL(key, result);
    encrypted.set(xor(encrypted, s));
    
    return encrypted;
}