const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let animacaoAtiva = false;
let velocidadeAnimacao = 0.5;

// Classe para simular o comportamento de desenho como no turtle
class Desenho {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.angulo = 0;
        this.preenchendo = false;
    }

    forward(distancia) {
        const novoX = this.x + distancia * Math.cos(this.angulo);
        const novoY = this.y + distancia * Math.sin(this.angulo);
        ctx.lineTo(novoX, novoY);
        this.x = novoX;
        this.y = novoY;
    }

    right(graus) {
        this.angulo -= (graus * Math.PI) / 180;
    }

    left(graus) {
        this.angulo += (graus * Math.PI) / 180;
    }

    beginFill() {
        this.preenchendo = true;
    }

    endFill() {
        ctx.fill();
        ctx.stroke();
        this.preenchendo = false;
    }

    moveTo(x, y) {
        this.x = x;
        this.y = y;
        ctx.moveTo(x, y);
    }
}

// Função para desenhar a curva com tamanho ajustável
function func(desenho, escala = 1) {
    for (let i = 0; i < 200; i++) {
        desenho.right(1);
        desenho.forward(1 * escala);
    }
}

// Função para desenhar o coração com tamanho configurável
function desenharCoracaoBase(desenho, escala = 1, centroX = canvas.width / 2, centroY = canvas.height / 2 + 50) {
    ctx.beginPath();
    desenho.moveTo(centroX, centroY);
    ctx.strokeStyle = 'cyan';
    ctx.fillStyle = 'cyan';
    ctx.lineWidth = 3 * escala;

    // Desenhar formato coração - de cabeça para baixo e centralizado
    desenho.left(270);
    desenho.forward(111.65 * escala);
    func(desenho, escala);
    desenho.left(120);
    func(desenho, escala);
    desenho.forward(111.65 * escala);

    desenho.endFill();
}

// Desenhar o coração estático com coraçõezinhos menores alinhados
function desenharCoracao() {
    limparCanvas();
    
    // Coração principal (maior)
    const desenho = new Desenho();
    desenharCoracaoBase(desenho, 1, canvas.width / 2, canvas.height / 2 + 50);
    
    // Coraçõezinhos menores alinhados horizontalmente
    const posicoes = [
        { x: canvas.width / 2 - 200, y: canvas.height / 2 + 50, escala: 0.4 },
        { x: canvas.width / 2 + 120, y: canvas.height / 2 + 50, escala: 0.4 },
        { x: canvas.width / 2 - 200, y: canvas.height / 2 - 50, escala: 0.3 },
        { x: canvas.width / 2 + 200, y: canvas.height / 2 - 50, escala: 0.3 },
    ];
    
    posicoes.forEach(pos => {
        const desenhoAux = new Desenho();
        desenharCoracaoBase(desenhoAux, pos.escala, pos.x, pos.y);
    });
}

// Limpar o canvas
function limparCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    animacaoAtiva = false;
}

// Função de animação pulsante
function animarCoracaoPulsante() {
    if (!animacaoAtiva) return;

    limparCanvas();

    // Efeito de escala pulsante
    const pulso = Math.sin(Date.now() * 0.003) * 0.15 + 0.85;
    
    // Coração principal
    const desenho = new Desenho();
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2 + 50);
    ctx.scale(pulso, pulso);
    ctx.translate(-canvas.width / 2, -canvas.height / 2 - 50);
    desenharCoracaoBase(desenho, 1, canvas.width / 2, canvas.height / 2 + 50);
    ctx.restore();
    
    // Coraçõezinhos menores pulsando também
    const posicoes = [
        { x: canvas.width / 2 - 180, y: canvas.height / 2 + 50, escala: 0.4 },
        { x: canvas.width / 2 + 120, y: canvas.height / 2 + 50, escala: 0.4 },
        { x: canvas.width / 2 - 200, y: canvas.height / 2 - 50, escala: 0.3 },
        { x: canvas.width / 2 + 200, y: canvas.height / 2 - 50, escala: 0.3 },
    ];
    
    posicoes.forEach(pos => {
        const desenhoAux = new Desenho();
        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.scale(pulso, pulso);
        ctx.translate(-pos.x, -pos.y);
        desenharCoracaoBase(desenhoAux, pos.escala, pos.x, pos.y);
        ctx.restore();
    });

    if (animacaoAtiva) {
        requestAnimationFrame(animarCoracaoPulsante);
    }
}

// Toggle da animação
function toggleAnimacao() {
    animacaoAtiva = !animacaoAtiva;
    if (animacaoAtiva) {
        animarCoracaoPulsante();
    } else {
        desenharCoracao();
    }
}

// Desenhar o coração ao carregar
window.addEventListener('load', () => {
    desenharCoracao();
});
