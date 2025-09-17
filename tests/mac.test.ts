import { describe, test, expect } from "bun:test";
import { mac } from "../src";
import { hexToBytes } from "@li0ard/gost3413/dist/utils";

describe("MAC", () => {
    const key = hexToBytes("E9DEE72C8F0C0FA62DDB49F46F73964706075316ED247A3739CBA38303A98BF6");
    const pt = hexToBytes("B194BAC80A08F53B366D008E584A5DE48504FA9D1BB6C7AC252E72C202FDCE0D5BE3D61217B96181FE6786AD716B890B");
    test("#1", () => {
        const ct = hexToBytes("7260DA60138F96C9");
    
        expect(mac(key, pt.slice(0, 13))).toStrictEqual(ct);
    })

    test("#2", () => {
        const ct = hexToBytes("2DAB59771B4B16D0");
    
        expect(mac(key, pt)).toStrictEqual(ct);
    })
})