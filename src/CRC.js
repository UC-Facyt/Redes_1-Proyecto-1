function addChecksum(payload, generator){
    return payload.concat(CRC(addGenerator(payload, generator), generator));
};

function checksum(frame, generator){
    return CRC(frame, generator) == new Array(generator.length - 1).fill('0') ? true : false;
};

function addGenerator(frame, generator){
	return frame.concat('0'.repeat(generator.length - 1));
};

function CRC(dividend, divisor){
	const XOR = (a, b) => a.map((bit, i) => bit != b[i] ? '1' : '0');
	const CRCR = (dividend, remainder) => {
		let shiftedRemainder = remainder.slice(remainder.indexOf('1'));
		if(shiftedRemainder.length + dividend.length < divisor.length){
			return remainder.concat(dividend).slice(-divisor.length + 1);
		}else{
			let bitsNeeded = divisor.length - shiftedRemainder.length;
			return CRCR(dividend.slice(bitsNeeded), XOR(shiftedRemainder.concat(dividend.slice(0, bitsNeeded)), divisor));
		}
	};
	return CRCR(dividend.split('').slice(divisor.length), XOR(dividend.slice(0, divisor.length).split(''), divisor.split('')));
};

let divisor = "10001000000100001";
let trama = "1111110101011111110";

console.log(divisor);
console.log(CRC(addGenerator(trama, divisor), divisor).join(''));

module.exports = {
	addChecksum,
    checksum
};