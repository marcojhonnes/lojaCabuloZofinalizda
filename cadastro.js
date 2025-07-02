let clienteNome = document.getElementById('nome');
let clienteSenha = document.getElementById('senha');
let clienteCpf = document.getElementById('cpf');
let clienteCelular = document.getElementById('celular');
let clienteEndereco = document.getElementById('endereco');
let clienteEmail = document.getElementById('email');
let cartaoNome = document.getElementById('nomeCartao');
let clienteNumeroCartao = document.getElementById('numeroCartao');
let clienteCodigoCartao = document.getElementById('codigoCartao');
let novoId = document.getElementById('id');
let clicador = document.getElementById('btn');

function adicionarClientes() {
  const d = novoId.value.trim();
  const n = clienteNome.value.trim();
  const s = clienteSenha.value.trim();
  const f = clienteCpf.value.trim();
  const c = clienteCelular.value.trim();
  const en = clienteEndereco.value.trim();
  const em = clienteEmail.value.trim();
  const nca = cartaoNome.value.trim();
  const nc = clienteNumeroCartao.value.trim();
  const cc = clienteCodigoCartao.value.trim();

  if (!d || !n || !s || !f || !c || !en || !em || !nca || !nc || !cc) {
    mensagem.innerText = 'Preencha todos os campos!';
    mensagem.style.color = 'red';
    return;
  }

  if (clientes[d]) {
    mensagem.innerText = 'ID já existente! Use outro.';
    mensagem.style.color = 'red';
    return;
  }

  clientes[d] = {
    id: d,
    nome: n,
    senha: s,
    cpf: f,
    celular: c,
    endereco: en,
    email: em,
    nomeCartao: nca,
    numero: nc,
    codigo: cc
  };

  // Salva apenas os clientes reais (sem os fictícios)
  const clientesParaSalvar = {};
  for (let id in clientes) {
    if (!clientesFicticios[id]) {
      clientesParaSalvar[id] = clientes[id];
    }
  }
  localStorage.setItem('clientes', JSON.stringify(clientesParaSalvar));

  mensagem.innerText = 'Usuário cadastrado com sucesso!';
  mensagem.style.color = 'green';

  // Limpar campos
  novoId.value = '';
  clienteNome.value = '';
  clienteSenha.value = '';
  clienteCpf.value = '';
  clienteCelular.value = '';
  clienteEndereco.value = '';
  clienteEmail.value = '';
  cartaoNome.value = '';
  clienteNumeroCartao.value = '';
  clienteCodigoCartao.value = '';
}

window.addEventListener('DOMContentLoaded', () => {
  let clicador = document.getElementById('btn');
  clicador.addEventListener('click', adicionarClientes);
});

function listarTodosClientes() {
  administrador.innerHTML = ''; 
  paragrafo.innerHTML = '';
  mensagem.innerHTML = '';

  let lista = Object.values(clientes).map(f => {
    return `
      ID: ${f.id} <br>
      Nome: ${f.nome} <br>
      Senha: ${f.senha} <br>
      CPF: ${f.cpf} <br>
      Celular: ${f.celular} <br>
      Endereço: ${f.endereco} <br>
      Email: ${f.email} <br>
      Nome no Cartão: ${f.nomeCartao} <br>
      Número do Cartão: ${f.numero} <br>
      Código do Cartão: ${f.codigo} <br><hr><br>
    `;
  }).join('');

  paragrafo.innerHTML = lista || 'Nenhum cliente encontrado.';
}





function cadastrarColaborador() {
  administrador.innerHTML = '';
  paragrafo.innerHTML = '';
  mensagem.innerHTML = '';
  container.innerHTML = '';

  const id = document.createElement('input');
  id.id = 'input1';
  id.type = 'number';
  id.placeholder = 'Digite o ID';
  id.className = 'campo-produto'
  const email = document.createElement('input');
  email.id = 'input2';
  email.type = 'text';
  email.placeholder = 'Digite o E-mail';
  email.className = 'campo-produto'
  
  const cargo = document.createElement('input');
  cargo.id = 'input3';
  cargo.type = 'text';
  cargo.placeholder = 'Digite o Cargo';
  cargo.className = 'campo-produto'
  const nome = document.createElement('input');
  nome.id = 'input4';
  nome.type = 'text';
  nome.placeholder = 'Digite o Nome';
  nome.className = 'campo-produto'
  const senha = document.createElement('input');
  senha.id = 'input5';
  senha.type = 'password';
  senha.placeholder = 'Digite a Senha';
  senha.className = 'campo-produto'
  const confirmarSenha = document.createElement('input');
  confirmarSenha.id = 'input6';  // alterado para evitar conflito
  confirmarSenha.type = 'password';
  confirmarSenha.placeholder = 'Confirme a Senha';
  confirmarSenha.className = 'campo-produto'
  const data = document.createElement('input');
  data.id = 'input7';  // alterado para manter sequência
  data.type = 'text';
  data.placeholder = 'Digite a Data de Admissão';
  data.className = 'campo-produto'
  const botaoCadastrar = document.createElement('button');
  botaoCadastrar.className = 'botao-produto'
  botaoCadastrar.textContent = 'Cadastrar';

  administrador.append(id, nome, cargo, email, senha, confirmarSenha, data, botaoCadastrar);

  botaoCadastrar.addEventListener('click', function () {
    const idVal = id.value;
    const emaiVal = email.value;
    const cargoVal = cargo.value;
    const nomeVal = nome.value;
    const senhaVal = senha.value;
    const confirmVal = confirmarSenha.value;
    const dataVal = data.value;

    if (!idVal || !emaiVal || !cargoVal || !nomeVal || !senhaVal || !confirmVal || !dataVal) {
      mensagem.innerText = 'Preencha todos os campos';
      mensagem.style.color = 'red';
    } else if (senhaVal !== confirmVal) {
      mensagem.innerText = 'As senhas não coincidem!';
      mensagem.style.color = 'red';
    } else {
      colaboradores[idVal] = {
        id: idVal,
        nome: nomeVal,
        email: emaiVal,
        cargo: cargoVal,
        senha: senhaVal,
        data: dataVal
      };

      // Salvar no localStorage após atualizar o objeto
      localStorage.setItem('colaboradores', JSON.stringify(colaboradores));

      mensagem.innerText = `Colaborador ${nomeVal}, cadastrado com sucesso!`;
      mensagem.style.color = 'green';
      console.log(colaboradores);

      id.value = '';
      email.value = '';
      cargo.value = '';
      nome.value = '';
      senha.value = '';
      confirmarSenha.value = '';
      data.value = '';
    }
  });
}

