import axios from 'axios'

interface dados{
    loteria:string,
    concurso:string
}

async function api(dados:dados) {
    const data = await axios.post(
    `http://192.168.1.56:5000/?loteria=${dados.loteria}&concurso=${dados.concurso}`
    )

    return data.data
}

export default api