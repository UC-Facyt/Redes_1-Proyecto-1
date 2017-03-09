
const encode = require('./binary_string').encode;
const {addChecksum, checksum } = require('./CRC');
const { dec2Bin, bin2Dec, splitPacket, putFlags, charCount } = require('./utilities');
const { stuff, unstuff } = require('./bitStuffer');
const fs = require('fs');
    //lectura del archivo de configuración
    config = JSON.parse(fs.readFileSync('./src/data/config.json', 'ascii'));
    //------- inicializando variables de configuración --------
    flag = config.flag;
    packetFileName = config.packetFileName;
    frameLength = config.frameLength;
    generator = config.generator;

  //prepara y envia el paquete (si es muy grande lo divide en varios frames)
  const send = packet => prepare(packet);  
  //prepara el paquete para su envío
  const prepare = packet => splitPacket(encode(packet)).map(frame => putFlags(stuff(frame)));
  //impresión de debugging, imprime el resultado de la codificación de un paquete para su envío
  const debugPrint = (packet) => {
    splitPacket(packet).forEach((frame, i) => console.log(`frame ${i}: ${flag} - ${ stuff(encode(frame)) } - ${flag}`));
  };

packet = fs.readFileSync(packetFileName, 'ascii');
encoded = encode(packet);
debugPrint(packet);
