import { ecb_encrypt, ecb_decrypt } from "@li0ard/gost3413";
import { Belt } from "../index.js";

/**
 * Encrypts data using Electronic Codebook (ECB) mode
 * @param key Encryption key
 * @param data Data to be encrypted
 */
export const encryptECB = (key: Uint8Array, data: Uint8Array): Uint8Array => {
    const cipher = new Belt(key);
    return ecb_encrypt(cipher.encrypt.bind(cipher), cipher.blockLen, data);
}

/**
 * Decrypts data using Electronic Codebook (ECB) mode
 * @param key Encryption key
 * @param data Data to be decrypted
 */
export const decryptECB = (key: Uint8Array, data: Uint8Array): Uint8Array => {
    const cipher = new Belt(key);
    return ecb_decrypt(cipher.decrypt.bind(cipher), cipher.blockLen, data);
}