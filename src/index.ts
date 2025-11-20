import { concatBytes } from "@li0ard/gost3413/dist/utils.js";
import { BLOCK_SIZE, H, keyIndex } from "./const.js";
import { compress } from "./modes/compress.js";

const RotHi = (x: number, r: number): number => (x << r) | (x >>> (32 - r));
const G = (x: number, r: number): number => RotHi((H[x & 0xff]) | (H[(x >>> 8) & 0xff] << 8) | (H[(x >>> 16) & 0xff] << 16) | (H[x >>> 24] << 24), r);

/**
 * Key expand algorithm
 * @param key Encryption key
 */
export const keyExpand = (key: Uint8Array): Uint8Array => {
    if(key.length < 16 || key.length > 32) throw new Error("Invalid key length");
    const ks = new Uint8Array(32);
    ks.set(key);
    if(key.length == 16) ks.set(key, 16);
    else if(key.length == 24) {
        for (let i = 0; i < 4; i++) ks[24 + i] = key[i] ^ key[i + 4] ^ key[i + 8];
        for (let i = 0; i < 4; i++) ks[28 + i] = key[i + 12] ^ key[i + 16] ^ key[i + 20];
    }
    
    return ks;
}

/**
 * Key transform algorithm
 * @param key Encryption key
 * @param level Key level
 * @param iv Initialization vector
 * @param outputLen Output length (16/24/32)
 */
export const keyTransform = (key: Uint8Array, level: Uint8Array, iv: Uint8Array, outputLen: number): Uint8Array => {
    if (outputLen > key.length || ![16, 24, 32].includes(outputLen) || ![16, 24, 32].includes(key.length)) throw new Error("Invalid key lengths: m must be <= n and both must be 16, 24, or 32");
    if (level.length !== 12) throw new Error("Level must be 12 bytes");
    if (iv.length !== 16) throw new Error("IV must be 16 bytes");
    const offset = 4 * (key.length - 16) + 2 * (outputLen - 16);

    return compress(concatBytes(H.subarray(offset, offset+4), level, iv, keyExpand(key)))[1].slice(0, outputLen);
}

/** BelT core class */
export class Belt {
    public readonly blockLen = BLOCK_SIZE;
    private ks: Uint8Array;

    /**
     * BelT algorithm class
     * @param key Encryption key
     */
    constructor(key: Uint8Array) { this.ks = keyExpand(key); }

    /** Encrypt block */
    encrypt(data: Uint8Array): Uint8Array {
        const inBlock = new Uint32Array(data.buffer, data.byteOffset);
        let a = inBlock[0];
        let b = inBlock[1];
        let c = inBlock[2];
        let d = inBlock[3];
        let e: number;
        const key = new Uint32Array(this.ks.buffer, this.ks.byteOffset);
        const outBlock = new Uint32Array(4);
        for(let i = 0; i<8; ++i) {
            b ^= G((a + key[keyIndex[i][0]]), 5) >>> 0;
            c ^= G((d + key[keyIndex[i][1]]), 21) >>> 0;
            a = (a - G((b + key[keyIndex[i][2]]), 13)) >>> 0;
            e = (G((b + c + key[keyIndex[i][3]]), 21) ^ (i + 1)) >>> 0;
            b += e;
            c = (c - e);
            d += G((c + key[keyIndex[i][4]]), 13) >>> 0;
            b ^= G((a + key[keyIndex[i][5]]), 21) >>> 0;
            c ^= G((d + key[keyIndex[i][6]]), 5) >>> 0;

            let tmp = a;
            a = b;
            b = tmp;

            tmp = c;
            c = d;
            d = tmp;
            
            tmp = b;
            b = c;
            c = tmp;
        }
        outBlock[0] = b;
        outBlock[1] = d;
        outBlock[2] = a;
        outBlock[3] = c;

        return new Uint8Array(outBlock.buffer, outBlock.byteOffset);
    }

    /** Decrypt block */
    decrypt(data: Uint8Array): Uint8Array {
        const inBlock = new Uint32Array(data.buffer, data.byteOffset);
        let a = inBlock[0];
        let b = inBlock[1];
        let c = inBlock[2];
        let d = inBlock[3];
        let e: number;
        const key = new Uint32Array(this.ks.buffer, this.ks.byteOffset);
        const outBlock = new Uint32Array(4);
        for(let i = 7; i >= 0; --i) {
            b ^= G((a + key[keyIndex[i][6]]), 5) >>> 0;
            c ^= G((d + key[keyIndex[i][5]]), 21) >>> 0;
            a = (a - G((b + key[keyIndex[i][4]]), 13)) >>> 0;
            e = (G((b + c + key[keyIndex[i][3]]), 21) ^ (i + 1)) >>> 0;
            b += e;
            c = (c - e);
            d += G((c + key[keyIndex[i][2]]), 13) >>> 0;
            b ^= G((a + key[keyIndex[i][1]]), 21) >>> 0;
            c ^= G((d + key[keyIndex[i][0]]), 5) >>> 0;

            let tmp = a;
            a = b;
            b = tmp;

            tmp = c;
            c = d;
            d = tmp;

            tmp = a;
            a = d;
            d = tmp;
        }

        outBlock[0] = c;
        outBlock[1] = a;
        outBlock[2] = d;
        outBlock[3] = b;

        return new Uint8Array(outBlock.buffer, outBlock.byteOffset);
    }
}

export * from "./modes/aead.js";
export * from "./modes/cbc.js";
export * from "./modes/cfb.js";
export * from "./modes/compress.js";
export * from "./modes/ctr.js";
export * from "./modes/disk.js";
export * from "./modes/ecb.js";
export * from "./modes/hash.js";
export * from "./modes/hmac.js";
export * from "./modes/kwp.js";
export * from "./modes/mac.js";
export * from "./modes/wbl.js";