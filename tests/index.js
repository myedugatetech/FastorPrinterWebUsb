const EscPosWebUSB = require('../src/index');


const main = async () =>{
    let order = getOrder();
    let printer = new EscPosWebUSB();
    await printer.initialize();
    printer.text("abc")
    .tab
    // await printNonDineIn(printer,order)
    // await printer.print()
}

const getOrder = () =>{
    return {
        restaurant_name:"abc",
        restaurant_address:"sfsdf asfsd",
        user_name:"sdfs"
    }
}

main();