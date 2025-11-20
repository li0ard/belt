import { xor } from "@li0ard/gost3413/dist/utils.js";
import { Belt } from "../index.js";
import { BLOCK_SIZE } from "../const.js";

const phi1 = (u: Uint8Array): Uint8Array => {
    const result = new Uint8Array(BLOCK_SIZE);

    result.set(u.subarray(4, 8), 0);
    result.set(u.subarray(8, 12), 4);
    result.set(u.subarray(12, 16), 8);

    for (let i = 0; i < 4; i++) result[12 + i] = u[i] ^ u[4 + i];

    return result;
}

const phi2 = (u: Uint8Array): Uint8Array => {
    const result = new Uint8Array(BLOCK_SIZE);
    for (let i = 0; i < 4; i++) result[i] = u[i] ^ u[12 + i];

    result.set(u.subarray(0, 4), 4);
    result.set(u.subarray(4, 8), 8);
    result.set(u.subarray(8, 12), 12);

    return result;
}

const psi = (u: Uint8Array): Uint8Array => {
    const result = new Uint8Array(BLOCK_SIZE);
    result.set(u);
    result[u.length] = 0x80;

    return result;
}

/**
 * Compute MAC
 * @param key Encryption key
 * @param data Data to be authenticated
 * @param length MAC length
 */
export const mac = (key: Uint8Array, data: Uint8Array, length: number = 8): Uint8Array => {
    if(length > 8 || length <= 0) throw new Error("MAC length must be between 1 and 8 bytes (64 bits)");
    let s: Uint8Array = new Uint8Array(BLOCK_SIZE);
    const cipher = new Belt(key);
    const r = cipher.encrypt(s);

    const fullBlocks = Math.floor(data.length / cipher.blockLen);
    const hasPartialBlock = (data.length % cipher.blockLen) > 0;

    for (let i = 0; i < fullBlocks; i++) {
        const block = data.subarray(i * cipher.blockLen, (i + 1) * cipher.blockLen);
        if (i < fullBlocks - 1 || hasPartialBlock) s = cipher.encrypt(xor(s, block));
    }

    if (hasPartialBlock) s = xor(xor(s, psi(data.subarray(fullBlocks * cipher.blockLen))), phi2(r));
    else if (fullBlocks > 0) {
        const lastBlock = data.subarray((fullBlocks - 1) * cipher.blockLen, fullBlocks * cipher.blockLen);

        if (fullBlocks === 1) s = xor(xor(s, lastBlock), phi1(r));
        else s = xor(xor(s, lastBlock), phi1(r));
    }
    else s = xor(xor(s, psi(new Uint8Array(0))), phi2(r));

    return cipher.encrypt(s).slice(0, length);
}