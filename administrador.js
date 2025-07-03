window.addEventListener('load', function () {
  console.log('administrador.js carregado');

  const nomeUsuario = localStorage.getItem('nomeUsuario');
  const tipoUsuario = localStorage.getItem('tipoUsuario');

  console.log('tipoUsuario:', tipoUsuario);
  console.log('nomeUsuario:', nomeUsuario);

  if (tipoUsuario !== 'colaborador') {
    alert('Acesso restrito. Redirecionando para a página inicial...');
    window.location.href = 'index.html';
    return;
  }

  const mensagem = document.getElementById('novaMenssagem');
  const texto = document.getElementById('text');

  if (nomeUsuario && texto) {
    texto.innerText = `Bem-vindo ao Painel Administrativo, ${nomeUsuario}!`;
    texto.style.fontSize = '30px';
  }
});


function logout() {
  localStorage.removeItem('nomeUsuario');
  localStorage.removeItem('tipoUsuario');
  window.location.href = 'index.html'; // ou 'login.html'
}

// window.addEventListener('load', function () {
//   verificarAcesso('administrador');      // Confere se é administrador
//   iniciarControleDeSessao();             // Inicia controle de sessão com expiração
// });

window.addEventListener('load', function () {
    verificarAcesso('colaborador'); // ou 'administrador', se for o caso
    iniciarControleDeSessao();
  });