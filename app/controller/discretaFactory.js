module.exports = function(app){
         //Tabela da discreta
         //Se tiver mais que 10/15 linhas, os processos de quantitativa contínua serão chamados
         //Serve para achar os números que aparecem em um hall e a quantidade de cada um
         //Lista de objetos pode ser usada tanto para as tabelas quanto para achar a moda da quantitativa discreta
         /*Cada índice de 'numerosDigitados' conterá um objeto com as propriedades:
             -valor
             -frequencia
             -frequencia relativa porcentual
             -frequencia acumulada
             -frequencia acumulada porcentual */

             app.get('/discreta', function(req, res){
                res.render("home/index");
            });
             const motherShipDiscreta = (dadosNumericos, process) => {
             let numerosDigitados = [] //Criando um vetor para armazenar os valores que aparecem
             console.log(dadosNumericos)
             for (let i = 0; i < dadosNumericos.length; i++) {
                 if (dadosNumericos[i] != dadosNumericos[i - 1]) {
                     numerosDigitados.push({
                         valor: dadosNumericos[i],
                         frequencia: 1
                     })
                 } else if (dadosNumericos[i] == dadosNumericos[i - 1]) {
                     numerosDigitados[numerosDigitados.length - 1].frequencia++
                 }
                 numerosDigitados[numerosDigitados.length - 1].freqR = (numerosDigitados[numerosDigitados.length - 1].frequencia / dadosNumericos.length) * 100
                 numerosDigitados[numerosDigitados.length - 1].freqA = numerosDigitados[numerosDigitados.length - 1].frequencia
                 numerosDigitados[numerosDigitados.length - 1].freqAP = numerosDigitados[numerosDigitados.length - 1].freqR
             }
             numerosDigitados.sort((a, b) => a.valor - b.valor)
             for (let i = 0; i < numerosDigitados.length; i++) {
                 if (numerosDigitados[i - 1] !== undefined) {
                     numerosDigitados[i].freqA = numerosDigitados[i - 1].freqA + numerosDigitados[i].frequencia
                     numerosDigitados[i].freqAP = numerosDigitados[i - 1].freqAP +
                     numerosDigitados[i].freqR
                 }
             }
             if (numerosDigitados.length <= 10) {
                 let media = mediaFunction(dadosNumericos)
                 let moda = modaFunction(numerosDigitados)
                 let mediana = medianaFunction(dadosNumericos)
                 let variancia = varianciaFunction(dadosNumericos, numerosDigitados, media, process)
                 let desvio = desvioFunction(variancia)
                 let coeficiente = coeficienteFunction(desvio, variancia)
                 return {
                     numerosDigitados: numerosDigitados,
                     media: media,
                     moda: moda,
                     mediana: mediana,
                     variancia: variancia,
                     desvio: desvio,
                     coeficiente: coeficiente
                 }
             } else {
                 return { numerosDigitados: numerosDigitados }
             }
         }

         //Média discreta
         const mediaFunction = (dadosNumericos) => {
             //A função reduce(), muito útil, serve para somar todos os itens de um vetor
             let soma = dadosNumericos.reduce((a, b) => a + b)
             return parseFloat(soma) / parseFloat(dadosNumericos.length)
         }

         //Moda
         const modaFunction = (numerosDigitados) => {
             //Ordenando o vetor de objetos usando a propriedade 'frequencia' como parâmetro
             let numeros = numerosDigitados //Atribuindo o vetor numerosDigitados a outro com um nome menor
             numeros.sort((a, b) => a.frequencia - b.frequencia)
                 //Verificando se o hall é modal, bimodal ou amodal
                 if (numeros[numeros.length - 2].frequencia != numeros[numeros.length - 1].frequencia) {
                     return numeros[numeros.length - 1].valor
                 } else if ((numeros[numeros.length - 2].frequencia == numeros[numeros.length - 1].frequencia) &&
                     numeros[numeros.length - 2].frequencia != numeros[numeros.length - 3].frequencia) {
                     let moda1 = numeros[numeros.length - 1].valor
                     let moda2 = numeros[numeros.length - 2].valor
                     return [moda1, moda2]
                 }
             }

         //Mediana
         const medianaFunction = (dadosNumericos) => {
             if (dadosNumericos.length % 2 === 0) {
                 let mediana1 = dadosNumericos[(dadosNumericos.length / 2) - 1]
                 let mediana2 = dadosNumericos[(dadosNumericos.length / 2)]
                 return (parseFloat(mediana1) + parseFloat(mediana2)) / 2
             } else {
                 return dadosNumericos[((dadosNumericos.length + 1) / 2) - 1]
             }

         }

         //Medidas dispersão 
         //Cálculo da variância
         const varianciaFunction = (dadosNumericos, numerosDigitados, media, process) => {
             for (let i = 0; i < numerosDigitados.length; i++) {
                 numerosDigitados[i].varianciaFaixa = Math.pow((numerosDigitados[i].valor - media), 2) * numerosDigitados[i].frequencia
             }
             let somaVariancia = numerosDigitados.reduce((r, a) => { return r + a.varianciaFaixa }, 0)
             if (process == 'censo') {
                 return somaVariancia / dadosNumericos.length
             } else
             if (process == 'amostra') {
                 return somaVariancia / (dadosNumericos.length - 1)
             }
         }

         //Cálculo do desvio padrão
         const desvioFunction = (variancia) => Math.sqrt(variancia)

         //Coeficiente de variância
         const coeficienteFunction = (desvio, variancia) => (desvio / variancia) * 100

         return { motherShipDiscreta: motherShipDiscreta }
     }