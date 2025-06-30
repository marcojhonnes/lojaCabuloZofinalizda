// Produtos fictícios

const produtosFicticios = {
  1: { id: 1, name: 'Camisa 2025', price: 100, qtd: 20, imagem: 'imagens/camisa1' },
  2: { id: 2, name: 'Camisa 2024', price: 190, qtd: 10, imagem: 'imagens/camisaf3' },
  3: { id: 3, name: 'Camisa 2 2024', price: 190, qtd: 10, imagem: 'imagens/camisa7' },
  4: { id: 4, name: 'Camisa 3 2023', price: 190, qtd: 10, imagem: 'imagens/camisa9' },
  5: { id: 5, name: 'Camisa 3 2023', price: 190, qtd: 10, imagem: 'imagens/camisa5' },
  6: { id: 6, name: 'Camisa 3 2023', price: 190, qtd: 10, imagem: 'imagens/camisa6' },
  7: { id: 7, name: 'Agasalho 2023', price: 190, qtd: 10, imagem: 'imagens/agasalho1' },
  8: { id: 8, name: 'Agasalho 3 2024', price: 190, qtd: 10, imagem: 'imagens/agasalho3' },
  9: { id: 9, name: 'Agasaho 3 2023', price: 190, qtd: 10, imagem: 'imagens/agasalho6' },
  10: { id: 10, name: 'Agasaho 3 2023', price: 190, qtd: 10, imagem: 'imagens/agasalho4' },
  11: { id: 11, name: 'Agasaho 3 2023', price: 190, qtd: 10, imagem: 'imagens/agasalho5' },
  12: { id: 12, name: 'Agasaho 3 2023', price: 190, qtd: 10, imagem: 'imagens/camisag6' },
};

// Recuperar produtos do localStorage
let produtosLS = JSON.parse(localStorage.getItem('produtos')) || {};

// Se produtos estiverem salvos como array, converte para objeto
if (Array.isArray(produtosLS)) {
  const convertido = {};
  produtosLS.forEach(p => convertido[p.id] = p);
  produtosLS = convertido;
}

// Mescla com os fictícios sem sobrescrever os existentes
let produtos = { ...produtosFicticios, ...produtosLS };

// Atualiza localStorage unificado
localStorage.setItem('produtos', JSON.stringify(produtos));

let cart = [];

// Função para renderizar os produtos
function renderProducts() {
  const productList = document.getElementById('product-list');
  if (!productList) return;

  productList.innerHTML = '';

  Object.values(produtos).forEach(product => {
    if (!product || typeof product.price !== 'number') return;

    const div = document.createElement('div');
    div.className = 'product';
    const isFuncionario = window.location.pathname.includes('administrador.html');

div.innerHTML = `
  ${isFuncionario ? `<button class="delete-product" onclick="deleteProduct(${product.id})">×</button>` : ''}
  <h3>${product.name}</h3>
  <img src="${product.imagem}" alt="Imagem do produto" style="width: 200px; margin: 10px;">
  <p>R$ ${product.price.toFixed(2)}</p>
  <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
`;

    productList.appendChild(div);
  });
}

// Cadastro de Produto
const addBtn = document.getElementById('add-product');
if (addBtn) {
  addBtn.addEventListener('click', () => {
    const name = document.getElementById('product-name').value.trim();
    const price = parseFloat(document.getElementById('product-price').value);
    const qtd = parseInt(document.getElementById('product-qtd').value);
    const imagem = document.getElementById('caminhoImagem').value.trim();

    if (name && price > 0 && qtd > 0 && imagem) {
      const id = Date.now();
      produtos[id] = { id, name, price, qtd, imagem };
      localStorage.setItem('produtos', JSON.stringify(produtos));
      renderProducts();

      // Limpar campos
      document.getElementById('product-name').value = '';
      document.getElementById('product-price').value = '';
      document.getElementById('product-qtd').value = '';
      document.getElementById('caminhoImagem').value = '';
    } else {
      alert('Preencha o nome, preço, quantidade e imagem corretamente.');
    }
  });
}

// Adicionar ao Carrinho
function addToCart(productId) {
  const product = produtos[productId];
  const item = cart.find(i => i.product.id === productId);

  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }

  updateCart();
}

// Atualizar Carrinho
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');

  cartItems.innerHTML = '';
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.product.price * item.quantity;
    count += item.quantity;

    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      ${item.product.name} - R$ ${item.product.price.toFixed(2)}
      <input type="number" min="1" value="${item.quantity}" onchange="changeQuantity(${item.product.id}, this.value)">
      <button onclick="removeFromCart(${item.product.id})">X</button>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
  cartCount.textContent = count;
}

// Mudar quantidade no carrinho
function changeQuantity(productId, newQuantity) {
  const item = cart.find(i => i.product.id === productId);
  if (item && newQuantity >= 1) {
    item.quantity = parseInt(newQuantity);
    updateCart();
  }
}

// Remover item do carrinho
function removeFromCart(productId) {
  cart = cart.filter(item => item.product.id !== productId);
  updateCart();
}

// Deletar produto
function deleteProduct(productId) {
  delete produtos[productId];
  cart = cart.filter(item => item.product.id !== productId);
  localStorage.setItem('produtos', JSON.stringify(produtos));
  renderProducts();
  updateCart();
}

// Limpar carrinho
const clearBtn = document.getElementById('clear-cart');
if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    if (confirm('Deseja limpar o carrinho?')) {
      cart = [];
      updateCart();
    }
  });
}

// Finalizar compra
const checkoutBtn = document.getElementById('checkout');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Seu carrinho está vazio.');
      return;
    }

    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    alert(`Compra realizada com sucesso!\nTotal da compra: R$ ${total.toFixed(2)}`);
    cart = [];
    updateCart();
    document.getElementById('cart').classList.remove('show');
  });
}

// Abrir e fechar carrinho
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');

if (openCartBtn) {
  openCartBtn.addEventListener('click', () => {
    document.getElementById('cart').classList.add('show');
  });
}
if (closeCartBtn) {
  closeCartBtn.addEventListener('click', () => {
    document.getElementById('cart').classList.remove('show');
  });
}

// Renderiza ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  renderProducts();
});
