document.addEventListener('DOMContentLoaded', function() {
    const btnMobile = document.querySelector('#btn_mobile');
    const menuMobile = document.querySelector('#menu_mobile');
    const iconeMobile = btnMobile ? btnMobile.querySelector('i') : null;

    if (btnMobile && menuMobile && iconeMobile) {
        btnMobile.addEventListener('click', function() {
            menuMobile.classList.toggle('active');
            iconeMobile.classList.toggle('fa-bars');
            iconeMobile.classList.toggle('fa-xmark');
        });
    }

    const secoes = Array.from(document.querySelectorAll('section'));
    const itensNav = Array.from(document.querySelectorAll('#lista_nav .item-nav'));
    const header = document.querySelector('header');

    window.addEventListener('scroll', function(){
        const posScroll = window.scrollY + (header ? header.offsetHeight : 0) + 24;
        let secaoAtiva = 0;

        if (header) {
            header.style.boxShadow = window.scrollY <= 0 ? 'none' : '5px 1px 5px rgba(0, 0, 0, 0.18)';
        }

        secoes.forEach(function(section, index) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if(posScroll >= sectionTop && posScroll < sectionBottom) {
                secaoAtiva = index;
            }
        });

        itensNav.forEach(function(item) {
            item.classList.remove('active');
        });

        if (itensNav[secaoAtiva]) {
            itensNav[secaoAtiva].classList.add('active');
        }
    });

    if (typeof ScrollReveal !== 'undefined') {
        const cfgReveal = {
            duration: 1600,
            distance: '18%',
            reset: false
        };

        ScrollReveal().reveal('#textoinicial, #textoProblema, #textoObjetivos', {
            ...cfgReveal,
            origin: 'left'
        });

        ScrollReveal().reveal('#textoTecnologia, #textoPublico, #textoBeneficios, #textoAplicacao, .dashboard', {
            ...cfgReveal,
            origin: 'right'
        });
    }



    const jogo = {
        estado: 'monitorando',
        ultimoFrame: performance.now(),
        ultimaRender: 0,
        ameaca: null,
        rotaSug: 'RETO',
        message: '',
        tipoMsg: '',
        reinicia: 0,
        inicioPerg: 0,
        decisaoBloq: false,
        routeLineDirection: 'RETO',
        routeLineAngle: 90,
        modo: 'orbital'
    };

    const raio = 22;
    const direcoes = ['ESQUERDA', 'DIREITA', 'CONTRARIA'];
    let ciclo = 0;
    let contObj = 120;

    const aurora = {
        id: 'AURORA-F1',
        x: 50,
        y: 50,
        vx: 0,
        vy: 0,
        angle: 90,
        route: 'RETO',
        direcaoAtual: 'RETO'
    };

    const tiposObj = [
        { prefix: 'AVC', name: 'aviao comercial', type: 'Aereo', icon: 'fa-plane' },
        { prefix: 'JET', name: 'jato particular', type: 'Aereo', icon: 'fa-jet-fighter' },
        { prefix: 'DRO', name: 'drone operacional', type: 'Aereo', icon: 'fa-paper-plane' },
        { prefix: 'HCT', name: 'helicoptero', type: 'Aereo', icon: 'fa-helicopter' },
        { prefix: 'SAT', name: 'satelite fixo', type: 'Orbital', icon: 'fa-satellite' },
        { prefix: 'DET', name: 'detrito espacial', type: 'Orbital', icon: 'fa-trash-can' },
        { prefix: 'FGT', name: 'foguete de turismo', type: 'Orbital', icon: 'fa-shuttle-space' },
        { prefix: 'FGT', name: 'foguete em retorno', type: 'Orbital', icon: 'fa-shuttle-space' }
    ];

    function limitar(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function aleatorioEntre(min, max) {
        return min + Math.random() * (max - min);
    }

    function angDirecao(dir) {
        if (dir === 'ESQUERDA') return 0;
        if (dir === 'DIREITA') return 180;
        return 90;
    }

    function vetorDirecao(dir) {
        if (dir === 'ESQUERDA') {
            return { x: -1, y: 0 };
        }

        if (dir === 'DIREITA') {
            return { x: 1, y: 0 };
        }

        return { x: 0, y: -1 };
    }

    function vetorAng(ang) {
        const radians = (ang - 90) * Math.PI / 180;

        return {
            x: Math.cos(radians),
            y: Math.sin(radians)
        };
    }

    function fimRota(xInicio, yInicio, ang) {
        const vetor = vetorAng(ang);
        const passos = [];

        if (vetor.x > 0) {
            passos.push((100 - xInicio) / vetor.x);
        } else if (vetor.x < 0) {
            passos.push((0 - xInicio) / vetor.x);
        }

        if (vetor.y > 0) {
            passos.push((100 - yInicio) / vetor.y);
        } else if (vetor.y < 0) {
            passos.push((0 - yInicio) / vetor.y);
        }

        const passoFim = Math.min(...passos.filter(function(step) {
            return step > 0;
        }));

        return {
            x: xInicio + vetor.x * passoFim,
            y: yInicio + vetor.y * passoFim
        };
    }

    function normAng(ang) {
        let normal = ang % 360;

        if (normal > 180) normal -= 360;
        if (normal < -180) normal += 360;

        return normal;
    }

    function angVirado(angAtual, mudRota) {
        if (mudRota === 'ESQUERDA') {
            return normAng(angAtual - 90);
        }

        if (mudRota === 'DIREITA') {
            return normAng(angAtual + 90);
        }

        if (mudRota === 'CONTRARIA') {
            return normAng(angAtual + 180);
        }

        return normAng(angAtual);
    }

    function nomeDirecao(ang) {
        const normal = normAng(ang);

        if (normal === 90) return 'RETO';
        if (normal === 0) return 'CIMA';
        if (normal === 180 || normal === -180) return 'BAIXO';
        if (normal === -90) return 'CONTRARIA';

        return `${Math.round(normal)} graus`;
    }

    function angFoguete(ang) {
        /* fa-shuttle-space aponta pra direita, atualizar na nova rota */
        return normAng(ang - 90);
    }

    function tiposDisp() {
        const tipoAtual = jogo.modo === 'aereo' ? 'Aereo' : 'Orbital';
        return tiposObj.filter(function(type) {
            return type.type === tipoAtual;
        });
    }

    function tipoAleatorio() {
        const tipos = tiposDisp();
        const tipoSel = tipos[Math.floor(Math.random() * tipos.length)];
        return tiposObj.indexOf(tipoSel);
    }

    function criarObjeto(indTipo, perto) {
        const type = tiposObj[indTipo % tiposObj.length];
        const lado = Math.floor(Math.random() * 4);
        let x;
        let y;

        if (lado === 0) {
            x = aleatorioEntre(12, 88);
            y = 10;
        } else if (lado === 1) {
            x = 90;
            y = aleatorioEntre(14, 86);
        } else if (lado === 2) {
            x = aleatorioEntre(12, 88);
            y = 88;
        } else {
            x = 10;
            y = aleatorioEntre(14, 86);
        }

        const alvoX = perto ? aleatorioEntre(43, 57) : aleatorioEntre(18, 82);
        const alvoY = perto ? aleatorioEntre(43, 57) : aleatorioEntre(16, 84);
        const dx = alvoX - x;
        const dy = alvoY - y;
        const comp = Math.hypot(dx, dy) || 1;
        const vel = perto ? aleatorioEntre(0.0018, 0.0026) : aleatorioEntre(0.001, 0.0018);

        const vx = (dx / comp) * vel;
        const vy = (dy / comp) * vel;

        contObj += 1;

        return {
            id: `${type.prefix}-${contObj}`,
            name: type.name,
            type: type.type,
            icon: type.icon,
            x,
            y,
            vx,
            vy,
            baseVx: vx,
            baseVy: vy,
            risk: 'baixo',
            distance: 999,
            suggestion: 'RETO',
            closeApproach: perto,
            tracked: false
        };
    }

    function criarAmeaca() {
        const type = tiposDisp()[Math.floor(Math.random() * tiposDisp().length)];
        const lado = Math.random() > 0.5 ? -1 : 1;
        const direto = Math.random() < 0.25;

        const vx = direto ? aleatorioEntre(-0.00015, 0.00015) : lado > 0 ? -0.0009 : 0.0009;
        const vy = direto ? -0.0009 : aleatorioEntre(-0.00035, 0.00035);

        contObj += 1;

        return {
            id: `${type.prefix}-${contObj}`,
            name: type.name,
            type: type.type,
            icon: type.icon,
            x: direto ? 50 + aleatorioEntre(-3, 3) : 50 + lado * aleatorioEntre(13, 18),
            y: direto ? 50 + aleatorioEntre(12, 18) : 50 + aleatorioEntre(-5, 6),
            vx,
            vy,
            baseVx: vx,
            baseVy: vy,
            risk: 'baixo',
            distance: 999,
            suggestion: 'RETO',
            closeApproach: true,
            tracked: true
        };
    }

    let objetos = [];

    function iniciarLoop() {
        ciclo += 1;
        const dirInicial = 'RETO';

        aurora.x = 50;
        aurora.y = 50;
        aurora.vx = 0;
        aurora.vy = 0;
        aurora.angle = angDirecao(dirInicial);
        aurora.route = dirInicial;
        aurora.direcaoAtual = dirInicial;
        aurora.id = `AURORA-F${ciclo}`;

        jogo.estado = 'monitorando';
        jogo.ameaca = null;
        jogo.rotaSug = 'RETO';
        jogo.message = 'Monitorando trafego. Analise preventiva ativa.';
        jogo.tipoMsg = '';
        jogo.inicioPerg = 0;
        jogo.reinicia = 0;
        jogo.decisaoBloq = false;
        jogo.routeLineDirection = dirInicial;
        jogo.routeLineAngle = aurora.angle;

        objetos = [
            criarAmeaca(),
            criarObjeto(tipoAleatorio(), false),
            criarObjeto(tipoAleatorio(), false),
            criarObjeto(tipoAleatorio(), false)
        ];

        objetos.forEach(atualRisco);
    }

    function distAurora(objeto) {
        return Math.hypot(objeto.x - aurora.x, objeto.y - aurora.y);
    }

    function angCardinal(x, y) {
        if (Math.abs(x) >= Math.abs(y)) {
            return x >= 0 ? 90 : -90;
        }
        return y >= 0 ? 180 : 0;
    }

    function angAmeaca(objeto) {
        /* foguete n pode ir pra mesma direção do objeto ameaçador */
        return angCardinal(objeto.x - aurora.x, objeto.y - aurora.y);
    }

    function novaDirecao(ameacaObj) {
        const angAprox = ameacaObj ? angAmeaca(ameacaObj) : null;

        let dirsDisp = direcoes.filter(function(direcao) {
            const proxAng = angVirado(aurora.angle, direcao);

            return proxAng !== aurora.angle && proxAng !== angAprox;
        });

        if (!dirsDisp.length) {
            dirsDisp = direcoes.filter(function(direcao) {
                return angVirado(aurora.angle, direcao) !== aurora.angle;
            });
        }

        return dirsDisp[Math.floor(Math.random() * dirsDisp.length)];
    }

    function atualRisco(objeto) {
        objeto.distance = distAurora(objeto);

        if (objeto.distance <= 8) {
            objeto.risk = 'critico';
        } else if (objeto.distance <= 14) {
            objeto.risk = 'alto';
        } else if (objeto.distance <= raio) {
            objeto.risk = 'modorado';
        } else {
            objeto.risk = 'baixo';
        }

        objeto.suggestion = objeto.risk === 'baixo' ? 'RETO' : objeto.suggestion;

        if (objeto.distance <= raio) {
            objeto.tracked = true;
        }
    }

    function isSatelite(objeto) {
        return objeto.id.startsWith('SAT') || objeto.icon === 'fa-satellite' || objeto.name.toLowerCase().includes('satelite');
    }

    function moverObjs(delta) {
        objetos.forEach(function(objeto, index) {
            if (jogo.estado === 'embora') {
                if (!isSatelite(objeto)) {
                    objeto.x += objeto.baseVx * 0.55 * delta;
                    objeto.y += objeto.baseVy * 0.55 * delta;
                }
            } else {
                objeto.x += objeto.vx * delta;
                objeto.y += objeto.vy * delta;
            }

            if (objeto.x < -8 || objeto.x > 108 || objeto.y < -8 || objeto.y > 108) {
                objetos[index] = criarObjeto(tipoAleatorio(), index === 0);
                return;
            }
            atualRisco(objeto);
        });
    }

    function perguntarRota() {
        if (jogo.estado !== 'monitorando') return;

        const ameacaObj = objetos
            .filter(function(objeto) {
                return objeto.distance <= raio;
            })
            .sort(function(a, b) {
                return a.distance - b.distance;
            })[0];

        if (!ameacaObj) return;

        jogo.estado = 'espera';
        jogo.ameaca = ameacaObj.id;
        jogo.rotaSug = novaDirecao(ameacaObj);
        jogo.routeLineDirection = aurora.direcaoAtual;
        jogo.routeLineAngle = aurora.angle;
        ameacaObj.suggestion = jogo.rotaSug;
        jogo.inicioPerg = performance.now();
        jogo.decisaoBloq = false;
        jogo.tipoMsg = 'aceito';
        jogo.message = `${ameacaObj.name} detectado a ${Math.round(ameacaObj.distance)} km. Rota atual: ${aurora.direcaoAtual}. Aceitar manobra para ${jogo.rotaSug}?`;
        renderPainel();
        jogo.ultimaRender = performance.now();
    }

    function definirRota(direcao) {
        const vel = 0.0048;
        const proxAng = angVirado(aurora.angle, direcao);
        const vetor = vetorAng(proxAng);

        aurora.route = direcao;
        aurora.direcaoAtual = nomeDirecao(proxAng);
        aurora.angle = proxAng;
        aurora.vx = vetor.x * vel;
        aurora.vy = vetor.y * vel;

        /* rota x imagem sincronizados */
        jogo.routeLineDirection = aurora.direcaoAtual;
        jogo.routeLineAngle = proxAng;
    }

    function moverAurora(delta) {
        if (jogo.estado !== 'embora') return;

        const vetor = vetorAng(jogo.routeLineAngle);
        const vel = 0.0048;

        aurora.vx = vetor.x * vel;
        aurora.vy = vetor.y * vel;
        aurora.x += aurora.vx * delta;
        aurora.y += aurora.vy * delta;

        if (aurora.x < -10 || aurora.x > 110 || aurora.y < -10 || aurora.y > 110) {
            jogo.estado = 'reset';
            jogo.tipoMsg = 'aceito';
            jogo.message = 'Conflito evitado. Novo foguete entrando no radar.';
            jogo.reinicia = performance.now() + 900;
        }
    }

    function emergencia() {
        jogo.estado = 'emergencia';
        jogo.tipoMsg = 'rejeitado';
        jogo.message = 'CONFIRMACAO NAO RECEBIDA. Objeto em aproximacao direta.';
        jogo.reinicia = performance.now() + 8000;
    }

    function explodir() {
        jogo.estado = 'explosao';
        jogo.tipoMsg = 'rejeitado';
        jogo.message = 'COLISAO IMINENTE. Explosao detectada.';
        jogo.reinicia = performance.now() + 1600;
        aurora.vx = 0;
        aurora.vy = 0;
    }

    function atualEstado(now, delta) {
        if (jogo.estado === 'monitorando') {
            moverObjs(delta);
            perguntarRota();
            return;
        }

        if (jogo.estado === 'espera') {
            if (now - jogo.inicioPerg > 8000) {
                emergencia();
            }
            return;
        }

        if (jogo.estado === 'embora') {
            moverAurora(delta);
            moverObjs(delta);
            return;
        }

        if (jogo.estado === 'emergencia') {
            const ameacaObj = objetos.find(function(objeto) {
                return objeto.id === jogo.ameaca;
            });

            if (ameacaObj) {
                const dx = aurora.x - ameacaObj.x;
                const dy = aurora.y - ameacaObj.y;
                const comp = Math.hypot(dx, dy) || 1;
                const velColisao = 0.0068;
                ameacaObj.x += (dx / comp) * velColisao * delta;
                ameacaObj.y += (dy / comp) * velColisao * delta;
                atualRisco(ameacaObj);

                if (ameacaObj.distance <= 2.4) {
                    explodir();
                }
            }

            if (now >= jogo.reinicia) {
                explodir();
            }

            return;
        }

        if ((jogo.estado === 'explosao' || jogo.estado === 'reset') && now >= jogo.reinicia) {
            iniciarLoop();
        }
    }

    function rotuloRisco(risco) {
        const rotulos = {
            critico: 'Critico',
            alto: 'Alto',
            modorado: 'Moderado',
            baixo: 'Baixo'
        };

        return rotulos[risco] || risco;
    }

    function textoAlerta(ameacaObj) {
        if (!ameacaObj) {
            return `
                <article class="item_alerta">
                    <strong>Monitorando trafego...</strong>
                    Analise preventiva ativa. Aguarde um objeto entrar no raio de acompanhamento.
                    <small>Modo atual: aereo e orbital</small>
                </article>
            `;
        }

        if (jogo.estado === 'espera') {
            return `
                <article class="item_alerta pergunta_alerta">
                    <strong>[ALERTA PREVENTIVO] ${ameacaObj.name}</strong>
                    Distancia detectada: ${Math.round(ameacaObj.distance)} km. Rota atual: ${aurora.direcaoAtual}. Manobra sugerida: ${jogo.rotaSug}. A rota evita o lado do objeto em alerta.
                    <small>Calculando rota segura... responda em ate 8 segundos.</small>
                    <div class="escolha_rota">
                        <button class="aceitar_rota" type="button" data-action="accept">
                            Aceitar rota
                        </button>
                        <button class="recusar_rota" type="button" data-action="reject">
                            Nao aprovar
                        </button>
                    </div>
                </article>
            `;
        }

        if (jogo.estado === 'embora') {
            return `
                <article class="item_alerta">
                    <strong>[CONFIRMADO] Nova rota aprovada</strong>
                    A ${aurora.id} virou para ${aurora.direcaoAtual} e continuara nessa direcao ate sair do radar.
                    <small>Conflito evitado com antecedencia.</small>
                </article>
            `;
        }

        if (jogo.estado === 'emergencia' || jogo.estado === 'explosao') {
            return `
                <article class="item_alerta pergunta_alerta">
                    <strong>[CRITICO] Confirmacao nao recebida</strong>
                    Objeto continua em aproximacao direta contra a ${aurora.id}. Colisao iminente.
                    <small>A AURORA permanece parada enquanto a ameaca avanca.</small>
                </article>
            `;
        }

        return `
            <article class="item_alerta">
                <strong>Sistema reiniciando ciclo</strong>
                Novo foguete principal sera acompanhado no centro do radar.
                <small>Retornando ao monitoramento.</small>
            </article>
        `;
    }

    function renderStatus() {
        if (!jogo.message) return '';

        return `<div class="status_decisao ${jogo.tipoMsg}">${jogo.message}</div>`;
    }

    function fimLinha() {
        return fimRota(aurora.x, aurora.y, jogo.routeLineAngle);
    }

    function renderLinha() {
        if (jogo.estado !== 'monitorando' && jogo.estado !== 'espera' && jogo.estado !== 'embora') {
            return '';
        }

        const fim = fimLinha();

        return `
            <svg class="linha_rota" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <line x1="${aurora.x}" y1="${aurora.y}" x2="${fim.x}" y2="${fim.y}"></line>
            </svg>
        `;
    }

    function renderPainel() {
        const filtroRisco = document.querySelector('#filtroRisco');
        const riscoSel = filtroRisco ? filtroRisco.value : 'todos';
        const ameaca = objetos.find(function(objeto) {
            return objeto.id === jogo.ameaca;
        });
        const objsProx = objetos.filter(function(objeto) {
            return objeto.distance <= raio;
        });
        const objsVisiveis = objetos.filter(function(objeto) {
            return riscoSel === 'todos' || objeto.risk === riscoSel;
        });
        const qtdAlertas = jogo.estado === 'espera' || jogo.estado === 'emergencia' || jogo.estado === 'explosao' ? 1 : 0;

        document.querySelector('#qtdRastreados').textContent = objsProx.length;
        document.querySelector('#qtdAlertas').textContent = qtdAlertas;
        document.querySelector('#nomeFoguete').textContent = aurora.id;

        document.querySelector('#mapaRadar').innerHTML = `
            ${renderLinha()}
            <span class="circulo_raio" style="left: ${aurora.x}%; top: ${aurora.y}%; width: ${raio * 2}%; height: ${raio * 2}%;"></span>
            <span class="centro_foguete foguete ${jogo.estado === 'explosao' ? 'explodindo' : ''}" style="left: ${aurora.x}%; top: ${aurora.y}%; --angulo-foguete: ${angFoguete(aurora.angle)}deg;" aria-label="Foguete ${aurora.id}">
                <i class="fa-solid fa-shuttle-space"></i>
            </span>
            ${jogo.estado === 'explosao' ? '<span class="explosao" style="left: ' + aurora.x + '%; top: ' + aurora.y + '%;"></span>' : ''}
            ${objsVisiveis.map(function(objeto) {
                return `
                    <span
                        class="ponto_radar risco-${objeto.risk}"
                        style="left: ${objeto.x}%; top: ${objeto.y}%"
                        data-label="${objeto.id}">
                        <i class="fa-solid ${objeto.icon}"></i>
                    </span>
                `;
            }).join('')}
        `;

        document.querySelector('#listaObjetos').innerHTML = objsVisiveis.map(function(objeto) {
            return `
                <article class="item_objeto">
                    <div class="topo_objeto">
                        <span class="nome_objeto">
                            <i class="fa-solid ${objeto.icon}"></i>
                            ${objeto.id}
                        </span>
                        <span class="selo_risco risco-${objeto.risk}">${rotuloRisco(objeto.risk)}</span>
                    </div>
                    <strong>${objeto.name}</strong>
                    <div class="meta_objeto">
                        <span>${objeto.type}</span>
                        <span>${Math.round(objeto.distance)} km da ${aurora.id}</span>
                        <span>${objeto.risk === 'baixo' ? 'monitorando' : 'rota ' + objeto.suggestion}</span>
                    </div>
                </article>
            `;
        }).join('');

        document.querySelector('#painelAlerta').innerHTML = renderStatus() + textoAlerta(ameaca);
    }

    function loopJogo(now) {
        const delta = Math.min(34, now - jogo.ultimoFrame);
        jogo.ultimoFrame = now;

        atualEstado(now, delta);

        if (jogo.estado !== 'espera' && now - jogo.ultimaRender >= 100) {
            renderPainel();
            jogo.ultimaRender = now;
        }

        requestAnimationFrame(loopJogo);
    }

    const filtroRisco = document.querySelector('#filtroRisco');
    if (filtroRisco) {
        filtroRisco.addEventListener('change', renderPainel);
    }

    const modoBtn = document.querySelector('#modoBtn');
    if (modoBtn) {
        modoBtn.value = jogo.modo;
        modoBtn.addEventListener('change', function() {
            jogo.modo = modoBtn.value;
            iniciarLoop();
            renderPainel();
        });
    }

    const painelAlerta = document.querySelector('#painelAlerta');
    if (painelAlerta) {
        function tratarDec(event) {
            const btn = event.target.closest('button[data-action]');
            if (!btn || jogo.estado !== 'espera' || jogo.decisaoBloq) return;

            event.preventDefault();
            jogo.decisaoBloq = true;

            if (btn.dataset.action === 'accept') {
                jogo.estado = 'embora';
                jogo.tipoMsg = 'aceito';
                jogo.message = `Rota aprovada. Alterando de ${aurora.direcaoAtual} para ${jogo.rotaSug}.`;
                definirRota(jogo.rotaSug);
            } else {
                emergencia();
            }

            renderPainel();
        }

        painelAlerta.addEventListener('pointerdown', tratarDec);
        painelAlerta.addEventListener('click', tratarDec);
    }

    iniciarLoop();
    renderPainel();
    requestAnimationFrame(loopJogo);
});
