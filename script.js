//função para pegar e adicionar itens
document.getElementById('btnElementos').onclick = function () {
	var textElementos = document.getElementById('elementos').value;
	// Pega a var elemento e divide num vetor separando por virgula
	var vetElementos = textElementos.split(',');
	// for(var i in vetElementos){
	// 	console.log(vetElementos[i]);
	// }
	console.log(vetElementos);
}

//função que calcula o censo
function calculaCenso(){
	
}