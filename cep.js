// 1. Auto preenchimento do endereço ao digitar o CEP
document.getElementById('cep').addEventListener('input', function () {
  const cep = this.value.replace(/\D/g, '');

  if (cep.length === 8) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        if (!data.erro) {
          document.getElementById('endereco-container').style.display = 'block';
          document.getElementById('endereco').value = data.logradouro || '';
          document.getElementById('bairro').value = data.bairro || '';
          document.getElementById('cidade').value = data.localidade || '';
          document.getElementById('estado').value = data.uf || '';
        } else {
          alert('CEP não encontrado!');
          document.getElementById('endereco-container').style.display = 'none';
        }
      })
      .catch(() => {
        alert('Erro ao buscar CEP.');
        document.getElementById('endereco-container').style.display = 'none';
      });
  } else {
    document.getElementById('endereco-container').style.display = 'none';
  }
});

// 2. Interceptar o envio do formulário
window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Impede redirecionamento
      cadastrarCliente();
    });
  }

  const botaoListar = document.getElementById('btn-listar');
  if (botaoListar) botaoListar.addEventListener('click', listarClientes);

  const campoPesquisar = document.getElementById('input-pesquisa');
  if (campoPesquisar) {
    campoPesquisar.addEventListener('input', (e) => {
      pesquisarCliente(e.target.value);
    });
  }

  const botaoExcluirPorNome = document.getElementById('btn-excluir-nome');
  if (botaoExcluirPorNome) {
    botaoExcluirPorNome.addEventListener('click', () => {
      const nome = document.getElementById('input-excluir-nome').value.trim();
      if (nome) excluirClientesNome(nome);
    });
  }
});

// 3. Cadastro do cliente
function cadastrarCliente() {
  const nome = document.querySelector('[name="Nome"]').value.trim();
  const celular = document.querySelector('[name="Celular"]').value.trim();
  const cep = document.querySelector('[name="CEP"]').value.trim();
  const email = document.querySelector('[name="Email"]').value.trim();

  const rua = document.getElementById('endereco').value.trim();
  const numero = document.getElementById('numero').value.trim();
  const bairro = document.getElementById('bairro').value.trim();
  const cidade = document.getElementById('cidade').value.trim();
  const estado = document.getElementById('estado').value.trim();

  if (!nome || !celular || !cep || !email || !rua || !numero || !bairro || !cidade || !estado) {
    msg.innerText = 'Preencha todos os campos!';
    msg.style.color = 'red';
    return;
  }

  const enderecoCompleto = `${rua}, ${numero}, ${bairro}, ${cidade} - ${estado}`;
  const novoCliente = { nome, celular, cep, email, endereco: enderecoCompleto };

  // Envio para o email
  const dados = new FormData();
  dados.append('Nome', nome);
  dados.append('Celular', celular);
  dados.append('CEP', cep);
  dados.append('Endereço Completo', enderecoCompleto);
  dados.append('Email', email);
  dados.append('_captcha', 'false');

  fetch('https://formsubmit.co/marcoaurelioguerreiro2012@hotmail.com', {
    method: 'POST',
    body: dados,
    headers: { 'Accept': 'application/json' }
  })
    .then(response => {
      if (response.ok) {
        adicionarCliente(novoCliente);
        msg.innerText = '✅ Cliente cadastrado com sucesso!';
        msg.style.color = 'green';
        document.getElementById('formulario').reset();
        document.getElementById('endereco-container').style.display = 'none';
      } else {
        msg.innerText = '⚠️ Erro ao enviar os dados.';
        msg.style.color = 'orange';
      }
    })
    .catch(() => {
      msg.innerText = '❌ Erro de conexão.';
      msg.style.color = 'red';
    });
}

// 4. Adiciona cliente ao localStorage (com verificação de array)
function adicionarCliente(cliente) {
  let clientes = JSON.parse(localStorage.getItem('clientes'));
  if (!Array.isArray(clientes)) clientes = [];
  clientes.push(cliente);
  localStorage.setItem('clientes', JSON.stringify(clientes));
}

// 5. Lista todos os clientes
function listarClientes() {
  const lista = document.getElementById('equipamentos-lista');
  lista.innerHTML = '';

  let clientes = JSON.parse(localStorage.getItem('clientes'));
  if (!Array.isArray(clientes)) clientes = [];

  if (clientes.length === 0) {
    lista.innerHTML = 'Nenhum cliente cadastrado.';
    return;
  }

  clientes.forEach((c, index) => {
    lista.innerHTML += `
      <div style="margin-bottom: 10px;">
        <strong>Nome:</strong> ${c.nome}<br>
        <strong>Celular:</strong> ${c.celular}<br>
        <strong>CEP:</strong> ${c.cep}<br>
        <strong>Endereço:</strong> ${c.endereco}<br>
        <strong>Email:</strong> ${c.email}<br>
        <button onclick="excluirCliente(${index})">🗑️ Excluir</button>
        <hr>
      </div>
    `;
  });
}

