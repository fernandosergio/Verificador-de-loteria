// Variaveis para manipulção
var numeros = [];
var acertados = [];
var errados = [];

// Variaveis da duplasena
var acertadosDupla = [];
var erradosDupla = [];

// Contador de inputs clicados
var contador = 0

// Verificadores 
var diadesorte = false
var duplasena = false
var lotofacil = false
var lotomania = false
var megasena = false
var quina = false
var timemania = false

var inputs = document.querySelectorAll('input[type="checkbox"]:checked')

// Comparar os resultados e mostrar na tela
$(document).ready(function() {
    $("#btnVerificar").click(function() {
        // Caso seja feito mais de uma verificacao
        if (numeros.length) {
            acertados = []
            errados = []
            numeros = []
            acertadosDupla = []
            erradosDupla = []
        }
        // Pega os dados para a API
        var concurso = $("#selConcurso").val();
        var numConcurso = $("#numConcurso").val();


        // Verifica se os numeros selecionados estão na quantidade correta
        if (diadesorte || duplasena || lotofacil || lotomania || megasena || quina || timemania) {

            // Verifica se foi selecionado algum input
            if (inputs.length) {

                // Pega os numeros selecionados do input para outra variavel
                for (let i = 0; i < inputs.length; i++) {
                    numeros[i] = inputs[i].value
                }

                // Url de acesso
                var formatoDado = true
                var url = ''
                if (numConcurso.length == 0) {
                    url = "https://lotericas.io/api/v1/jogos/" + concurso + "/" + "lasted"
                    formatadoDado = true
                } else {
                    url = "https://lotericas.io/api/v1/jogos/" + concurso + "/" + numConcurso;
                    formatoDado = false
                }

                // Acessa a url e muda a pagina
                $.ajax({
                    url,
                    type: "get",
                    dataType: "json",
                    success: function(data) {


                        const mudaTelaNormal = function() {
                            $('input[type="checkbox"]:checked').prop('checked', false);

                            let salaramanaia = numResultado.split('-')
                            adiciona($('#numSorteados'), salaramanaia)

                            if (acertados.length == 0) {
                                $('#numAcertados').text('Nenhum')
                            } else {
                                adiciona($("#numAcertados"), acertados)
                            }

                            if (errados.length == 0) {
                                $('#numErrados').text('Nenhum!')
                            } else {
                                adiciona($("#numErrados"), errados)
                            }

                            $("#numAcertadosTotal").html(acertados.length);
                            $('#numAcertadosDupla').html('')
                            $('#numErradosDupla').html('')
                            $('#numAcertadosTotalDupla').html('')
                        }
                        const mudaTelaDupla = function() {
                            $('input[type="checkbox"]:checked').prop('checked', false);
                            $('#numSorteados').html(`1º Sorteio: ${numResultado.split('-')}<br> 2º Sorteio: ${numDupla.split('-')}`)

                            if (acertados.length == 0) {
                                $('#numAcertados').text('1º Sorteio: Nenhum!')
                            } else {
                                $("#numAcertados").html(`<p>1º Sorteio: ${acertados}</p>`);
                            }

                            if (errados.length == 0) {
                                $('#numErrados').text('1º Sorteio: Nenhum!')
                            } else {
                                $("#numErrados").html(`<p>1º Sorteio: ${errados}</p>`);
                            }

                            if (acertadosDupla.length == 0) {
                                $('#numAcertados').html('2º Sorteio: Nenhum!')
                            } else {
                                $('#numAcertadosDupla').html(`<p>2º Sorteio: ${acertadosDupla}</p>`)
                            }

                            if (erradosDupla.length == 0) {
                                $('#numErradosDupla').html('2º Sorteio: Nenhum!')
                            } else {
                                $('#numErradosDupla').html(`<p>2º Sorteio: ${erradosDupla}</p>`)
                            }

                            $('#numAcertadosTotal').html(`1º Sorteio: ${acertados.length}`)
                            $('#numAcertadosTotalDupla').html(`<p>2º Sorteio: ${acertadosDupla.length}</p>`)
                        }
                        const mostraMes = function(mesDeSorte) {
                            $('#numErradosDupla').html(`<h3> Mês da sorte</h3><br>${mesDeSorte}`)
                        }
                        const mostraTime = function(time) {
                                $('#numErradosDupla').html(`<h3> Time do coração</h3><br>${time}`)
                            }
                            // Pega o resultado, compara com a entrada e escreve na tela 
                        let name = ''
                        if (formatoDado) {
                            name = data.data[0].name

                        } else {
                            name = data.data.name

                        }

                        if (name == 'diadesorte') {

                            if (formatoDado) {
                                var numResultado = data.data[0].resultadoOrdenado
                                var mesDeSorte = data.data[0].mes_DE_SORTE
                                mesDeSorte = mes(mesDeSorte)
                            } else {
                                var numResultado = data.data.resultadoOrdenado
                                var mesDeSorte = data.data.mes_DE_SORTE
                                mesDeSorte = mes(mesDeSorte)
                            }
                            compara(numResultado, numeros, acertados, errados)
                            mudaTelaNormal()
                            mostraMes(mesDeSorte)
                        } else if (name == 'duplasena') {

                            if (formatoDado) {
                                var numResultado = data.data[0].resultadoOrdenadoSorteio1
                                var numDupla = data.data[0].resultadoOrdenadoSorteio2

                            } else {
                                var numResultado = data.data.resultadoOrdenadoSorteio1
                                var numDupla = data.data.resultadoOrdenadoSorteio2
                            }
                            compara(numResultado, numeros, acertados, errados)
                            compara(numDupla, numeros, acertadosDupla, erradosDupla)
                            mudaTelaDupla()
                        } else if (name == 'timemania') {
                            if (formatoDado) {
                                var numResultado = data.data[0].resultadoOrdenado
                                var time = data.data[0].timeCoracao

                            } else {
                                var numResultado = data.data.resultadoOrdenado
                                var time = data.data.timeCoracao
                            }
                            compara(numResultado, numeros, acertados, errados)
                            mudaTelaNormal()
                            mostraTime(time)
                        } else {
                            if (formatoDado) {
                                var numResultado = data.data[0].resultadoOrdenado
                            } else {
                                var numResultado = data.data.resultadoOrdenado
                            }
                            compara(numResultado, numeros, acertados, errados)
                            mudaTelaNormal()
                        }

                    },
                    error: function(error) {
                        console.log('Não entrou ' + error)
                    }
                })
            } else {
                alert('Selecione algum número!')
            }
        } else {
            alert('Selecione um quantidade de números valida!')
        }
    })
})


