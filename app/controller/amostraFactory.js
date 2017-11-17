


angular.module('MyApp')
    .factory('amostraFactory', function() {

        const amostraSimples = (dados, erro) => {
            let amostra = []
            let dadosAmostra = geraAmostra(dados, erro)
            let tamAmostra = dadosAmostra.tamAmostra
                //Usando a Chance.js para gerar números aleatórios diferentes, que serão usados como índices do array dadosNumericos
            let indices = chance.unique(chance.integer, tamAmostra + 1, { min: 0, max: dados.length })
            indices.sort((a, b) => a - b)

            //Atribuindo ao array 'amostra' todos os números cujo indíce é igual a um número do array 'indices'
            for (let i = 0; i < tamAmostra; i++) {
                amostra.push(dados[indices[i]])
            }
            return { amostra: amostra, tamAmostra: tamAmostra }
        }

        const sistematica = (dados, erro) => {
            let amostra = []
            let dadosAmostra = geraAmostra(dados, erro);
            let tamAmostra = dadosAmostra.tamAmostra;
            var intervalo = parseInt(dados.length / tamAmostra);
            let inicio = 0;
            for (let i = 0; i < dados.length; i++) {
                if (amostra.length < tamAmostra) {
                    amostra.push(dados[inicio]);
                }
                inicio += intervalo;
            }
            return { amostra: amostra, tamAmostra: tamAmostra }
        }

        const estratificada = (dados, erro, estratos) => {
            let amostra = []
            let estratosValores = estratos.split(',')
            estratosFinal = estratosValores.map((el) => +el)
            let estratosArr = estratos.split('')
            let virgulas = estratosArr.filter((el) => el == ',')
            let numeroEstratos = virgulas.length + 1
            let dadosAmostra = geraAmostra(dados, erro)
            let tamAmostra = dadosAmostra.tamAmostra
            let proporcao = (tamAmostra / dados.length) * 100
            let totalPorEstrato = estratosFinal.map((el) => Math.round((el / proporcao) * 100))
            let totalAmostra = totalPorEstrato.reduce((r, a) => { return r + a }, 0)
            for (let i = 0; i < tamAmostra; i++) {
                amostra.push(dados[i])
            }
            return { amostra: amostra, tamAmostra: tamAmostra }
        }

        const geraAmostra = (dados, erro) => {
            let tamPopulacao = 1 / Math.pow(erro / 100, 2)
            let tamAmostra = parseInt(dados.length * tamPopulacao / (dados.length + tamPopulacao))
            return { tamPopulacao: tamPopulacao, tamAmostra: tamAmostra, }
        }
        return {
            amostraSimples: amostraSimples,
            sistematica: sistematica,
            estratificada: estratificada
        }
    });