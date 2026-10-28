/**
 * Pipocas Leão Gourmet - Catálogo 2025
 * Complete Interactive Catalog, Search, Filtering, Cart & WhatsApp Ordering
 */

// ==========================================================================
// 1. Catalog Products Data Model
// ==========================================================================
const CATALOG_PRODUCTS = [
  {
    id: 'pipoca-personalizada',
    title: 'Pipoca Personalizada',
    emoji: '🎁',
    sizeLabel: 'Tamanho 10x10 cm',
    category: 'Pipocas',
    tags: ['Pipocas', 'Personalizados'],
    image: 'assets/images/pipoca_personalizada.png',
    minQuantity: 1,
    minAlert: null,
    isConsultation: false,
    variations: [
      { id: 'caramelizada', label: 'Caramelizada', price: 3.50, isGourmet: false },
      { id: 'gourmet', label: 'Gourmet', price: 4.25, isGourmet: true }
    ],
    description: 'Pipoca doce super crocante embalada em saquinho 10x10cm com adesivo ou rótulo temático personalizado. Ideal para lembrancinhas de aniversários, eventos infantis e corporativos.',
    flavorsHint: 'Disponível em Caramelo Artesanal ou Sabores Gourmet nobres (Ninho, Nutella, Chocolate Belga, Morango, etc.).'
  },
  {
    id: 'pipoca-saborear-standup',
    title: 'Pipoca para Saborear ou Presentear',
    emoji: '🍿',
    sizeLabel: 'Saco tipo zíper — Tamanhos P, M e G',
    category: 'Pipocas',
    tags: ['Pipocas'],
    image: 'assets/images/pipoca_saborear.png',
    minQuantity: 1,
    minAlert: null,
    isConsultation: false,
    variations: [
      { id: 'p-caram', label: 'P Caram. (R$ 7)', price: 7.00, isGourmet: false },
      { id: 'p-gourmet', label: 'P Gourmet (R$ 8,50)', price: 8.50, isGourmet: true },
      { id: 'm-caram', label: 'M Caram. (R$ 12)', price: 12.00, isGourmet: false },
      { id: 'm-gourmet', label: 'M Gourmet (R$ 15)', price: 15.00, isGourmet: true },
      { id: 'g-caram', label: 'G Caram. (R$ 18)', price: 18.00, isGourmet: false },
      { id: 'g-gourmet', label: 'G Gourmet (R$ 22)', price: 22.00, isGourmet: true }
    ],
    description: 'Embalagem stand-up pouch laminada com fecho hermético zip lock que preserva a textura crocante por muito mais tempo. Perfeita para saborear a qualquer hora ou presentear com carinho.',
    flavorsHint: 'Disponível em todos os +20 sabores gourmet e tradicionais.'
  },
  {
    id: 'mini-pipoca-saco',
    title: 'Mini Pipoca no Saco',
    emoji: '🍿',
    sizeLabel: 'Tamanho 10x15 cm',
    category: 'Pipocas',
    tags: ['Pipocas'],
    image: 'assets/images/pipoca_mini_saco.png',
    minQuantity: 1,
    minAlert: null,
    isConsultation: false,
    variations: [
      { id: 'tradicional', label: 'Trad. R$ 3,00', price: 3.00, isGourmet: false },
      { id: 'gourmet', label: 'Gourmet R$ 3,25', price: 3.25, isGourmet: true }
    ],
    description: 'Saquinho compacto e charmoso com fita decorativa. Quantidade ideal para compor sacolinhas de brindes e mesas de doces.',
    flavorsHint: 'Sabores caramelizados tradicionais ou gourmet.'
  },
  {
    id: 'pipoca-saco-medio',
    title: 'Pipoca no Saco',
    emoji: '🍿',
    sizeLabel: 'Tamanho 10x20 cm',
    category: 'Pipocas',
    tags: ['Pipocas'],
    image: 'assets/images/pipoca_saco_medio.png',
    minQuantity: 1,
    minAlert: null,
    isConsultation: false,
    variations: [
      { id: 'tradicional', label: 'Trad. R$ 4,00', price: 4.00, isGourmet: false },
      { id: 'gourmet', label: 'Gourmet R$ 4,25', price: 4.25, isGourmet: true }
    ],
    description: 'Porção média equilibrada para lanches de festas, piqueniques escolares ou para matar a vontade com pipoca sempre fresquinha.',
    flavorsHint: 'Tradicional caramelizada ou gourmet.'
  },
  {
    id: 'pipoca-saco-cone',
    title: 'Pipoca no Saco Cone',
    emoji: '🍿',
    sizeLabel: 'Tamanho 18x30 cm',
    category: 'Pipocas',
    tags: ['Pipocas'],
    image: 'assets/images/pipoca_saco_cone.png',
    minQuantity: 1,
    minAlert: null,
    isConsultation: false,
    variations: [
      { id: 'tradicional', label: 'Trad. R$ 5,00', price: 5.00, isGourmet: false },
      { id: 'gourmet', label: 'Gourmet R$ 6,00', price: 6.00, isGourmet: true }
    ],
    description: 'Embalagem em formato triangular de cone transparente que realça a beleza das pipocas doces e caramelizadas, finalizada com um lindo laço de cetim.',
    flavorsHint: 'Visual festivo lindo para fotos de mesa decorada.'
  },
  {
    id: 'pipoca-pote',
    title: 'Pipoca no Pote',
    emoji: '🍿',
    sizeLabel: 'Copo / Vaso / Pote 300 ml',
    category: 'Pipocas',
    tags: ['Pipocas'],
    image: 'assets/images/pipoca_pote.png',
    minQuantity: 1,
    minAlert: null,
    isConsultation: false,
    variations: [
      { id: 'tradicional', label: 'Trad. R$ 5,00', price: 5.00, isGourmet: false },
      { id: 'gourmet', label: 'Gourmet R$ 6,00', price: 6.00, isGourmet: true }
    ],
    description: 'Pote rígido de 300 ml com tampa antivazamento. Confortável de segurar, protege as pipocas contra umidade e garante crocância irresistível.',
    flavorsHint: 'Ideal para festas infantis e cinemas em casa.'
  },
  {
    id: 'algodao-pote-300',
    title: 'Algodão-doce no Pote 300 ml',
    emoji: '🍭',
    sizeLabel: 'Personalizado — ideal para lembrancinhas',
    category: 'Algodão-doce',
    tags: ['Algodão-doce', 'Personalizados'],
    image: 'assets/images/algodao_pote_300.png',
    minQuantity: 30,
    minAlert: 'Pedido mínimo: 30 unidades.',
    isConsultation: false,
    variations: [
      { id: 'sem-pers', label: 'Sem pers. R$ 3,50', price: 3.50, isGourmet: false },
      { id: 'com-pers', label: 'Com pers. R$ 4,00', price: 4.00, isGourmet: true }
    ],
    description: 'Algodão-doce macio em camadas coloridas dentro de pote hermético de 300ml. Não murcha e dura muitos dias fechado! Acabamento com laço fino opcional (+R$ 1,00/un).',
    flavorsHint: 'Cores personalizáveis de acordo com a paleta da sua festa.'
  },
  {
    id: 'algodao-pote-400-bolha',
    title: 'Algodão-doce Pote 400 ml — Tampa Bolha',
    emoji: '🍭',
    sizeLabel: 'Personalizado com tampa bolinha/domo',
    category: 'Algodão-doce',
    tags: ['Algodão-doce', 'Personalizados'],
    image: 'assets/images/algodao_pote_400_bolha.png',
    minQuantity: 15,
    minAlert: 'Pedido mínimo: 15 unidades.',
    isConsultation: false,
    variations: [
      { id: 'sem-pers', label: 'Sem pers. R$ 7,50', price: 7.50, isGourmet: false },
      { id: 'com-pers', label: 'Com pers. R$ 8,00', price: 8.00, isGourmet: true }
    ],
    description: 'Modelo sofisticado com tampa bolha arredondada que acomoda uma generosa nuvem de algodão-doce. Dá um charme especial para lembrancinhas VIP. Laço fino opcional (+R$ 1,00/un).',
    flavorsHint: 'Destaque visual volumoso e premium.'
  },
  {
    id: 'algodao-casquinha',
    title: 'Algodão-doce na Casquinha de Sorvete',
    emoji: '🍦',
    sizeLabel: 'Casquinha comestível crocante',
    category: 'Algodão-doce',
    tags: ['Algodão-doce'],
    image: 'assets/images/algodao_casquinha.png',
    minQuantity: 30,
    minAlert: 'Pedido mínimo: 30 unidades.',
    isConsultation: false,
    variations: [
      { id: 'padrao', label: 'R$ 5,50 a unidade', price: 5.50, isGourmet: true }
    ],
    description: 'Sensação entre as crianças! Uma deliciosa casquinha de sorvete de baunilha crocante encimada por nuvem colorida de algodão-doce, embalada individualmente com fita.',
    flavorsHint: 'Cores suaves em azul, rosa, amarelo ou mesclado.'
  },
  {
    id: 'kit-pipoca-algodao',
    title: 'Kit Pipoca Gourmet + Algodão-doce',
    emoji: '🎁',
    sizeLabel: 'Kit Presente / Brinde / Lembrança',
    category: 'Kits',
    tags: ['Kits', 'Personalizados'],
    image: 'assets/images/kit_presente.png',
    minQuantity: 1,
    minAlert: null,
    isConsultation: true,
    variations: [
      { id: 'sob-consulta', label: 'Sob Consulta', price: 0, isGourmet: true }
    ],
    description: 'Kit especial montado em caixa ou sacola presenteável, combinando pipoca gourmet no pote + algodão-doce com sabor e cores combinadas com o tema da sua comemoração.',
    flavorsHint: 'Montado sob medida com tags personalizadas e fitas especiais.'
  }
];

