/*função para pegar e adicionar itens
document.getElementById('btnPopulacao').onclick = function AddElementos(vetElementos) {
	var textElementos = document.getElementById('elementos').value;	
	// Pega a var elemento e divide num vetor separando por virgula
	var vetElementos = textElementos.split(',');
	return vetElementos
}
*/


/*int i, j, k*/
/*
function NumerosRepetidos(){
	var vetor = [1,2,3,2,2,3,4,5,6];
	var Repetidos = [];
	var Repeticoes = [];
// verificando quando o numero parece
	for (var i = 0; i < vetor.length; i++) {
		for (var j = 0; j <= i; j++) {
			if (vetor[i] == Repetidos[j]) {
				Repeticoes[j]++;
			} else if (Repetidos[j] == -2) {
				Repetidos[j] = vetor[i];
			}
		}


		if ( vetor[i] < 0 || i >= vetor.length) {
			for (var k = 0; k < i; k++) {
				if (Repeticoes[k] != 1 && Repetidos[k] != -2) {

					console.log("O numero " + Repetidos[k] + " " + Repeticoes[k]);
				}
			}
		}
	}
}
NumerosRepetidos();*/


// População Calculo

function calculoSenso(){
	var num = [];

	for (var i = 0; i < 10; i++) {
		num.push(prompt('Entre com o numero ' + (i+1)));
	}

console.log(num);
}
calculoSenso();
