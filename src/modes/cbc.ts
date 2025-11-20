import { cbc_encrypt, cbc_decrypt } from "@li0ard/gost3413";
import { Belt } from "../index.js";

/**
 * Encrypts data using the Cipher Block Chaining (CBC) mode
 * @param key Encryption key
 * @param data Data to be encrypted
 * @param iv Initialization vector
 */
export const encryptCBC = (key: Uint8Array, data: Uint8Array, iv: Uint8Array): Uint8Array => {
    const cipher = new Belt(key);
    return cbc_encrypt(cipher.encrypt.bind(cipher), cipher.blockLen, data, iv);
}

/**
 * Decrypts data using the Cipher Block Chaining (CBC) mode
 * @param key Encryption key
 * @param data Data to be decrypted
 * @param iv Initialization vector
 */
export const decryptCBC = (key: Uint8Array, data: Uint8Array, iv: Uint8Array): Uint8Array => {
    const cipher = new Belt(key);
    return cbc_decrypt(cipher.decrypt.bind(cipher), cipher.blockLen, data, iv);
}