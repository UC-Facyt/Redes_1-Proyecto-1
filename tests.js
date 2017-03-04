
function DataLinkLayer(configData){
  //attributes
  this.flag = configData.flag;
  this.packetFileName = configData.packetFileName;
  //methods
  this.send = packet => prepare(packet);
  //privados
  let prepare = data => putFlags(data);
  let putFlags = (data) => this.flag + data + this.flag;
};

fs = require('fs');

config = JSON.parse(fs.readFileSync('config.json', 'ascii'));
dataLinklayer = new DataLinkLayer(config);
packet = fs.readFileSync(dataLinklayer.packetFileName, 'ascii');
console.log(dataLinklayer.send(packet));
