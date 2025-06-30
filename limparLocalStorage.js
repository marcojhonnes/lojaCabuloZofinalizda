function limparTodosProdutos() {
  // Remove os produtos do localStorage
  localStorage.removeItem('produtos');

  // Limpa a variável global (se estiver usando)
  if (typeof produtos !== 'undefined') {
    produtos = {};
  }

  // Limpa a exibição na tela
  if (paragrafo) paragrafo.innerHTML = '';
  if (mensagem) {
    mensagem.innerText = '🗑️ Todos os produtos foram removidos com sucesso!';
    mensagem.style.color = 'green';
  }
}

function corrigirSenhasAntigas() {
  let clientesCorrigidos = 0;

  for (let nome in clientes) {
    if (typeof clientes[nome].senha !== 'string') {
      clientes[nome].senha = '123';  // Ou outra senha padrão
      clientesCorrigidos++;
    }
  }

  localStorage.setItem('clientes', JSON.stringify(clientes));

  if (clientesCorrigidos > 0) {
    alert(`Senhas de ${clientesCorrigidos} clientes corrigidas para "123".`);
  } else {
    alert('Nenhum cliente precisou de correção.');
  }
}
