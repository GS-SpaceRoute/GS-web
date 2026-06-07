(function() {
    const temas = ['black', 'purple', 'white'];
    const temaSalvo = localStorage.getItem('aurora-theme');
    const btnTema = document.getElementById('btn-tema');

    if (temaSalvo) {
        document.body.setAttribute('data-theme', temaSalvo);
    }

    if (!btnTema) return;

    btnTema.addEventListener('click', function() {
        const temaAtual = document.body.getAttribute('data-theme') || 'black';
        const indiceTema = temas.indexOf(temaAtual);
        const proximoTema = temas[(indiceTema + 1) % temas.length];

        document.body.setAttribute('data-theme', proximoTema);
        localStorage.setItem('aurora-theme', proximoTema);
    });
})();
