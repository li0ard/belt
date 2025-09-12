import { ecb_encrypt, ecb_decrypt } from "@li0ard/gost3413";
import { Belt } from "../index";

/**
 * Encrypts data using Electronic Codebook (ECB) mode
 * @param key Encryption key
 * @param data Data to be encrypted
 */
export const encryptECB = (key: Uint8Array, data: Uint8Array): Uint8Array => {
    const cipher = new Belt(key);
    const encrypter = (buf: Uint8Array) => (cipher.encrypt(buf));

    return ecb_encrypt(encrypter, cipher.blockLen, data);
}

/**
 * Decrypts data using Electronic Codebook (ECB) mode
 * @param key Encryption key
 * @param data Data to be decrypted
 */
export const decryptECB = (key: Uint8Array, data: Uint8Array): Uint8Array => {
    const cipher = new Belt(key);
    const decrypter = (buf: Uint8Array) => (cipher.decrypt(buf));

    return ecb_decrypt(decrypter, cipher.blockLen, data);
}