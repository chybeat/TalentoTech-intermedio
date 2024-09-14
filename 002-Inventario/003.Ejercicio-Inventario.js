/*
Ejercicio:
Usando clases realizar una interfaz de trabajo para un inventario
Inventario
	Utilies escolares (en papeleria)

*/

class Inventario {
	constructor(msgArea, tableArea) {
		this.productos = []
		//cada producto es una instancia de la clase producto aqui solo se genera la variable
		this.msgArea = msgArea;
		this.tableArea = tableArea;
	}

	agregarProducto(nombre, cantidad, precio) {
		const nuevoProducto = new Producto(nombre, parseFloat(cantidad), precio);
		this.productos.push(nuevoProducto);
		this.escribirMensaje(`Agregados ${cantidad} ${nombre} al inventario. El precio unitario es de $${precio}`)
		this.mostrar()
	}

	adquirirProducto(nombre, cantidad, precio) {
		const producto = this.productos.find(prod => prod.nombre === nombre);
		if (producto) {
			producto.cantidad = parseFloat(producto.cantidad) + parseFloat(cantidad)
			const n_precio = (parseFloat(producto.precio) + parseFloat(precio)) / 2
			producto.precio = n_precio
			if (n_precio != producto.precio) {
				this.escribirMensaje(`El precio de venta cambió, ahora es de $${n_precio}`)
			}
			this.escribirMensaje(`Ahora tienes ${producto.cantidad} de ${producto.nombre}`)
			this.mostrar()
		} else {
			this.agregarProducto(nombre, cantidad, precio)
		}
	}

	escribirMensaje(msg) {
		this.msgArea.parentNode.classList.remove("new-message");
		this.msgArea.textContent = msg
		setTimeout(() => {
			this.msgArea.parentNode.classList.add("new-message");
		}, 10);

	}

	eliminarProducto(element) {
		let nombre = ''
		if (typeof element == 'object') {
			nombre = element.srcElement.dataset.element

		} else if (typeof element == 'string') {
			nombre = element
		} else {
			return
		}
		const index = this.productos.findIndex(prod => prod.nombre === nombre);
		if (index !== -1) {
			this.productos.splice(index, 1);
			this.escribirMensaje(`Eliminado ${nombre} del inventario.`);
		} else {
			this.escribirMensaje(`No existe ${nombre} en el inventario.`);
		}
		this.mostrar()
	}

	mostrar() {
		let data = ''
		this.productos.forEach(producto => {
			const info = producto.estado()
			const prodData = `<td>${info.nombre}</td><td>$${info.precio}</td><td>${info.cantidad}</td>`
			const action = `<td><button class="button inventario-eliminar" data-element="${info.nombre}")>Eliminar</button></td>`;
			data += `<tr>${prodData}${action}</tr>`;
		});
		this.tableArea.innerHTML = data
		this.updateButtons()
	}

	updateButtons() {
		this.tr_eliminar = this.eliminarProducto.bind(this);
		const delButtons = document.querySelectorAll(".inventario-eliminar")
		delButtons.forEach((button) => {
			button.addEventListener("click", this.tr_eliminar, false);
		})
	}


	reducir(nombre, cantidad) {
		const producto = this.productos.find(prod => prod.nombre === nombre);
		producto.cantidad -= cantidad
	}

}

class venta {
	constructor(inventario) {
		this.inventario = inventario
	}

	producto(nombre, cantidad) {
		const producto = this.inventario.productos.find(prod => prod.nombre === nombre);
		if (producto) {
			this.inventario.reducir(nombre, cantidad)
			const valor = producto.precio * cantidad
			console.log(`La venta es de $${(valor)}`)
		} else {
			console.log(`No se encontró ${nombre}. Verifica el nombre o no recibas el dinero. XD`)
		}
	}
}


class Producto {
	constructor(nombre, cantidad, precio) {
		this.nombre = nombre
		this.cantidad = cantidad
		this.precio = precio
	}

	estado() {
		return this
	}
}


window.addEventListener("DOMContentLoaded", (e) => {
	areaMensaje = document.getElementById('mensaje')
	areaTabla = document.querySelector('#tabla tbody')

	const inv = new Inventario(
		areaMensaje,
		areaTabla
	)
	inv.agregarProducto("Lapiz", 20, 1300)
	inv.agregarProducto("Hojas", 500, 200)
	inv.agregarProducto("Cuadernos", 15, 8000)

	const formAddProd = document.getElementById("agregar-producto")
	formAddProd.onsubmit = (ev) => {
		ev.preventDefault();
		const formToObject = form => Object.fromEntries(new FormData(form));
		data = formToObject(formAddProd)
		inv.adquirirProducto(data.nombre, data.cantidad, data.precio)
	}

})


//inv.adquirirProducto("Tajalapiz", 15, 1500)
//Agregar Tajalapiz
//inv.agregarProducto("Tajalapiz", 15, 1500)

//inv.mostrar()

//const vender = new venta(inv)
//vender.producto("Lapiz", 2)

//inv.eliminarProducto("Lapiz")
//inv.mostrar()
