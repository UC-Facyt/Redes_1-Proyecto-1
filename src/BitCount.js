const BinaryString = require('./binary_string');
const { bin2Dec, dec2Bin, leftPad } = require('./utilities');

function add(bitString, length) {
  return `${dec2Bin(length).toString().leftPad(10, '0')}${bitString}`;
}

function remove(message) {
  return {
    bitString: message.substr(10, Infinity),
    length: bin2Dec(message.substr(0, 10))
  }
}

const BitCount = {
  add,
  remove
}

module.exports = BitCount;
