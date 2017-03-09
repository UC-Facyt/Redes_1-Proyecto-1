const { isPowerOfTwo, bin2Dec, isEven } = require('./utilities');
const { notifyError } = require('./ErrorHandler');

function encode(message) {
	const parityBits = getParityBits(message.length);
	const bitArray = getBitArray(message, parityBits);

	const related = bitArray
		.map((bit, index) => ({ bit, pos: index+1 }))
		.filter(data => typeof data.bit !== 'undefined');

	for (let i = 0; i < bitArray.length; i++) {
		if (typeof bitArray[i] === 'undefined') {
			bitArray[i] = calculateParityBit(i+1, related);
		}
	}
	return bitArray.join('');
}

function decode(message) {
	let related = message
		.split('')
		.filter((e, index) => !isPowerOfTwo(index + 1))
		.map((bit, index) => ({ bit, pos: index+1 }));

	let damagedBits = [];
	for (let [index, bit] of message.split('').entries()) {
		if (isPowerOfTwo(index + 1)) {
			let parityBit = calculateParityBit(index + 1, related);
			if (parityBit != bit) {
				damagedBits.push(index + 1);
				notifyError({ message: `Wrong parity bit at position ${index + 1}` });
			}
		}
	}

	if (damagedBits.length > 0) {
		// notifyError({ message: `Wrong parity bit at position ` });
	}

	let remove = message
		.split('')
		.filter((e, index) => !isPowerOfTwo(index + 1));

	return remove.join('');
}

function calculateParityBit(bit, related) {
	// let sum = 0;
	/* //imperative is for gays
	for (let data of related) {
		if ((bit & data.pos) !== 0) {
			sum += bin2Dec(data.bit);
		}
	}
	*/
	return isEven(
		related.reduce(
			(sum, data) => (bit & data.pos) !== 0 ? sum + bin2Dec(data.bit) : sum,
			0
		)
	) ^ 1;
}

function getBitArray(message, parityBits) {
	const totalBits = message.length + parityBits;
	let related = [], index = 0;
	for (let i = 1; i <= totalBits; i++) {
		const currentIndex = related.length;
		related.push(
			(!isPowerOfTwo(i)) ? message[index++] : undefined
		);
	}
	return related;
}

function getParityBits(size) {
	let res = 0;
	let i = 0;
	while (true) {
		const power = Math.pow(2, i);
		if (power <= (size + res))
			res++;
		else
			return res;
		i++;
	}
}

const Hamming = {
	encode,
	decode
};

module.exports = Hamming;

const encoded = Hamming.encode('1101');
console.log(encoded)
console.log(Hamming.decode(encoded));
