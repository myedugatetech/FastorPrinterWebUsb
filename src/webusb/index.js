const WebUSB = require('./webusbinterface');
const EscPosEncoder = require('esc-pos-encoder');
const LegacyPrint = require("../legacy");

let predefinedPrinters = {
    "58": 32,
    "80":48,
}

class FastorPrinterSdk extends EscPosEncoder {
    constructor(paperwidth,characterPerLine) {
        super();
				this.printer = new WebUSB();
        paperwidth = paperwidth || "58" ;
        this.width = characterPerLine || predefinedPrinters[paperwidth]
    }
    async initialize() {
        super.initialize();
        await this.printer.selectPrinter();
    }
    async print() {
				this.data = super.raw(['\x0a']).encode();
        this.data = (new Uint8Array(this.data)).buffer
        await this.printer.open(console.log);
        await this.printer.write(this.data, console.log)
    }

    dashLine() {
        return super.line(Array(this.width).fill("-").join(""));
    }

    table(leftText, rightText) {
        let space = this.width - (leftText.length + (rightText+"").length);
        space = space > 0 ? space : 0
        return super.line(leftText + Array(space).fill(" ").join("") + rightText);
    }

    close() {
        return this.printer.close()
    }
}

module.exports = FastorPrinterSdk;


