
document.addEventListener('DOMContentLoaded', function() {
    const secaoInicio = document.querySelector('#home');

    if (!secaoInicio) return;

    const fundos = [
        'url("../assets/imagens/background inicial.png")',
        'url("../assets/imagens/imagem-tela-problema.png")',
        'url("../assets/imagens/tecnologia background.png")'
    ];

    let indiceAtual = 0;

    secaoInicio.style.setProperty('--inicio-bg-atual', fundos[indiceAtual]);
    secaoInicio.style.setProperty('--inicio-bg-opacidade', '0');

    setInterval(function() {
        const proxIndice = (indiceAtual + 1) % fundos.length;

        secaoInicio.style.setProperty('--inicio-bg-prox', fundos[proxIndice]);
        secaoInicio.style.setProperty('--inicio-bg-opacidade', '1');

        setTimeout(function() {
            indiceAtual = proxIndice;
            secaoInicio.style.setProperty('--inicio-bg-atual', fundos[indiceAtual]);
            secaoInicio.style.setProperty('--inicio-bg-opacidade', '0');
        }, 1000);
    }, 4500);
});
