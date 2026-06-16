let producao = 50;
let ambiente = 50;
let rodadaAtual = 0;

const perguntas = [
    {
        texto: "Você precisa expandir a área de plantio. O que faz?",
        opcoes: [
            { texto: "Derruba uma parte da mata nativa.", prod: 25, amb: -25 },
            { texto: "Adota a Integração Lavoura-Pecuária-Floresta (ILPF) em áreas já abertas.", prod: 15, amb: 15 }
        ]
    },
    {
        texto: "Como será a irrigação da sua lavoura?",
        opcoes: [
            { texto: "Irrigação por inundação (gasta mais água).", prod: 20, amb: -20 },
            { texto: "Gotejamento com sensores de umidade.", prod: 10, amb: 20 }
        ]
    },
    {
        texto: "Qual fonte de energia você vai instalar na fazenda?",
        opcoes: [
            { texto: "Geradores a Diesel (mais baratos no início).", prod: 15, amb: -15 },
            { texto: "Painéis solares e biomassa.", prod: 5, amb: 25 }
        ]
    }
];

function atualizarTela() {
    document.getElementById("prod-val").innerText = producao;
    document.getElementById("amb-val").innerText = ambiente;
    document.getElementById("bar-prod").style.width = producao + "%";
    document.getElementById("bar-amb").style.width = ambiente + "%";

    if (rodadaAtual < perguntas.length) {
        document.getElementById("rodada").innerText = `Rodada ${rodadaAtual + 1}/${perguntas.length}`;
        document.getElementById("pergunta").innerText = perguntas[rodadaAtual].texto;
        const botoes = document.querySelectorAll(".options button");
        botoes[0].innerText = perguntas[rodadaAtual].opcoes[0].texto;
        botoes[1].innerText = perguntas[rodadaAtual].opcoes[1].texto;
    } else {
        finalizarJogo();
    }
}

function escolha(opcao) {
    const consequencia = perguntas[rodadaAtual].opcoes[opcao - 1];
    producao = Math.max(0, Math.min(100, producao + consequencia.prod));
    ambiente = Math.max(0, Math.min(100, ambiente + consequencia.amb));
    
    rodadaAtual++;
    atualizarTela();
}

function finalizarJogo() {
    let mensagem = "";
    if (producao >= 60 && ambiente >= 60) {
        mensagem = "Parabéns! Você alcançou o Agro Forte e Sustentável! Sua fazenda é um modelo para o futuro. 🎉";
    } else if (ambiente < 40) {
        mensagem = "Sua produção foi alta, mas o meio ambiente sofreu demais. Solo esgotado e falta de água quebraram a fazenda. 😟";
    } else {
        mensagem = "Sua fazenda protegeu a natureza, mas não produziu o suficiente para se manter de pé. 🌾";
    }
    
    document.querySelector(".card").innerHTML = `<h2>Fim de Jogo!</h2><p>${mensagem}</p><button onclick="window.location.reload()">Jogar Novamente</button>`;
}

// Inicia o jogo na primeira rodada
atualizarTela();