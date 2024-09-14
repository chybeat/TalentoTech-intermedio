class Calculadora {
	res = 0
	operation = null
	constructor(el) {
		this.num1 = el.num1;
		this.num2 = el.num2;
		this.btn_sumar = el.btn_sumar;
		this.btn_restar = el.btn_restar;
		this.btn_multiplicar = el.btn_multiplicar;
		this.btn_dividir = el.btn_dividir;
		this.result = el.result;

		//generate class triggers (user interactions)
		this.triggers();
	}

	//Error management
	checkinputs() {
		let text = "";

		//Removing error styles from inputs
		this.num1.classList.remove("input-error");
		this.num2.classList.remove("input-error");

		//check value for number 1 input
		if (this.num1.value == "") {
			text += "Hace falta el número 1.";
			//delay to activate (appreciate) animation sytle in case of error
			setTimeout(() => {
				this.num1.classList.add("input-error");
			}, 10);
		}

		//check value for number 2 input
		if (this.num2.value == "") {
			if (text != "") {
				text += "\r\n";
			}
			text += "Hace falta el número 2.";
			//delay to activate (appreciate) animation sytle in case of error
			setTimeout(() => {
				this.num2.classList.add("input-error");
			}, 10);
		}

		// adding text to result if error occurs
		if (text != "") {
			this.res = text;
			this.n1 = "";
			this.n2 = "";
			this.write();
			return false;
		}
		this.n1 = parseFloat(this.num1.value);
		this.n2 = parseFloat(this.num2.value);
		return true;
	}

	//Operations
	suma() {
		if (this.checkinputs()) {
			this.res = this.n1 + this.n2;
		}
		this.operation = "suma";
		this.write();
		this.unselectButtons();
		setTimeout(() => {
			this.btn_sumar.classList.add("btn_selected");
		}, 10);
	}

	resta() {
		if (this.checkinputs()) {
			this.res = this.n1 - this.n2;
		}
		this.operation = "resta"
		this.write();
		this.unselectButtons();
		setTimeout(() => {
			this.btn_restar.classList.add("btn_selected");
		}, 10);

	}

	multiplicación() {
		if (this.checkinputs()) {
			this.res = this.n1 * this.n2;
		}
		this.operation = "multiplicación"
		this.write();
		this.unselectButtons()
		setTimeout(() => {
			this.btn_multiplicar.classList.add("btn_selected");
		}, 10);
	}

	división() {
		if (this.checkinputs()) {
			if (this.num2.value == 0) {
				this.res = "Error!. No se puede dividir por cero";
				this.write();
				return false
			} else {
				this.res = this.n1 / this.n2;
			}
		}
		this.operation = "división"
		this.write();
		this.unselectButtons();
		setTimeout(() => {
			this.btn_dividir.classList.add("btn_selected");
		}, 10);
	}

	//Button actions
	triggers() {
		//sumar
		this.tr_sumar = this.suma.bind(this);
		this.btn_sumar.addEventListener("click", this.tr_sumar, false);

		//restar
		this.tr_restar = this.resta.bind(this);
		this.btn_restar.addEventListener("click", this.tr_restar, false);

		//multiplicar
		this.tr_multiplicar = this.multiplicación.bind(this);
		this.btn_multiplicar.addEventListener("click", this.tr_multiplicar, false);

		//dividir
		this.tr_dividir = this.división.bind(this);
		this.btn_dividir.addEventListener("click", this.tr_dividir, false);

		this.tr_auto = this.autoOperate.bind(this);
		this.num1.addEventListener("keyup", this.tr_auto, false);
		this.num2.addEventListener("keyup", this.tr_auto, false);
	}

	autoOperate() {
		if (this.operation != null) {
			this.checkinputs();
			switch (this.operation) {
				case 'suma':
					this.suma()
					break;
				case 'resta':
					this.resta()
					break;
				case 'multiplicación':
					this.multiplicación()
					break;
				case 'división':
					this.división()
					break;
				default:
					break;
			}
		}
	}

	unselectButtons() {
		this.btn_sumar.classList.remove("btn_selected");
		this.btn_restar.classList.remove("btn_selected");
		this.btn_multiplicar.classList.remove("btn_selected");
		this.btn_dividir.classList.remove("btn_selected");
	}

	//Write operation result
	write() {
		let opr_result = ""
		if (typeof this.res == "string") {
			opr_result = this.res;
		} else {
			if (!isNaN(this.res))
				opr_result = "La " + this.operation + " da: " + Math.round(this.res * 100000000) / 100000000
		}
		this.result.textContent = opr_result
	}
}

addEventListener("DOMContentLoaded", (e) => {
	//Instantiate of calculadora class
	const calc = new Calculadora({
		//Set numbers inputs
		num1: document.getElementById("num1"),
		num2: document.getElementById("num2"),

		//Set HTML action buttons
		btn_sumar: document.getElementById("sumar"),
		btn_restar: document.getElementById("restar"),
		btn_multiplicar: document.getElementById("multiplicar"),
		btn_dividir: document.getElementById("dividir"),

		//Set result area
		result: document.querySelector("#resultado .operRes")
	})
}); 