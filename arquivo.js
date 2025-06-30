let sms = document.getElementById('mensagem');
let btn = document.getElementById('cadastrar');

const administrador = document.getElementById('adm');
const escolher = document.getElementById('escolha');
const mensagem = document.getElementById('msg');
const paragrafo = document.getElementById('equipamentos-lista');

const cadastro = document.getElementById('cadastro');
const botao = document.getElementById('btn');
const resposta = document.getElementById('menssagem');
const titulos = document.getElementById('titulo');
const selecionar = document.getElementById('escolha');
const autenticar = document.getElementById('autenticar');
const option = document.getElementById('opcao');
const botaoinicio = document.getElementById('inicio');
const texto = document.getElementById('text');
const saudacao = document.getElementById('novaMenssagem');
const container = document.getElementById('lista-imagens');


function limparPagina() {
  administrador.innerHTML = '';
  paragrafo.innerHTML = '';
  mensagem.innerHTML = '';
  container.innerHTML = '';
}

function sair() {
  window.location.href = 'index.html';
}

function adicionarProduto() {
  administrador.innerHTML = '';
  paragrafo.innerHTML = '';
  mensagem.innerHTML = '';

  const idProduto = document.createElement('input');
  idProduto.id = 'input1';
  idProduto.type = 'number';
  idProduto.placeholder = 'Digite o ID';
  idProduto.className = 'campo-produto'
  
  const nomeProduto = document.createElement('input');
  nomeProduto.id = 'input2';
  nomeProduto.type = 'text';
  nomeProduto.placeholder = 'Digite o Nome do Produto';
  nomeProduto.className = 'campo-produto'
  const valorProduto = document.createElement('input');
  valorProduto.id = 'input3';
  valorProduto.type = 'number';
  valorProduto.placeholder = 'Digite o Valor do Produto';
  valorProduto.className = 'campo-produto'
  const quantidadeProduto = document.createElement('input');
  quantidadeProduto.id = 'input4';
  quantidadeProduto.type = 'number';
  quantidadeProduto.placeholder = 'Digite a quantidade do Produto';
  quantidadeProduto.className = 'campo-produto'
  const imagemProduto = document.createElement('input');
  imagemProduto.id = 'input5';
  imagemProduto.type = 'text';
  imagemProduto.placeholder = 'Digite a URL da Imagem do Produto';
  imagemProduto.className = 'campo-produto'
  const botaoCadastrar = document.createElement('button');
  botaoCadastrar.textContent = 'Cadastrar Produto';
  botaoCadastrar.className = 'botao-produto'
  administrador.append(idProduto, nomeProduto, valorProduto, quantidadeProduto, imagemProduto, botaoCadastrar);

  botaoCadastrar.addEventListener('click', function () {
    const id = idProduto.value;
    const nome = nomeProduto.value;
    const valor = valorProduto.value;
    const quantidade = quantidadeProduto.value;
    const imagem = imagemProduto.value;

    if (!id || !nome || !valor || !quantidade || !imagem) {
      mensagem.innerText = 'Preencha todos os campos';
      mensagem.style.color = 'red';
    } else {
      // Atualizar objeto produtos
      produtos[id] = {
        idProduto: id,
        nomeProduto: nome,
        valorProduto: valor,
        quantidadeProduto: quantidade,
        imagemProduto: imagem
      };

      // Salvar no localStorage
      localStorage.setItem('produtos', JSON.stringify(produtos));

      mensagem.innerText = 'Produto cadastrado com sucesso!';
      mensagem.style.color = 'green';
      console.log(produtos);

      idProduto.value = '';
      nomeProduto.value = '';
      valorProduto.value = '';
      quantidadeProduto.value = '';
      imagemProduto.value = '';
    }
  });
}

function mostrarColaboradoresNome() {
  administrador.innerHTML = '';
  paragrafo.innerHTML = '';
  mensagem.innerHTML = '';
  container.innerHTML = '';

  const entrada = document.createElement('input');
  entrada.id = 'input1';
  entrada.type = 'text';
  entrada.placeholder = 'Digite o Nome do Funcionário';
  entrada.className = 'campo-produto'  
  const botaoBuscar = document.createElement('button');
  botaoBuscar.textContent = 'Pesquisar';
  botaoBuscar.className = 'botao-produto'

  administrador.append(entrada, botaoBuscar);

  botaoBuscar.addEventListener('click', function () {
    const nomeInput = entrada.value.toLowerCase();
    let encontrado = null;

    for (let key in colaboradores) {
      if (colaboradores[key].nome.toLowerCase() === nomeInput) {
        encontrado = colaboradores[key];
        break;
      }
    }

    if (encontrado) {
      mensagem.innerText = `ID: ${encontrado.id} \nNOME: ${encontrado.nome} \nNOME: ${encontrado.email} \nCARGO: ${encontrado.cargo} \nSENHA: ${encontrado.senha} \nDATA DE ADMISSÃO: ${encontrado.data}`;
      mensagem.style.color = 'black';
    } else {
      mensagem.innerText = 'Funcionário não encontrado';
      mensagem.style.color = 'red';
    }

    entrada.value = '';
  });
}


