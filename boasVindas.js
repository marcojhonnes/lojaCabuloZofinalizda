window.addEventListener('load', function() {
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    const tipoUsuario = localStorage.getItem('tipoUsuario');

    if (nomeUsuario && tipoUsuario) {
        const mensagem = document.getElementById('novaMenssagem');
        const texto = document.getElementById('text');

        if (tipoUsuario === 'colaborador') {
            if (mensagem) mensagem.innerText = `Bem-vindo ao Painel Administrativo, ${nomeUsuario}!`;
            if (texto) texto.innerText = `Olá ${nomeUsuario}, pronto para administrar a loja?`;
        } else if (tipoUsuario === 'cliente') {
            if (mensagem) mensagem.innerText = `Bem-vindo(a) à Loja Kabuloso, ${nomeUsuario}!`;
            if (texto) texto.innerText = `Olá ${nomeUsuario}, boas compras!`;
        }
    }
});
