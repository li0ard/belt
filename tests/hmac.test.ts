import { describe, test, expect } from "bun:test";
import { BeltHMAC } from "../src";
import { hexToBytes } from "@li0ard/gost3413/dist/utils";

describe("HMAC", () => {
    test("#1", () => {
        const expected = hexToBytes("D4828E6312B08BB83C9FA6535A4635549E411FD11C0D8289359A1130E930676B");
        const a = BeltHMAC(hexToBytes("E9DEE72C8F0C0FA62DDB49F46F73964706075316ED247A3739CBA38303"));
        a.update(hexToBytes("BE32971343FC9A48A02A885F194B09A17ECDA4D01544AF8CA58450BF66D2E88A"));
        expect(a.digest()).toStrictEqual(expected);
    })

    test("#2", () => {
        const expected = hexToBytes("41FFE8645AEC0612E952D2CDF8DD508F3E4A1D9B53F6A1DB293B19FE76B1879F");
        const a = BeltHMAC(hexToBytes("E9DEE72C8F0C0FA62DDB49F46F73964706075316ED247A3739CBA38303A98BF6"));
        a.update(hexToBytes("BE32971343FC9A48A02A885F194B09A17ECDA4D01544AF8CA58450BF66D2E88A"));
        expect(a.digest()).toStrictEqual(expected);
    })

    test("#3", () => {
        const expected = hexToBytes("7D01B84D2315C332277B3653D7EC64707EBA7CDFF7FF70077B1DECBD68F2A144");
        const a = BeltHMAC(hexToBytes("E9DEE72C8F0C0FA62DDB49F46F73964706075316ED247A3739CBA38303A98BF692BD9B1CE5D141015445"));
        a.update(hexToBytes("BE32971343FC9A48A02A885F194B09A17ECDA4D01544AF8CA58450BF66D2E88A"));
        expect(a.digest()).toStrictEqual(expected);
    })
})