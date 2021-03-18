const WebUSB = require('./webusb');
const EscPosEncoder = require('esc-pos-encoder');

let connection_types = {
    USB: "USB"
}


class FastorPrinterSdk extends EscPosEncoder {
    static CONNECTION_TYPE = connection_types

    static TEXT_ALIGN = {
        CENTER_ALIGNMENT: "center",
        LEFT_ALIGNMENT: "left",
        RIGHT_ALIGNMENT: "right",
    }

    constructor(connection_type, paperwidth) {
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

    dashLine() {
        super.line(Array(this.width).fill("-").join(""));
        return this
    }

    table(leftText, rightText) {
        const space = this.width - (leftText.length + rightText.length);
        space = space > 0 ? space : 0
        super.line(leftText + Array(space).fill(" ").join("") + rightText);
        return this
    }
    
    close() {
        return this.printer.close()
    }
}

module.exports = FastorPrinterSdk;


