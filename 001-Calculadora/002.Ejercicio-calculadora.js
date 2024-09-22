class Calculadora {
	res = 0
	operation = null
	constructor(operation) {
		this.num1 = document.getElementById("num1");
		this.num2 = document.getElementById("num2");
		this.buttons = document.querySelectorAll('button[data-operation]');
		this.result = document.querySelector("#resultado .operRes");
		if (!operation) {
			//generate class triggers (user interactions on inputs)
			this.mainTrigger();
		} else {
			this.operation = operation
		}
	}

	//Error management
	checkinputs() {
		let text = "";

		text += this.checkinputVaule(this.num1, 1)
		text += this.checkinputVaule(this.num2, 2)

		// adding text to result if any number is missing
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

	checkinputVaule(input, number) {
		//Removing error styles from inputs
		input.classList.remove("input-error");

		//check value for input
		if (input.value == "") {
			setTimeout(() => {
				input.classList.add("input-error");
			}, 10);
			return "Hace falta el número " + number + ".\n";
			//delay to activate (appreciate) animation sytle in case of error
		}
		return ""
	}

	//Operations


	//Button actions
	mainTrigger() {
		this.tr_auto = this.autoOperate.bind(this);
		this.num1.addEventListener("keyup", this.tr_auto, false);
		this.num2.addEventListener("keyup", this.tr_auto, false);

		this.buttons.forEach(button => {
			button.removeEventListener("click", this.tr_auto, false);
		});
		this.buttons.forEach(button => {
			button.addEventListener("click", this.tr_auto, false);
		});
	}

	autoOperate(ev) {
		this.operation = ev.srcElement.dataset.operation || this.operation
		if (this.operation != null) {
			this.checkinputs();
			switch (this.operation) {
				case 'suma':
					console.log((new Suma(this.n1, this.n2)).text)
					break;
				case 'resta':
					console.log((new Resta(this.n1, this.n2)).text)
					break;
				case 'multiplicación':
					console.log((new Multiplicación(this.n1, this.n2)).text)
					break;
				case 'división':
					console.log((new División(this.n1, this.n2).text))
					break;
				default:
					break;
			}
		}
	}

	checkbuttons(active) {
		this.buttons.forEach(button => {
			button.classList.remove("btn_selected");
			if (button.dataset.operation == active) {
				setTimeout(() => {
					button.classList.add("btn_selected");
				}, 10);
			}
		});
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
		this.checkbuttons(this.operation);
	}

	setNumbers(num1, num2) {
		this.num1.value = num1 || this.num1.value || 0
		this.num2.value = num2 || this.num2.value || 0
	}

	logResult() {
		if (!isNaN(this.res)) {
			this.res = Math.round(this.res * 100000000) / 100000000
		}
		return {
			num1: this.n1,
			num2: this.n2,
			result: this.res,
			operation: this.operation,
			text: "La " + this.operation + " entre " + this.n1 + " y " + this.n2 + " da: " + this.res

		}
	}
}

class Suma extends Calculadora {
	constructor(a, b) {
		super("suma")
		this.setNumbers(a, b)
		return this.suma()
	}

	suma() {
		if (this.checkinputs()) {
			this.res = this.n1 + this.n2;
		}
		this.write();
		return this.logResult()
	}
}

class Resta extends Calculadora {
	constructor(a, b) {
		super("resta")
		this.setNumbers(a, b)
		return this.resta()
	}

	resta() {
		if (this.checkinputs()) {
			this.res = this.n1 - this.n2;
		}
		this.write();
		return this.logResult()
	}
}

class Multiplicación extends Calculadora {
	constructor(a, b) {
		super("multiplicación")
		this.setNumbers(a, b)
		return this.multiplicación()
	}

	multiplicación() {
		if (this.checkinputs()) {
			this.res = this.n1 * this.n2;
		}
		this.write();
		return this.logResult()
	}
}

class División extends Calculadora {
	constructor(a, b) {
		super("división")
		this.setNumbers(a, b)
		return this.división()
	}

	división() {
		if (this.checkinputs()) {
			if (this.num2.value == 0) {
				this.res = "Error!. No se puede dividir por cero";
				this.write();
				return this.logResult()
			} else {
				this.res = this.n1 / this.n2;
			}
		}
		this.write();
		return this.logResult()
	}
}

addEventListener("DOMContentLoaded", (e) => {
	//Instantiate of calculadora class
	const calc = new Calculadora()

	console.log(new División(12.1, 0))
}); 