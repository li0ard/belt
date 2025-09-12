import { cbc_encrypt, cbc_decrypt } from "@li0ard/gost3413";
import { Belt } from "../index";

/**
 * Encrypts data using the Cipher Block Chaining (CBC) mode
 * @param key Encryption key
 * @param data Data to be encrypted
 * @param iv Initialization vector
 */
export const encryptCBC = (key: Uint8Array, data: Uint8Array, iv: Uint8Array): Uint8Array => {
    const cipher = new Belt(key);
    const encrypter = (buf: Uint8Array) => (cipher.encrypt(buf));
    
    return cbc_encrypt(encrypter, cipher.blockLen, data, iv);
}

/**
 * Decrypts data using the Cipher Block Chaining (CBC) mode
 * @param key Encryption key
 * @param data Data to be decrypted
 * @param iv Initialization vector
 */
export const decryptCBC = (key: Uint8Array, data: Uint8Array, iv: Uint8Array): Uint8Array => {
    const cipher = new Belt(key);
    const decrypter = (buf: Uint8Array) => (cipher.decrypt(buf));

    return cbc_decrypt(decrypter, cipher.blockLen, data, iv);
}