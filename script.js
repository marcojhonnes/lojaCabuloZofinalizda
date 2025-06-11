let products = JSON.parse(localStorage.getItem('produtos')) || [];
let cart = [];

// Renderizar Produtos
function renderProducts() {
  const productList = document.getElementById('product-list');
  if (!productList) return;

  productList.innerHTML = '';

  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <button class="delete-product" onclick="deleteProduct(${product.id})">×</button>
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
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const imagem = document.getElementById('caminhoImagem').value;

    if (name && price > 0 && imagem) {
      products.push({ id: Date.now(), name, price, imagem });
      localStorage.setItem('produtos', JSON.stringify(products));
      renderProducts();

      // Limpar campos
      document.getElementById('product-name').value = '';
      document.getElementById('product-price').value = '';
      document.getElementById('caminhoImagem').value = '';
    } else {
      alert('Preencha o nome, preço e imagem corretamente.');
    }
  });
}

// Adicionar ao Carrinho
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
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

// Mudar quantidade
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

// Deletar Produto
function deleteProduct(productId) {
  products = products.filter(p => p.id !== productId);
  cart = cart.filter(item => item.product.id !== productId);
  localStorage.setItem('produtos', JSON.stringify(products));
  renderProducts();
  updateCart();
}

// Limpar Carrinho
const clearBtn = document.getElementById('clear-cart');
if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    if (confirm('Deseja limpar o carrinho?')) {
      cart = [];
      updateCart();
    }
  });
}

// Finalizar Compra
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

// Abrir / Fechar Carrinho
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

// Renderiza os produtos ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  renderProducts();
});
