import { describe, test, expect } from "bun:test";
import { ctr } from "../src";

describe("CTR", () => {
    test("#1", () => {
        let key = Buffer.from("E9DEE72C8F0C0FA62DDB49F46F73964706075316ED247A3739CBA38303A98BF6", "hex");
        let iv = Buffer.from("BE32971343FC9A48A02A885F194B09A1", "hex");
        let pt = Buffer.from("b194bac80a08f53b366d008e584a5de48504fa9d1bb6c7ac252e72c202fdce0d5be3d61217b96181fe6786ad716b890b", "hex");
        let ct = Buffer.from("52C9AF96FF50F64435FC43DEF56BD797D5B5B1FF79FB41257AB9CDF6E63E81F8F00341473EAE409833622DE05213773A", "hex");

        expect(ctr(key, pt, iv)).toStrictEqual(ct);
        expect(ctr(key, ct, iv)).toStrictEqual(pt);
    })

    test("#2", () => {
        let key = Buffer.from("92BD9B1CE5D141015445FBC95E4D0EF2682080AA227D642F2687F93490405511", "hex");
        let iv = Buffer.from("7ECDA4D01544AF8CA58450BF66D2E88A", "hex");
        let pt = Buffer.from("E12BDC1AE28257EC703FCCF095EE8DF1C1AB76389FE678CAF7C6F860D5BB9C4FF33C657B637C306ADD4EA779", "hex");
        let ct = Buffer.from("DF181ED008A20F43DCBBB93650DAD34B389CDEE5826D40E2D4BD80F49A93F5D212F6333166456F169043CC5F", "hex");

        expect(ctr(key, pt, iv)).toStrictEqual(ct);
        expect(ctr(key, ct, iv)).toStrictEqual(pt);
    })
})