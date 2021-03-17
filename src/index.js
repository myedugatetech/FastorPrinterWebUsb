const WebUSB = require('./webusb');
const EscPosEncoder = require('esc-pos-encoder');

class FastorPrinterSdk extends EscPosEncoder{
    constructor(){
        this.printer = new WebUSB();
    }
    initialize(){
        super.initialize();
        this.printer.selectPrinter();
    }
    async print(){
        this.data = super.raw(['\x0a']).encode() ;
        this.data = (new Uint8Array(this.data)).buffer
        await this.printer.open(console.log);
        await this.printer.write(this.data,console.log)
    }
    close(){
        return this.printer.close()
    }
}

module.exports = FastorPrinterSdk;


