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

		line(text){
				this.data += `<p class="${this.nextTextAlignment||"left"+"-align line"}">${text}</p>`;
				return this;
		}

		text(text){
				this.data += `<p class="${this.nextTextAlignment||"left"+"-align text"}">${text}</p>`;
				return this;
		}

    table(leftText, rightText) {
			let space = this.width - (leftText.length + (rightText+"").length);
			space = space > 0 ? space : 0
			this.line(leftText + Array(space).fill(" ").join("") + rightText);
			return this;
    }

    async print() {
				let win = window.open("","", "width=100,height=800")
				win.document.write(template(this.data)); 
				win.print();
    }

    close() {
			
    }
}

module.exports = FastorPrinterSdk;


