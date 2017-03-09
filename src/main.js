const Hamming = require('./hamming');
const BinaryString = require('./binary_string');
const BitCount = require('./BitCount');
const ErrorHandler = require('./ErrorHandler');

// 1. Conteo de caracteres
// 2. Hamming o CRC
// 3. Relleno de Bits
// 4. Banderas

/**
  * Takes an ascii message and encodes it using hamming
  */
function hammingEncode(message) {
  const length = message.length;
  console.log(`Original Message: ${message}`);

  const binaryMessage = BinaryString.encode(message);
  console.log(`Binary Message: ${binaryMessage}`);

  const withBitCount = BitCount.add(binaryMessage, length);
  console.log(`Bit Count     : ${withBitCount}`);

  const withHamming = Hamming.encode(withBitCount);

  return withHamming;
}


function hammingDecode(message) {
  const { bitString, length } = BitCount.remove(message);
  const decodedString = BinaryString.decode(bitString);

  return decodedString;
}


const encodedMessage = hammingEncode('Hola');
const decodedMessage = hammingDecode(encodedMessage);

console.log(encodedMessage);
console.log(decodedMessage);
