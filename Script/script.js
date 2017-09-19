//função para adicionar itens
document.getElementById('btnElementos').onclick = function () {
	var textElementos = document.getElementById('elementos');
	
	var vetElementos = textElementos.split(/\s*;\s*/);

	//for(var i in vetElementos){
	//	console.log(vetElementos[i]);
	//}

	console.log(vetElementos.value);
}