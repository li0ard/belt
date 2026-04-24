import { ecb_encrypt, ecb_decrypt } from "@li0ard/gost3413";
import { Belt } from "../index.js";
import type { TArg, TRet } from "@noble/hashes/utils.js";

/**
 * Encrypts data using Electronic Codebook (ECB) mode
 * @param key Encryption key
 * @param data Data to be encrypted
 */
export const encryptECB = (key: TArg<Uint8Array>, data: TArg<Uint8Array>): TRet<Uint8Array> => {
    const cipher = new Belt(key);
    return ecb_encrypt(cipher.encrypt.bind(cipher), cipher.blockLen, data);
}

/**
 * Decrypts data using Electronic Codebook (ECB) mode
 * @param key Encryption key
 * @param data Data to be decrypted
 */
export const decryptECB = (key: TArg<Uint8Array>, data: TArg<Uint8Array>): TRet<Uint8Array> => {
    const cipher = new Belt(key);
    return ecb_decrypt(cipher.decrypt.bind(cipher), cipher.blockLen, data);
}