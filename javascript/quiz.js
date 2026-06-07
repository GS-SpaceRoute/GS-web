const dadosQuiz = [
    {
        pergunta: "Qual é o objetivo principal da Space Route?",
        respostas: [
            "Centralizar dados aeroespaciais para prever riscos e sugerir rotas seguras",
            "Substituir totalmente pilotos e operadores humanos",
            "Criar uma rede social para companhias aéreas",
            "Controlar apenas lançamentos de foguetes"
        ],
        correta: 0,
        explicacao: "A Space Route integra dados aéreos e orbitais em tempo real para apoiar decisões, prever riscos e calcular rotas mais seguras."
    },
    {
        pergunta: "Qual problema real o projeto busca enfrentar?",
        respostas: [
            "A falta de interesse em turismo espacial",
            "A descentralização de dados e o aumento de riscos no tráfego aéreo e espacial",
            "A ausência de aviões comerciais no espaço aéreo",
            "O excesso de painéis visuais em aeroportos"
        ],
        correta: 1,
        explicacao: "O projeto responde ao aumento do tráfego aéreo e espacial, conflitos de rota, lixo espacial e sistemas de monitoramento separados."
    },
    {
        pergunta: "Qual ODS é o principal no projeto Space Route?",
        respostas: [
            "ODS 3 - Saúde e bem-estar",
            "ODS 6 - Água potável e saneamento",
            "ODS 9 - Indústria, inovação e infraestrutura",
            "ODS 15 - Vida terrestre"
        ],
        correta: 2,
        explicacao: "O ODS 9 se encaixa como principal por envolver infraestrutura avançada, inovação tecnológica e integração de dados em tempo real."
    },
    {
        pergunta: "Por que o ODS 11 também pode se relacionar ao projeto?",
        respostas: [
            "Porque melhora a segurança e a mobilidade ao otimizar rotas aéreas",
            "Porque cria moradias sustentáveis",
            "Porque substitui o transporte terrestre por foguetes",
            "Porque elimina a necessidade de aeroportos"
        ],
        correta: 0,
        explicacao: "A Space Route pode contribuir para mobilidade mais segura ao reduzir riscos de acidentes e apoiar rotas mais eficientes."
    },
    {
        pergunta: "Como o projeto pode contribuir com o ODS 13?",
        respostas: [
            "Aumentando o consumo de combustível em rotas emergenciais",
            "Reduzindo o consumo de combustível por meio de rotas otimizadas",
            "Removendo todos os satélites da órbita",
            "Bloqueando voos comerciais"
        ],
        correta: 1,
        explicacao: "Rotas mais eficientes podem diminuir mudanças emergenciais, consumo de combustível e emissões associadas."
    },
    {
        pergunta: "Quais tecnologias tornam a proposta tecnicamente plausível?",
        respostas: [
            "GNSS/GPS, satélites, radares, APIs aeroespaciais, IA e machine learning",
            "Apenas planilhas manuais",
            "Somente rádio analógico",
            "Apenas imagens estáticas sem dados em tempo real"
        ],
        correta: 0,
        explicacao: "A proposta combina tecnologias já existentes em uma plataforma centralizada e inteligente."
    },
    {
        pergunta: "Qual componente faz parte da arquitetura da solução?",
        respostas: [
            "Módulo de rastreamento aéreo e orbital",
            "Loja de passagens turísticas",
            "Editor de fotos de aeronaves",
            "Sistema de entretenimento de bordo"
        ],
        correta: 0,
        explicacao: "A arquitetura inclui rastreamento aéreo e orbital, banco de dados em tempo real, análise preditiva e painel de monitoramento."
    },
    {
        pergunta: "Qual é o fluxo correto de funcionamento da plataforma?",
        respostas: [
            "Coleta de dados, processamento, identificação de riscos, alertas e rotas alternativas",
            "Cadastro manual, impressão do relatório e espera por análise externa",
            "Escolha aleatória de rotas sem análise de risco",
            "Bloqueio total do tráfego aéreo"
        ],
        correta: 0,
        explicacao: "A AURORA coleta dados, processa informações, identifica riscos e gera alertas e desvios dinâmicos."
    },
    {
        pergunta: "Qual funcionalidade é essencial para operações aeroespaciais críticas?",
        respostas: [
            "Acompanhar lançamentos e retornos de foguetes considerando tráfego e obstáculos orbitais",
            "Trocar a cor do foguete em apresentações",
            "Medir apenas a temperatura da cabine",
            "Criar rankings de companhias aéreas"
        ],
        correta: 0,
        explicacao: "O suporte a lançamentos e retornos de foguetes é uma função central, especialmente com monitoramento de detritos, satélites e aeronaves próximas."
    },
    {
        pergunta: "Por que o rastreamento de lixo espacial é importante para o projeto?",
        respostas: [
            "Porque detritos podem gerar riscos de impacto e afetar a confiabilidade das rotas",
            "Porque detritos melhoram a comunicação entre aeronaves",
            "Porque lixo espacial serve como ponto turístico",
            "Porque elimina a necessidade de satélites"
        ],
        correta: 0,
        explicacao: "Classificar e rastrear lixo espacial ajuda a prever riscos e calcular rotas mais seguras em tempo real."
    }
];

