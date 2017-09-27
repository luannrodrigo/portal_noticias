//função para pegar e adicionar itens
document.getElementById('btnPopulacao').onclick = function AddElementos() {
	var textElementos = document.getElementById('elementos').value;	
	// Pega a var elemento e divide num vetor separando por virgula
	var vetElementos = textElementos.split(',');

	var vetComparacao = vetElementos; 

	vetElementos.sort();
	console.log(vetElementos);
}