// 6. Pesquisar por nome (interface)
function pesquisarCliente(termo) {
  const lista = document.getElementById('equipamentos-lista');
  lista.innerHTML = '';

  const encontrados = pesquisarClientesNome(termo);

  if (encontrados.length === 0) {
    lista.innerHTML = 'Nenhum cliente encontrado.';
    return;
  }

  encontrados.forEach(c => {
    lista.innerHTML += `
      <div style="margin-bottom: 10px;">
        <strong>Nome:</strong> ${c.nome}<br>
        <strong>Celular:</strong> ${c.celular}<br>
        <strong>CEP:</strong> ${c.cep}<br>
        <strong>Endereço:</strong> ${c.endereco}<br>
        <strong>Email:</strong> ${c.email}<br>
        <hr>
      </div>
    `;
  });
}

// 7. Excluir cliente por índice (botão da lista)
function excluirCliente(index) {
  let clientes = JSON.parse(localStorage.getItem('clientes'));
  if (!Array.isArray(clientes)) clientes = [];

  if (index >= 0 && index < clientes.length) {
    if (confirm(`Deseja excluir o cliente "${clientes[index].nome}"?`)) {
      clientes.splice(index, 1);
      localStorage.setItem('clientes', JSON.stringify(clientes));
      listarClientes();
    }
  }
}
// botaoExcluir.addEventListener('click', function ()
// 8. Função para pesquisar clientes por nome
function pesquisarClientesNome() {
  administrador.innerHTML = '';
  paragrafo.innerHTML = '';
  mensagem.innerHTML = '';
  container.innerHTML = '';

  const entrada = document.createElement('input');
  entrada.id = 'input1';
  entrada.type = 'text';
  entrada.placeholder = 'Digite o nome do cliente';
  entrada.className = 'campo-produto'
  const botaoBuscar = document.createElement('button');
  botaoBuscar.textContent = 'Pesquisar';
  botaoBuscar.className = 'botao-produto'
  administrador.append(entrada, botaoBuscar);

  botaoBuscar.addEventListener('click', function () {
    const nome = entrada.value.trim().toLowerCase();
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const encontrados = clientes.filter(c => c.nome.toLowerCase().includes(nome));

    paragrafo.innerHTML = '';

    if (encontrados.length === 0) {
      paragrafo.innerHTML = 'Nenhum cliente encontrado.';
    } else {
      encontrados.forEach(c => {
        paragrafo.innerHTML += `
          <div style="margin-bottom: 10px;">
            <strong>Nome:</strong> ${c.nome}<br>
            <strong>Celular:</strong> ${c.celular}<br>
            <strong>CEP:</strong> ${c.cep}<br>
            <strong>Endereço:</strong> ${c.endereco}<br>
            <strong>Email:</strong> ${c.email}<br>
            <hr>
          </div>
        `;
      });
    }
  });
}

// 9. Função para excluir todos os clientes com nome exato
function excluirClientesNome() {
  administrador.innerHTML = '';
  paragrafo.innerHTML = '';
  mensagem.innerHTML = '';
  container.innerHTML = '';

  const entrada = document.createElement('input');
  entrada.id = 'input1';
  entrada.type = 'text';
  entrada.placeholder = 'Digite o nome do cliente';
  entrada.className = 'campo-produto'
  const botaoBuscar = document.createElement('button');
  botaoBuscar.textContent = 'Pesquisar';
  botaoBuscar.className = 'botao-produto'
  administrador.append(entrada, botaoBuscar);
  botaoBuscar.addEventListener('click', function(){
  let clientes = JSON.parse(localStorage.getItem('clientes'));
  if (!Array.isArray(clientes)) clientes = [];

  const clientesFiltrados = clientes.filter(c => c.nome.toLowerCase() !== nome.toLowerCase());
  const houveExclusao = clientesFiltrados.length < clientes.length;

  if (houveExclusao) {
    localStorage.setItem('clientes', JSON.stringify(clientesFiltrados));
    msg.innerText = `🗑️ Cliente(s) "${nome}" excluído(s) com sucesso.`;
    msg.style.color = 'green';
    listarClientes();
  } else {
    msg.innerText = `⚠️ Nenhum cliente chamado "${nome}" foi encontrado.`;
    msg.style.color = 'orange';
  }
})
}
