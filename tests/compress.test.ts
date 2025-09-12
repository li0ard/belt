import { describe, test, expect } from "bun:test";
import { compress } from "../src";

test("Compress", () => {
    let pt = Buffer.from("B194BAC80A08F53B366D008E584A5DE48504FA9D1BB6C7AC252E72C202FDCE0D5BE3D61217B96181FE6786AD716B890B5CB0C0FF33C356B835C405AED8E07F99", "hex");
    let s = Buffer.from("46fe7425c9b181eb41dfee3e72163d5a", "hex");
    let ct = Buffer.from("ed2f5481d593f40d87fce37d6bc1a2e1b7d1a2cc975c82d3c0497488c90d99d8", "hex");
    let result = compress(pt);
    
    expect(result[0]).toStrictEqual(s);
    expect(result[1]).toStrictEqual(ct);
})