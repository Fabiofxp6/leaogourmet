// Interações, carrinho e pedidos do catálogo.

// ==========================================================================
// 2. Application State Management
// ==========================================================================
const AppState = {
  currentCategory: 'Todos',
  searchQuery: '',
  selectedVariants: {}, // productId -> variationId
  selectedQuantities: {}, // productId -> number
  selectedAddons: {},
  cart: []
};

// ==========================================================================
// 3. Initialization
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize default variations and quantities for each product
  CATALOG_PRODUCTS.forEach(product => {
    AppState.selectedVariants[product.id] = product.variations[0].id;
    AppState.selectedQuantities[product.id] = 1;
    AppState.selectedAddons[product.id] = [];
  });

  // Setup DOM Event Listeners
  setupEventListeners();

  loadCartFromStorage();
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
      setActivePill(btn.dataset.category);
      AppState.currentCategory = btn.getAttribute('data-category');
      renderProducts();
    });
  });

  function setActivePill(category) {
    pillButtons.forEach(button => {
      const active = button.dataset.category === category;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', active);
    });
  }

  // Header Nav Links with category filtering
  const navLinks = document.querySelectorAll('.nav-link[data-cat]');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const cat = link.getAttribute('data-cat');
      if (cat) {
        AppState.currentCategory = cat;
        setActivePill(cat);
        renderProducts();
      }
    });
  });

  // Live Search Input
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');

  searchInput.addEventListener('input', (e) => {
    AppState.searchQuery = normalizeSearch(e.target.value.trim());
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
      setActivePill('Todos');
      renderProducts();
    });
  }

  // Cart Drawer Triggers
  const openCart = event => toggleCartDrawer(true, event.currentTarget);
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

  const dialogs = [
    document.getElementById('flavorsModalOverlay'),
    document.getElementById('posterModalOverlay'),
    document.getElementById('productModalOverlay')
  ];
  const [flavorsDialog, posterDialog] = dialogs;

  document.getElementById('openFlavorsModalBtn').addEventListener('click', (event) => {
    openCatalogDialog(flavorsDialog, event.currentTarget);
  });
  document.getElementById('openPosterBtn').addEventListener('click', (event) => {
    openCatalogDialog(posterDialog, event.currentTarget);
  });

  dialogs.forEach(dialog => {
    dialog.querySelectorAll('[data-close-dialog]').forEach(button => {
      button.addEventListener('click', () => closeCatalogDialog(dialog));
    });
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) closeCatalogDialog(dialog);
    });
    dialog.addEventListener('cancel', event => {
      event.preventDefault();
      closeCatalogDialog(dialog);
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !dialogs.some(dialog => dialog.open)) closeCart();
  });
}

let catalogDialogTrigger;

function openCatalogDialog(dialog, trigger) {
  catalogDialogTrigger = trigger;
  dialog.showModal();
}

function closeCatalogDialog(dialog) {
  dialog.close();
  catalogDialogTrigger?.focus({ preventScroll: true });
}

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

function formatPrice(amount) {
  return currency.format(amount);
}

function normalizeSearch(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function productImage(product) {
  return `assets/images/catalogo-2026/${product.image}.webp`;
}

function packQuantity(product, variant) {
  return variant.quantity ?? product.packQuantity;
}

function priceLabel(product, variant) {
  const pack = packQuantity(product, variant);
  return pack ? `lote de ${pack} unidades` : variant.priceLabel ?? product.priceLabel ?? 'por unidade';
}

function selectedAddons(product) {
  return (product.addons ?? []).filter(addon => AppState.selectedAddons[product.id].includes(addon.id));
}

function priceWithAddons(variant, addons) {
  return variant.price + addons.reduce((total, addon) => total + addon.price, 0);
}

function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

function consultationLink(product, variant, largerOrder = false) {
  const subject = largerOrder ? 'um orçamento para uma quantidade maior' : 'disponibilidade e condições';
  const option = product.variations.length > 1 ? ` (${variant.label})` : '';
  return whatsappLink(`Olá, Sandra! Vim pelo Catálogo ${CATALOG_YEAR} e gostaria de consultar ${subject} para: ${product.title}${option}.`);
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
    const categories = [product.category, ...(product.tags ?? [])];
    if (product.addons?.some(addon => addon.id === 'personalizacao')) categories.push('Personalizados');
    const matchesCategory = AppState.currentCategory === 'Todos' || categories.includes(AppState.currentCategory);
    const searchTarget = [
      product.title, product.description, product.sizeLabel, ...categories,
      ...product.variations.map(variant => variant.label), ...(product.notes ?? [])
    ].join(' ');

    return matchesCategory && normalizeSearch(searchTarget).includes(AppState.searchQuery);
  });

  // Update Result Count
  resultsCount.textContent = `${filteredProducts.length} ${filteredProducts.length === 1 ? 'resultado' : 'resultados'}`;

  // Check Empty State
  if (filteredProducts.length === 0) {
    grid.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  grid.innerHTML = filteredProducts.map(renderProductCard).join('');
}

