function limparPagina() {
  administrador.innerHTML = '';
  paragrafo.innerHTML = '';
  mensagem.innerHTML = '';
  container.innerHTML = '';
    }

function sair() {
    window.location.href = 'login.html';
}

escolher.addEventListener('change', function() {
    const opcaoEscolida = escolher.value
    if(opcaoEscolida === '0') {
        limparPagina()
    } else if(opcaoEscolida === '1') {
        cadastrarColaborador()
    } else if(opcaoEscolida === '2') {
        mostrarColaboradoresNome()
    } else if(opcaoEscolida === '3') {
        mostrarColaboradoresId()
    } else if(opcaoEscolida === '4') {
        listarTodosColaboradores()
    }  else if (opcaoEscolida === '5'){ 
        excluirColaboradorId()
    } else if(opcaoEscolida === '6') {
         excluirColaboradorNome()
    } else if(opcaoEscolida === '7') {
    //    adicionarProduto()
    } else if(opcaoEscolida === '8') {
        listarTodosProdutos()
    } else if(opcaoEscolida === '9') {
        listarClientes()
    } else if(opcaoEscolida === '10'){
          pesquisarClientesNome()(nome)
    }
    else if(opcaoEscolida === '11') {
       excluirCliente(index)
    } else if(opcaoEscolida === '12') {
       excluirClienteId()
    } else if (opcaoEscolida === '13') {
        listarImagens()
        
    } 
    
    else if(opcaoEscolida === '14') {
        sair()
    } else if(opcaoEscolida === '15') {
        limparTodosProdutos()
    } else if(opcaoEscolida === '16') {
        corrigirSenhasAntigas()
    } else if(opcaoEscolida === '17') {
        listarTarefas()
    } else if(opcaoEscolida === '18') {
        executarTarefa()
    } else if(opcaoEscolida === '17') {
        tarefaConcluida()
    }  else if(opcaoEscolida === '18') {
        excluirtarefa()
    } else if(opcaoEscolida === '19') {
        listarVeiculos()
    } else if(opcaoEscolida === '20') {
        cadastrarVeiculos()
    } else if(opcaoEscolida === '21') {
        excluirVeiculo()
    } else if(opcaoEscolida === '22') {
        listarArmaduras()
    } else if(opcaoEscolida === '23') {
        cadastrararmadura()
    } else if(opcaoEscolida === '24') {
        mudarSituacaoArmaduras()
    } else if(opcaoEscolida === '25') {
        excluirArmadura()
    }  else if(opcaoEscolida === '26') {
        cadastrarEquipamento()
    } else if(opcaoEscolida === '27') {
        pesquisarEquipamento()
    } else if(opcaoEscolida === '28') {
        retornarTodosEquipamentos()
    } else if(opcaoEscolida === '29') {
        excluirEquipamento()
    } else if(opcaoEscolida === '30') {
        sair()
    }
    }
    )