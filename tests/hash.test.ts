import { describe, test, expect } from "bun:test";
import { BeltHash } from "../src";

describe("Hash", () => {
    let pt = Buffer.from("b194bac80a08f53b366d008e584a5de48504fa9d1bb6c7ac252e72c202fdce0d5be3d61217b96181fe6786ad716b890b", "hex")
    test("Test #1", () => {
        let expected = Buffer.from("ABEF9725D4C5A83597A367D14494CC2542F20F659DDFECC961A3EC550CBA8C75", "hex")
        expect(new BeltHash().update(pt.slice(0, 13)).digest()).toStrictEqual(expected)
    })
    test("Test #2", () => {
        let expected = Buffer.from("749E4C3653AECE5E48DB4761227742EB6DBE13F4A80F7BEFF1A9CF8D10EE7786", "hex")
        expect(new BeltHash().update(pt.slice(0, 32)).digest()).toStrictEqual(expected)
    })
    test("Test #3", () => {
        let expected = Buffer.from("9D02EE446FB6A29FE5C982D4B13AF9D3E90861BC4CEF27CF306BFB0B174A154A", "hex")
        expect(new BeltHash().update(pt).digest()).toStrictEqual(expected)
    })
})