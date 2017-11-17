angular.module('MyApp')
    .factory('qualitativaFactory', function() {

        //Qualitativo
        const tabelaQualitativa = (dados, hierarquia) => {
            let qualitativos = []
                //Ordenação do vetor em ordem alfabética ( nominal)
            dados = dados.map((el) => el.toUpperCase())
            if (hierarquia === undefined) {
                dados.sort()
            } else {
                let resultado = []
                let ordem = hierarquia.split(',')
                ordem = ordem.map((el) => el.toUpperCase())
                for (let i = 0; i < ordem.length; i++) {
                    for (let j = 0; j < dados.length; j++) {
                        if (dados[j] == ordem[i]) {
                            resultado.push(dados[j])
                        }
                    }
                }
                dados = resultado
            }
            for (let i = 0; i < dados.length; i++) {
                if (dados[i] != dados[i - 1]) {
                    qualitativos.push({
                        valor: dados[i],
                        frequencia: 1,
                    })
                } else if (dados[i] == dados[i - 1]) {
                    qualitativos[qualitativos.length - 1].frequencia++
                }
                qualitativos[qualitativos.length - 1].freqR = (qualitativos[qualitativos.length - 1].frequencia / dados.length) * 100
                qualitativos[qualitativos.length - 1].freqA = qualitativos[qualitativos.length - 1].frequencia
                qualitativos[qualitativos.length - 1].freqAP = qualitativos[qualitativos.length - 1].freqR
            }
            for (let i = 0; i < qualitativos.length; i++) {
                if (qualitativos[i - 1] !== undefined) {
                    qualitativos[i].freqA = qualitativos[i - 1].freqA + qualitativos[i].frequencia
                    qualitativos[i].freqAP = qualitativos[i - 1].freqAP +
                        qualitativos[i].freqR
                }
            }
            return { qualitativos: qualitativos } 
        }
        return { tabelaQualitativa: tabelaQualitativa }
    });