import { xor } from "@li0ard/gost3413";
import { Belt } from "../index.js";
import { incrementCounterAt } from "../utils.js";
import { concatBytes, type TArg, type TRet } from "@noble/hashes/utils.js";

/**
 * Proceed data using the Counter (CTR) mode
 * @param key Encryption key
 * @param data Data to be encrypted/decrypted
 * @param iv Initialization vector
 */
export const ctr = (key: TArg<Uint8Array>, data: TArg<Uint8Array>, iv: TArg<Uint8Array>): TRet<Uint8Array> => {
    const cipher = new Belt(key);
    if (iv.length !== cipher.blockLen) throw new Error("Invalid IV size");

    const keystreamBlocks: Uint8Array[] = [];
    const ctr = cipher.encrypt(iv);

    for (let i = 0; i < Math.ceil(data.length / cipher.blockLen); i++) {
        incrementCounterAt(ctr, 0);
        keystreamBlocks.push(cipher.encrypt(ctr));
    }

    return xor(concatBytes(...keystreamBlocks), data);
}