// ------------ Inicialização dos clientes ------------

const clientesFicticios = {
  1: { id: 1, nome: 'Abreu Ferreira', email: 'abreu@cliente.com.br', senha: '123', cpf: 1000000000011, celular: 31992145630, endereco: 'rua zilda' },
  2: { id: 2, nome: 'Ferreira de Abreu', email: 'ferreira@cliente.com.br', senha: '123', cpf: 100, celular: 31992145630, endereco: 'rua zilda' },
  3: { id: 3, nome: 'Marco Abreu', email: 'marco@cliente.com.br', senha: '123', cpf: 1000000000011, celular: 31992145630, endereco: 'rua zilda' },
  4: { id: 4, nome: 'Aurelio Ferreira', email: 'aurelio@cliente.com.br', senha: '123', cpf: 100, celular: 31992145630, endereco: 'rua zilda' },
  5: { id: 5, nome: 'Visitante Clente', email: 'visitantecliente@cliente.com.br', senha: '123', cpf: 100, celular: 31992145630, endereco: 'rua zilda' }
};


// Carrega os clientes do localStorage (se existirem)
let clientesLS = JSON.parse(localStorage.getItem('clientes')) || {};

// Mescla os clientes fictícios com os do localStorage
let clientes = { ...clientesFicticios, ...clientesLS };


// ------------ Inicialização dos colaboradores ------------

let colaboradoresLS = JSON.parse(localStorage.getItem('colaboradores'));
let colaboradores = (colaboradoresLS && Object.keys(colaboradoresLS).length > 0) ? colaboradoresLS : {
    1: { id: 1, nome: 'Marco', email: 'marco@empresa.com', cargo: 'Proprietário', senha: '123', data: '12/05/2025' },
    2: { id: 2, nome: 'Junior', email: 'junior@empresa.com', cargo: 'Proprietário', senha: '123', data: '12/05/2025' },
    3: { id: 3, nome: 'Christopher', email: 'christopher@empresa.com', cargo: 'Proprietário', senha: '123', data: '12/05/2025' },
    4: { id: 4, nome: 'Abreu', email: 'abreu@empresa.com', cargo: 'Proprietário', senha: '123', data: '12/05/2025' },
    5: { id: 5, nome: 'Juarez', email: 'juarez@empresa.com', cargo: 'Proprietário', senha: '123', data: '12/05/2025' },
    6: { id: 6, nome: 'Vusitante Colaborador', email: 'visitantecolaborador@empresa.com', cargo: 'Proprietário', senha: '123', data: '12/05/2025' }
};

// ------------ Função iniciar o formulário de login ------------

function iniciar() {
    const cadastro = document.getElementById('cadastro');
    cadastro.innerHTML = '';

    const entradaEmail = document.createElement('input');
    entradaEmail.id = 'inputEmail';
    entradaEmail.placeholder = 'Digite seu e-mail';

    const entradaSenha = document.createElement('input');
    entradaSenha.id = 'inputSenha';
    entradaSenha.type = 'password';
    entradaSenha.placeholder = 'Digite sua senha';

    const botaoEntrar = document.createElement('button');
    botaoEntrar.textContent = 'Entrar';
    entradaEmail.className = 'campo-produto';
    entradaSenha.className = 'campo-produto';
    botaoEntrar.className = 'botao-produto';
    cadastro.append(entradaEmail, entradaSenha, botaoEntrar);

    botaoEntrar.addEventListener('click', fazerLogin);
}

// ------------ Função para fazer login ------------

function fazerLogin() {
    const emailDigitado = document.getElementById('inputEmail').value.trim().toLowerCase();
    const senhaDigitada = document.getElementById('inputSenha').value.trim();

    let usuarioEncontrado = false;

    // -------- Atualizar colaboradores mais atuais --------
    let colaboradoresAtualizados = JSON.parse(localStorage.getItem('colaboradores'));
    if (colaboradoresAtualizados && Object.keys(colaboradoresAtualizados).length > 0) {
        colaboradores = colaboradoresAtualizados;
    }

    // -------- Verificar colaborador --------
    for (let id in colaboradores) {
        const colab = colaboradores[id];
        if (colab.email.toLowerCase() === emailDigitado && colab.senha === senhaDigitada) {
            localStorage.setItem('nomeUsuario', colab.nome);
            localStorage.setItem('tipoUsuario', 'colaborador');
            window.location.href = 'administrador.html';
            usuarioEncontrado = true;
            return;
        }
    }

    // -------- Verificar cliente --------
    for (let id in clientes) {
        const cli = clientes[id];
        if (cli.email.toLowerCase() === emailDigitado && cli.senha === senhaDigitada) {
            localStorage.setItem('nomeUsuario', cli.nome);
            localStorage.setItem('tipoUsuario', 'cliente');
            window.location.href = 'index.html';
            usuarioEncontrado = true;
            return;
        }
    }

    // -------- Caso ninguém seja encontrado --------
    if (!usuarioEncontrado) {
        alert('Usuário ou senha incorretos!');
    }
}

// ------------ Quando a página carregar ------------

document.addEventListener('DOMContentLoaded', function() {
    const botaoInicio = document.getElementById('inicio');
    if (botaoInicio) {
        botaoInicio.addEventListener('click', iniciar);
    }
});


