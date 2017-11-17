 angular.module('MyApp')
     .factory('continuaFactory', function() {

         //Quantitativo - contínuo ( caso a tabela discreta tenha mais de 10/15 linhas)
         const motherShipContinua = (dadosNumericos, process) => {
             let intervaloClasse = 0
                 //Ordenando o vetor
             dadosNumericos.sort((a, b) => a - b)
                 //Amplitude - passo 1
             let amplitude = dadosNumericos[dadosNumericos.length - 1] - dadosNumericos[0]

             //Classe - passo 2
             let classes = []

             //Calculando as opções para classe
             classes[0] = parseInt(Math.sqrt(dadosNumericos.length)) - 1
             classes[1] = parseInt(Math.sqrt(dadosNumericos.length))
             classes[2] = parseInt(Math.sqrt(dadosNumericos.length)) + 1

             let amplitudeClasse = amplitude + 1
             do {
                 if (amplitudeClasse % classes[0] === 0) {
                     totalClasses = classes[0]
                     intervaloClasse = amplitudeClasse / classes[0]
                     break
                 }
                 if (amplitudeClasse % classes[1] === 0) {
                     totalClasses = classes[1]
                     intervaloClasse = amplitudeClasse / classes[1]
                     break
                 }
                 if (amplitudeClasse % classes[2] === 0) {
                     totalClasses = classes[2]
                     intervaloClasse = amplitudeClasse / classes[2]
                     break
                 }
                 amplitudeClasse++
             } while (true)
             dadosNumericos.sort((a, b) => a - b)
             let classesContinua = tabelaQuantitativaContinua(dadosNumericos, intervaloClasse)
             let medidasQuantitativaContinua = medidasQuantitativaContinuaFunction(classesContinua, dadosNumericos)
             let somaFi = medidasQuantitativaContinua.somaFi
             let somaXifi = medidasQuantitativaContinua.somaXifi
             let media = mediaFunction(somaXifi, somaFi)
             let classesMediana = classesMedianaFunction(classesContinua, dadosNumericos)
             let classeMediana = classesMediana.classeMediana
             let classeAnterior = classesMediana.classeAnterior
             let posicao = classesMediana.posicao
             let mediana = medianaFunction(classeMediana, classeAnterior, intervaloClasse, posicao)
             let classesModa = classesModaFunction(classesContinua)
             let classeModal = classesModa.classeModal
             let classeAntModal = classesModa.classeAntModal
             let classePosModal = classesModa.classePosModal
             let modaSimples = modaSimplesFunction(classeModal)
             let modaPearson = modaPearsonFunction(mediana, media)
             let modaKing = modaKingFunction(classeAntModal, classeModal, classePosModal, intervaloClasse)
             let modaCzuber = modaCzuberFunction(classeAntModal, classeModal, classePosModal, intervaloClasse)
             let variancia = varianciaFunction(dadosNumericos, classesContinua, media, process)
             let desvio = desvioFunction(variancia)
             let coeficiente = coeficienteFunction(desvio, variancia)
             return {
                 classesContinua: classesContinua,
                 media: media,
                 mediana: mediana,
                 modaSimples: modaSimples,
                 modaKing: modaKing,
                 modaCzuber: modaCzuber,
                 modaPearson: modaPearson,
                 desvio: desvio,
                 coeficiente: coeficiente,
                 intervaloClasse: intervaloClasse
             }
         }

         /*Criando um vetor onde de objetos onde cada objeto conterá um objeto com 8 propriedades:
          *id da classe
          *faixa de intervalo da classe
          *frequência em cada intervalo
          *frequência relativa porcentual do intervalo
          *frequencia acumulada
          *frequencia acumulada porcentual
          *xi
          *xifi
          */
         const tabelaQuantitativaContinua = (dadosNumericos, intervaloClasse) => {
             let classesContinua = []
             let limiteInferior = dadosNumericos[0] //O limite inferior da primeira classe será o primeiro elemento de 'dadosNumericos'
             let frequencia = 0 //Frequência em cada faixa de intervalo
                 //var inicio = dadosNumericos[0]
             let final = limiteInferior + intervaloClasse
             for (let i = 0; i < totalClasses; i++) { //Repetição para criação dos objetos que serão as classes
                 for (let j = 0; j < dadosNumericos.length + 1; j++) { //Repetição para contar os números em cada faixa de intervalo
                     if (dadosNumericos[j] >= limiteInferior && dadosNumericos[j] < final) {
                         frequencia++
                     }
                 }
                 classesContinua.push({
                     id: i + 1,
                     faixa: limiteInferior,
                     freqFaixa: frequencia,
                     freqRPFaixa: (frequencia / dadosNumericos.length) * 100,
                     freqA: frequencia
                 })
                 if (classesContinua[i - 1] !== undefined) {
                     classesContinua[i].freqA = classesContinua[i - 1].freqA + classesContinua[i].freqFaixa
                     classesContinua[i].freqAP = (classesContinua[i].freqA / dadosNumericos.length) * 100 
                 }
                 classesContinua[i].xi = (limiteInferior + final) / 2
                 classesContinua[i].xiFi = classesContinua[i].freqFaixa * classesContinua[i].xi
                 final += intervaloClasse
                 limiteInferior += intervaloClasse
                 frequencia = 0
             }
             classesContinua[0].freqAP = classesContinua[0].freqRPFaixa
             return classesContinua
         }

         //Média, moda e mediana quantitativa contínua
         const medidasQuantitativaContinuaFunction = (classesContinua, dadosNumericos) => {
             let valoresContinua = {}
                 //IntervaloClasse
             let intervaloClasse = classesContinua[1].faixa - classesContinua[0].faixa

             //Média, modas e mediana (quantitativa contínua)
             //Média
             //Usando a função reduce() para somar os xifi e xi de todas as classes
             let somaXifi = classesContinua.reduce((r, a) => { return r + a.xiFi }, 0)
             let somaFi = classesContinua.reduce((r, a) => { return r + a.freqFaixa }, 0)
             return { somaFi: somaFi, somaXifi: somaXifi }
         }

         const mediaFunction = (somaXifi, somaFi) => somaXifi / somaFi

         //Mediana
         //Passo 1 - achar a classe da mediana
         //Achar a posição 
         //Passo 2 - achar a classe
         const classesMedianaFunction = (classesContinua, dadosNumericos) => {
             let posicao = dadosNumericos.length / 2
             let classeZero = { 'freqFaixa': 0, 'freqA': 0 }
             let classeAnterior = {}
             let classeMediana = {}
             let classePosterior = {}
             for (i = 0; i < classesContinua.length; i++) {
                 if (classesContinua[i].freqA <= posicao) {
                     classeAnterior = classesContinua[i - 1] || classeZero
                     classeMediana = classesContinua[i]
                     classePosterior = classesContinua[i + 1] || classeZero
                 }
             }
             return {
                 classeAnterior: classeAnterior,
                 classeMediana: classeMediana,
                 classePosterior: classePosterior,
                 posicao: posicao
             }
         }

         //Calculando a mediana
         const medianaFunction = (classeMediana, classeAnterior, intervaloClasse, posicao) => classeMediana.faixa + ((posicao - classeAnterior.freqA) / classeMediana.freqFaixa) * intervaloClasse

         //Achando os valores para o cálculo das modas
         const classesModaFunction = (classesContinua) => {
             let maior = 0
             let classeZero = { 'freqFaixa': 0, 'freqA': 0 }
             let classeAntModal = {}
             let classeModal = {}
             let classePosModal = {}
             for (let i = 0; i < classesContinua.length; i++) {
                 if (classesContinua[i].freqFaixa > maior) {
                     maior = classesContinua[i].freqFaixa
                     classeAntModal = classesContinua[i - 1] || classeZero
                     classeModal = classesContinua[i]; //Achando a classe modal (maior frequência)
                     classePosModal = classesContinua[i + 1] || classeZero
                 }
             }
             return {
                 classeAntModal: classeAntModal,
                 classeModal: classeModal,
                 classePosModal: classePosModal
             }
         }

         //Moda modaSimples
         const modaSimplesFunction = (classeModal) => classeModal.xi

         //Moda Pearson
         const modaPearsonFunction = (mediana, media) => 3 * mediana - 2 * media

         //Moda King
         const modaKingFunction = (classeAntModal, classeModal, classePosModal, intervaloClasse) => classeModal.faixa + (classePosModal.freqFaixa / (classeAntModal.freqFaixa + classePosModal.freqFaixa) * intervaloClasse)

         //Moda Czuber
         const modaCzuberFunction = (classeAntModal, classeModal, classePosModal, intervaloClasse) => classeModal.faixa + ((classeModal.freqFaixa - classeAntModal.freqFaixa) / (2 * classeModal.freqFaixa - (classeAntModal.freqFaixa + classePosModal.freqFaixa)) * intervaloClasse)

         //Medidas dispersão 
         //Cálculo da variância
         const varianciaFunction = (dadosNumericos, classesContinua, media, process) => {
             for (let i = 0; i < classesContinua.length; i++) {
                 classesContinua[i].varianciaClasse = Math.pow((classesContinua[i].xi - media), 2) * classesContinua[i].freqFaixa
             }
             let somaVariancia = classesContinua.reduce((r, a) => { return r + a.varianciaClasse }, 0)
             if (process == 'censo') {
                 return somaVariancia / dadosNumericos.length
             } else if (process == 'amostra') {
                 return somaVariancia / (dadosNumericos.length - 1)
             }
         }

         //Cálculo do desvio padrão
         const desvioFunction = (variancia) => Math.sqrt(variancia)

         //Coeficiente de variância
         const coeficienteFunction = (desvio, variancia) => (desvio / variancia) * 100

         return { motherShipContinua: motherShipContinua }
     });