 angular.module('MyApp')
     .factory('entradaFactory', function() {

         //Verificando se os dados dados são quantitativos (números) ou qualitativos (letras)
         const verificaDados = (dados) => {
             let a = dados.map((el) => +el)
             let b = a.filter((el) => isNaN(el))
             if (a.length == b.length) {
                 return {
                     status: true,
                     type: 'a',
                     dados: dados
                 }
             }
             if (b.length === 0) {
                 return {
                     status: true,
                     type: '0',
                     dados: converteDados(dados)
                 }
             }
             return { status: false }
         }

         //Função para ordenar dados e transformar de string para number
         const converteDados = (dados) => {
             //Convertendo o vetor, usando a maravilhosa função map()
             let dadosNumericos = dados.map((el) => +el)
                 //Ordenando o vetor, usando outra marvilhosa função, a sort()
             dadosNumericos.sort((a, b) => a - b)
             return dadosNumericos
         }
         return { verificaDados: verificaDados }
     });