function renderProductCard(product) {
  const variant = product.variations.find(option => option.id === AppState.selectedVariants[product.id]);
  const pack = packQuantity(product, variant);
  const minimum = product.packQuantity ?? product.variations[0].quantity;
  const addons = selectedAddons(product);
  const variationsHtml = product.variations.length > 1 ? `
    <div class="variations-group" role="group" aria-label="Opções de ${product.title}">
      ${product.variations.map(option => `
        <button type="button" class="variant-btn ${option.id === variant.id ? 'selected' : ''}"
          aria-pressed="${option.id === variant.id}" data-variant-id="${option.id}"
          onclick="selectProductVariant('${product.id}', '${option.id}')">${option.label}</button>
      `).join('')}
    </div>
  ` : '';

  const addonsHtml = product.addons && !product.isConsultation ? `
    <fieldset class="product-addons">
      <legend>Adicionais opcionais</legend>
      ${product.addons.map(addon => `
        <label><input type="checkbox" ${addons.includes(addon) ? 'checked' : ''}
          onchange="toggleProductAddon('${product.id}', '${addon.id}', this.checked)">
          <span>${addon.label} <strong>+ ${formatPrice(addon.price)}</strong></span>
        </label>
      `).join('')}
    </fieldset>
  ` : '';

  const actionHtml = product.isConsultation ? `
    <a href="${consultationLink(product, variant)}" class="btn-consult-whatsapp" target="_blank" rel="noopener noreferrer">
      Consultar pelo WhatsApp
    </a>
  ` : `
    ${pack ? '' : `
      <div class="qty-control">
        <button type="button" class="btn-qty" onclick="changeProductQty('${product.id}', -1)" aria-label="Diminuir quantidade">−</button>
        <input type="text" class="qty-input" value="${AppState.selectedQuantities[product.id]}" readonly aria-label="Quantidade">
        <button type="button" class="btn-qty" onclick="changeProductQty('${product.id}', 1)" aria-label="Aumentar quantidade">+</button>
      </div>
    `}
    <button type="button" class="btn-add-to-cart" id="addBtn-${product.id}" onclick="addProductToCart('${product.id}')">
      <span>${pack ? 'Adicionar lote' : '+ Adicionar'}</span>
    </button>
  `;

  return `
    <article class="product-card" id="card-${product.id}">
      <div class="card-media">
        <img src="${productImage(product)}" alt="" class="card-image" loading="lazy">
        <span class="card-badge-category">${product.category}</span>
        ${minimum ? `<span class="card-badge-min">Mín. ${minimum} un.</span>` : ''}
      </div>
      <div class="card-body">
        <h3 class="card-title">${product.title}</h3>
        <p class="card-size-label">${product.sizeLabel}</p>
        ${variationsHtml}
        ${addonsHtml}
        <div class="card-price-row" aria-live="polite">
          <span class="current-price">${variant.price === undefined ? 'Sob consulta' : formatPrice(priceWithAddons(variant, addons))}</span>
          ${variant.price === undefined ? '' : `<span class="price-subtext">${priceLabel(product, variant)}</span>`}
        </div>
        <p class="card-order-note" ${variant.note ? '' : 'hidden'}>${variant.note ?? ''}</p>
        <button type="button" class="card-details-toggle" aria-haspopup="dialog" aria-label="Ver detalhes de ${product.title}" onclick="openProductDetailsModal('${product.id}', this)">
          Ver detalhes
        </button>
        <div class="card-actions-row">${actionHtml}</div>
        ${pack ? `
          <a href="${consultationLink(product, variant, true)}" class="card-quote-link" target="_blank" rel="noopener noreferrer">
            Consultar quantidade maior
          </a>
        ` : ''}
      </div>
    </article>
  `;
}

