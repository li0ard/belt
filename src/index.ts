import { H, keyIndex } from "./const";

const RotHi = (x: number, r: number): number => (x << r) | (x >>> (32 - r));
const G = (x: number, r: number): number => RotHi((H[x & 0xff]) | (H[(x >>> 8) & 0xff] << 8) | (H[(x >>> 16) & 0xff] << 16) | (H[x >>> 24] << 24), r);

/** BelT core class */
export class Belt {
    public readonly blockLen = 16;
    private ks: Uint8Array;

    /**
     * BelT algorithm class
     * @param key Encryption key
     */
    constructor(key: Uint8Array) {
        this.ks = new Uint8Array(32);
        if(key.length == 16) {
            for(let i = 0; i<4; ++i) {
                this.ks[i] = key[i];
                this.ks[i+4] = key[i];
            }
        }
        else if(key.length == 24) {
            for(let i = 0; i<6; ++i) this.ks[i] = key[i];

            this.ks[6] = (key[0]) ^ (key[1]) ^ (key[2]);
            this.ks[7] = (key[3]) ^ (key[4]) ^ (key[5]);
        }
        else if(key.length == 32) {
            for(let i = 0; i<32; ++i) this.ks[i] = key[i];
        }
    }

    /** Encrypt block */
    encrypt(data: Uint8Array): Uint8Array {
        let inBlock = new Uint32Array(data.buffer, data.byteOffset);
        let a = inBlock[0];
        let b = inBlock[1];
        let c = inBlock[2];
        let d = inBlock[3];
        let e: number;

        let key = new Uint32Array(this.ks.buffer, this.ks.byteOffset);
        let outBlock = new Uint32Array(4);
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
        let inBlock = new Uint32Array(data.buffer, data.byteOffset);
        let a = inBlock[0];
        let b = inBlock[1];
        let c = inBlock[2];
        let d = inBlock[3];
        let e: number;

        let key = new Uint32Array(this.ks.buffer, this.ks.byteOffset);
        let outBlock = new Uint32Array(4);
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

export * from "./modes/aead";
export * from "./modes/cbc";
export * from "./modes/cfb";
export * from "./modes/compress";
export * from "./modes/ctr";
export * from "./modes/disk";
export * from "./modes/ecb";
export * from "./modes/hash";
export * from "./modes/kwp";
export * from "./modes/mac";
export * from "./modes/wbl";