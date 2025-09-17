import { describe, test, expect } from "bun:test";
import { decryptBDE, decryptSDE, encryptBDE, encryptSDE } from "../src";
import { hexToBytes } from "@li0ard/gost3413/dist/utils";

describe("BDE", () => {
    test("#1", () => {
        const key = hexToBytes("E9DEE72C8F0C0FA62DDB49F46F73964706075316ED247A3739CBA38303A98BF6");
        const iv = hexToBytes("BE32971343FC9A48A02A885F194B09A1");
        const pt = hexToBytes("B194BAC80A08F53B366D008E584A5DE48504FA9D1BB6C7AC252E72C202FDCE0D5BE3D61217B96181FE6786AD716B890B");
        const ct = hexToBytes("E9CAB32D879CC50C10378EB07C10F26307257E2DBE2B854CBC9F38282D59D6A77F952001C5D1244F53210A27C216D4BB");

        expect(encryptBDE(key, pt, iv)).toStrictEqual(ct);
        expect(decryptBDE(key, ct, iv)).toStrictEqual(pt);
    })

    test("#2", () => {
        const key = hexToBytes("92BD9B1CE5D141015445FBC95E4D0EF2682080AA227D642F2687F93490405511");
        const iv = hexToBytes("7ECDA4D01544AF8CA58450BF66D2E88A");
        const pt = hexToBytes("7041BC226352C706D00EA8EF23CFE46AFAE118577D037FACDC36E4ECC1F6574609F236943FB809E1BEE4A1C686C13ACC");
        const ct = hexToBytes("E12BDC1AE28257EC703FCCF095EE8DF1C1AB76389FE678CAF7C6F860D5BB9C4FF33C657B637C306ADD4EA7799EB23D31");

        expect(encryptBDE(key, pt, iv)).toStrictEqual(ct);
        expect(decryptBDE(key, ct, iv)).toStrictEqual(pt);
    })
})

describe("SDE", () => {
    test("#1", () => {
        const key = hexToBytes("E9DEE72C8F0C0FA62DDB49F46F73964706075316ED247A3739CBA38303A98BF6");
        const iv = hexToBytes("BE32971343FC9A48A02A885F194B09A1");
        const pt = hexToBytes("B194BAC80A08F53B366D008E584A5DE48504FA9D1BB6C7AC252E72C202FDCE0D5BE3D61217B96181FE6786AD716B890B");
        const ct = hexToBytes("1FCBB01852003D60B66024C508608BAA2C21AF1E884CF31154D3077D4643CF2249EB2F5A68E4BA019D90211A81D690D9");

        expect(encryptSDE(key, pt, iv)).toStrictEqual(ct);
        expect(decryptSDE(key, ct, iv)).toStrictEqual(pt);
    })

    test("#2", () => {
        const key = hexToBytes("92BD9B1CE5D141015445FBC95E4D0EF2682080AA227D642F2687F93490405511");
        const iv = hexToBytes("7ECDA4D01544AF8CA58450BF66D2E88A");
        const pt = hexToBytes("E9FDF3F788657332E6C46FCF5251B8A6D43543A93E3233837DB1571183A6EF4D7FEB5CDF999E1A3F51A5A3381BEB7FA5");
        const ct = hexToBytes("E12BDC1AE28257EC703FCCF095EE8DF1C1AB76389FE678CAF7C6F860D5BB9C4FF33C657B637C306ADD4EA7799EB23D31");

        expect(encryptSDE(key, pt, iv)).toStrictEqual(ct);
        expect(decryptSDE(key, ct, iv)).toStrictEqual(pt);
    })
})