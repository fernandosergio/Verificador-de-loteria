// Script que vai fazer as bolinhas aparecerem

// Variaveis para manipulacao
let quantidade = ''
var divAposta = document.getElementById('numAposta')

// Faz as bolinhas
$(document).ready(function() {
    var quantidade = '';
    $('#selConcurso').change(function() {
        // Reseta o contador para criar as bolinhas
        contador = 0

        // Pega o texto dentro da tag option
        quantidade = this.children[this.selectedIndex].value
        quantidade = valores(quantidade)

        // Verifica se e maior que 0
        if (quantidade) {
            divAposta.innerHTML = ''

            // Cria as bolinhas
            for (let i = 1; i <= quantidade; i++) {

                // Adiciona um 0 até 10
                if (i < 10) {
                    $('#numAposta').append(`<input type="checkbox" value="${'0'+i}"id="bolinha${i}">`)
                    $('head').append(`<style>#bolinha${i}:before {content: '${'0'+i}'}`)
                } else {
                    // Faz normal depois do 10
                    $('#numAposta').append(`<input type="checkbox" value="${i}"id="bolinha${i}">`)
                    $('head').append(`<style>#bolinha${i}:before {content: '${i}'}`)
                }
            }

        } else {
            // Caso nao foi selecionado um concurso 
            divAposta.innerHTML = 'Selecione um concurso!'
        }
    })

})

// Quantidade de bolinhas de acordo com o concurso por causa do webview
function valores(concurso) {
    switch (concurso) {
        case 'diadesorte':
            return 31
            break;
        case 'duplasena':
            return 50
            break;
        case 'lotofacil':
            return 25
            break;
        case 'lotomania':
            return 100
            break;
        case 'megasena':
            return 60
            break;
        case 'quina':
            return 80
            break;
        case 'timemania':
            return 80
            break;

        default:
            return 0
            break;
    }
}