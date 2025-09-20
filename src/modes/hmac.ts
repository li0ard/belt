import { _HMAC } from "@noble/hashes/hmac";
import { createHasher, type Hash } from "@noble/hashes/utils";
import { BeltHash } from "../index";

/**
 * HMAC implementation for BelT hash
 * @param key Encryption key
 */
export const BeltHMAC = (key: Uint8Array): _HMAC<Hash<BeltHash>> => new _HMAC(createHasher(BeltHash.create), key);