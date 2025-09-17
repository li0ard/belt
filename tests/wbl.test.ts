import { describe, test, expect } from "bun:test";
import { decryptWBL, encryptWBL } from "../src";
import { hexToBytes } from "@li0ard/gost3413/dist/utils";

describe("WBL", () => {
    test("#1", () => {
        const key = hexToBytes("E9DEE72C8F0C0FA62DDB49F46F73964706075316ED247A3739CBA38303A98BF6");
        const pt = hexToBytes("B194BAC80A08F53B366D008E584A5DE48504FA9D1BB6C7AC252E72C202FDCE0D5BE3D61217B96181FE6786AD716B890B");
        const ct = hexToBytes("49A38EE108D6C742E52B774F00A6EF98B106CBD13EA4FB0680323051BC04DF76E487B055C69BCF541176169F1DC9F6C8");
        expect(encryptWBL(key, pt)).toStrictEqual(ct);
        expect(decryptWBL(key, ct)).toStrictEqual(pt);
    })
    test("#2", () => {
        const key = hexToBytes("92BD9B1CE5D141015445FBC95E4D0EF2682080AA227D642F2687F93490405511");
        const pt = hexToBytes("92632EE0C21AD9E09A39343E5C07DAA4889B03F2E6847EB152EC99F7A4D9F154B5EF68D8E4A39E567153DE13D72254EE");
        const ct = hexToBytes("E12BDC1AE28257EC703FCCF095EE8DF1C1AB76389FE678CAF7C6F860D5BB9C4FF33C657B637C306ADD4EA7799EB23D31");
        expect(encryptWBL(key, pt)).toStrictEqual(ct);
        expect(decryptWBL(key, ct)).toStrictEqual(pt);
    })
})