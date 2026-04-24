import { decryptWBL, encryptWBL } from "../index.js";
import { BLOCK_SIZE } from "../const.js";
import { concatBytes, type TArg, type TRet } from "@noble/hashes/utils.js";
import { equalBytes } from "@li0ard/gost3413";

/**
 * Wrap key using the Keywrap (KWP) mode
 * @param key Encryption key
 * @param data Key to be wrapped
 * @param iv Initialization vector
 */
export const wrapKey = (
    key: TArg<Uint8Array>,
    data: TArg<Uint8Array>,
    iv: TArg<Uint8Array>
): TRet<Uint8Array> => {
    if (iv.length !== BLOCK_SIZE) throw new Error("Invalid IV size");
    return encryptWBL(key, concatBytes(data, iv));
}

/**
 * Unwrap key using the Keywrap (KWP) mode
 * @param key Encryption key
 * @param data Key to be unwrapped
 * @param iv Initialization vector
 */
export const unwrapKey = (
    key: TArg<Uint8Array>,
    data: TArg<Uint8Array>,
    iv: TArg<Uint8Array>
): TRet<Uint8Array> => {
    const raw = decryptWBL(key, data)
    const unwrappedKey = raw.slice(0, -BLOCK_SIZE), ivC = raw.slice(-BLOCK_SIZE);
    if(!equalBytes(ivC, iv)) throw new Error("Bad data or IV");

    return unwrappedKey;
}