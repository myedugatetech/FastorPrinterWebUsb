const WebUSB = require('./webusb');
const EscPosEncoder = require('esc-pos-encoder');

let connection_types = {
    USB: "USB"
}


class FastorPrinterSdk extends EscPosEncoder {
    static CONNECTION_TYPE = connection_type

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

    printNonDineIn(printerName, order, note) {
        super.align('center')
            .line(order.restaurant_name)
            .align('center')
            .line(order.restaurant_address)
            .align('center')
            .line(order.user_name)
            .align('center')
            .line(order.user_mobile)
            .dashLine()
            .align('left')
            .text('Bill ref. ID: ')
            .align('right')
            .line(order.ref_orer_id)
            .align('left')
            .text('Date: ')
            .align('right')
            .line(order.date + ', ' + order.time)
            .align('left')
            .text('Order No: ' + order.order_no)
            .align('left')
            .line('Mode: ' + order.mode)
            .dashLine();

        order.f_order_items.map((value, index) => {
            super.line(value.item_name)
                .align('left')
                .text(value.item_price)
                .text('x')
                .text(value.item_qty)
                .align('right')
                .line(value.item_q_total)
        });

        super.dashLine()
            .align('left')
            .text('Total no. of Items')
            .align('right')
            .line(order.item_count)
            .dashLine()
            .align('left')
            .text('Payment Mode')
            .align('right')
            .line(order.txn_mode)
            .align('left')
            .text('Subtotal')
            .align('right')
            .line(order.subtotal)
            .align('left')
            .text('Discout')
            .align('right')
            .line(order.discount)
            .align('left')
            .text('Reward Coins Used')
            .align('right')
            .line(order.r_p_used)
            .align('left')
            .text('Taxes')
            .align('right')
            .line(order.taxes)
            .align('left')
            .text('Grand Total')
            .align('right')
            .line(order.grand_total)
            .dashLine()
            .line('Powered by Fastor')
            .line('Note:')
            .line(note)
    }

    close() {
        return this.printer.close()
    }
}

module.exports = FastorPrinterSdk;