// ==========================================================================
/* Product Card Interactions */
// ==========================================================================
function updateProductCard(product, variant) {
  const card = document.getElementById(`card-${product.id}`);
  if (!card) return;

  card.querySelectorAll('.variant-btn').forEach(button => {
    const selected = button.dataset.variantId === variant.id;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', selected);
  });

  if (variant.price !== undefined) {
    card.querySelector('.current-price').textContent = formatPrice(priceWithAddons(variant, selectedAddons(product)));
    card.querySelector('.price-subtext').textContent = priceLabel(product, variant);
  }

  const note = card.querySelector('.card-order-note');
  note.textContent = variant.note ?? '';
  note.hidden = !variant.note;

  const consultation = card.querySelector('.btn-consult-whatsapp');
  if (consultation) consultation.href = consultationLink(product, variant);
  const largerOrder = card.querySelector('.card-quote-link');
  if (largerOrder) largerOrder.href = consultationLink(product, variant, true);
}

window.selectProductVariant = function(productId, variantId) {
  const product = CATALOG_PRODUCTS.find(entry => entry.id === productId);
  const variant = product?.variations.find(option => option.id === variantId);
  if (!variant) return;

  AppState.selectedVariants[productId] = variantId;
  updateProductCard(product, variant);
};

window.toggleProductAddon = function(productId, addonId, checked) {
  const product = CATALOG_PRODUCTS.find(entry => entry.id === productId);
  if (!product?.addons?.some(addon => addon.id === addonId)) return;

  const options = AppState.selectedAddons[productId];
  AppState.selectedAddons[productId] = checked ? [...new Set([...options, addonId])] : options.filter(id => id !== addonId);
  const variant = product.variations.find(option => option.id === AppState.selectedVariants[productId]);
  updateProductCard(product, variant);
};