// WhatsApp Business Number
const WHATSAPP_PHONE = '5582988783636';

// ==========================================================================
// 2. Application State Management
// ==========================================================================
const AppState = {
  currentCategory: 'Todos',
  searchQuery: '',
  selectedVariants: {}, // productId -> variationId
  selectedQuantities: {}, // productId -> number
  cart: [] // Array of { productId, variantId, variantLabel, unitPrice, quantity, title, image, minQuantity }
};

// ==========================================================================
// 3. Initialization
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize default variations and quantities for each product
  CATALOG_PRODUCTS.forEach(product => {
    AppState.selectedVariants[product.id] = product.variations[0].id;
    AppState.selectedQuantities[product.id] = product.minQuantity > 1 ? product.minQuantity : 1;
  });

  // Load cart from LocalStorage if available
  loadCartFromStorage();

  // Setup DOM Event Listeners
  setupEventListeners();

  // Render Initial Catalog
  renderProducts();
  updateCartUI();
});

// ==========================================================================
// 4. Event Listeners Setup
// ==========================================================================
function setupEventListeners() {
  // Category Pill Filters
  const pillButtons = document.querySelectorAll('.pill-btn');
  pillButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      pillButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.currentCategory = btn.getAttribute('data-category');
      renderProducts();
    });
  });

  // Header Nav Links with category filtering
  const navLinks = document.querySelectorAll('.nav-link[data-cat]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const cat = link.getAttribute('data-cat');
      if (cat) {
        AppState.currentCategory = cat;
        // update pills
        pillButtons.forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-category') === cat);
        });
        renderProducts();
      }
    });
  });

  // Live Search Input
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');

  searchInput.addEventListener('input', (e) => {
    AppState.searchQuery = e.target.value.trim().toLowerCase();
    clearSearchBtn.style.display = AppState.searchQuery ? 'flex' : 'none';
    renderProducts();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    AppState.searchQuery = '';
    clearSearchBtn.style.display = 'none';
    renderProducts();
    searchInput.focus();
  });

  // Reset Filters Button in Empty State
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      AppState.searchQuery = '';
      AppState.currentCategory = 'Todos';
      searchInput.value = '';
      clearSearchBtn.style.display = 'none';
      pillButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-category') === 'Todos'));
      renderProducts();
    });
  }

  // Cart Drawer Triggers
  const openCart = () => toggleCartDrawer(true);
  const closeCart = () => toggleCartDrawer(false);

  document.getElementById('headerCartBtn').addEventListener('click', openCart);
  document.getElementById('floatingCartBtn').addEventListener('click', openCart);
  document.getElementById('heroOrderBtn').addEventListener('click', openCart);
  document.getElementById('closeCartBtn').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);
  document.getElementById('btnExploreCatalog').addEventListener('click', closeCart);

  // Clear Cart Button
  document.getElementById('btnClearCart').addEventListener('click', () => {
    if (confirm('Deseja realmente limpar todos os itens do carrinho?')) {
      AppState.cart = [];
      saveCartToStorage();
      updateCartUI();
      showToast('Carrinho esvaziado.');
    }
  });

  // WhatsApp Checkout Button
  document.getElementById('btnSendWhatsappOrder').addEventListener('click', handleWhatsAppCheckout);

  // Flavors Modal Triggers
  const flavorsModalOverlay = document.getElementById('flavorsModalOverlay');
  const openFlavorsModalCard = document.getElementById('openFlavorsModalCard');
  const closeFlavorsModalBtn = document.getElementById('closeFlavorsModalBtn');
  const closeFlavorsModalActionBtn = document.getElementById('closeFlavorsModalActionBtn');

  const openFlavorsModal = () => flavorsModalOverlay.classList.add('open');
  const closeFlavorsModal = () => flavorsModalOverlay.classList.remove('open');

  openFlavorsModalCard.addEventListener('click', openFlavorsModal);
  closeFlavorsModalBtn.addEventListener('click', closeFlavorsModal);
  closeFlavorsModalActionBtn.addEventListener('click', closeFlavorsModal);
  flavorsModalOverlay.addEventListener('click', (e) => {
    if (e.target === flavorsModalOverlay) closeFlavorsModal();
  });

  // Poster Modal Triggers
  const posterModalOverlay = document.getElementById('posterModalOverlay');
  const openPosterBtn = document.getElementById('openPosterBtn');
  const closePosterBtn = document.getElementById('closePosterModalBtn');

  const openPosterModal = () => posterModalOverlay.classList.add('open');
  const closePosterModal = () => posterModalOverlay.classList.remove('open');

  openPosterBtn.addEventListener('click', openPosterModal);
  closePosterBtn.addEventListener('click', closePosterModal);
  posterModalOverlay.addEventListener('click', (e) => {
    if (e.target === posterModalOverlay) closePosterModal();
  });

  // Product Details Modal Close
  const productModalOverlay = document.getElementById('productModalOverlay');
  const closeProductModalBtn = document.getElementById('closeProductModalBtn');
  const closeProductModal = () => productModalOverlay.classList.remove('open');

  closeProductModalBtn.addEventListener('click', closeProductModal);
  productModalOverlay.addEventListener('click', (e) => {
    if (e.target === productModalOverlay) closeProductModal();
  });

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeFlavorsModal();
      closePosterModal();
      closeProductModal();
    }
  });
}

