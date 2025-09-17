import { describe, test, expect } from "bun:test";
import { BeltHash } from "../src";

describe("Hash", () => {
    const pt = Buffer.from("B194BAC80A08F53B366D008E584A5DE48504FA9D1BB6C7AC252E72C202FDCE0D5BE3D61217B96181FE6786AD716B890B", "hex")
    test("#1", () => {
        const expected = Buffer.from("ABEF9725D4C5A83597A367D14494CC2542F20F659DDFECC961A3EC550CBA8C75", "hex")
        expect(new BeltHash().update(pt.subarray(0, 13)).digest()).toStrictEqual(expected)
    })
    test("#2", () => {
        const expected = Buffer.from("749E4C3653AECE5E48DB4761227742EB6DBE13F4A80F7BEFF1A9CF8D10EE7786", "hex")
        expect(new BeltHash().update(pt.subarray(0, 32)).digest()).toStrictEqual(expected)
    })
    test("#3", () => {
        const expected = Buffer.from("9D02EE446FB6A29FE5C982D4B13AF9D3E90861BC4CEF27CF306BFB0B174A154A", "hex")
        expect(new BeltHash().update(pt).digest()).toStrictEqual(expected)
    })
    test.skipIf(!process.env.INCLUDE_ALL_TESTS)("#4", () => {
        const expected = Buffer.from("98001732AC6BD9A3B03B66886320EC8A3E43825581E10779130B02FBD67E21E5", "hex")
        expect(new BeltHash().update(new Uint8Array(1000000).fill(0x61)).digest()).toStrictEqual(expected)
    })
})