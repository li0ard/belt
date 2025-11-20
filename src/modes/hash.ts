import { Belt } from "../index.js";
import { BLOCK_SIZE, H } from "../const.js";

/** BelT hash mode */
export class BeltHash {
    public readonly blockLen = 32;
    public readonly outputLen = 32;

    private lenState!: Uint8Array;
    private statePtr!: Uint8Array;
    private buffer!: Uint8Array;
    private h!: Uint8Array;
    private bufLen!: number;
    private lenView!: DataView;

    /** BelT hash mode */
    constructor() { this.reset(); }
    /** Create hash instance */
    public static create(): BeltHash { return new BeltHash(); }

    /** Reset hash instance */
    public reset() {
        this.lenState = new Uint8Array(32);
        let lenPtr = this.lenState.subarray(0, 16);
        this.statePtr = this.lenState.subarray(16, 32);
        this.lenView = new DataView(lenPtr.buffer, lenPtr.byteOffset, 16);
        this.buffer = new Uint8Array(this.outputLen);
        this.h = new Uint8Array(H.slice(0, 32));
        this.bufLen = 0;
    }
    /** Reset hash instance */
    public destroy() { this.reset(); }

    _cloneInto(to?: BeltHash): BeltHash {
        to ||= new BeltHash();

        to.lenState = new Uint8Array(this.lenState);
        const lenPtr = to.lenState.subarray(0, 16);
        to.statePtr = to.lenState.subarray(16, 32);
        to.lenView = new DataView(lenPtr.buffer, lenPtr.byteOffset, 16);
        to.buffer = new Uint8Array(this.buffer);
        to.h = new Uint8Array(this.h);
        to.bufLen = this.bufLen;

        return to;
    }
    /** Clone hash instance */
    public clone(): BeltHash { return this._cloneInto(); }

    private sigma1(u12: Uint8Array, u34: Uint8Array, result: Uint8Array): void {
        const u3u4 = new Uint8Array(this.blockLen);

        for (let i = 0; i < 8; i++) {
            u3u4[i] = u34[i] ^ u34[i + 16];
            u3u4[i + 8] = u34[i + 8] ^ u34[i + 24];
        }

        this.beltEncrypt(u12, u3u4, result);
        for (let i = 0; i < BLOCK_SIZE; i++) result[i] ^= u3u4[i];
    }

    private sigma1Xor(x: Uint8Array, h: Uint8Array, state: Uint8Array): void {
        const u3u4 = new Uint8Array(this.blockLen);
        const tmp = new Uint8Array(this.blockLen);

        for (let i = 0; i < 8; i++) {
            u3u4[i] = h[i] ^ h[i + 16];
            u3u4[i + 8] = h[i + 8] ^ h[i + 24];
        }

        this.beltEncrypt(x, u3u4, tmp);
        for (let i = 0; i < BLOCK_SIZE; i++) state[i] ^= tmp[i] ^ u3u4[i];
    }

    private sigma2(x: Uint8Array, h: Uint8Array, result: Uint8Array): void {
        const teta = new Uint8Array(this.blockLen);
        const savedH = new Uint8Array(h.subarray(0, 16));

        this.sigma1(x, h, teta);
        teta.set(h.subarray(16, 24), 16);
        teta.set(h.subarray(24, 32), 24);

        this.beltEncrypt(teta, x, result);
        for (let i = 0; i < BLOCK_SIZE; i++) result[i] ^= x[i];
        for (let i = 0; i < BLOCK_SIZE; i++) teta[i] ^= 0xFF;

        teta.set(savedH.subarray(0, 8), 16);
        teta.set(savedH.subarray(8, 16), 24);

        this.beltEncrypt(teta, x.subarray(BLOCK_SIZE), result.subarray(BLOCK_SIZE));
        for (let i = 0; i < BLOCK_SIZE; i++) result[i + 16] ^= x[i + 16];
    }

    private iteration(x: Uint8Array, h: Uint8Array, s: Uint8Array): void {
        this.sigma1Xor(x, h, s);
        this.sigma2(x, h, h);
    }

    private incrementLenBlock(): void {
        const low = this.lenView.getBigUint64(0, true);
        const high = this.lenView.getBigUint64(8, true);
        const blockBits = BigInt(this.outputLen * 8); // 256 bits
        const newLow = low + blockBits;

        if (newLow < low) this.lenView.setBigUint64(8, high + 1n, true);
        this.lenView.setBigUint64(0, newLow, true);
    }

    private incrementLenBytes(bytes: number): void {
        const low = this.lenView.getBigUint64(0, true);
        const high = this.lenView.getBigUint64(8, true);
        const bits = BigInt(bytes) * 8n;
        const newLow = low + bits;

        if (newLow < low) this.lenView.setBigUint64(8, high + 1n, true);
        this.lenView.setBigUint64(0, newLow, true);
    }

    private beltEncrypt(key: Uint8Array, data: Uint8Array, output: Uint8Array) {
        const alignedData = new Uint8Array(data.length);
        alignedData.set(data);
        output.set(new Belt(key).encrypt(alignedData));
    }

    /** Update hash buffer */
    update(data: Uint8Array): this {
        let offset = 0;
        const len = data.length;

        if (this.bufLen > 0) {
            const remaining = this.outputLen - this.bufLen;
            if (len < remaining) {
                this.buffer.set(data, this.bufLen);
                this.bufLen += len;
                return this;
            }

            this.buffer.set(data.subarray(0, remaining), this.bufLen);
            offset += remaining;
            this.incrementLenBlock();
            this.iteration(this.buffer, this.h, this.statePtr);
            this.bufLen = 0;
        }
        
        const fullBlocksEnd = len - (len % this.outputLen);
        while (offset < fullBlocksEnd) {
            this.incrementLenBlock();
            this.iteration(data.subarray(offset, offset + this.outputLen), this.h, this.statePtr);
            offset += this.outputLen;
        }

        if (offset < len) {
            const remainingBytes = len - offset;
            this.buffer.set(data.subarray(offset, offset + remainingBytes));
            this.bufLen = remainingBytes;
        }

        return this;
    }

    /**
     * Finalize hash computation and write result into Uint8Array
     * @param buf - Output Uint8Array
     */
    digestInto(buf: Uint8Array): Uint8Array {
        if (this.bufLen > 0) {
            this.buffer.fill(0, this.bufLen);
            this.iteration(this.buffer, this.h, this.statePtr);
            this.incrementLenBytes(this.bufLen);
        }

        const result = new Uint8Array(this.blockLen);
        this.sigma2(this.lenState, this.h, result);
        buf.set(result);
        
        return buf;
    }

    /** Finalize hash computation and return result as Uint8Array */
    public digest(): Uint8Array { return this.digestInto(new Uint8Array(this.outputLen)); }
}

/** Compute hash with BelT hash algorithm */
export const beltHash = (data: Uint8Array): Uint8Array => new BeltHash().update(data).digest();