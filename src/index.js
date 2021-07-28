const FastorWebUSBSdk = require('./webusb');
const FastorLegacySdk = require("./legacy");

module.exports = (legacy=false,paperwidth,characterPerLine) =>{
		if(legacy) return new FastorLegacySdk(paperwidth,characterPerLine);
		return new FastorWebUSBSdk();
}