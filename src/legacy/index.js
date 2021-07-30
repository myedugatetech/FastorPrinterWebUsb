const template = require('./template')

let predefinedPrinters = {
    "58": 32,
    "80":48,
}

class FastorPrinterSdk {
    constructor(paperwidth,characterPerLine,legacy=false) {
				paperwidth = paperwidth || "58" ;
        this.width = characterPerLine || predefinedPrinters[paperwidth]
				this.data = "";
				this.nextTextAlignment = 'left'
    }
    async initialize() {
    }

    dashLine() {
				let text = Array(this.width).fill("-").join("")
				this.data += `<p>${text}</p>`;
        return this;
    }

		align(textAlignment='left'){
				this.nextTextAlignment = textAlignment;
				return this;
		}

		line(text=""){
				this.data += `<p class="${(this.nextTextAlignment||"left")+"-align line"}">${text}</p>`;
				return this;
		}

		text(text=""){
				this.data += `<p class="${(this.nextTextAlignment||"left")+"-align text"}">${text}</p>`;
				return this;
		}

    table(leftText, rightText) {
			this.data += `<div class="table"><div>${leftText}</div><div>${rightText}</div></div>`;
			return this;
    }

    async print() {
				let win = window.open("","","height=800,width=500")
				setTimeout(()=>{
					win.document.write(template(this.data)); 
					win.print();
					win.close();
				},500)
    }

    close() {
			
    }
}

module.exports = FastorPrinterSdk;



