import { concatBytes, xor } from "@li0ard/gost3413/dist/utils";
import { Belt } from "../index";

const notBlock = (block: Uint8Array): Uint8Array => {
    const result = new Uint8Array(block.length);
    for (let i = 0; i < block.length; i++) result[i] = ~block[i] & 0xFF;
    return result;
}

/**
 * Compress data
 * @param X Data to be compressed
 */
export const compress = (X: Uint8Array): Uint8Array[] => {
    if (X.length !== 64) throw new Error("Input must be exactly 64 bytes (512 bits) long");

    const X1 = X.subarray(0, 16);
    const X2 = X.subarray(16, 32);
    const X3 = X.subarray(32, 48);
    const X4 = X.subarray(48, 64);

    const temp = xor(X3, X4);
    const S = xor(new Belt(concatBytes(X1, X2)).encrypt(temp), temp);
    const Y1 = xor(new Belt(concatBytes(S, X4)).encrypt(X1), X1);
    const Y2 = xor(new Belt(concatBytes(notBlock(S), X3)).encrypt(X2), X2);

    return [S, concatBytes(Y1, Y2)];
}