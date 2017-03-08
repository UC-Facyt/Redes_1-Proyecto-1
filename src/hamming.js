// import { isPowerOfTwo } from './utilities';
const isPowerOfTwo = require('./utilities').isPowerOfTwo;
const bin2Dec = require('./utilities').bin2Dec;
const isEven = require('./utilities').isEven;

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

function decode() {

}

function calculateParityBit(bit, related) {
	let sum = 0;
	/* //imperative is for gays
	for (let data of related) {
		if ((bit & data.pos) !== 0) {
			sum += bin2Dec(data.bit);
		}
	}
	*/
return isEven(related.reduce((sum, data, pos) => (bit & pos) !== 0 ? sum + bin2Dec(data.bit) : sum, 0))
	//return isEven(sum) ? '0' : '1';
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

function relatedBits(bitArray) {
	let related = {};
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

console.log(encode('11'));