function mostrarColaboradoresId() {
  administrador.innerHTML = '';
  paragrafo.innerHTML = '';
  mensagem.innerHTML = '';
  container.innerHTML = '';

  const entrada = document.createElement('input');
  entrada.id = 'input1';
  entrada.type = 'number';
  entrada.placeholder = 'Digite o ID do Funcionário';
  entrada.className = 'campo-produto'
  const botaoBuscar = document.createElement('button');
  botaoBuscar.textContent = 'Pesquisar';
  botaoBuscar.className = 'campo-botao'

  administrador.append(entrada, botaoBuscar);

  botaoBuscar.addEventListener('click', function () {
    const idInput = Number(entrada.value);
    let encontrado = null;

    for (let key in colaboradores) {
      if (colaboradores[key].id === idInput) {
        encontrado = colaboradores[key];
        break;
      }
    }

    if (encontrado) {
      mensagem.innerText = `ID: ${encontrado.id} \nNOME: ${encontrado.nome} \nNOME: ${encontrado.email} \nCARGO: ${encontrado.cargo} \nSENHA: ${encontrado.senha} \nDATA DE ADMISSÃO: ${encontrado.data}`;
      mensagem.style.color = 'black';
    } else {
      mensagem.innerText = 'Funcionário não encontrado';
      mensagem.style.color = 'red';
    }

    entrada.value = '';
  });
}

function listarTodosColaboradores() {
  administrador.innerHTML = '';
  paragrafo.innerHTML = '';
  mensagem.innerHTML = '';
  container.innerHTML = '';

  let lista = Object.values(colaboradores).map(f => {
    return `ID: ${f.id} <br> Nome: ${f.nome} <br> Nome: ${f.email} <br> Cargo: ${f.cargo} <br> Senha: ${f.senha} <br> Data de Admissão: ${f.data} <hr>`;
  }).join('');

  paragrafo.innerHTML = lista;
}

function excluirColaboradorId() {
  administrador.innerHTML = '';
  paragrafo.innerHTML = '';
  mensagem.innerHTML = '';
  container.innerHTML = '';

  const entrada = document.createElement('input');
  entrada.id = 'input1';
  entrada.type = 'number';
  entrada.placeholder = 'Digite o ID do Funcionário a ser excluído';
  const botaoExcluir = document.createElement('button');
  botaoExcluir.textContent = 'EXCLUIR';
  entrada.className = 'campo-produto'
  botaoExcluir.className = 'botao-produto'
  
  administrador.append(entrada, botaoExcluir);

  botaoExcluir.addEventListener('click', function () {
    const id = entrada.value;

    if (colaboradores[id]) {
      mensagem.innerText = `Funcionário "${colaboradores[id].nome}" excluído com sucesso!`;
      mensagem.style.color = 'green';
      delete colaboradores[id];
      console.log(colaboradores);
    } else {
      mensagem.innerText = 'Funcionário não encontrado!';
      mensagem.style.color = 'red';
    }

    entrada.value = '';
  });
}

function excluirColaboradorNome() {
  administrador.innerHTML = '';
  paragrafo.innerHTML = '';
  mensagem.innerHTML = '';
  container.innerHTML = '';

  const entrada = document.createElement('input');
  entrada.id = 'input1';
  entrada.type = 'text';
  entrada.placeholder = 'Digite o nome do Funcionário a ser excluído';
  entrada.className = 'campo-produto'
  const botaoExcluir = document.createElement('button');
  botaoExcluir.textContent = 'EXCLUIR';
  botaoExcluir.className = 'campo-botao'

  administrador.append(entrada, botaoExcluir);

  botaoExcluir.addEventListener('click', function () {
    const nomeDigitado = entrada.value.trim().toLowerCase();
    let encontrado = false;

    for (const id in colaboradores) {
      if (colaboradores[id].nome.toLowerCase() === nomeDigitado) {
        mensagem.innerText = `Funcionário "${colaboradores[id].nome}" excluído com sucesso!`;
        mensagem.style.color = 'green';
        delete colaboradores[id];
        console.log(colaboradores);
        encontrado = true;
        break;
      }
    }

    if (!encontrado) {
      mensagem.innerText = 'Funcionário não encontrado!';
      mensagem.style.color = 'red';
    }

    entrada.value = '';
  });
}

function listarTodosProdutos() {
  administrador.innerHTML = '';
  paragrafo.innerHTML = '';
  mensagem.innerHTML = '';
  container.innerHTML = '';

  let listaProdutos = Object.values(produtos).map(p => {
    return `
      <div style="display: flex; align-items: center; margin-bottom: 20px;">
        <div style="margin-right: 15px;">
          <img src="${p.imagem}" alt="${p.name}" style="width: 100px; height: auto; border: 1px solid #ccc; padding: 5px;">
        </div>
        <div>
          <strong>ID:</strong> ${p.id} <br>
          <strong>Nome:</strong> ${p.name} <br>
          <strong>Valor:</strong> R$ ${p.price} <br>
          <strong>Quantidade:</strong> ${p.qtd}
        </div>
      </div>
      <hr>
    `;
  }).join('');

  paragrafo.innerHTML = listaProdutos || 'Nenhum produto encontrado.';
}

 
//  Renderiza os produtos ao carregar a página
 window.addEventListener('DOMContentLoaded', () => {
   renderProducts();
 });

