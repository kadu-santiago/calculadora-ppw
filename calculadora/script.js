const display = document.getElementById('display');
const botoes = document.querySelectorAll('.botao');

let valorAtual = '0';
let primeiroOperando = null;
let operador = null;
let esperandoSegundoOperando = false;

function atualizarDisplay() {
    display.textContent = valorAtual.replace('.', ',');
}

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        const valorBotao = botao.textContent;
        const tipoBotao = botao.dataset.area;

        switch (tipoBotao) {
            case 'somar':
            case 'subtrair':
            case 'multiplicar':
            case 'dividir':
                lidarComOperador(valorBotao);
                break;
            case 'ponto':
                adicionarPonto();
                break;
            case 'igual':
                calcular();
                break;
            case 'apagar':
                apagarUltimoDigito();
                break;
            case 'c':
                limparTudo();
                break;
            default:
                adicionarNumero(valorBotao);
                break;
        }
        atualizarDisplay();
    });
});

function adicionarNumero(numero) {
    if (esperandoSegundoOperando) {
        valorAtual = numero;
        esperandoSegundoOperando = false;
    } else {
        valorAtual = valorAtual === '0' ? numero : valorAtual + numero;
    }
}

function adicionarPonto() {
    if (!valorAtual.includes('.')) {
        valorAtual += '.';
    }
}

function lidarComOperador(proximoOperador) {
    const valor = parseFloat(valorAtual.replace(',', '.'));

    if (operador && esperandoSegundoOperando)  {
        operador = proximoOperador;
        return;
    }

    if (primeiroOperando === null) {
        primeiroOperando = valor;
    } else if (operador) {
        const resultado = realizarCalculo(primeiroOperando, valor, operador);
        valorAtual = String(resultado).replace('.', ',');
        primeiroOperando = resultado;
    }

    esperandoSegundoOperando = true;
    operador = proximoOperador;
}

function realizarCalculo(n1, n2, op) {
    switch (op) {
        case '+': return n1 + n2;
        case '−': return n1 - n2;
        case '×': return n1 * n2;
        case '÷':
            if (n2 === 0) return 'Erro!';
            return n1 / n2;
        default:
            return n2;
    }
}

function calcular() {
    if (operador === null || esperandoSegundoOperando) return;
    
    const segundoOperando = parseFloat(valorAtual.replace(',', '.'));
    const resultado = realizarCalculo(primeiroOperando, segundoOperando, operador);
    
    valorAtual = String(resultado).replace('.', ',');
    operador = null;
    primeiroOperando = null;
    esperandoSegundoOperando = false;
}

function limparTudo() {
    valorAtual = '0';
    primeiroOperando = null;
    operador = null;
    esperandoSegundoOperando = false;
}

function apagarUltimoDigito() {
    valorAtual = valorAtual.slice(0, -1);
    if (valorAtual === '') {
        valorAtual = '0';
    }
}

atualizarDisplay();