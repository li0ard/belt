import { describe, test, expect } from "bun:test";
import { keyExpand, keyTransform } from "../src";

describe("Key expand", () => {
    test("#1", () => {
        let key = Buffer.from("2033394D6C320D0965201A166E62001D6779410674740E136865160D3D730C11", "hex");
        let expected = Buffer.from("2033394D6C320D0965201A166E62001D6779410674740E136865160D3D730C11", "hex");

        expect(keyExpand(key)).toStrictEqual(expected);
    })

    test("#2", () => {
        let key = Buffer.from("348724A4C1A67667153DDE5933884250E3248C657D413B8C", "hex");
        let expected = Buffer.from("348724A4C1A67667153DDE5933884250E3248C657D413B8CE01C8C9AADEDF5B9", "hex");

        expect(keyExpand(key)).toStrictEqual(expected);
    })

    test("#3", () => {
        let key = Buffer.from("E9DEE72C8F0C0FA62DDB49F46F739647", "hex");
        let expected = Buffer.from("E9DEE72C8F0C0FA62DDB49F46F739647E9DEE72C8F0C0FA62DDB49F46F739647", "hex");

        expect(keyExpand(key)).toStrictEqual(expected);
    })
})

describe("Key transform", () => {
    test("#1", () => {
        let key = Buffer.from("2033394D6C320D0965201A166E62001D6779410674740E136865160D3D730C11", "hex");
        let lvl = Buffer.from("010000000000000000000000", "hex");
        let iv = Buffer.from("919ADA9067B9279EB514BEA13F8F2CA8", "hex");
        let expected = Buffer.from("39B22F1AEB3BDA3AF2D15C9EF4D7E1B9E04CBB98FEE03A03E521CE4BDA191B38", "hex");

        expect(keyTransform(key, lvl, iv, 32)).toStrictEqual(expected);
    })

    test("#2", () => {
        let key = Buffer.from("2033394D6C320D0965201A166E62001D6779410674740E136865160D3D730C11", "hex");
        let lvl = Buffer.from("010000000000000000000000", "hex");
        let iv = Buffer.from("9DEADEC2621747A62A80A7C3FFA8E347", "hex");
        let expected = Buffer.from("59A50D2BEA321BCE681B21B3B745345A2F642D5A7C68C4DC", "hex");

        expect(keyTransform(key, lvl, iv, 24)).toStrictEqual(expected);
    })

    test("#3", () => {
        let key = Buffer.from("2033394D6C320D0965201A166E62001D6779410674740E136865160D3D730C11", "hex");
        let lvl = Buffer.from("010000000000000000000000", "hex");
        let iv = Buffer.from("D097E3AF21DC4B8891688A84E9A05C51", "hex");
        let expected = Buffer.from("88743329791EE70CBE6B3438FEAC2FB4", "hex");

        expect(keyTransform(key, lvl, iv, 16)).toStrictEqual(expected);
    })

    test("#4", () => {
        let key = Buffer.from("348724A4C1A67667153DDE5933884250E3248C657D413B8C", "hex");
        let lvl = Buffer.from("010000000000000000000000", "hex");
        let iv = Buffer.from("919ADA9067B9279EB514BEA13F8F2CA8", "hex");
        let expected = Buffer.from("BFCBEAA05620BA4FA04AE7CD482F7B9715FBBF63459B1C66", "hex");

        expect(keyTransform(key, lvl, iv, 24)).toStrictEqual(expected);
    })

    test("#5", () => {
        let key = Buffer.from("348724A4C1A67667153DDE5933884250E3248C657D413B8C", "hex");
        let lvl = Buffer.from("010000000000000000000000", "hex");
        let iv = Buffer.from("9DEADEC2621747A62A80A7C3FFA8E347", "hex");
        let expected = Buffer.from("9D8152A7EE9DDDC9B42161FE1FFB8C84", "hex");

        expect(keyTransform(key, lvl, iv, 16)).toStrictEqual(expected);
    })

    test("#6", () => {
        let key = Buffer.from("E9DEE72C8F0C0FA62DDB49F46F739647", "hex");
        let lvl = Buffer.from("010000000000000000000000", "hex");
        let iv = Buffer.from("D097E3AF21DC4B8891688A84E9A05C51", "hex");
        let expected = Buffer.from("5285AB0AEE08A2A54AF512332E04C8B2", "hex");

        expect(keyTransform(key, lvl, iv, 16)).toStrictEqual(expected);
    })
})