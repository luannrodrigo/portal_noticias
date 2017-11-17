angular.module('MyApp')
    .controller('entradaController', function($rootScope, $scope, $window, entradaFactory, discretaFactory, continuaFactory, $state, qualitativaFactory, amostraFactory, probabilidadesFactory) {

        $scope.censo = function() {
            if ($scope.entrada == undefined) return
            let result = entradaFactory.verificaDados($scope.entrada.split(','))
            if (result.status == false) {
                alert('Oops, temos um erro!')
                return
            }
            $rootScope.process = 'censo'
            if (result.type == '0') {
                $rootScope.dadosNumericos = result.dados
                let discreta = discretaFactory.motherShipDiscreta($rootScope.dadosNumericos, $rootScope.process)
                let numerosDigitados = discreta.numerosDigitados
                typeZero($rootScope.dadosNumericos, numerosDigitados, discreta, $rootScope.process)
            } else if (result.type == 'a') {
                $rootScope.dados = result.dados
                $state.go('organizacao')
            }
        }

        $scope.amostraSimples = function() {
            if ($scope.entrada == undefined) return
            if ($scope.erro == undefined) return
            let result = entradaFactory.verificaDados($scope.entrada.split(','))
            if (result.status == false) {
                alert('Oops, temos um erro!')
                return
            }
            $rootScope.process = 'amostra'
            if (result.type == '0') {
                $rootScope.dadosNumericos = result.dados
                let dadosAmostra = amostraFactory.amostraSimples($rootScope.dadosNumericos, $scope.erro)
                let amostra = dadosAmostra.amostra
                $rootScope.tamAmostra = dadosAmostra.tamAmostra
                let discreta = discretaFactory.motherShipDiscreta(amostra, $rootScope.process)
                let numerosDigitados = discreta.numerosDigitados
                typeZero($rootScope.dadosNumericos, numerosDigitados, discreta, $rootScope.process)
            } else if (result.type == 'a') {
                let amostra = amostraFactory.amostraSimples(result.dados, $scope.erro)
                $rootScope.dados = amostra
                $state.go('organizacao')
            }
        }

        $scope.amostraSistematica = function() {
            if ($scope.entrada == undefined) return
            if ($scope.erro == undefined) return
            let result = entradaFactory.verificaDados($scope.entrada.split(','))
            if (result.status == false) {
                alert('Oops, temos um erro!')
                return
            }
            $rootScope.process = 'amostra'
            if (result.type == '0') {
                $rootScope.dadosNumericos = result.dados
                let dadosAmostra = amostraFactory.amostraSimples($rootScope.dadosNumericos, $scope.erro)
                let amostra = dadosAmostra.amostra
                $rootScope.tamAmostra = dadosAmostra.tamAmostra
                let discreta = discretaFactory.motherShipDiscreta(amostra, $rootScope.process)
                let numerosDigitados = discreta.numerosDigitados
                typeZero($rootScope.dadosNumericos, numerosDigitados, discreta, $rootScope.process)
            } else if (result.type == 'a') {
                let amostra = amostraFactory.sistematica(result.dados, $scope.erro)
                $rootScope.dados = amostra
                $state.go('organizacao')
            }
        }

        $scope.amostraEstratificada = function() {
            if ($scope.entrada == undefined) return
            if ($scope.erro == undefined) return
            if ($scope.estratos == undefined) return
            let result = entradaFactory.verificaDados($scope.entrada.split(','))
            if (result.status == false) {
                alert('Oops, temos um erro!')
                return
            }
            $rootScope.process = 'amostra'
            if (result.type == '0') {
                $rootScope.dadosNumericos = result.dados
                let dadosAmostra = amostraFactory.amostraSimples($rootScope.dadosNumericos, $scope.erro)
                let amostra = dadosAmostra.amostra
                $rootScope.tamAmostra = dadosAmostra.tamAmostra
                let discreta = discretaFactory.motherShipDiscreta(amostra, $rootScope.process)
                let numerosDigitados = discreta.numerosDigitados
                typeZero($rootScope.dadosNumericos, numerosDigitados, discreta, $rootScope.process)
            } else if (result.type == 'a') {
                let amostra = amostraFactory.estratificada(result.dados, $scope.erro, $scope.estratos)
                $rootScope.dados = amostra
                $state.go('organizacao')
            }
        }

        //Função que verifica se o hall inserido é discreto ou contínuo, e chama as funções necessárias para os respectivos cálculos
        const typeZero = (dadosNumericos, numerosDigitados, discreta, process) => {
            if (numerosDigitados.length > 10) {
                let continua = continuaFactory.motherShipContinua(dadosNumericos, process)
                $rootScope.tabelaContinua = continua.classesContinua
                $rootScope.media = continua.media.toFixed(2)
                $rootScope.mediana = continua.mediana.toFixed(2)
                $rootScope.modaSimples = continua.modaSimples.toFixed(2)
                $rootScope.modaKing = continua.modaKing.toFixed(2)
                $rootScope.modaPearson = continua.modaPearson.toFixed(2)
                $rootScope.modaCzuber = continua.modaCzuber.toFixed(2)
                $rootScope.desvio = continua.desvio.toFixed(2)
                $rootScope.coeficiente = continua.coeficiente.toFixed(2)
                $rootScope.intervalo = continua.intervaloClasse
                $rootScope.tabelaContinua.sort((a, b) => a.valor - b.valor)
                window.tabelaContinua = $rootScope.tabelaContinua
                $state.go('continua-dash')
            } else if (numerosDigitados.length <= 10) {
                $rootScope.tabelaDiscreta = numerosDigitados
                $rootScope.media = discreta.media.toFixed(2)
                $rootScope.moda = discreta.moda
                $rootScope.mediana = discreta.mediana.toFixed(2)
                $rootScope.variancia = discreta.variancia.toFixed(2)
                $rootScope.desvio = discreta.desvio.toFixed(2)
                $rootScope.coeficiente = discreta.coeficiente.toFixed(2)
                $rootScope.tabelaDiscreta.sort((a, b) => a.valor - b.valor)
                window.tabelaDiscreta = $rootScope.tabelaDiscreta
                $state.go('discreta-dash')
            }
        }

        $scope.goBack = function() {
            $window.history.back()
        }

        $scope.showDataQualitativa = function() {
            let hierarquia = $scope.hierarquia
            let qualitativa = qualitativaFactory.tabelaQualitativa($rootScope.dados, hierarquia)
            $rootScope.tabelaQualitativa = qualitativa.qualitativos
            window.tabelaQualitativa = qualitativa.qualitativos
            $state.go('qualitativa-dash')
        }

        //Visualização dos dados ( gráficos )
        if (window.tabelaQualitativa && $state.current.url == '/qualitativa-dash') {
            google.charts.load('current', { 'packages': ['corechart'] })
            google.charts.setOnLoadCallback(
                function() {
                    var arr = []
                    arr[0] = ['Valor', 'Frequência']
                    for (var i = 0; i < window.tabelaQualitativa.length; i++) {
                        arr.push([window.tabelaQualitativa[i].valor, window.tabelaQualitativa[i].frequencia])
                    }
                    var data = google.visualization.arrayToDataTable(arr)

                    var options = {
                        pieHole: 0.5,
                        chartArea: {
                            width: '100%',
                            height: '100%'
                        }
                    }

                    var chart = new google.visualization.PieChart(document.getElementById('chart'))

                    chart.draw(data, options)
                }
            )
        }

        if (window.tabelaDiscreta && $state.current.url == '/discreta-dash') {
            google.charts.load('current', { 'packages': ['corechart', 'bar'] })
            google.charts.setOnLoadCallback(
                function() {
                    var arrDiscreta = []
                    arrDiscreta[0] = ['Valor', 'Frequência', { role: 'style' }]
                    var colors = ['blue', 'red', 'pink', 'green', 'orange', 'purple', 'yellow', 'cyan', 'brown']
                    for (var i = 0; i < window.tabelaDiscreta.length; i++) {
                        arrDiscreta.push([String(window.tabelaDiscreta[i].valor), window.tabelaDiscreta[i].frequencia, colors[i]])
                    }

                    var data = google.visualization.arrayToDataTable(arrDiscreta);

                    var options = {
                        title: '',
                        hAxis: {
                            title: '',
                            viewWindow: {
                                min: [100, 50, 0],
                                max: [100, 50, 0]
                            }
                        },
                        vAxis: {
                            title: ''
                        },
                        chartArea: {
                            left: 50,
                            width: '90%',
                            height: '80%'
                        }

                    };

                    var chart = new google.visualization.ColumnChart(document.getElementById('discreta'));

                    chart.draw(data, options);
                }
            )
        }

        if (window.tabelaContinua && $state.current.url == '/continua-dash') {
            google.charts.load('current', { 'packages': ['corechart', 'bar'] })
            google.charts.setOnLoadCallback(
                function() {
                    var arrContinua = []
                    arrContinua[0] = ['Faixa', 'Frequência', { role: 'style' }]
                    var colors = ['blue', 'red', 'pink', 'green', 'orange', 'purple', 'yellow', 'cyan', 'brown']
                    for (var i = 0; i < window.tabelaContinua.length; i++) {
                        arrContinua.push([String(window.tabelaContinua[i].faixa) + '-' + ($rootScope.intervalo + window.tabelaContinua[i].faixa), window.tabelaContinua[i].freqFaixa, colors[i]])
                    }

                    var data = google.visualization.arrayToDataTable(arrContinua);

                    var options = {
                        title: '',
                        hAxis: {
                            title: '',
                            viewWindow: {
                                min: [100, 50, 0],
                                max: [100, 50, 0]
                            }
                        },
                        vAxis: {
                            title: ''
                        },
                        chartArea: {
                            left: 80,
                            width: '80%',
                            height: '70%'
                        }


                    };

                    var chart = new google.visualization.ColumnChart(document.getElementById('continua'));

                    chart.draw(data, options);
                }
            )
        }
    })