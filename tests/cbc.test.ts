import { describe, test, expect } from "bun:test";
import { decryptCBC, encryptCBC } from "../src";
import { hexToBytes } from "@li0ard/gost3413/dist/utils";

describe("CBC", () => {
    test("#1", () => {
        const key = hexToBytes("E9DEE72C8F0C0FA62DDB49F46F73964706075316ED247A3739CBA38303A98BF6");
        const iv = hexToBytes("BE32971343FC9A48A02A885F194B09A1");
        const pt = hexToBytes("B194BAC80A08F53B366D008E584A5DE48504FA9D1BB6C7AC252E72C202FDCE0D5BE3D61217B96181FE6786AD716B890B");
        const ct = hexToBytes("10116EFAE6AD58EE14852E11DA1B8A745CF2480E8D03F1C19492E53ED3A70F60657C1EE8C0E0AE5B58388BF8A68E3309");
    
        expect(encryptCBC(key, pt, iv)).toStrictEqual(ct);
        expect(decryptCBC(key, ct, iv)).toStrictEqual(pt);
    })

    test("#2", () => {
        const key = hexToBytes("92BD9B1CE5D141015445FBC95E4D0EF2682080AA227D642F2687F93490405511");
        const iv = hexToBytes("7ECDA4D01544AF8CA58450BF66D2E88A");
        const pt = hexToBytes("730894D6158E17CC1600185A8F411CAB0471FF85C83792398D8924EBD57D03DB95B97A9B7907E4B020960455E46176F8");
        const ct = hexToBytes("E12BDC1AE28257EC703FCCF095EE8DF1C1AB76389FE678CAF7C6F860D5BB9C4FF33C657B637C306ADD4EA7799EB23D31");
    
        expect(encryptCBC(key, pt, iv)).toStrictEqual(ct);
        expect(decryptCBC(key, ct, iv)).toStrictEqual(pt);
    })
})