// 03 06 10 17 34 37

// Diz se a quantidade de numeros esta correta 
$(document).on('change', 'input[type="checkbox"]:checked', function() {
    // Conta quantos inputs tem selecionados
    inputs = document.querySelectorAll('input[type="checkbox"]:checked')
    contador = inputs.length
    console.log(contador)

    // pega o concurso selecionado
    const filhos = document.getElementById('selConcurso')
    let opcao = filhos.children[filhos.selectedIndex].value

    // Faz a verificadao de todos os inputs
    if (opcao == 'diadesorte' && contador >= 7 && contador <= 15) {
        diadesorte = true
    } else {
        diadesorte = false
    }
    if (opcao == 'duplasena' && contador >= 6 && contador <= 15) {
        duplasena = true
    } else {
        duplasena = false
    }
    if (opcao == 'lotofacil' && contador >= 15 && contador <= 20) {
        lotofacil = true
    } else {
        lotofacil = false
    }
    if (opcao == 'lotomania' && contador == 50) {
        lotomania = true
    } else {
        lotomania = false
    }
    if (opcao == 'megasena' && contador >= 6 && contador <= 15) {
        megasena = true
    } else {
        megasena = false
    }
    if (opcao == 'quina' && contador >= 5 && contador <= 15) {
        quina = true
    } else {
        quina = false
    }
    if (opcao == 'timemania' && contador == 10) {
        timemania = true
    } else {
        timemania = false
    }
})

function mes(Mes) {
    switch (Mes) {
        case 1:
            return 'Janeiro'
            break;
        case 2:
            return 'Fevereiro'
            break
        case 3:
            return 'Março'
            break
        case 4:
            return 'Abril'
            break
        case 5:
            return 'Maio'
            break
        case 6:
            return 'Junho'
            break
        case 7:
            return 'Julho'
            break
        case 8:
            return 'Agosto'
            break
        case 9:
            return 'Setembro'
            break
        case 10:
            return 'Outubro'
            break
        case 11:
            return 'Novembro'
            break
        case 12:
            return 'Dezembro'
            break
        default:
            console.log('Deu erro no switch do Mes()')
            break;
    }
}

// Funcao que compara os dados da api com os inputs
function compara(numResult, num, acert, errad) {
    for (var i = 0; i < num.length; i++) {
        if (numResult.indexOf(num[i]) > -1) {
            acert.push(num[i]);
        } else {
            errad.push(num[i]);
        }
    }
}

function adiciona(elemento, lista) {
    elemento.html('')
    for (var i = 0; i < lista.length; i++) {
        if (i == lista.length - 1) {
            elemento.append(lista[i])
        } else {
            elemento.append(lista[i] + ', ')
        }
    }
}