import { describe, test, expect } from "bun:test";
import { decryptCHE, decryptDWP, encryptCHE, encryptDWP } from "../src";

describe("DWP", () => {
    test("#1", () => {
        let key = Buffer.from("E9DEE72C8F0C0FA62DDB49F46F73964706075316ED247A3739CBA38303A98BF6", "hex");
        let iv = Buffer.from("BE32971343FC9A48A02A885F194B09A1", "hex");
        let pt = Buffer.from("b194bac80a08f53b366d008e584a5de4", "hex");
        let ad = Buffer.from("8504FA9D1BB6C7AC252E72C202FDCE0D5BE3D61217B96181FE6786AD716B890B", "hex");
        let ct = Buffer.from("52c9af96ff50f64435fc43def56bd7973b2e0aeb2b91854b", "hex");

        expect(encryptDWP(key, pt, iv, ad)).toStrictEqual(ct);
        expect(decryptDWP(key, ct, iv, ad)).toStrictEqual(pt);
    })

    test("#2", () => {
        let key = Buffer.from("92BD9B1CE5D141015445FBC95E4D0EF2682080AA227D642F2687F93490405511", "hex");
        let iv = Buffer.from("7ECDA4D01544AF8CA58450BF66D2E88A", "hex");
        let pt = Buffer.from("DF181ED008A20F43DCBBB93650DAD34B", "hex");
        let ad = Buffer.from("C1AB76389FE678CAF7C6F860D5BB9C4FF33C657B637C306ADD4EA7799EB23D31", "hex");
        let ct = Buffer.from("E12BDC1AE28257EC703FCCF095EE8DF16A2C2C94C4150DC0", "hex");

        expect(encryptDWP(key, pt, iv, ad)).toStrictEqual(ct);
        expect(decryptDWP(key, ct, iv, ad)).toStrictEqual(pt);
    })
})

describe("CHE", () => {
    test("#1", () => {
        let key = Buffer.from("E9DEE72C8F0C0FA62DDB49F46F73964706075316ED247A3739CBA38303A98BF6", "hex");
        let iv = Buffer.from("BE32971343FC9A48A02A885F194B09A1", "hex");
        let pt = Buffer.from("b194bac80a08f53b366d008e584a5d", "hex");
        let ad = Buffer.from("8504FA9D1BB6C7AC252E72C202FDCE0D5BE3D61217B96181FE6786AD716B890B", "hex");
        let ct = Buffer.from("BF3DAEAF5D18D2BCC30EA62D2E70A4548622B844123FF7", "hex");

        expect(encryptCHE(key, pt, iv, ad)).toStrictEqual(ct);
        expect(decryptCHE(key, ct, iv, ad)).toStrictEqual(pt);
    })

    test("#2", () => {
        let key = Buffer.from("92BD9B1CE5D141015445FBC95E4D0EF2682080AA227D642F2687F93490405511", "hex");
        let iv = Buffer.from("7ECDA4D01544AF8CA58450BF66D2E88A", "hex");
        let pt = Buffer.from("2BABF43EB37B5398A9068F31A3C758B762F44AA9", "hex");
        let ad = Buffer.from("C1AB76389FE678CAF7C6F860D5BB9C4FF33C657B637C306ADD4EA7799EB23D31", "hex");
        let ct = Buffer.from("E12BDC1AE28257EC703FCCF095EE8DF1C1AB76387D9D4F59D40D197D", "hex");

        expect(encryptCHE(key, pt, iv, ad)).toStrictEqual(ct);
        expect(decryptCHE(key, ct, iv, ad)).toStrictEqual(pt);
    })
})