window.changeProductQty = function(productId, delta) {
  const product = CATALOG_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const current = Math.max(1, AppState.selectedQuantities[productId] + delta);

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
function buildCartItem(product, variant, addons, quantity) {
  return {
    productId: product.id,
    variantId: variant.id,
    variantLabel: variant.label,
    addonIds: addons.map(addon => addon.id),
    addonLabels: addons.map(addon => addon.label),
    title: product.title,
    image: productImage(product),
    quantity,
    isPack: Boolean(packQuantity(product, variant)),
    price: priceWithAddons(variant, addons)
  };
}

function cartItemSubtotal(item) {
  return item.isPack ? item.price : item.quantity * item.price;
}

window.addProductToCart = function(productId) {
  const product = CATALOG_PRODUCTS.find(entry => entry.id === productId);
  if (!product || product.isConsultation) return;

  const variant = product.variations.find(option => option.id === AppState.selectedVariants[productId]);
  const pack = packQuantity(product, variant);
  const quantity = pack ?? AppState.selectedQuantities[productId];
  const item = buildCartItem(product, variant, selectedAddons(product), quantity);
  const existingIndex = AppState.cart.findIndex(entry =>
    entry.productId === productId && (pack || entry.variantId === variant.id)
  );

  if (existingIndex < 0) {
    AppState.cart.push(item);
  } else if (pack) {
    AppState.cart[existingIndex] = item;
  } else {
    AppState.cart[existingIndex].quantity += quantity;
  }

  const addBtn = document.getElementById(`addBtn-${productId}`);
  const updated = pack && existingIndex >= 0;
  if (addBtn) {
    addBtn.classList.add('added-feedback');
    addBtn.textContent = updated ? '✓ Lote atualizado' : '✓ Adicionado!';
    setTimeout(() => {
      addBtn.classList.remove('added-feedback');
      addBtn.textContent = pack ? 'Adicionar lote' : '+ Adicionar';
    }, 1200);
  }

  saveCartToStorage();
  updateCartUI();
  showToast(`${updated ? 'Lote atualizado' : 'Adicionado'}: ${quantity} × ${product.title}.`);
};

window.updateCartItemQty = function(index, delta) {
  const item = AppState.cart[index];
  if (!item || item.isPack) return;

  item.quantity += delta;
  if (item.quantity <= 0) AppState.cart.splice(index, 1);

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

let cartDrawerTrigger;

function toggleCartDrawer(open, trigger) {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  const wasOpen = drawer.classList.contains('open');

  drawer.inert = !open;
  drawer.classList.toggle('open', open);
  overlay.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) {
    cartDrawerTrigger = trigger;
    document.getElementById('closeCartBtn').focus({ preventScroll: true });
  } else if (wasOpen) {
    cartDrawerTrigger?.focus({ preventScroll: true });
  }
}

function updateCartUI() {
  const totalCount = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = AppState.cart.reduce((sum, item) => sum + cartItemSubtotal(item), 0);

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
  cartTotalPrice.textContent = formatPrice(totalPrice);

  cartItemsList.innerHTML = AppState.cart.map((item, index) => `
    <div class="cart-item">
      <img src="${item.image}" alt="" class="cart-item-thumb">
      <div class="cart-item-info">
        <h5 class="cart-item-title">${item.title}</h5>
        <span class="cart-item-variant">${[item.variantLabel, ...item.addonLabels].join(' · ')}</span>
        <div class="cart-item-row">
          ${item.isPack ? `<span class="cart-item-variant">${item.quantity} unidades</span>` : `
            <div class="cart-item-qty">
              <button type="button" onclick="updateCartItemQty(${index}, -1)" aria-label="Diminuir quantidade">−</button>
              <span>${item.quantity}</span>
              <button type="button" onclick="updateCartItemQty(${index}, 1)" aria-label="Aumentar quantidade">+</button>
            </div>
          `}
          <span class="cart-item-price">${formatPrice(cartItemSubtotal(item))}</span>
          <button type="button" class="btn-remove-item" onclick="removeCartItem(${index})" aria-label="Remover ${item.title}">🗑️</button>
        </div>
      </div>
    </div>
  `).join('');
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

  const totalCount = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = AppState.cart.reduce((sum, item) => sum + cartItemSubtotal(item), 0);

  // Format date if provided
  let dateFormatted = '';
  if (eventDate) {
    const [year, month, day] = eventDate.split('-');
    dateFormatted = `${day}/${month}/${year}`;
  }

  // Build Structured WhatsApp Text Message
  let message = `🍿 *NOVO PEDIDO — PIPOCAS LEÃO GOURMET*\n`;
  message += `Olá Sandra! Gostaria de fazer o seguinte pedido pelo Catálogo ${CATALOG_YEAR}:\n\n`;
  message += `👤 *Cliente:* ${customerName}\n`;
  if (dateFormatted) {
    message += `📅 *Data do Evento/Entrega:* ${dateFormatted}\n`;
  }
  message += `\n🛒 *ITENS SELECIONADOS:*\n`;

  AppState.cart.forEach((item, i) => {
    message += `${i + 1}. *${item.quantity} ×* ${item.title} — _${item.variantLabel}_\n`;
    if (item.addonLabels.length) message += `   Adicionais: ${item.addonLabels.join(', ')}\n`;
    message += `   Valor: ${formatPrice(cartItemSubtotal(item))}${item.isPack ? ' pelo lote' : ` (${formatPrice(item.price)} un.)`}\n`;
  });

  message += `\n📊 *Total de Itens:* ${totalCount} un.`;
  message += `\n💰 *Total Estimado:* ${formatPrice(totalPrice)}\n`;

  if (orderNotes) {
    message += `\n📝 *Sabores / Observações:*\n${orderNotes}\n`;
  }

  message += `\n💳 *Forma de Pagamento:* A combinar (Dinheiro / Pix / Depósito / Transferência / Cartão)`;
  message += `\n\nMuito obrigado! Aguardo a confirmação do pedido. ✨`;

  window.open(whatsappLink(message), '_blank', 'noopener,noreferrer');
}

// ==========================================================================
// 9. Product Details Modal
// ==========================================================================
window.openProductDetailsModal = function(productId, trigger) {
  const product = CATALOG_PRODUCTS.find(entry => entry.id === productId);
  if (!product) return;

  const modalBody = document.getElementById('productModalBody');
  const dialog = document.getElementById('productModalOverlay');
  const variant = product.variations.find(option => option.id === AppState.selectedVariants[productId]);
  const pack = packQuantity(product, variant);
  const notes = [...(product.notes ?? [])];
  if (pack) notes.push(PACK_QUOTE);

  modalBody.innerHTML = `
    <div class="modal-product-header">
      <img src="${productImage(product)}" alt="" class="modal-product-thumb">
      <div>
        <h3 class="modal-product-title" id="productModalTitle">${product.title}</h3>
        <p class="modal-product-size">${product.sizeLabel}</p>
      </div>
    </div>
    ${product.description ? `<p class="modal-desc-text">${product.description}</p>` : ''}
    ${notes.length ? `<ul class="modal-product-notes">${notes.map(note => `<li>${note}</li>`).join('')}</ul>` : ''}
    <dl class="modal-specs-list">
      ${product.variations.map(option => `
        <div class="modal-spec-row">
          <dt>${option.label}</dt>
          <dd>${option.price === undefined ? 'Sob consulta' : `<span class="price-inline">${formatPrice(option.price)}</span> · ${priceLabel(product, option)}`}${option.note ? `<br>${option.note}` : ''}</dd>
        </div>
      `).join('')}
      ${(product.addons ?? []).map(addon => `
        <div class="modal-spec-row"><dt>${addon.label} (opcional)</dt><dd class="price-inline">+ ${formatPrice(addon.price)}</dd></div>
      `).join('')}
    </dl>
    <div class="modal-product-actions">
      ${product.instagram ? `
        <a class="btn btn-teal-outline btn-sm" href="https://instagram.com/${product.instagram}" target="_blank" rel="noopener noreferrer">
          @${product.instagram}
        </a>
      ` : ''}
      ${product.isConsultation || pack ? `
        <a class="btn ${pack ? 'btn-teal-outline' : 'btn-teal'} btn-sm" href="${consultationLink(product, variant, Boolean(pack))}" target="_blank" rel="noopener noreferrer">
          ${pack ? 'Consultar quantidade maior' : 'Consultar pelo WhatsApp'}
        </a>
      ` : ''}
      ${product.isConsultation ? '' : `
        <button type="button" class="btn btn-teal btn-sm" data-add-product>${pack ? 'Adicionar lote' : 'Adicionar ao carrinho'}</button>
      `}
    </div>
  `;

  modalBody.querySelector('[data-add-product]')?.addEventListener('click', () => {
    closeCatalogDialog(dialog);
    addProductToCart(product.id);
  });
  openCatalogDialog(dialog, trigger);
};

// ==========================================================================
// 10. LocalStorage Persistence
// ==========================================================================
function saveCartToStorage() {
  try {
    const entries = AppState.cart.map(({ productId, variantId, addonIds, quantity }) => ({
      productId, variantId, addonIds, quantity
    }));
    localStorage.setItem('pipocas_leao_cart', JSON.stringify(entries));
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
}

function loadCartFromStorage() {
  try {
    const entries = JSON.parse(localStorage.getItem('pipocas_leao_cart'));
    if (!Array.isArray(entries)) return;

    let changed = false;
    for (const entry of entries) {
      const product = CATALOG_PRODUCTS.find(item => item.id === entry?.productId);
      const variant = product?.variations.find(option => option.id === entry.variantId);
      const pack = variant && packQuantity(product, variant);
      if (!variant || product.isConsultation || !Number.isSafeInteger(entry.quantity) || entry.quantity < 1 ||
        (pack && (entry.quantity !== pack || AppState.cart.some(item => item.productId === product.id)))) {
        changed = true;
        continue;
      }

      const savedAddons = Array.isArray(entry.addonIds) ? entry.addonIds : [];
      const addons = (product.addons ?? []).filter(addon => savedAddons.includes(addon.id));
      AppState.cart.push(buildCartItem(product, variant, addons, entry.quantity));
      if ('unitPrice' in entry || addons.length !== savedAddons.length) changed = true;
    }

    if (changed) {
      saveCartToStorage();
      document.getElementById('cartCatalogNotice').hidden = false;
      showToast('O catálogo foi atualizado. Revise seu carrinho.');
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