// ==========================================================================
// 5. Product Rendering & Filtering
// ==========================================================================
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const emptyState = document.getElementById('emptyState');
  const resultsCount = document.getElementById('resultsCount');

  // Filter products based on Category and Search Query
  const filteredProducts = CATALOG_PRODUCTS.filter(product => {
    const matchesCategory = AppState.currentCategory === 'Todos' || product.tags.includes(AppState.currentCategory);
    
    const searchTarget = `${product.title} ${product.description} ${product.sizeLabel} ${product.flavorsHint}`.toLowerCase();
    const matchesSearch = !AppState.searchQuery || searchTarget.includes(AppState.searchQuery);

    return matchesCategory && matchesSearch;
  });

  // Update Result Count
  resultsCount.textContent = `Exibindo ${filteredProducts.length} ${filteredProducts.length === 1 ? 'produto' : 'produtos'}`;

  // Check Empty State
  if (filteredProducts.length === 0) {
    grid.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  // Render Cards HTML
  grid.innerHTML = filteredProducts.map(product => {
    const selectedVariantId = AppState.selectedVariants[product.id] || product.variations[0].id;
    const selectedVariant = product.variations.find(v => v.id === selectedVariantId) || product.variations[0];
    const currentQty = AppState.selectedQuantities[product.id] || (product.minQuantity > 1 ? product.minQuantity : 1);

    // Format Price
    const priceDisplay = product.isConsultation
      ? 'Sob consulta'
      : `R$ ${selectedVariant.price.toFixed(2).replace('.', ',')}`;

    // Variations buttons HTML
    const variationsHtml = product.variations.length > 1
      ? `
        <div class="variations-selector-label">Opções:</div>
        <div class="variations-group">
          ${product.variations.map(variant => `
            <button 
              type="button" 
              class="variant-btn ${variant.id === selectedVariantId ? 'selected' : ''} ${variant.isGourmet ? 'variant-gourmet' : ''}"
              data-product-id="${product.id}"
              data-variant-id="${variant.id}"
              onclick="selectProductVariant('${product.id}', '${variant.id}')"
            >
              ${variant.label}
            </button>
          `).join('')}
        </div>
      `
      : '';

    // Action button: WhatsApp Consultation vs Add to Cart
    const actionButtonHtml = product.isConsultation
      ? `
        <a 
          href="https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(`Olá, Sandra! Gostaria de consultar sobre o ${product.title}.`)}"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-consult-whatsapp"
        >
          <span>💬 Consultar WhatsApp</span>
        </a>
      `
      : `
        <div class="qty-control">
          <button type="button" class="btn-qty" onclick="changeProductQty('${product.id}', -1)" aria-label="Diminuir quantidade">−</button>
          <input type="text" class="qty-input" value="${currentQty}" readonly aria-label="Quantidade">
          <button type="button" class="btn-qty" onclick="changeProductQty('${product.id}', 1)" aria-label="Aumentar quantidade">+</button>
        </div>
        <button 
          type="button" 
          class="btn-add-to-cart" 
          id="addBtn-${product.id}"
          onclick="addProductToCart('${product.id}')"
        >
          <span>+ Adicionar</span>
        </button>
      `;

    return `
      <article class="product-card" id="card-${product.id}">
        <div class="card-media">
          <img src="${product.image}" alt="${product.title}" class="card-image" loading="lazy">
          <span class="card-badge-category">${product.category}</span>
          ${product.minAlert ? `<span class="card-badge-min">Mín: ${product.minQuantity} un.</span>` : ''}
        </div>

        <div class="card-body">
          <h3 class="card-title">${product.emoji} ${product.title}</h3>
          <p class="card-size-label">${product.sizeLabel}</p>

          ${variationsHtml}

          <div class="card-price-row">
            <span class="current-price" id="priceDisplay-${product.id}">${priceDisplay}</span>
            <span class="price-subtext">${product.isConsultation ? 'Preço sob medida' : 'unidade'}</span>
          </div>

          <button 
            type="button" 
            class="card-details-toggle" 
            onclick="openProductDetailsModal('${product.id}')"
          >
            <span>ℹ️ Ver detalhes</span>
          </button>

          <div class="card-actions-row">
            ${actionButtonHtml}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// ==========================================================================
// 6. Product Card Interactions
// ==========================================================================
window.selectProductVariant = function(productId, variantId) {
  AppState.selectedVariants[productId] = variantId;

  const product = CATALOG_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const variant = product.variations.find(v => v.id === variantId);
  if (!variant) return;

  // Update variant buttons in card
  const card = document.getElementById(`card-${productId}`);
  if (card) {
    const buttons = card.querySelectorAll('.variant-btn');
    buttons.forEach(btn => {
      const match = btn.getAttribute('data-variant-id') === variantId;
      btn.classList.toggle('selected', match);
    });

    // Update price display
    const priceDisplay = document.getElementById(`priceDisplay-${productId}`);
    if (priceDisplay) {
      priceDisplay.textContent = product.isConsultation
        ? 'Sob consulta'
        : `R$ ${variant.price.toFixed(2).replace('.', ',')}`;
    }
  }
};

window.changeProductQty = function(productId, delta) {
  const product = CATALOG_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  let current = AppState.selectedQuantities[productId] || 1;
  const min = product.minQuantity > 1 ? product.minQuantity : 1;

  current += delta;
  if (current < min) current = min;

  AppState.selectedQuantities[productId] = current;

  // Update input in card
  const card = document.getElementById(`card-${productId}`);
  if (card) {
    const input = card.querySelector('.qty-input');
    if (input) input.value = current;
  }
};

// ==========================================================================
// 7. Cart Operations
// ==========================================================================
window.addProductToCart = function(productId) {
  const product = CATALOG_PRODUCTS.find(p => p.id === productId);
  if (!product || product.isConsultation) return;

  const variantId = AppState.selectedVariants[productId] || product.variations[0].id;
  const variant = product.variations.find(v => v.id === variantId) || product.variations[0];
  const quantity = AppState.selectedQuantities[productId] || 1;

  // Check if item already in cart with same product and variation
  const existingItemIndex = AppState.cart.findIndex(
    item => item.productId === productId && item.variantId === variantId
  );

  if (existingItemIndex > -1) {
    AppState.cart[existingItemIndex].quantity += quantity;
  } else {
    AppState.cart.push({
      productId: product.id,
      title: product.title,
      variantId: variant.id,
      variantLabel: variant.label,
      unitPrice: variant.price,
      quantity: quantity,
      image: product.image,
      minQuantity: product.minQuantity || 1,
      minAlert: product.minAlert
    });
  }

  // Visual button feedback
  const addBtn = document.getElementById(`addBtn-${productId}`);
  if (addBtn) {
    addBtn.classList.add('added-feedback');
    addBtn.innerHTML = '<span>✓ Adicionado!</span>';
    setTimeout(() => {
      addBtn.classList.remove('added-feedback');
      addBtn.innerHTML = '<span>+ Adicionar</span>';
    }, 1200);
  }

  saveCartToStorage();
  updateCartUI();
  showToast(`Adicionado: ${quantity}x ${product.title} (${variant.label})`);
};

window.updateCartItemQty = function(index, delta) {
  if (index < 0 || index >= AppState.cart.length) return;

  const item = AppState.cart[index];
  const min = item.minQuantity > 1 ? item.minQuantity : 1;

  item.quantity += delta;

  if (item.quantity <= 0) {
    // Remove if zero
    AppState.cart.splice(index, 1);
  } else if (item.quantity < min) {
    // Alert minimum quantity
    if (confirm(`Atenção: A quantidade mínima para este item é ${min} unidades. Deseja remover o item do carrinho?`)) {
      AppState.cart.splice(index, 1);
    } else {
      item.quantity = min;
    }
  }

  saveCartToStorage();
  updateCartUI();
};

window.removeCartItem = function(index) {
  if (index >= 0 && index < AppState.cart.length) {
    const removed = AppState.cart.splice(index, 1)[0];
    saveCartToStorage();
    updateCartUI();
    showToast(`Removido: ${removed.title}`);
  }
};

function toggleCartDrawer(open) {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');

  if (open) {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  } else {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function updateCartUI() {
  const totalCount = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = AppState.cart.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

  // Update Badges
  document.getElementById('cartBadgeHeader').textContent = totalCount;
  document.getElementById('floatingCartBadge').textContent = totalCount;

  // Drawer Elements
  const cartItemsList = document.getElementById('cartItemsList');
  const cartEmptyMessage = document.getElementById('cartEmptyMessage');
  const cartCheckoutForm = document.getElementById('cartCheckoutForm');
  const cartFooter = document.getElementById('cartFooter');
  const cartTotalItems = document.getElementById('cartTotalItems');
  const cartTotalPrice = document.getElementById('cartTotalPrice');
  const minOrderAlert = document.getElementById('minOrderAlert');
  const minOrderAlertText = document.getElementById('minOrderAlertText');

  if (AppState.cart.length === 0) {
    cartItemsList.innerHTML = '';
    cartEmptyMessage.style.display = 'block';
    cartCheckoutForm.style.display = 'none';
    cartFooter.style.display = 'none';
    return;
  }

  cartEmptyMessage.style.display = 'none';
  cartCheckoutForm.style.display = 'block';
  cartFooter.style.display = 'block';

  cartTotalItems.textContent = `${totalCount} ${totalCount === 1 ? 'unidade' : 'unidades'}`;
  cartTotalPrice.textContent = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;

  // Check for any minimum quantity alerts
  let minimumWarnings = [];
  AppState.cart.forEach(item => {
    if (item.minQuantity > 1 && item.quantity < item.minQuantity) {
      minimumWarnings.push(`${item.title} exige mínimo de ${item.minQuantity} un. (atual: ${item.quantity})`);
    }
  });

  if (minimumWarnings.length > 0) {
    minOrderAlert.style.display = 'flex';
    minOrderAlertText.textContent = minimumWarnings.join(' | ');
  } else {
    minOrderAlert.style.display = 'none';
  }

  // Render Items List HTML
  cartItemsList.innerHTML = AppState.cart.map((item, index) => {
    const subtotal = item.quantity * item.unitPrice;
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}" class="cart-item-thumb">
        <div class="cart-item-info">
          <h5 class="cart-item-title">${item.title}</h5>
          <span class="cart-item-variant">${item.variantLabel}</span>
          <div class="cart-item-row">
            <div class="cart-item-qty">
              <button type="button" onclick="updateCartItemQty(${index}, -1)" aria-label="Diminuir">−</button>
              <span>${item.quantity}</span>
              <button type="button" onclick="updateCartItemQty(${index}, 1)" aria-label="Aumentar">+</button>
            </div>
            <span class="cart-item-price">R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
            <button type="button" class="btn-remove-item" onclick="removeCartItem(${index})" title="Remover item">🗑️</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================================================
// 8. WhatsApp Checkout Message Generator
// ==========================================================================
function handleWhatsAppCheckout() {
  if (AppState.cart.length === 0) {
    alert('Seu carrinho está vazio! Adicione algum produto para continuar.');
    return;
  }

  const customerName = document.getElementById('customerName').value.trim();
  if (!customerName) {
    alert('Por favor, informe seu Nome para continuarmos o atendimento!');
    document.getElementById('customerName').focus();
    return;
  }

  const eventDate = document.getElementById('eventDate').value;
  const orderNotes = document.getElementById('orderNotes').value.trim();

  // Validate Minimums
  const invalidItems = AppState.cart.filter(item => item.minQuantity > 1 && item.quantity < item.minQuantity);
  if (invalidItems.length > 0) {
    const names = invalidItems.map(i => `${i.title} (mínimo ${i.minQuantity} un.)`).join('\n• ');
    if (!confirm(`Atenção para o pedido mínimo dos itens:\n• ${names}\n\nDeseja prosseguir mesmo assim para consultar com a Sandra?`)) {
      return;
    }
  }

  const totalCount = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = AppState.cart.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

  // Format date if provided
  let dateFormatted = '';
  if (eventDate) {
    const [year, month, day] = eventDate.split('-');
    dateFormatted = `${day}/${month}/${year}`;
  }

  // Build Structured WhatsApp Text Message
  let message = `🍿 *NOVO PEDIDO — PIPOCAS LEÃO GOURMET*\n`;
  message += `Olá Sandra! Gostaria de fazer o seguinte pedido pelo Catálogo 2025:\n\n`;
  message += `👤 *Cliente:* ${customerName}\n`;
  if (dateFormatted) {
    message += `📅 *Data do Evento/Entrega:* ${dateFormatted}\n`;
  }
  message += `\n🛒 *ITENS SELECIONADOS:*\n`;

  AppState.cart.forEach((item, i) => {
    const subtotal = item.quantity * item.unitPrice;
    message += `${i + 1}. *${item.quantity}x* ${item.title} — _${item.variantLabel}_\n`;
    message += `   Valor: R$ ${subtotal.toFixed(2).replace('.', ',')} (R$ ${item.unitPrice.toFixed(2).replace('.', ',')} un.)\n`;
  });

  message += `\n📊 *Total de Itens:* ${totalCount} un.`;
  message += `\n💰 *Total Estimado:* R$ ${totalPrice.toFixed(2).replace('.', ',')}\n`;

  if (orderNotes) {
    message += `\n📝 *Sabores / Observações:*\n${orderNotes}\n`;
  }

  message += `\n💳 *Forma de Pagamento:* A combinar (Pix / Cartão / Transferência)`;
  message += `\n\nMuito obrigado! Aguardo a confirmação do pedido. ✨`;

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  
  // Open WhatsApp in a new tab
  window.open(whatsappUrl, '_blank');
}

// ==========================================================================
// 9. Product Details Modal
// ==========================================================================
window.openProductDetailsModal = function(productId) {
  const product = CATALOG_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modalBody = document.getElementById('productModalBody');
  const overlay = document.getElementById('productModalOverlay');

  modalBody.innerHTML = `
    <div class="modal-product-header">
      <img src="${product.image}" alt="${product.title}" class="modal-product-thumb">
      <div>
        <h4 class="modal-product-title">${product.emoji} ${product.title}</h4>
        <p class="modal-product-size">${product.sizeLabel}</p>
        <span class="card-badge-category" style="position: static; display: inline-block; margin-top: 6px;">${product.category}</span>
      </div>
    </div>

    <h5 class="modal-section-title">Descrição do Produto</h5>
    <p class="modal-desc-text">${product.description}</p>

    <h5 class="modal-section-title">Sabores e Apresentação</h5>
    <p class="modal-desc-text">${product.flavorsHint}</p>

    <div class="modal-specs-list">
      <div class="modal-spec-row">
        <strong>Opções & Preços:</strong>
        <span>${product.variations.map(v => `${v.label} (R$ ${v.price.toFixed(2).replace('.', ',')})`).join(' | ')}</span>
      </div>
      ${product.minQuantity > 1 ? `
        <div class="modal-spec-row">
          <strong>Pedido Mínimo:</strong>
          <span style="color: var(--pink-primary); font-weight: 700;">${product.minQuantity} unidades</span>
        </div>
      ` : ''}
      <div class="modal-spec-row">
        <strong>Produção:</strong>
        <span>Artesanal sob encomenda</span>
      </div>
    </div>

    <div style="display: flex; gap: 12px; justify-content: flex-end;">
      <button type="button" class="btn btn-teal-outline btn-sm" onclick="document.getElementById('productModalOverlay').classList.remove('open')">
        Fechar
      </button>
      <button type="button" class="btn btn-teal btn-sm" onclick="document.getElementById('productModalOverlay').classList.remove('open'); addProductToCart('${product.id}')">
        + Adicionar ao Carrinho
      </button>
    </div>
  `;

  overlay.classList.add('open');
};

// ==========================================================================
// 10. LocalStorage Persistence
// ==========================================================================
function saveCartToStorage() {
  try {
    localStorage.setItem('pipocas_leao_cart', JSON.stringify(AppState.cart));
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem('pipocas_leao_cart');
    if (saved) {
      AppState.cart = JSON.parse(saved);
    }
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
}

// ==========================================================================
// 11. Toast Notifications
// ==========================================================================
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>🍿</span><span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 3000);
}
