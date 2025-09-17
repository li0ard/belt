<p align="center">
    <b>@li0ard/belt</b><br>
    <b>BelT (STB 34.101.31) cipher implementation in pure TypeScript</b>
    <br>
    <a href="https://li0ard.is-cool.dev/belt">docs</a>
    <br><br>
    <a href="https://github.com/li0ard/belt/actions/workflows/test.yml"><img src="https://github.com/li0ard/belt/actions/workflows/test.yml/badge.svg" /></a>
    <a href="https://github.com/li0ard/belt/blob/main/LICENSE"><img src="https://img.shields.io/github/license/li0ard/belt" /></a>
    <br>
    <a href="https://npmjs.com/package/@li0ard/belt"><img src="https://img.shields.io/npm/v/@li0ard/belt" /></a>
    <a href="https://jsr.io/@li0ard/belt"><img src="https://jsr.io/badges/@li0ard/belt" /></a>
    <br>
    <hr>
</p>

## Installation

```bash
# from NPM
npm i @li0ard/belt

# from JSR
bunx jsr i @li0ard/belt
```

## Supported modes
- [x] Electronic Codebook (ECB)
- [x] Cipher Block Chaining (CBC)
- [x] Counter (CTR)
- [x] Cipher Feedback (CFB)
- [x] Message Authentication Code (MAC)
- [x] Key wrapping (KWP)
- [x] Ctr-Hash-Encrypt (CHE / AEAD)
- [x] Datawrap (DWP / AEAD)
- [x] Compress function
- [x] Key expand function
- [x] Key transform function (KRP)
- [x] Blockwise disk encryption (BDE)
- [x] Sectorwise disk encryption (SDE)
- [x] Hash function (HASH)
- [x] Wide block (WBL)

## Features
- Provides simple and modern API
- Most of the APIs are strictly typed
- Fully complies with [STB 34.101.31 (in Russian)](https://apmi.bsu.by/assets/files/std/belt-spec372.pdf) standard
- Supports Bun, Node.js, Deno, Browsers

## Examples
### ECB mode
```ts
import { encryptECB, decryptECB } from "@li0ard/belt";

let key = hexToBytes("E9DEE72C8F0C0FA62DDB49F46F73964706075316ED247A3739CBA38303A98BF6");
let pt = hexToBytes("b194bac80a08f53b366d008e584a5de48504fa9d1bb6c7ac252e72c202fdce0d5be3d61217b96181fe6786ad716b890b");
let ct = hexToBytes("69cca1c93557c9e3d66bc3e0fa88fa6e5f23102ef109710775017f73806da9dc46fb2ed2ce771f26dcb5e5d1569f9ab0");

console.log(encryptECB(key, pt));
console.log(decryptECB(key, ct));
```

### CBC mode
```ts
import { encryptCBC, decryptCBC } from "@li0ard/belt";

let key = hexToBytes("E9DEE72C8F0C0FA62DDB49F46F73964706075316ED247A3739CBA38303A98BF6");
let iv = hexToBytes("BE32971343FC9A48A02A885F194B09A1");
let pt = hexToBytes("b194bac80a08f53b366d008e584a5de48504fa9d1bb6c7ac252e72c202fdce0d5be3d61217b96181fe6786ad716b890b");
let ct = hexToBytes("69cca1c93557c9e3d66bc3e0fa88fa6e5f23102ef109710775017f73806da9dc46fb2ed2ce771f26dcb5e5d1569f9ab0");

console.log(encryptCBC(key, pt, iv));
console.log(decryptCBC(key, ct, iv));
```