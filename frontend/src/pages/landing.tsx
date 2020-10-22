import React, {  useState } from 'react';
import Select from 'react-select'

import api from '../services/api'

import '../styles/style.css'

const qual = [
    {
        name: "diadesorte",
        value: 31
    },{
        name:"duplasena",
        value:50
    },{
        name:"lotofacil",
        value:25
    },{
        name:"lotomania",
        value:100
    },{
        name:"megasena",
        value: 60
    },{
        name:"quina",
        value: 80
    },{
        name:"timemania",
        value: 80
    }
]

/*
Verificar o selecionados, adicionar o ou/e selecionados existe
*/

function compara(numResultado: Array<Number>, numeros:Array<Number>, acertados: Array<Number>, errados: Array<Number>) {

    for (var i = 0; i < numeros.length; i++) {

        if (numResultado.indexOf(numeros[i]) > -1) {

            acertados.push(numeros[i]);

        } else {
            errados.push( numeros[i]);
        }
    }

}

function adiciona(elemento: HTMLDivElement, lista: any) {
    elemento.innerHTML = ''

    for (var i = 0; i < lista.length; i++) {

        if (i === lista.length - 1) {
            if(lista[i] < 10 && (lista[i].length < 2 || lista[i].length === undefined)){
                elemento.append( `0${lista[i]}`)
            } else {
                elemento.append(`${lista[i]}`)
            }
        } else {
            if(lista[i] < 10 &&(lista[i].length < 2 || lista[i].length === undefined)){
                elemento.append(`0${lista[i]}, `)
            } else {
                elemento.append(`${lista[i]}, `)
            }
        }
    }
}

function modal(mostra:string,titulo = '',texto = ''){
    const modal = document.getElementById('modal-container') as HTMLDivElement
    const title = document.getElementById('titmodal') as HTMLTitleElement
    const paragrafo = document.getElementById('textomodal') as HTMLParagraphElement

    title.innerText = titulo
    paragrafo.innerHTML = texto

    if(mostra === 'sim'){
        modal.classList.add('mostrar')
    } else {
        modal.classList.remove('mostrar')
    }
}

function verificaQtdSelec(loteria: String, numSelec:Array<Number>){

    if(loteria === 'diadesorte'){
        if(numSelec.length < 7 || numSelec.length > 15){
            modal('sim','Quantidade inválida', 'Selecione uma quantidade de números válida para Dia de sorte')
            return false
        }else {
            return true
        }
    } else if(loteria === 'duplasena'){
        if(numSelec.length < 6 || numSelec.length > 15){
            modal('sim','Quantidade inválida', 'Selecione uma quantidade de números válida para Dupla sena')
            return false
        }else {
            return true
        }
    } else if(loteria === 'lotofacil'){
        if(numSelec.length < 15 || numSelec.length > 20){
            modal('sim','Quantidade inválida', 'Selecione uma quantidade de números válida para Lotofácil')
            return false
        }else {
            return true
        }
    } else if(loteria === 'lotomania'){
        if(numSelec.length < 50 || numSelec.length > 50){
            modal('sim','Quantidade inválida', 'Selecione uma quantidade de números válida para Lotomania')
            return false
        }else {
            return true
        }
    } else if(loteria === 'megasena'){
        if(numSelec.length < 6 || numSelec.length > 15){
            modal('sim','Quantidade inválida', 'Selecione uma quantidade de números válida para Mega sena')
            return false
        }else {
            return true
        }
    } else if(loteria === 'quina'){
        if(numSelec.length < 5 || numSelec.length > 15){
            modal('sim','Quantidade inválida', 'Selecione uma quantidade de números válida para Quina')
            return false
        }else {
            return true
        }
    } else if(loteria === 'timemania'){
        if(numSelec.length < 10 || numSelec.length > 10){
            modal('sim','Quantidade inválida', 'Selecione uma quantidade de números válida para Timemania')
            return false
        }else {
            return true
        }
    }
}


