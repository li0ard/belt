import { concatBytes } from "@li0ard/gost3413/dist/utils";
import { decryptWBL, encryptWBL } from "../index";
import { equalBytes } from "../utils";

/**
 * Wrap key using the Keywrap (KWP) mode
 * @param key Encryption key
 * @param data Key to be wrapped
 * @param iv Initialization vector
 */
export const wrapKey = (key: Uint8Array, data: Uint8Array, iv: Uint8Array): Uint8Array => {
    if (iv.length !== 16) throw new Error("Invalid IV size");
    return encryptWBL(key, concatBytes(data, iv));
}

/**
 * Unwrap key using the Keywrap (KWP) mode
 * @param key Encryption key
 * @param data Key to be unwrapped
 * @param iv Initialization vector
 */
export const unwrapKey = (key: Uint8Array, data: Uint8Array, iv: Uint8Array): Uint8Array => {
    let raw = decryptWBL(key, data)
    let unwrappedKey = raw.slice(0, -16), ivC = raw.slice(-16);
    if(!equalBytes(ivC, iv)) throw new Error("Bad data or IV");

    return unwrappedKey
}