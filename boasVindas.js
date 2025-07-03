window.addEventListener('load', function () {
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    const tipoUsuario = localStorage.getItem('tipoUsuario');

    const mensagem = document.getElementById('novaMenssagem');
    const texto = document.getElementById('text');

    if (nomeUsuario && tipoUsuario) {
        if (tipoUsuario === 'colaborador') {
            if (texto) {
                texto.innerText = `Bem-vindo ao Painel Administrativo, ${nomeUsuario}!`;
                texto.style.fontSize = '30px';
            }
            if (mensagem) mensagem.innerText = ''; // limpa outra mensagem se existir
        } else if (tipoUsuario === 'cliente') {
            if (texto) {
                texto.innerText = `Olá ${nomeUsuario}, bem-vindo à loja KabuloZo!`;
                texto.style.fontSize = '30px';
            }
            if (mensagem) mensagem.innerText = '';
        }
    } else {
        // Nenhum usuário logado
        if (texto) texto.innerText = 'Olá, visitante!';
        if (mensagem) mensagem.innerText = '';
    }
});

 function verificarAcesso(tipoPermitido) {
  const nomeUsuario = localStorage.getItem('nomeUsuario');
  const tipoUsuario = localStorage.getItem('tipoUsuario');

  // Só redireciona se o tipo estiver errado ou não estiver logado
  if (!nomeUsuario || tipoUsuario !== tipoPermitido) {
    window.location.replace('index.html'); // melhor que location.href (mais rápido e não mantém histórico)
  }
}

