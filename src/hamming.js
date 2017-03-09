const { isPowerOfTwo, bin2Dec, isEven } = require('./utilities');

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

function decode(message){
	let parityString = '';
	let invert = bit => bit == '1' ? '0' : '1';
	let related = message.map((bit, index) => ({ bit, pos: index + 1}));
	for(let i = 0; i < bitArray.length; i++){
		if(isPowerOfTwo(i+1)){
			calculateParityBit(i+1, related);
		}
	}
	let result = bin2Dec(parityString);
	if(result == 0){
		return related.filter((data) => !isPowerOfTwo(data.pos));
	}else{
		related[result + 1] = invert(related[result + 1]);
		return related;
	}
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
};

module.exports = Hamming;
