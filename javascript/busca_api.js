// Variaveis para manipulção
var numeros = [];
var acertados = [];
var errados = [];

// Variaveis da duplasena
var acertadosDupla = [];
var erradosDupla = [];

// Contador de inputs clicados
var contador = ''

// Verificadores 
var diadesorte = false
var duplasena = false
var lotofacil = false
var lotomania = false
var megasena = false
var quina = false
var timemania = false


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
        var token = "5LIZAjgs0EARozO"

        // inputs checados para contagem
        var inputs = document.querySelectorAll('input[type="checkbox"]:checked')

        // Verifica se os numeros selecionados estão na quantidade correta
        if (diadesorte || duplasena || lotofacil || lotomania || megasena || quina || timemania) {

            // Verifica se foi selecionado algum input
            if (inputs.length) {

                // Pega os numeros selecionados do input para outra variavel
                for (let i = 0; i < inputs.length; i++) {
                    numeros[i] = inputs[i].value
                }

                // Url de acesso
                var url = "https://apiloterias.com.br/app/resultado?loteria=" + concurso + "&token=" + token + "&concurso=" + numConcurso;

                // Acessa a url e muda a pagina
                $.ajax({
                    url,
                    type: "get",
                    dataType: "json",
                    success: function(data) {
                        // Pega o resultado, compara com a entrada e escreve na tela 
                        var numResultado = data.dezenas
                        compara(numResultado, numeros, acertados, errados)
                        $('input[type="checkbox"]:checked').prop('checked', false);
                        $("#numAcertados").text(acertados);
                        $("#numErrados").text(errados);
                        $("#numAcertadosTotal").text(acertados.length);

                        // Para a dupla sena que tem dois resultados
                        if (data.dezenas_2) {
                            var numDupla = data.dezenas_2
                            compara(numDupla, numeros, acertadosDupla, erradosDupla)

                            $('#numAcertadosDupla').text('Jogo 2:' + acertadosDupla)
                            $('#numErradosDupla').text('Jogo 2: ' +
                                erradosDupla)
                            $('#numAcertadosTotalDupla').text('Jogo 2: ' + acertadosDupla.length)
                        }
                        // Para timemania
                        if (data.nome_time_coracao) {

                            $('#numErradosDupla').html(`<h3> Time do coração</h3><br>${data.nome_time_coracao}`)
                        }
                        // Para mes da sorte
                        if (data.nome_mes_sorte) {
                            $('#numErradosDupla').html(`<h3> Mês da sorte<br>${data.nome_mes_sorte}`)
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

// 03 06 10 17 34 37

// Diz se a quantidade de numeros esta correta 
$(document).on('change', 'input[type="checkbox"]:checked', function() {
    // Conta quantos inputs tem selecionados
    contador = contador + 1

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