const Hamming = require('./hamming');
const BinaryString = require('./binary_string');
const BitCount = require('./BitCount');
const ErrorHandler = require('./ErrorHandler');
const BitStuffer = require('./bitStuffer');

// 1. Conteo de caracteres
// 2. Hamming o CRC
// 3. Relleno de Bits
// 4. Banderas

/**
  * Takes an ascii message and encodes it using hamming
  */
function hammingEncode(message) {
  const length = message.length;

  const binaryMessage = BinaryString.encode(message);

  const withBitCount = BitCount.add(binaryMessage, length);

  const withHamming = chunkedHamming(withBitCount, Hamming.encode, 8, 10);

  const withStuffing = BitStuffer.stuff(withHamming);

  return `01111110${withStuffing}01111110`;
}

function chunkedHamming(binaryString, fn, n, m) {
  const firstTen = binaryString.substr(0, m);
  const others = binaryString.slice(m);

  const hammed = others
    .split('')
    .chunk(n)
    .map(arr => arr.join(''))
    .map(fn)
    .join('');

  return `${fn(firstTen)}${hammed}`;
}


function hammingDecode(message) {
  const removedFlags = message.substr(8, message.length - 16);

  const withoutStuffing = BitStuffer.unstuff(removedFlags);

  const removedHamming = chunkedHamming(withoutStuffing, Hamming.decode, 12, 14);

  const { bitString, length } = BitCount.remove(removedHamming);

  const decodedString = BinaryString.decode(bitString);

  return decodedString;
}

const encodedMessage = hammingEncode("Hola mundo");
const decodedMessage = hammingDecode(encodedMessage);

console.log(decodedMessage);