let indQuiz = 0;
let pontos = 0;
let respFeita = false;

function elQuiz() {
    return {
        progresso: document.querySelector('#progresso'),
        barra: document.querySelector('#barraQuiz'),
        pergunta: document.querySelector('#pergunta'),
        respostas: document.querySelector('#respostasQuiz'),
        feedback: document.querySelector('#feedQuiz'),
        btnProxima: document.querySelector('#btnProxima'),
        btnReiniciar: document.querySelector('#btnReiniciar'),
        resultado: document.querySelector('#resultQuiz'),
        pontos: document.querySelector('#pontosQuiz')
    };
}

function renderQuiz() {
    const els = elQuiz();

    if (!els.pergunta || !els.respostas) return;

    const pergunta = dadosQuiz[indQuiz];
    const progresso = ((indQuiz + 1) / dadosQuiz.length) * 100;

    respFeita = false;

    els.progresso.textContent = `Pergunta ${indQuiz + 1}/${dadosQuiz.length}`;
    els.barra.style.width = `${progresso}%`;
    els.pergunta.textContent = pergunta.pergunta;
    els.pontos.textContent = `${pontos} ponto${pontos === 1 ? '' : 's'}`;
    els.feedback.textContent = '';
    els.feedback.className = 'feedback_quiz';
    els.btnProxima.disabled = true;
    els.btnProxima.textContent = indQuiz === dadosQuiz.length - 1 ? 'Ver resultado' : 'Próxima pergunta';
    els.resultado.hidden = true;
    els.resultado.innerHTML = '';

    els.respostas.innerHTML = pergunta.respostas.map(function(resp, index) {
        return `
            <button class="resposta_quiz" type="button" data-index="${index}">
                <span>${resp}</span>
            </button>
        `;
    }).join('');

    els.respostas.querySelectorAll('.resposta_quiz').forEach(function(btn) {
        btn.addEventListener('click', function() {
            respQuiz(Number(btn.dataset.index));
        });
    });
}

function respQuiz(indSel) {
    if (respFeita) return;

    const els = elQuiz();
    const pergunta = dadosQuiz[indQuiz];
    const botoes = els.respostas.querySelectorAll('.resposta_quiz');
    const certa = indSel === pergunta.correta;

    respFeita = true;

    if (certa) {
        pontos += 1;
    }

    botoes.forEach(function(btn) {
        const index = Number(btn.dataset.index);
        btn.disabled = true;

        if (index === pergunta.correta) {
            btn.classList.add('correta');
        } else if (index === indSel) {
            btn.classList.add('wrong');
        }
    });

    els.pontos.textContent = `${pontos} ponto${pontos === 1 ? '' : 's'}`;
    els.feedback.className = `feedback_quiz ${certa ? 'correta' : 'wrong'}`;
    els.feedback.innerHTML = `
        <strong>${certa ? 'Resposta correta.' : 'Resposta incorreta.'}</strong>
        <span>${pergunta.explicacao}</span>
    `;
    els.btnProxima.disabled = false;
}

function mostrarResult() {
    const els = elQuiz();
    const porcentagem = Math.round((pontos / dadosQuiz.length) * 100);

    els.pergunta.textContent = 'Resultado final';
    els.respostas.innerHTML = '';
    els.feedback.textContent = '';
    els.feedback.className = 'feedback_quiz';
    els.btnProxima.disabled = true;
    els.btnProxima.textContent = 'Quiz finalizado';
    els.progresso.textContent = `${dadosQuiz.length}/${dadosQuiz.length}`;
    els.barra.style.width = '100%';
    els.pontos.textContent = `${porcentagem}%`;

    els.resultado.hidden = false;
    els.resultado.innerHTML = `
        <strong>${porcentagem}% de aproveitamento</strong>
        <p>Você acertou ${pontos} de ${dadosQuiz.length} perguntas sobre o projeto Space Route.</p>
        <small>${porcentagem >= 70 ? 'Parabens! Você entendeu bem a proposta da solução.' : 'Revise os objetivos, tecnologias e ODS do projeto para reforçar o conteúdo.'}</small>
    `;
}

function reiniciarQuiz() {
    indQuiz = 0;
    pontos = 0;
    renderQuiz();
}

document.addEventListener('DOMContentLoaded', function() {
    const els = elQuiz();

    if (!els.pergunta || !els.respostas) return;

    els.btnProxima.addEventListener('click', function() {
        if (!respFeita) return;

        indQuiz += 1;

        if (indQuiz >= dadosQuiz.length) {
            mostrarResult();
        } else {
            renderQuiz();
        }
    });

    els.btnReiniciar.addEventListener('click', reiniciarQuiz);

    renderQuiz();
});
