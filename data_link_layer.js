//utility method for strings
if (!String.prototype.leftPad) {
  String.prototype.leftPad = function (length, str) {
        if (this.length >= length) {
            return this;
        }
        str = str || ' ';
        return (new Array(Math.ceil((length - this.length) / str.length) + 1).join(str)).substr(0, (length - this.length)) + this;
    };
}

function DataLinkLayer(configData){
  //attributes
  this.flag = configData.flag;
  this.packetFileName = configData.packetFileName;
  this.frameLength = configData.frameLength;
  //private attributes
  //let parityBit = setMap();
  //methods
  this.send = packet => prepare(packet);
  //privados
  const prepare = packet => splitPacket(encode(packet)).map(frame => putFlags(bitStuffing(frame)));
  //retorna un arreglo de frames
  const splitPacket = packet => packet.match(new RegExp(`.{1,${this.frameLength}}`, 'g'));
  const putFlags = data => `${this.flag}${data}${this.flag}`;
  const bitStuffing = data => data.replace(/11111/g, '111110');
  const parityBitsNeeded = dataBits => {
    const log2 = x => Math.log(x) / Math.log(2);
  };
  function encode(message) {
    const char2Ascii = char => char.charCodeAt(0);
    const dec2Bin = decimal => decimal.toString(2);
    const bin2Dec = binary => parseInt(binary, 2);
    const leftPad = str => str.leftPad(8, '0');
    return message
            .split('')
            .map(char2Ascii)
            .map(dec2Bin)
            .map(leftPad)
            .join('');
  }

};

fs = require('fs');

config = JSON.parse(fs.readFileSync('config.json', 'ascii'));
dataLinklayer = new DataLinkLayer(config);
packet = fs.readFileSync(dataLinklayer.packetFileName, 'ascii');
dataLinklayer.send(packet).forEach(frame => console.log(frame.length + '\n'));
