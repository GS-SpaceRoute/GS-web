
document.addEventListener('DOMContentLoaded', function() {
    const formContato = document.querySelector('#formContato');
    const feedback = document.querySelector('#feedContato');

    if (!formContato || !feedback) return;

    const nomeInput = document.querySelector('#nomeContato');
    const emailInput = document.querySelector('#emailContato');
    const msgInput = document.querySelector('#msgContato');

    const erroNome = document.querySelector('#erroNome');
    const erroEmail = document.querySelector('#erroEmail');
    const erroMsg = document.querySelector('#erroMsg');

    const regex = {
        name: /^[A-Za-zÀ-ÿ\s]{3,}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    };

    function setErro(input, errorElement, message) {
        input.classList.toggle('error', Boolean(message));
        errorElement.textContent = message;
    }

    function validarNome() {
        const value = nomeInput.value.trim();

        if (!value) {
            setErro(nomeInput, erroNome, 'o campo nome não pode estar vazio.');
            return false;
        }

        if (!regex.name.test(value)) {
            setErro(nomeInput, erroNome, 'digite um nome com pelo menos 3 letras.');
            return false;
        }

        setErro(nomeInput, erroNome, '');
        return true;
    }

    function validarEmail() {
        const value = emailInput.value.trim();

        if (!value) {
            setErro(emailInput, erroEmail, 'o campo email não pode estar vazio.');
            return false;
        }

        if (!regex.email.test(value)) {
            setErro(emailInput, erroEmail, 'digite um email válido como nome@exemplo.com.');
            return false;
        }

        setErro(emailInput, erroEmail, '');
        return true;
    }

    function validarMsg() {
        const value = msgInput.value.trim();

        if (!value) {
            setErro(msgInput, erroMsg, 'o campo mensagem não pode estar vazio.');
            return false;
        }

        if (value.length <= 10) {
            setErro(msgInput, erroMsg, 'a mensagem precisa ter mais de 10 caracteres.');
            return false;
        }

        setErro(msgInput, erroMsg, '');
        return true;
    }

    nomeInput.addEventListener('input', validarNome);
    emailInput.addEventListener('input', validarEmail);
    msgInput.addEventListener('input', validarMsg);

    formContato.addEventListener('submit', function(event) {
        event.preventDefault();

        const nomeValido = validarNome();
        const emailValido = validarEmail();
        const msgValida = validarMsg();

        if (!nomeValido || !emailValido || !msgValida) {
            feedback.textContent = 'arrume os campos destacados antes de enviar.';
            feedback.classList.add('error');
            return;
        }

        feedback.textContent = 'mensagem validada com sucesso. obrigado pelo contato!';
        feedback.classList.remove('error');
        formContato.reset();

        setErro(nomeInput, erroNome, '');
        setErro(emailInput, erroEmail, '');
        setErro(msgInput, erroMsg, '');
    });
});
