
const encode = require('./binary_string').encode;

function DataLinkLayer(configData){
  //-------attributes--------
  this.flag = configData.flag;
  this.packetFileName = configData.packetFileName;
  this.frameLength = configData.frameLength;
  //--------methods----------
  this.send = packet => prepare(packet); //prepara y envia el paquete
  //--------privados---------
  //prepara el paquete para ser enviado en frames
  const prepare = packet => splitPacket(encode(packet)).map(frame => putFlags(bitStuffing(frame))); 
  //retorna un arreglo de frames
  const splitPacket = packet => packet.match(new RegExp(`.{1,${this.frameLength}}`, 'g'));
  //agrega banderas al inicio y fin del paquete
  const putFlags = data => `${this.flag}${data}${this.flag}`;
  //realiza el relleno de bits
  const bitStuffing = data => data.replace(/11111/g, '111110');
};

fs = require('fs');

config = JSON.parse(fs.readFileSync('./data/config.json', 'ascii'));
dataLinklayer = new DataLinkLayer(config);
packet = fs.readFileSync(dataLinklayer.packetFileName, 'ascii');
dataLinklayer.send(packet).forEach(frame => console.log(frame.length + '\n'));
