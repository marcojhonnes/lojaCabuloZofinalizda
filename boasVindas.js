window.addEventListener('load', function() {
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    const tipoUsuario = localStorage.getItem('tipoUsuario');

    if (nomeUsuario && tipoUsuario) {
        const mensagem = document.getElementById('novaMenssagem');
        const texto = document.getElementById('text');

        if (tipoUsuario === 'colaborador') {
            // if (mensagem) mensagem.innerText = `Olá ${nomeUsuario}, bom trabalho!`;
            if (texto) texto.innerText = `Bem-vindo ao Painel Administrativo, ${nomeUsuario}!`;
            texto.style.fontSize = '30px'
        } else if (tipoUsuario === 'cliente') {
            // if (mensagem) mensagem.innerText = `Bem-vindo(a) à Loja KabuloZo, ${nomeUsuario}!`;
            if (texto) texto.innerText = `Olá ${nomeUsuario}, vinndo a loja Cabulozo!`;
            texto.style.fontSize = '30px'
        }
    }
});
