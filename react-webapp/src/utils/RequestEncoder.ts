export function encodeTelegramId(telegramId: number): string {
  const tid = BigInt(telegramId);
  const SECRET_XOR: bigint = BigInt(0x139a8e71d);
  const xored: bigint = tid ^ SECRET_XOR;
  return xored.toString(29);
}

// обфусцированная функция
// _0x3d4f = (a, b) => a ^ b;
// _0x1a2b = BigInt('0x139a8e71d');
// _0x5e7c = (x) => {
//   const _0x1f9d = '0123456789abcdefghijklmnopqrs';
//   let _0x4b2e = '';
//   let _0x3a5c = x;
//   if (_0x3a5c === BigInt(0)) return '0';
//   while (_0x3a5c > BigInt(0)) {
//     const _0x2d8e = Number(_0x3a5c % BigInt(29));
//     _0x4b2e = _0x1f9d[_0x2d8e] + _0x4b2e;
//     _0x3a5c = _0x3a5c / BigInt(29);
//   }
//   return _0x4b2e;
// };
// _0x7f6e(_0x2a1b) {
//   return this._0x5e7c(this._0x3d4f(_0x2a1b, this._0x1a2b));
// }
