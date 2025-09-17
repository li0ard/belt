import { describe, test, expect } from "bun:test";
import { decryptCHE, decryptDWP, encryptCHE, encryptDWP } from "../src";
import { hexToBytes } from "@li0ard/gost3413/dist/utils";

describe("DWP", () => {
    test("#1", () => {
        const key = hexToBytes("E9DEE72C8F0C0FA62DDB49F46F73964706075316ED247A3739CBA38303A98BF6");
        const iv = hexToBytes("BE32971343FC9A48A02A885F194B09A1");
        const pt = hexToBytes("B194BAC80A08F53B366D008E584A5DE4");
        const ad = hexToBytes("8504FA9D1BB6C7AC252E72C202FDCE0D5BE3D61217B96181FE6786AD716B890B");
        const ct = hexToBytes("52C9AF96FF50F64435FC43DEF56BD7973B2E0AEB2B91854B");

        expect(encryptDWP(key, pt, iv, ad)).toStrictEqual(ct);
        expect(decryptDWP(key, ct, iv, ad)).toStrictEqual(pt);
    })

    test("#2", () => {
        const key = hexToBytes("92BD9B1CE5D141015445FBC95E4D0EF2682080AA227D642F2687F93490405511");
        const iv = hexToBytes("7ECDA4D01544AF8CA58450BF66D2E88A");
        const pt = hexToBytes("DF181ED008A20F43DCBBB93650DAD34B");
        const ad = hexToBytes("C1AB76389FE678CAF7C6F860D5BB9C4FF33C657B637C306ADD4EA7799EB23D31");
        const ct = hexToBytes("E12BDC1AE28257EC703FCCF095EE8DF16A2C2C94C4150DC0");

        expect(encryptDWP(key, pt, iv, ad)).toStrictEqual(ct);
        expect(decryptDWP(key, ct, iv, ad)).toStrictEqual(pt);
    })
})

describe("CHE", () => {
    test("#1", () => {
        const key = hexToBytes("E9DEE72C8F0C0FA62DDB49F46F73964706075316ED247A3739CBA38303A98BF6");
        const iv = hexToBytes("BE32971343FC9A48A02A885F194B09A1");
        const pt = hexToBytes("B194BAC80A08F53B366D008E584A5D");
        const ad = hexToBytes("8504FA9D1BB6C7AC252E72C202FDCE0D5BE3D61217B96181FE6786AD716B890B");
        const ct = hexToBytes("BF3DAEAF5D18D2BCC30EA62D2E70A4548622B844123FF7");

        expect(encryptCHE(key, pt, iv, ad)).toStrictEqual(ct);
        expect(decryptCHE(key, ct, iv, ad)).toStrictEqual(pt);
    })

    test("#2", () => {
        const key = hexToBytes("92BD9B1CE5D141015445FBC95E4D0EF2682080AA227D642F2687F93490405511");
        const iv = hexToBytes("7ECDA4D01544AF8CA58450BF66D2E88A");
        const pt = hexToBytes("2BABF43EB37B5398A9068F31A3C758B762F44AA9");
        const ad = hexToBytes("C1AB76389FE678CAF7C6F860D5BB9C4FF33C657B637C306ADD4EA7799EB23D31");
        const ct = hexToBytes("E12BDC1AE28257EC703FCCF095EE8DF1C1AB76387D9D4F59D40D197D");

        expect(encryptCHE(key, pt, iv, ad)).toStrictEqual(ct);
        expect(decryptCHE(key, ct, iv, ad)).toStrictEqual(pt);
    })
})