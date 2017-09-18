//função para adicionar itens
function ler(){
    var elementos = document.getElementById("itens").value; //get the text from a textarea with id text
    
   // var itens = elementos.split(""); // split the text using the space as a delimiter

 
	document.getElementById("ler").onclick = ler; //attach a listener to a button with Id read
 

console.log(elementos);

}