function Landing(){
    const [concurso, setConcurso] = useState('')
    const [loteria, setLoteria] = useState('')
    const selectOptions = [
            {value: 'diadesorte',label: 'Dia de sorte'},
            {value: 'duplasena',label: 'Dupla sena'},
            {value: 'lotofacil', label: 'Lotofácil'},
            {value: 'lotomania', label: 'Lotomania'},
            {value: 'megasena', label: 'Mega sena'},
            {value: 'quina', label: 'Quina'},
            {value: 'timemania', label: 'Timemania'}
    ]
    let selecionados = {} as NodeListOf<HTMLInputElement>
    let resultado = [] as Array<String>

    let numeros = [] as Array<Number>
    let acertados = [] as Array<Number>
    let errados = [] as Array<Number>
    

    function handleSetConcurso(event:any){
        setConcurso(event.target.value)
    }


    function handleSetLoteria(event:any ){
        setLoteria(event.value)

        const quantidade = qual.filter(value =>{
            return value.name === event.value 
        })

        createBalls(quantidade[0].value)
    }


    async function handleVerificar(event: Object){

        if(selecionados.length === 0 || selecionados.length === undefined){
            modal('sim', 'Seleciona os números', 'Selecione os números apostados.')
            return;
        } else {

            numeros = []

            selecionados.forEach(item => {
                numeros.push(Number(item.value))
            })
           
        }

        (document.getElementById('c-loader') as HTMLDivElement).classList.add('mostrar')

        const eai = verificaQtdSelec(loteria, numeros)

        if(!eai){
        (document.getElementById('c-loader') as HTMLDivElement).classList.remove('mostrar');
            return;
        }
           
        const dados = {loteria, concurso}
        const data = await api(dados)

        resultado = []
        resultado = data.dezenas

        let resultadoNumber = []
        resultadoNumber = resultado.map(item => Number(item))
        
        acertados = []
        errados = []
    
        try {
            await compara(resultadoNumber,numeros,acertados,errados)
        } catch (error) {
            modal('sim','Erro na aplicação','Houve um erro no servidor, por favor tente novamente ou mais tarde');
            (document.getElementById('c-loader') as HTMLDivElement).classList.remove('mostrar');
            return;
        }

       const divAcertadosTotal = document.getElementById('numAcertadosTotal') as HTMLDivElement
       const divSorteados = document.getElementById('numSorteados') as HTMLDivElement
       const divAcertados = document.getElementById('numAcertados') as HTMLDivElement
       const divErrados = document.getElementById('numErrados') as HTMLDivElement


       divAcertadosTotal.innerHTML = String(acertados.length)
       
       adiciona(divSorteados, resultado)
       
       if(acertados.length === 0){
            divAcertados.innerHTML = 'Nenhum!'
       }else {
            adiciona(divAcertados, acertados)
       }

       if(errados.length === 0){
           divErrados.innerHTML = 'Nenhum!'
       } else {
       adiciona(divErrados, errados);
       }

        if(loteria === 'duplasena'){

           const dupla = data.dezenas_2
            const duplaResultado = dupla.map((item: String) => Number(item))
            const duplaAcertados = [] as Array<Number>
            const duplaErrados = [] as Array<Number>

            await compara(duplaResultado,numeros,duplaAcertados,duplaErrados)

            if(duplaAcertados.length === 0){
                divAcertados.innerHTML += `<br>2º Sorteio: Nenhum!`
            }else {
               divAcertados.innerHTML += `<br>2º Sorteio: ${duplaAcertados}`
            }

            if(duplaErrados.length === 0){
                divErrados.innerHTML += `<br>2º Sorteio: Nenhum!`
            }else {
               divErrados.innerHTML += `<br>2º Sorteio: ${duplaErrados}`
            }
        }


       (document.getElementById('c-loader') as HTMLDivElement).classList.remove('mostrar');
       const scrolla = document.scrollingElement as HTMLElement
       const posicao = (document.getElementById('campo') as HTMLFieldSetElement).offsetTop
        scrolla.scrollTop = posicao - 40
    }


    function createBalls(quantidade:any){
        const div = document.getElementById('numAposta') as HTMLDivElement
        div.innerHTML = ''
        const head = document.querySelector('head') as HTMLHeadElement

        for(let i = 1; i <= quantidade; i++){
           let elemento = document.createElement('input') as HTMLInputElement
           elemento.type = 'checkbox'
            
           let estilo = document.createElement('style')
            

            if(i < 10){

            elemento.id= `bolinha${i}`
            elemento.value = `0${i}`
            estilo.innerHTML= `#bolinha${i}:before { content: '0${i}';}`
            head.append(estilo)

           } else {

            elemento.id= `bolinha${i}`
            elemento.value = `${i}`
            estilo.innerHTML = `#bolinha${i}:before { content: '${i}'; }`
            head.append(estilo)

           } 

           div.append(elemento)           
        }
    }


    function getSelected(event:any){
        const selecionadosLength = document.querySelectorAll('input[type=checkbox]:checked').length
        const p = document.getElementById('numSelecionados') as HTMLParagraphElement
        p.innerHTML = `${selecionadosLength} números foram selecionados! `

        selecionados = document.querySelectorAll('input[type=checkbox]:checked')
    }

    

    return(
        <div>
            <section>
                    <h2>Confira o resultado da loteria</h2>
                    <div className="content" id="content">
                        <div id="container">
                            <div id="margem">
                            <p>Confira a sua aposta com o resultado da loteria.</p>
                            <p>Siga os passos abaixo:</p>
                            </div>
                            <div>
                                <label htmlFor="selConcurso">
                                    <p>Selecione o concurso</p>
                                </label>

                                <Select 
                                
                                name="selConcurso" 
                                id="selConcurso" 
                                onChange={handleSetLoteria}
                                options={selectOptions}
                                placeholder="Selecione um opção"
                                />
                            
                            </div>
                            <div className="barrinha">
                                <label htmlFor="numConcurso">
                                    <p>Digite o número do concurso</p>
                                </label>
                                <input type="number" name="numConcurso" id="numConcurso" placeholder="Ex: 2000" onChange={handleSetConcurso}
                                />
                            </div>
                        </div>
                        <p>Selecione os números apostados</p>
                        <div id="numAposta" onClick={getSelected}>
                            Selecione o concurso desejado!
                        </div>
                    </div>

                    <p id="numSelecionados"></p>
                    <div className="c-loader" id="c-loader"></div>
                    <button name="btnVerificar" id="btnVerificar" onClick={handleVerificar}>Verificar</button>

                    <fieldset id="campo">
                        <h4><u> Total de acertos </u></h4>
                        <div id="numAcertadosTotal">
                            0
                        </div>
                    </fieldset>

                    <fieldset>
                        <h4><u> Resultado </u></h4>
                        <div>
                            <h3><u> Números sorteados </u></h3>
                            <div id="numSorteados">
                                -
                            </div>

                            <h3><u> Números acertados </u></h3>
                            <div id="numAcertados">
                                -
                            </div>

                            <h3><u> Números errados </u></h3>
                            <div id="numErrados">
                                
                            </div>
                        </div>
                    </fieldset>
            </section>
            <main>
                <h2>Como funciona?</h2>
                    <p>Primeiro escolha o concurso desejado para conferir as aposta, depois digite o número do concurso, caso seja o último concurso deixe em branco esse campo. Ao selecionar algum concurso irá aparecer os números para selecionar de acordo com cada concurso,
                        deve-se selecionar uma quantidade válida de números, enfim, clique no botão verificar e após alguns segundos irá aparecer o resultado.</p>
                <div id="quantConc">
                    <h2>Quantidade de números por concurso</h2>
                    <h4>Dia de sorte</h4>
                    <p>Entre 7 e 15 números.</p>
                    <h4>Dupla Sena</h4>
                    <p>Entre 6 e 15 números.</p>
                    <h4>Lotofácil</h4>
                    <p>Entre 15 e 20 números.</p>
                    <h4>Lotomania</h4>
                    <p>Exatos 50 números</p>
                    <h4>Mega sena</h4>
                    <p>Entre 6 e 15 números.</p>
                    <h4>Quina</h4>
                    <p>Entre 5 e 15 números.</p>
                    <h4>Timemania</h4>
                    <p>Exatos 10 números.</p>
                </div>
                    <h2>Sobre</h2>
                    <p>Esse site foi desenvolvido por Fernando Sergio Luviza de Almeida e tem o intuito de facilitar e agilizar o processo de conferir o resultado da loteria.</p>
                    <p>No momento essa aplicação não tem suporte para a loteria federal e lotogol.</p>
            </main>

            <footer>
                <div id="footer">
                    <div id="centro">
                        <p> por
                            <a href="https://www.linkedin.com/in/fernando-sergio-luviza-de-almeida-646663161/"> Fernando Sergio Luviza de Almeida</a></p>
                    </div>
                </div>
            </footer>

            <div 
            id="modal-container" 
            className="modal-container"
            onClick={(event)=> {
                if((event.target as Element).id === 'modal-container'){

                    (document.getElementById('modal-container') as HTMLDivElement).classList.remove('mostrar')

                }
                
            }}
            >
                <div className="modal" id="modal">
                    <h3 id="titmodal">Tanana</h3>
                    <p id="textomodal">Tanana</p>
                    <button 
                    id="fechar" 
                    onClick={()=>{
                        document.getElementById('modal-container')?.classList.remove('mostrar')
                    }}
                    >Fechar</button>
                </div>
            </div>
        </div>
    )   
}

export default Landing