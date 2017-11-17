angular.module('MyApp')
    .factory('probabilidadesFactory', function() {


        //Função para validação dos dados inseridos manualmente para o cálculo da distribuição normal
        const validateInterval = (dadosNumericos, valorUm, valorDois) => {
            let hall = dadosNumericos.sort((a, b) => a - b)
            if (valorUm == null) {
                valorUm = valorDois
                valorDois = null
                if (valorUm >= hall[0] && valorUm <= hall[hall.length - 1]) {
                    return true
                }
            } else {
                if (valorUm >= hall[0] && valorDois <= hall[hall.length - 1]) {
                    return true
                }
            }
            return false
        }

        const distribuicaoNormal = (valor) => {
            let data = valor.split(',')
            let numericArr = data.map((el) => +el)
            return numericArr
        }

        const normalMaiorQueX = (numericArr, table, media, desvio) => {
                let padronizado = Math.abs((numericArr[0] - media) / desvio)
                let linha = parseInt((padronizado) * 10)
                let coluna = (padronizado.toFixed(2) * 100) % 10
                if (numericArr[0] < media) {
                    return Math.abs(((table[39][0] + table[linha][coluna]) * 100).toFixed(2))
                } else {
                    return Math.abs(((table[39][0] - table[linha][coluna]) * 100).toFixed(2))
                }
            } //OK

        const normalMenorQueX = (numericArr, table, media, desvio) => {
                let padronizado = Math.abs((numericArr[0] - media) / desvio)
                let linha = parseInt((padronizado) * 10)
                let coluna = (padronizado.toFixed(2) * 100) % 10
                if (numericArr[0] < media) {
                    return Math.abs((1 - ((table[39][0] + table[linha][coluna]) * 100)).toFixed(2))
                } else {
                    return Math.abs(((table[39][0] - table[linha][coluna]) * 100).toFixed(2))
                }
            } //OK

        const normalEntreXEY = (numericArr, table, media, desvio) => {
                let padronizadoUm = Math.abs((numericArr[0] - media) / desvio)
                let linhaUm = parseInt((padronizadoUm) * 10)
                let colunaUm = (padronizadoUm.toFixed(2) * 100) % 10
                let padronizadoDois = Math.abs((numericArr[1] - media) / desvio)
                let linhaDois = parseInt((padronizadoDois) * 10)
                let colunaDois = (padronizadoDois.toFixed(2) * 100) % 10
                if (numericArr[0] < media) {
                    return Math.abs(((table[linhaDois][colunaDois] + table[linhaUm][colunaUm]) * 100).toFixed(2))
                } else {
                    return Math.abs(((table[linhaDois][colunaDois] - table[linhaUm][colunaUm]) * 100).toFixed(2))
                }
            } //OK


        const distribuicaoBinomial = (dadosNumericos, valor) => {
            let data = valor.split(',')
            let numericArr = data.map((el) => +el)
            let tamanho = dadosNumericos.length
            return {
                numericArr: numericArr,
                tamanho: tamanho
            }
        }

        const exatamenteX = (tamanho, sucesso, fracasso, numericArr) => {
            let fatorialResult = (math.combinations(tamanho, numericArr[0]))
            let success = sucesso / 100
            let fail = fracasso / 100
            return (fatorialResult * (Math.pow(success, numericArr[0])) * (Math.pow(fail, (tamanho - numericArr[0])))) * 100
        }

        const maiorQueX = (tamanho, sucesso, fracasso, numericArr) => {
            let result = 0
            let fatorialResult = 0
            let success = sucesso / 100
            let fail = fracasso / 100
            for (let i = numericArr[0] + 1; i < tamanho + 1; i++) {
                fatorialResult = (math.combinations(tamanho, i))
                result += (fatorialResult * (Math.pow(success, i)) * (Math.pow(fail, (tamanho - i)))) * 100
            }
            return result
        }

        const menorQueX = (tamanho, sucesso, fracasso, numericArr) => {
            let result = 0
            let fatorialResult = 0
            let success = sucesso / 100
            let fail = fracasso / 100
            for (let i = 0; i < numericArr[0]; i++) {
                fatorialResult = (math.combinations(tamanho, i))
                result += (fatorialResult * (Math.pow(success, i)) * (Math.pow(fail, (tamanho - i)))) * 100
            }
            return result
        }

        const peloMenosX = (tamanho, sucesso, fracasso, numericArr) => {
            let result = 0
            let fatorialResult = 0
            let success = sucesso / 100
            let fail = fracasso / 100
            for (let i = numericArr[0]; i < tamanho + 1; i++) {
                fatorialResult = (math.combinations(tamanho, i))
                result += (fatorialResult * (Math.pow(success, i)) * (Math.pow(fail, (tamanho - i)))) * 100
            }
            return result
        }

        const maximoX = (tamanho, sucesso, fracasso, numericArr) => {
            let result = 0
            let fatorialResult = 0
            let success = sucesso / 100
            let fail = fracasso / 100
            for (let i = 0; i < numericArr[0] + 1; i++) {
                fatorialResult = (math.combinations(tamanho, i))
                result += (fatorialResult * (Math.pow(success, i)) * (Math.pow(fail, (tamanho - i)))) * 100
            }
            return result
        }

        const entreXEY = (tamanho, sucesso, fracasso, numericArr) => {
            let result = 0
            let fatorialResult = 0
            let success = sucesso / 100
            let fail = fracasso / 100
            for (let i = numericArr[0] + 1; i < numericArr[1]; i++) {
                fatorialResult = (math.combinations(tamanho, i))
                result += (fatorialResult * (Math.pow(success, i)) * (Math.pow(fail, (tamanho - i)))) * 100
            }
            return result
        }

        const deXAY = (tamanho, sucesso, fracasso, numericArr) => {
            let result = 0
            let fatorialResult = 0
            let success = sucesso / 100
            let fail = fracasso / 100
            for (let i = numericArr[0]; i < numericArr[1] + 1; i++) {
                fatorialResult = (math.combinations(tamanho, i))
                result += (fatorialResult * (Math.pow(success, i)) * (Math.pow(fail, (tamanho - i)))) * 100
            }
            return result
        }

        const deXAteY = (tamanho, sucesso, fracasso, numericArr) => {
            let result = 0
            let fatorialResult = 0
            let success = sucesso / 100
            let fail = fracasso / 100
            for (let i = numericArr[0]; i < numericArr[1]; i++) {
                fatorialResult = (math.combinations(tamanho, i))
                result += (fatorialResult * (Math.pow(success, i)) * (Math.pow(fail, (tamanho - i)))) * 100
            }
            return result
        }

        const intervaloConfianca = (table, dadosNumericos, tamAmostra, porcentagem, desvio, process) => {
            console.log(process)
            if (process == 'amostra') {
                let tamanho = dadosNumericos.length
                let erroPadrao = (porcentagem / 100) / 2
                let anteDecimal = 0
                let posDecimal = 0
                for (let lin in table) {
                    for (let col in table) {
                        if (table[lin][col] <= erroPadrao) {
                            anteDecimal = lin
                            posDecimal = col
                        }
                    }
                }
                let padronizado = anteDecimal / 10 + posDecimal / 100
                return padronizado * (desvio / Math.sqrt(tamAmostra)) * Math.sqrt((tamanho - tamAmostra) / (tamanho - 1))
            } else {
                return 0
            }
        }

        return {
            distribuicaoNormal: distribuicaoNormal,
            normalMaiorQueX: normalMaiorQueX,
            normalEntreXEY: normalEntreXEY,
            normalMenorQueX: normalMenorQueX,
            distribuicaoBinomial: distribuicaoBinomial,
            exatamenteX: exatamenteX,
            maiorQueX: maiorQueX,
            menorQueX: menorQueX,
            maximoX: maximoX,
            entreXEY: entreXEY,
            deXAY: deXAY,
            deXAteY: deXAteY,
            intervaloConfianca: intervaloConfianca
        }
    });