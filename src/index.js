const WebUSB = require('./webusb');
const EscPosEncoder = require('esc-pos-encoder');

class FastorPrinterSdk extends EscPosEncoder {
    constructor(paperwidth) {
        super();
        this.printer = new WebUSB();
        this.width = paperwidth || 48;
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

    dashLine(){
        super.line(Array(this.width).fill("-").join(""));
        return this
    }

    table(leftText,rightText){
        const space = this.width - (leftText.length + rightText.length);
        space = space > 0 ? space :0
        super.line(leftText+Array(space).fill(" ").join("")+rightText);
        return this
    }
    close() {
        return this.printer.close()
    }
}

module.exports = FastorPrinterSdk;


