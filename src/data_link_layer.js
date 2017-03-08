
const encode = require('./binary_string').encode;
const addChecksum = require('./CRC').addChecksum;
const checksum = require('./CRC').checksum;
const dec2Bin = require('./utilities').dec2Bin;
const bin2Dec = require('./utilities').bin2Dec;

function DataLinkLayer(configData){
  //-------attributes--------
  this.flag = configData.flag;
  this.packetFileName = configData.packetFileName;
  this.frameLength = configData.frameLength;
  this.generator = configData.generator;
  //--------methods----------
  //enviar un paquete
  //prepara y envia el paquete (si es muy grande lo divide en varios frames)
  this.send = packet => prepare(packet); 
  //impresión de debugging, recibe el payload de un frame y lo imprime como será enviado.
  this.debugPrint = (payload) => console.log(`${this.flag} - ${charCount(payload)} : ${bitStuffing(encode(payload))} - ${this.flag}`);
  //--------privados---------
  //prepara el paquete para ser enviado en frames
  const prepare = packet => splitPacket(encode(packet)).map(frame => putFlags(bitStuffing(frame)));
  //retorna un arreglo de frames
  const splitPacket = packet => packet.match(new RegExp(`.{1,${this.frameLength}}`, 'g'));
  //agrega banderas al inicio y fin del paquete
  const putFlags = data => `${this.flag}${data}${this.flag}`;
  //realiza el relleno de bits
  const bitStuffing = data => data.replace(/11111/g, '111110'); 
  const charCount = packet => dec2Bin(packet.length);
};

let fs = require('fs');

config = JSON.parse(fs.readFileSync('./src/data/config.json', 'ascii'));
dataLinklayer = new DataLinkLayer(config);
packet = fs.readFileSync(dataLinklayer.packetFileName, 'ascii');
dataLinklayer.send(packet).forEach(frame => console.log(frame.length + '\n'));
