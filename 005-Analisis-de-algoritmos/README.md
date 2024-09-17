# Analisis de algoritmos

## Ejericio

Tomar 3 de los algortimos de ordenamiento y realizar un analisis para analizar su complejidad

---

### Algoritmo de ordenamiento de burbuja (Bubble sort)

La ordenación de burbuja es un algoritmo simple que ordena una lista permitiendo que los valores más bajos o más altos aparezcan en la parte inicial (depende de si se requiere orden ascendente o descendente). El algoritmo atraviesa una lista y compara valores contiguos, intercambiandolos si no están en el orden requerido.

Ejemplo:

```javascript
const desordenado = [4, 2, 6, 3, 9] // Arreglo a ordenar
```

#### Primera iteración de la lista:
- El algoritmo compara los dos primeros elementos del arreglo, 4 y 2. Los intercambia porque 2 < 4 y queda: [2, 4, 6, 3, 9]
- Compara los siguientes dos valores, 4 y 6. Como 4 < 6, estos ya están en orden, y el algoritmo continúa y queda: [2, 4, 6, 3, 9]
- Los siguientes dos valores también se intercambian porque 3 < 6 y queda: [2, 4, 3, 6, 9]
- Los dos últimos valores, 6 y 9, ya están en orden, por lo que el algoritmo no los intercambia.

El resultado final en esta iteración es
```[2, 4, 3, 6, 9]```

#### Segunda iteración de la lista:
- 2 < 4, por lo que no hay necesidad de intercambiar posiciones y queda: [2, 4, 3, 6, 9]
- El algoritmo intercambia los siguientes dos valores porque 3 < 4 y queda: [2, 3, 4, 6, 9]
- Luego no hay intercambio porque 4 < 6
- De nuevo, 6 < 9, por lo que no se produce intercambio:

El resultado final en esta iteración es
```[2, 4, 3, 6, 9]```

Visualmente la lista ya está ordenada, pero el algoritmo aún no ha comprobado, necesita revisar de nuevo todos los elementos sin intercambiar ningún valor para saber que la lista está ordenada.

#### Tercera iteración de la lista:

[2, 3, 4, 6, 9] => [2, 3, 4, 6, 9]
[2, 3, 4, 6, 9] => [2, 3, 4, 6, 9]
[2, 3, 4, 6, 9] => [2, 3, 4, 6, 9]
[2, 3, 4, 6, 9] => [2, 3, 4, 6, 9]

### Resultado
La complejidad temporal para ese algoritmo es de **O(n^2)** ya que se ejecuta el ciclo for tantas veces como el largo que sea el arreglo dentro de otro ciclo.

*Ejemplo en JavaScript*
```javascript

function ordenarPorBurbuja{
	let arreglito = [1, 4, 7, 45, 7,43, 44, 25, 6, 4, 6, 9]
	let ordenado = false;

	while(!ordenado) {
		ordenado = true;
		for(var i=0; i < arreglito.length; i++) {
			if(arreglito[i] < arreglito[i-1]) {
				let temp = arreglito[i];
				arreglito[i] = arreglito[i-1];
				arreglito[i-1] = temp;
				ordenado = false;
			}
		}
	}
	return arreglito
}

//         .d88888b.    .d88             o     .d8888b.  88b.
//        d88P" "Y88b  d88P"            d8b   d88P  Y88b "Y88b
//        888     888 d88P             d888b         888   Y88b
//        888     888 888    88888b.  d8P"Y8b      .d88P    888
//        888     888 888    888 "88b          .od888P"     888
//        888     888 Y88b   888  888         d88P"        d88P
//        Y88b. .d88P  Y88b. 888  888         888"       .d88P
//         "Y88888P"    "Y88 888  888         888888888  88P"

```




### Algoritmo de ordenamiento de conteo (Counting sort)



### Algoritmo de ordenamiento de inserción (Insertion sort)


