import { describe, test, expect } from "bun:test";
import { decryptCFB, encryptCFB } from "../src";
import { hexToBytes } from "@li0ard/gost3413/dist/utils";

describe("CFB", () => {
    test("#1", () => {
        const key = hexToBytes("E9DEE72C8F0C0FA62DDB49F46F73964706075316ED247A3739CBA38303A98BF6");
        const iv = hexToBytes("BE32971343FC9A48A02A885F194B09A1");
        const pt = hexToBytes("B194BAC80A08F53B366D008E584A5DE48504FA9D1BB6C7AC252E72C202FDCE0D5BE3D61217B96181FE6786AD716B890B");
        const ct = hexToBytes("C31E490A90EFA374626CC99E4B7B8540A6E48685464A5A06849C9CA769A1B0AE55C2CC5939303EC832DD2FE16C8E5A1B");
    
        expect(encryptCFB(key, pt, iv)).toStrictEqual(ct);
        expect(decryptCFB(key, ct, iv)).toStrictEqual(pt);
    })

    test("#2", () => {
        const key = hexToBytes("92BD9B1CE5D141015445FBC95E4D0EF2682080AA227D642F2687F93490405511");
        const iv = hexToBytes("7ECDA4D01544AF8CA58450BF66D2E88A");
        const pt = hexToBytes("FA9D107A86F375EE65CD1DB881224BD016AFF814938ED39B3361ABB0BF0851B652244EB06842DD4C94AA4500774E40BB");
        const ct = hexToBytes("E12BDC1AE28257EC703FCCF095EE8DF1C1AB76389FE678CAF7C6F860D5BB9C4FF33C657B637C306ADD4EA7799EB23D31");
    
        expect(encryptCFB(key, pt, iv)).toStrictEqual(ct);
        expect(decryptCFB(key, ct, iv)).toStrictEqual(pt);
    })
})