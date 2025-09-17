import { test, expect } from "bun:test";
import { compress } from "../src";
import { hexToBytes } from "@li0ard/gost3413/dist/utils";

test("Compress", () => {
    const pt = hexToBytes("B194BAC80A08F53B366D008E584A5DE48504FA9D1BB6C7AC252E72C202FDCE0D5BE3D61217B96181FE6786AD716B890B5CB0C0FF33C356B835C405AED8E07F99");
    const s = hexToBytes("46FE7425C9B181EB41DFEE3E72163D5A");
    const ct = hexToBytes("ED2F5481D593F40D87FCE37D6BC1A2E1B7D1A2CC975C82D3C0497488C90D99D8");
    const result = compress(pt);
    
    expect(result[0]).toStrictEqual(s);
    expect(result[1]).toStrictEqual(ct);
})