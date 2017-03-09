// import './utilities';
require('./utilities');

const {
	char2Ascii,
	ascii2Char,
	dec2Bin,
	bin2Dec,
	leftPad
} = require('./utilities');

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

const BinaryString = {
	encode,
	decode
};

module.exports = BinaryString;
