import { describe, test, expect } from "bun:test";
import { decryptECB, encryptECB } from "../src";

describe("ECB", () => {
    test("#1", () => {
        let key = Buffer.from("E9DEE72C8F0C0FA62DDB49F46F73964706075316ED247A3739CBA38303A98BF6", "hex");
        let pt = Buffer.from("b194bac80a08f53b366d008e584a5de48504fa9d1bb6c7ac252e72c202fdce0d5be3d61217b96181fe6786ad716b890b", "hex");
        let ct = Buffer.from("69cca1c93557c9e3d66bc3e0fa88fa6e5f23102ef109710775017f73806da9dc46fb2ed2ce771f26dcb5e5d1569f9ab0", "hex");
    
        expect(encryptECB(key, pt)).toStrictEqual(ct);
        expect(decryptECB(key, ct)).toStrictEqual(pt);
    })
    test("#2", () => {
        let key = Buffer.from("92BD9B1CE5D141015445FBC95E4D0EF2682080AA227D642F2687F93490405511", "hex");
        let pt = Buffer.from("0DC5300600CAB840B38448E5E993F421E55A239F2AB5C5D5FDB6E81B40938E2A54120CA3E6E19C7AD750FC3531DAEAB7", "hex");
        let ct = Buffer.from("E12BDC1AE28257EC703FCCF095EE8DF1C1AB76389FE678CAF7C6F860D5BB9C4FF33C657B637C306ADD4EA7799EB23D31", "hex");
    
        expect(encryptECB(key, pt)).toStrictEqual(ct);
        expect(decryptECB(key, ct)).toStrictEqual(pt);
    })
})