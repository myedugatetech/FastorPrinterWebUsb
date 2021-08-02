const FastorWebUSBSdk = require('./webusb');
const FastorLegacySdk = require("./legacy");

module.exports = (type="LEGACY",paperwidth,characterPerLine) =>{
		console.log("printing with "+ type);
		if(type=="LEGACY") return new FastorLegacySdk(paperwidth,characterPerLine);
		if(type=="USB") return new FastorWebUSBSdk(paperwidth,characterPerLine);
		return new FastorWebUSBSdk(paperwidth,characterPerLine);
}
