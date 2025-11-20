import { bytesToHex, hexToNumber, numberToBytesBE } from "@li0ard/gost3413/dist/utils.js";

export const bytesToNumberLE = (bytes: Uint8Array): bigint => hexToNumber(bytesToHex(bytes.slice().reverse()));
export const numberToBytesLE = (n: bigint | number, len: number): Uint8Array => numberToBytesBE(n, len).reverse();

export const equalBytes = (a: Uint8Array, b: Uint8Array): boolean => {
    if (a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
    return diff === 0;
}

export const incrementCounterAt = (ctr: Uint8Array, pos: number) => {
    let j = pos;
    while (j < ctr.length) if (++ctr[j++] != 0) break;
}

export const mulC = (block: Uint32Array) => {
    const msb = block[3] >>> 31;
    const t = (~((msb - 1) >>> 0) & 0x00000087) >>> 0;
    
    block[3] = ((block[3] << 1) ^ (block[2] >>> 31)) >>> 0;
    block[2] = ((block[2] << 1) ^ (block[1] >>> 31)) >>> 0;
    block[1] = ((block[1] << 1) ^ (block[0] >>> 31)) >>> 0;
    block[0] = ((block[0] << 1) ^ t) >>> 0;
}

export const gf2mMul = (a: Uint8Array, b: Uint8Array): Uint8Array => {
    const blockSize = 16;
    let temp = new Uint8Array(a);
    let result = new Uint8Array(blockSize);
    
    let reductionBytes = [0x87];
    
    for (let i = 0; i < blockSize * 8; i++) {
        const byteIndex = Math.floor(i / 8);
        const bitIndex = i % 8;
        if (byteIndex < b.length && (b[byteIndex] & (1 << bitIndex))) for (let j = 0; j < blockSize; j++) result[j] ^= temp[j];
      
        let carry = 0;
        for (let j = 0; j < blockSize; j++) {
            const nextCarry = (temp[j] & 0x80) ? 1 : 0;
            temp[j] = ((temp[j] << 1) & 0xFF) | carry;
            carry = nextCarry;
        }
      
        if (carry) {
            for (let j = 0; j < reductionBytes.length; j++) if (j < blockSize) temp[j] ^= reductionBytes[j];
        }
    }
    
    return result;
}