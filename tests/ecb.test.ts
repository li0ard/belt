import { describe, test, expect } from "bun:test";
import { decryptECB, encryptECB } from "../src";
import { hexToBytes } from "@li0ard/gost3413/dist/utils";

describe("ECB", () => {
    test("#1", () => {
        const key = hexToBytes("E9DEE72C8F0C0FA62DDB49F46F73964706075316ED247A3739CBA38303A98BF6");
        const pt = hexToBytes("B194BAC80A08F53B366D008E584A5DE48504FA9D1BB6C7AC252E72C202FDCE0D5BE3D61217B96181FE6786AD716B890B");
        const ct = hexToBytes("69CCA1C93557C9E3D66BC3E0FA88FA6E5F23102EF109710775017F73806DA9DC46FB2ED2CE771F26DCB5E5D1569F9AB0");
    
        expect(encryptECB(key, pt)).toStrictEqual(ct);
        expect(decryptECB(key, ct)).toStrictEqual(pt);
    })
    test("#2", () => {
        const key = hexToBytes("92BD9B1CE5D141015445FBC95E4D0EF2682080AA227D642F2687F93490405511");
        const pt = hexToBytes("0DC5300600CAB840B38448E5E993F421E55A239F2AB5C5D5FDB6E81B40938E2A54120CA3E6E19C7AD750FC3531DAEAB7");
        const ct = hexToBytes("E12BDC1AE28257EC703FCCF095EE8DF1C1AB76389FE678CAF7C6F860D5BB9C4FF33C657B637C306ADD4EA7799EB23D31");
    
        expect(encryptECB(key, pt)).toStrictEqual(ct);
        expect(decryptECB(key, ct)).toStrictEqual(pt);
    })
})