function excluirClienteNome() {
  administrador.innerHTML = '';
  paragrafo.innerHTML = '';
  mensagem.innerText = '';

  const input = document.createElement('input');
  input.id = 'input2';
  input.type = 'text';
  input.placeholder = 'Digite o nome do cliente';
  input.className = 'campo-produto'
  const botao = document.createElement('button');
  botao.textContent = 'Excluir por Nome';
  botao.className = 'botao-produto'
  botao.onclick = function () {
    const nome = input.value.trim().toLowerCase();
    let encontrado = false;

    for (let id in clientes) {
      if (clientes[id].nome.toLowerCase() === nome) {
        delete clientes[id];
        localStorage.setItem('clientes', JSON.stringify(clientes));
        mensagem.innerText = 'Cliente excluído com sucesso!';
        mensagem.style.color = 'green';
        encontrado = true;
        break;
      }
    }

    if (!encontrado) {
      mensagem.innerText = 'Cliente não encontrado!';
      mensagem.style.color = 'red';
    }
  };

  administrador.appendChild(input);
  administrador.appendChild(botao);
}


function excluirClienteId() {
  administrador.innerHTML = '';
  paragrafo.innerHTML = '';
  mensagem.innerText = '';

  const input = document.createElement('input');
  input.id = 'input1';
  input.type = 'number';
  input.placeholder = 'Digite o ID do cliente';
  input.className = 'campo-produto'
  const botao = document.createElement('button');
  botao.textContent = 'Excluir por ID';
  botao.className = 'botao-produto'
  botao.onclick = function () {
    const id = input.value.trim();
    if (!id || !clientes[id]) {
      mensagem.innerText = 'Cliente não encontrado!';
      mensagem.style.color = 'red';
      return;
    }

    delete clientes[id];
    localStorage.setItem('clientes', JSON.stringify(clientes));
    mensagem.innerText = 'Cliente excluído com sucesso!';
    mensagem.style.color = 'green';
  };

  administrador.appendChild(input);
  administrador.appendChild(botao);
}



const imagens = [
  'imagens/camisaf1',
  'imagens/camisaf2',
  'imagens/camisaf3',
  'imagens/camisaf4',
  'imagens/camisaf5',
  'imagens/camisaf6',
  'imagens/camisa1',
  'imagens/camisa2',
  'imagens/camisa3',
  'imagens/camisa4',
  'imagens/camisa5',
  'imagens/camisa6',
  'imagens/camisa7',
  'imagens/camisa8',
  'imagens/camisa9',
  'imagens/camisa10',
  'imagens/camisa100',
  'imagens/agasalho1',
  'imagens/agasalho2',
  'imagens/agasalho3',
  'imagens/agasalho4',
  'imagens/agasalho5',
  'imagens/agasalho6',
  'imagens/agasalho7',
  'imagens/camisag1',
  'imagens/camisag2',
  'imagens/camisag3',
  'imagens/camisag4',
  'imagens/camisag5',
  'imagens/camisag6',
  'imagens/camisainf1',
  'imagens/camisainf2',
  'imagens/camisainf3',
    // etc...
];

function listarImagens() {
  const container = document.getElementById('lista-imagens');
  administrador.innerHTML = ''
  paragrafo.innerHTML = ''
  mensagem.innerHTML = ''
  container.innerHTML = '';

  imagens.forEach(src => {
    const wrapper = document.createElement('div');
    wrapper.className = 'item-imagem';

    const img = document.createElement('img');
    img.src = src;
    img.alt = src;

    const p = document.createElement('p');
    p.textContent = src;
    p.style.color = 'white'
    wrapper.appendChild(img);
    wrapper.appendChild(p);
    container.appendChild(wrapper);
  });
}

