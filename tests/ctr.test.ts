import { describe, test, expect } from "bun:test";
import { ctr } from "../src";
import { hexToBytes } from "@li0ard/gost3413/dist/utils";

describe("CTR", () => {
    test("#1", () => {
        const key = hexToBytes("E9DEE72C8F0C0FA62DDB49F46F73964706075316ED247A3739CBA38303A98BF6");
        const iv = hexToBytes("BE32971343FC9A48A02A885F194B09A1");
        const pt = hexToBytes("B194BAC80A08F53B366D008E584A5DE48504FA9D1BB6C7AC252E72C202FDCE0D5BE3D61217B96181FE6786AD716B890B");
        const ct = hexToBytes("52C9AF96FF50F64435FC43DEF56BD797D5B5B1FF79FB41257AB9CDF6E63E81F8F00341473EAE409833622DE05213773A");

        expect(ctr(key, pt, iv)).toStrictEqual(ct);
        expect(ctr(key, ct, iv)).toStrictEqual(pt);
    })

    test("#2", () => {
        const key = hexToBytes("92BD9B1CE5D141015445FBC95E4D0EF2682080AA227D642F2687F93490405511");
        const iv = hexToBytes("7ECDA4D01544AF8CA58450BF66D2E88A");
        const pt = hexToBytes("E12BDC1AE28257EC703FCCF095EE8DF1C1AB76389FE678CAF7C6F860D5BB9C4FF33C657B637C306ADD4EA779");
        const ct = hexToBytes("DF181ED008A20F43DCBBB93650DAD34B389CDEE5826D40E2D4BD80F49A93F5D212F6333166456F169043CC5F");

        expect(ctr(key, pt, iv)).toStrictEqual(ct);
        expect(ctr(key, ct, iv)).toStrictEqual(pt);
    })
})