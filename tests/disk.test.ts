import { describe, test, expect } from "bun:test";
import { decryptBDE, decryptSDE, encryptBDE, encryptSDE } from "../src";

describe("BDE", () => {
    test("#1", () => {
        let key = Buffer.from("E9DEE72C8F0C0FA62DDB49F46F73964706075316ED247A3739CBA38303A98BF6", "hex");
        let iv = Buffer.from("BE32971343FC9A48A02A885F194B09A1", "hex");
        let pt = Buffer.from("b194bac80a08f53b366d008e584a5de48504fa9d1bb6c7ac252e72c202fdce0d5be3d61217b96181fe6786ad716b890b", "hex");
        let ct = Buffer.from("e9cab32d879cc50c10378eb07c10f26307257e2dbe2b854cbc9f38282d59d6a77f952001c5d1244f53210a27c216d4bb", "hex");

        expect(encryptBDE(key, pt, iv)).toStrictEqual(ct);
        expect(decryptBDE(key, ct, iv)).toStrictEqual(pt);
    })

    test("#2", () => {
        let key = Buffer.from("92BD9B1CE5D141015445FBC95E4D0EF2682080AA227D642F2687F93490405511", "hex");
        let iv = Buffer.from("7ECDA4D01544AF8CA58450BF66D2E88A", "hex");
        let pt = Buffer.from("7041BC226352C706D00EA8EF23CFE46AFAE118577D037FACDC36E4ECC1F6574609F236943FB809E1BEE4A1C686C13ACC", "hex");
        let ct = Buffer.from("E12BDC1AE28257EC703FCCF095EE8DF1C1AB76389FE678CAF7C6F860D5BB9C4FF33C657B637C306ADD4EA7799EB23D31", "hex");

        expect(encryptBDE(key, pt, iv)).toStrictEqual(ct);
        expect(decryptBDE(key, ct, iv)).toStrictEqual(pt);
    })
})

describe("SDE", () => {
    test("#1", () => {
        let key = Buffer.from("E9DEE72C8F0C0FA62DDB49F46F73964706075316ED247A3739CBA38303A98BF6", "hex");
        let iv = Buffer.from("BE32971343FC9A48A02A885F194B09A1", "hex");
        let pt = Buffer.from("b194bac80a08f53b366d008e584a5de48504fa9d1bb6c7ac252e72c202fdce0d5be3d61217b96181fe6786ad716b890b", "hex");
        let ct = Buffer.from("1FCBB01852003D60B66024C508608BAA2C21AF1E884CF31154D3077D4643CF2249EB2F5A68E4BA019D90211A81D690D9", "hex");

        expect(encryptSDE(key, pt, iv)).toStrictEqual(ct);
        expect(decryptSDE(key, ct, iv)).toStrictEqual(pt);
    })

    test("#2", () => {
        let key = Buffer.from("92BD9B1CE5D141015445FBC95E4D0EF2682080AA227D642F2687F93490405511", "hex");
        let iv = Buffer.from("7ECDA4D01544AF8CA58450BF66D2E88A", "hex");
        let pt = Buffer.from("E9FDF3F788657332E6C46FCF5251B8A6D43543A93E3233837DB1571183A6EF4D7FEB5CDF999E1A3F51A5A3381BEB7FA5", "hex");
        let ct = Buffer.from("E12BDC1AE28257EC703FCCF095EE8DF1C1AB76389FE678CAF7C6F860D5BB9C4FF33C657B637C306ADD4EA7799EB23D31", "hex");

        expect(encryptSDE(key, pt, iv)).toStrictEqual(ct);
        expect(decryptSDE(key, ct, iv)).toStrictEqual(pt);
    })
})