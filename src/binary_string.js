// import './utilities';
require('./utilities');

const char2Ascii = char => char.charCodeAt(0);
const ascii2Char = n => String.fromCharCode(n)
const dec2Bin = decimal => (decimal >>> 0).toString(2);
const bin2Dec = binary => parseInt(binary, 2);
const leftPad = str => str.leftPad(8, '0');

function encode(message) {
	return message
		.split('')
		.map(char2Ascii)
		.map(dec2Bin)
		.map(leftPad)
		.join('')
}

function decode(encodedMessage) {
	return encodedMessage
		.split('')
		.chunk(8)
		.map(arr => arr.join(''))
		.map(bin2Dec)
		.map(ascii2Char)
		.join('')
}

const encodedMessage = encode('Hamming code');
// console.log(encodedMessage);
console.log(decode(encodedMessage));

const BinaryString = {
	encode,
	decode
};

// export default BinaryString;
module.exports = BinaryString;