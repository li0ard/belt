import { describe, test, expect } from "bun:test";
import { decryptCFB, encryptCFB } from "../src";

describe("CFB", () => {
    test("#1", () => {
        let key = Buffer.from("E9DEE72C8F0C0FA62DDB49F46F73964706075316ED247A3739CBA38303A98BF6", "hex");
        let iv = Buffer.from("BE32971343FC9A48A02A885F194B09A1", "hex");
        let pt = Buffer.from("b194bac80a08f53b366d008e584a5de48504fa9d1bb6c7ac252e72c202fdce0d5be3d61217b96181fe6786ad716b890b", "hex");
        let ct = Buffer.from("C31E490A90EFA374626CC99E4B7B8540A6E48685464A5A06849C9CA769A1B0AE55C2CC5939303EC832DD2FE16C8E5A1B", "hex");
    
        expect(encryptCFB(key, pt, iv)).toStrictEqual(ct);
        expect(decryptCFB(key, ct, iv)).toStrictEqual(pt);
    })

    test("#2", () => {
        let key = Buffer.from("92BD9B1CE5D141015445FBC95E4D0EF2682080AA227D642F2687F93490405511", "hex");
        let iv = Buffer.from("7ECDA4D01544AF8CA58450BF66D2E88A", "hex");
        let pt = Buffer.from("FA9D107A86F375EE65CD1DB881224BD016AFF814938ED39B3361ABB0BF0851B652244EB06842DD4C94AA4500774E40BB", "hex");
        let ct = Buffer.from("E12BDC1AE28257EC703FCCF095EE8DF1C1AB76389FE678CAF7C6F860D5BB9C4FF33C657B637C306ADD4EA7799EB23D31", "hex");
    
        expect(encryptCFB(key, pt, iv)).toStrictEqual(ct);
        expect(decryptCFB(key, ct, iv)).toStrictEqual(pt);
    })
})