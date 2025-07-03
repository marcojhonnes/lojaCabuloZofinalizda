
console.log('expiraEm:', localStorage.getItem('expiraEm'));
console.log('agora:', Date.now());
console.log('diferença:', parseInt(localStorage.getItem('expiraEm')) - Date.now());

// Define tempo de expiração da sessão (10 minutos)
// const TEMPO_EXPIRACAO = 10 * 60 * 1000; // 10 minutos
// const TEMPO_AVISO = 1 * 60 * 1000; // 1 minuto antes de expirar
// const TEMPO_EXPIRACAO = 1 * 60 * 1000; // 1 minuto (60.000 ms)
const TEMPO_AVISO = 20 * 1000;         // 20 segundos antes do fim

let avisoMostrado = false;

// Renova a sessão
function renovarSessao() {
  localStorage.setItem('expiraEm', Date.now() + TEMPO_EXPIRACAO);
  avisoMostrado = false; // reseta o aviso sempre que interagir
}

// Verifica se a sessão está expirando ou já expirou
function verificarSessaoOuRedirecionar() {
  const expiraEm = localStorage.getItem('expiraEm');
  const agora = Date.now();

  if (!expiraEm) {
    redirecionar();
    return;
  }

  const tempoRestante = parseInt(expiraEm) - agora;

  if (tempoRestante <= 0) {
    redirecionar();
  } else if (tempoRestante <= TEMPO_AVISO && !avisoMostrado) {
    avisoMostrado = true;
   // Cria uma div de aviso na página (coloque no início do body ou onde quiser)
// Cria uma div de aviso na página (coloque no início do body ou onde quiser)
function mostrarAvisoSessao() {
  if (document.getElementById('avisoSessao')) return; // evita criar várias vezes

  const aviso = document.createElement('div');
  aviso.id = 'avisoSessao';
  aviso.style.position = 'fixed';
  aviso.style.top = '0';
  aviso.style.left = '0';
  aviso.style.right = '0';
  aviso.style.backgroundColor = '#ffcc00';
  aviso.style.color = '#000';
  aviso.style.textAlign = 'center';
  aviso.style.padding = '10px';
  aviso.style.zIndex = '9999';
  aviso.style.fontWeight = 'bold';
  aviso.textContent = '⚠️ Sua sessão vai expirar em menos de 1 minuto!';

  document.body.appendChild(aviso);

  // Desaparece depois de 10 segundos (10000 ms)
  setTimeout(() => {
    aviso.remove();
  }, 10000);
}


// Na função verificarSessaoOuRedirecionar substitua o alert() por mostrarAvisoSessao()
function verificarSessaoOuRedirecionar() {
  const expiraEm = localStorage.getItem('expiraEm');
  const agora = Date.now();

  if (!expiraEm) {
    redirecionar();
    return;
  }

  const tempoRestante = parseInt(expiraEm) - agora;

  if (tempoRestante <= 0) {
    redirecionar();
  } else if (tempoRestante <= TEMPO_AVISO && !avisoMostrado) {
    avisoMostrado = true;
    mostrarAvisoSessao();
  }
}


// Na função verificarSessaoOuRedirecionar substitua o alert() por mostrarAvisoSessao()
function verificarSessaoOuRedirecionar() {
  const expiraEm = localStorage.getItem('expiraEm');
  const agora = Date.now();

  if (!expiraEm) {
    redirecionar();
    return;
  }

  const tempoRestante = parseInt(expiraEm) - agora;

  if (tempoRestante <= 0) {
    redirecionar();
  } else if (tempoRestante <= TEMPO_AVISO && !avisoMostrado) {
    avisoMostrado = true;
    mostrarAvisoSessao();
  }
}

  }
}

// Redireciona ao encerrar a sessão
function redirecionar() {
  localStorage.removeItem('nomeUsuario');
  localStorage.removeItem('tipoUsuario');
  localStorage.removeItem('expiraEm');
  window.location.replace('index.html');
}

// Inicia a verificação e renovação
function iniciarControleDeSessao() {
  verificarSessaoOuRedirecionar();
  renovarSessao();

  document.addEventListener('click', renovarSessao);
  document.addEventListener('mousemove', renovarSessao);
  document.addEventListener('keydown', renovarSessao);

  setInterval(verificarSessaoOuRedirecionar, 10000); // a cada 10s
}


