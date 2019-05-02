let click = document.querySelectorAll('.calculadora button');
let resultado = document.querySelector('#resultado');
let operadores = ['-', '*', '/', '+'];

click.forEach(button =>{
    
    button.addEventListener('click', e =>{
        let botao = button.innerText

        if (resultado.value.toLowerCase() === 'Erro de operação' || resultado.value.toLowerCase() === 'infinity'){
            resultado.value = ''
        }

        if (botao === '='){
            somar()
            conteudoClicado = ''
        } else {
            // Verifica se o botão clicado é algum sinal
            if (operadores.indexOf(botao) >= 0){
                let validacao = true
                // Verifica se o resultado possui já algum sinal
                operadores.forEach(sinal => {
                    if (resultado.value.indexOf(sinal) >= 0) validacao = false
                })

                if (validacao === false) return false
            }
            if (operadores.indexOf(botao) >= 0 && (resultado.value === '' || resultado.value === '.')) return false

            if (botao === '.'){
                if (resultado.value !== ''){
                    
                    let arrayString = separarNumeros(resultado.value)
                    if (arrayString[arrayString.length-1].indexOf('.') >= 0) return false

                }
            }
            resultado.value += botao
        }
    })
})


separarNumeros = (string) =>{
    let stringSeparada= ''

    for(let key in string){
        if (operadores.indexOf(string[key]) >= 0){
            stringSeparada += ' ' + string[key] + ' '
        } else {
            stringSeparada += string[key]
        }
    }

    return stringSeparada.split(' ')
}


somar = () =>{
    let resultado = document.querySelector('#resultado').value
    let arrayString = separarNumeros(resultado)
    let arrayNumero = []

    
    if (arrayString.length !== 3) return false
    if (arrayString[2] === ''){
        document.querySelector('#resultado').value = 'Erro de operação'
        return false
    }

    arrayString.forEach(string =>{
        if (operadores.indexOf(string) === -1){
            if (string.indexOf('.') === -1) arrayNumero.push(parseInt(string))
            else arrayNumero.push(parseFloat(string))
        } else {
            arrayNumero.push(string)
        }
    })

    let soma = null
    switch (arrayNumero[1]){
        case '+':
            soma = arrayNumero[0] + arrayNumero[2]
            break
        case '-':
            soma = arrayNumero[0] - arrayNumero[2]
            break
        case '*':
            soma = arrayNumero[0] * arrayNumero[2]
            break
        case '/':
            soma = arrayNumero[0] / arrayNumero[2]
            break
    }
    if (!isNaN(soma)){
        document.querySelector('#resultado').value = soma
    } else {
        document.querySelector('#resultado').value = 'Erro de operação'
    }
}