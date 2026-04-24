import { _HMAC } from "@noble/hashes/hmac.js";
import { createHasher, type Hash, type TArg } from "@noble/hashes/utils.js";
import { BeltHash } from "../index.js";

/**
 * HMAC implementation for BelT hash
 * @param key Encryption key
 */
export const BeltHMAC = (key: TArg<Uint8Array>): _HMAC<Hash<BeltHash>> =>
    new _HMAC(createHasher(BeltHash.create), key);