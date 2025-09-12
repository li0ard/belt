import { describe, test, expect } from "bun:test";
import { mac } from "../src";

describe("MAC", () => {
    let key = Buffer.from("E9DEE72C8F0C0FA62DDB49F46F73964706075316ED247A3739CBA38303A98BF6", "hex");
    let pt = Buffer.from("b194bac80a08f53b366d008e584a5de48504fa9d1bb6c7ac252e72c202fdce0d5be3d61217b96181fe6786ad716b890b", "hex");
    test("#1", () => {
        let ct = Buffer.from("7260DA60138F96C9", "hex");
    
        expect(mac(key, pt.slice(0, 13))).toStrictEqual(ct);
    })

    test("#2", () => {
        let ct = Buffer.from("2DAB59771B4B16D0", "hex");
    
        expect(mac(key, pt)).toStrictEqual(ct);
    })
})