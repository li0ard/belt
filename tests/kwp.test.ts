import { describe, test, expect } from "bun:test";
import { wrapKey, unwrapKey } from "../src";

describe("KWP", () => {
    test("#1", () => {
        let key = Buffer.from("E9DEE72C8F0C0FA62DDB49F46F73964706075316ED247A3739CBA38303A98BF6", "hex");
        let iv = Buffer.from("5be3d61217b96181fe6786ad716b890b", "hex");
        let pt = Buffer.from("b194bac80a08f53b366d008e584a5de48504fa9d1bb6c7ac252e72c202fdce0d", "hex");
        let ct = Buffer.from("49A38EE108D6C742E52B774F00A6EF98B106CBD13EA4FB0680323051BC04DF76E487B055C69BCF541176169F1DC9F6C8", "hex")

        expect(wrapKey(key, pt, iv)).toStrictEqual(ct);
        expect(unwrapKey(key, ct, iv)).toStrictEqual(pt);
    })

    test("#2", () => {
        let key = Buffer.from("92BD9B1CE5D141015445FBC95E4D0EF2682080AA227D642F2687F93490405511", "hex");
        let iv = Buffer.from("B5EF68D8E4A39E567153DE13D72254EE", "hex");
        let pt = Buffer.from("92632EE0C21AD9E09A39343E5C07DAA4889B03F2E6847EB152EC99F7A4D9F154", "hex");
        let ct = Buffer.from("E12BDC1AE28257EC703FCCF095EE8DF1C1AB76389FE678CAF7C6F860D5BB9C4FF33C657B637C306ADD4EA7799EB23D31", "hex")

        expect(wrapKey(key, pt, iv)).toStrictEqual(ct);
        expect(unwrapKey(key, ct, iv)).toStrictEqual(pt);
    })
})