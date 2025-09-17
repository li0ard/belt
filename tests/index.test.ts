import { describe, test, expect } from "bun:test";
import { keyExpand, keyTransform } from "../src";
import { hexToBytes } from "@li0ard/gost3413/dist/utils";

describe("Key expand", () => {
    test("#1", () => {
        const key = hexToBytes("2033394D6C320D0965201A166E62001D6779410674740E136865160D3D730C11");
        const expected = hexToBytes("2033394D6C320D0965201A166E62001D6779410674740E136865160D3D730C11");

        expect(keyExpand(key)).toStrictEqual(expected);
    })

    test("#2", () => {
        const key = hexToBytes("348724A4C1A67667153DDE5933884250E3248C657D413B8C");
        const expected = hexToBytes("348724A4C1A67667153DDE5933884250E3248C657D413B8CE01C8C9AADEDF5B9");

        expect(keyExpand(key)).toStrictEqual(expected);
    })

    test("#3", () => {
        const key = hexToBytes("E9DEE72C8F0C0FA62DDB49F46F739647");
        const expected = hexToBytes("E9DEE72C8F0C0FA62DDB49F46F739647E9DEE72C8F0C0FA62DDB49F46F739647");

        expect(keyExpand(key)).toStrictEqual(expected);
    })
})

describe("Key transform", () => {
    test("#1", () => {
        const key = hexToBytes("2033394D6C320D0965201A166E62001D6779410674740E136865160D3D730C11");
        const lvl = hexToBytes("010000000000000000000000");
        const iv = hexToBytes("919ADA9067B9279EB514BEA13F8F2CA8");
        const expected = hexToBytes("39B22F1AEB3BDA3AF2D15C9EF4D7E1B9E04CBB98FEE03A03E521CE4BDA191B38");

        expect(keyTransform(key, lvl, iv, 32)).toStrictEqual(expected);
    })

    test("#2", () => {
        const key = hexToBytes("2033394D6C320D0965201A166E62001D6779410674740E136865160D3D730C11");
        const lvl = hexToBytes("010000000000000000000000");
        const iv = hexToBytes("9DEADEC2621747A62A80A7C3FFA8E347");
        const expected = hexToBytes("59A50D2BEA321BCE681B21B3B745345A2F642D5A7C68C4DC");

        expect(keyTransform(key, lvl, iv, 24)).toStrictEqual(expected);
    })

    test("#3", () => {
        const key = hexToBytes("2033394D6C320D0965201A166E62001D6779410674740E136865160D3D730C11");
        const lvl = hexToBytes("010000000000000000000000");
        const iv = hexToBytes("D097E3AF21DC4B8891688A84E9A05C51");
        const expected = hexToBytes("88743329791EE70CBE6B3438FEAC2FB4");

        expect(keyTransform(key, lvl, iv, 16)).toStrictEqual(expected);
    })

    test("#4", () => {
        const key = hexToBytes("348724A4C1A67667153DDE5933884250E3248C657D413B8C");
        const lvl = hexToBytes("010000000000000000000000");
        const iv = hexToBytes("919ADA9067B9279EB514BEA13F8F2CA8");
        const expected = hexToBytes("BFCBEAA05620BA4FA04AE7CD482F7B9715FBBF63459B1C66");

        expect(keyTransform(key, lvl, iv, 24)).toStrictEqual(expected);
    })

    test("#5", () => {
        const key = hexToBytes("348724A4C1A67667153DDE5933884250E3248C657D413B8C");
        const lvl = hexToBytes("010000000000000000000000");
        const iv = hexToBytes("9DEADEC2621747A62A80A7C3FFA8E347");
        const expected = hexToBytes("9D8152A7EE9DDDC9B42161FE1FFB8C84");

        expect(keyTransform(key, lvl, iv, 16)).toStrictEqual(expected);
    })

    test("#6", () => {
        const key = hexToBytes("E9DEE72C8F0C0FA62DDB49F46F739647");
        const lvl = hexToBytes("010000000000000000000000");
        const iv = hexToBytes("D097E3AF21DC4B8891688A84E9A05C51");
        const expected = hexToBytes("5285AB0AEE08A2A54AF512332E04C8B2");

        expect(keyTransform(key, lvl, iv, 16)).toStrictEqual(expected);
    })
})