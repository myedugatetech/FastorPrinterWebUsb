const WebUSB = require('./webusb');
const EscPosEncoder = require('esc-pos-encoder');

class FastorPrinterSdk extends EscPosEncoder {
    constructor() {
        super();
        this.printer = new WebUSB();
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
    async printNonDineIn(printerName, order, note) {
        
        super.initialize(printerName)
        super.align('center')
            .line(order.restaurant_name)
            .align('center')
            .line(order.restaurant_address)
            .align('center')
            .line(order.user_name)
            .align('center')
            .line(order.user_mobile)
            .line('--------------------------------------')
            .line('Bill ref. ID: ')
            .line(order.ref_orer_id)
            .line('Date: ')
            .line(order.date)
            .line(order.time)
            .line('Order No: ')
            .line(order.order_no)
            .line('Mode: ')
            .line(order.mode)
            .line('--------------------------------------');

        order.f_order_items.map((value, index) => {
            super.line(value.item_name)
                .align('left')
                .line(value.item_price)
                .line('x')
                .line(value.item_qty)
                .align('right')
                .line(value.item_q_total)
        });

        super.line('--------------------------------------')
            .align('left')
            .line('Total no. of Items')
            .align('right')
            .line(order.item_count)
            .line('--------------------------------------')
            .align('left')
            .line('Payment Mode')
            .align('right')
            .line(order.txn_mode)
            .align('left')
            .line('Subtotal')
            .align('right')
            .line(order.subtotal)
            .align('left')
            .line('Discout')
            .align('right')
            .line(order.discount)
            .align('left')
            .line('Reward Coins Used')
            .align('right')
            .line(order.r_p_used)
            .align('left')
            .line('Taxes')
            .align('right')
            .line(order.taxes)
            .align('left')
            .line('Grand Total')
            .align('right')
            .line(order.grand_total)
            .line('--------------------------------------')
            .line('Powered by Fastor')
            .line('Note:')
            .line(note)
        await this.initialize()
        await this.print();
    }
    close() {
        return this.printer.close()
    }
}

module.exports = FastorPrinterSdk;


