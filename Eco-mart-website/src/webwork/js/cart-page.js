// For: cart page (pages/cart.html)

// Get URL parameter value (e.g., ?id=5 returns "5")
function qs(key){ return new URLSearchParams(location.search).get(key); }

// showToast(msg) - brief bottom-right notice
function showToast(text){ 
  const t = document.createElement('div'); 
  t.textContent = text; 
  t.className = 'toast';
  document.body.appendChild(t); 
  setTimeout(()=>t.remove(),1800); 
} 

// renderSingleProduct - single product view (qty & add)
function renderSingleProduct(id, qty){
  const p = window.getProduct ? window.getProduct(id) : null;
  if(!p) { document.getElementById('cartArea').innerHTML = '<p>Product not found.</p>'; return; }

  const wrapper = document.createElement('div'); 
  wrapper.className = 'cart-row';
  const benefitsHtml = p.benefits ? `<p class="benefits-inline"><strong>Benefits:</strong> ${p.benefits}</p>` : ''; 
  wrapper.innerHTML = `
    <img src="${window.resolveImg ? window.resolveImg(p.img) : p.img}" alt="${p.name}">
    <div class="cart-flex">
      <h2>${p.name}</h2>
      <p class="prod-desc">${p.desc}</p>
      ${benefitsHtml}
      <p class="price-strong">Price: ${(p.discount && p.discount > 0) ? `<span class="orig-price">Rs. ${p.price}</span> <span class="sale-price">Rs. ${p.salePrice}</span>` : `Rs. ${p.price}`}</p>
      <div class="row-controls">
        <div class="qty-controls"><button id="decBtn">-</button><span id="qtyVal" class="qty-val">${qty}</span><button id="incBtn">+</button></div>
        <div class="subtotal-margin"><strong>Subtotal: Rs. <span id="subtotal">${(p.salePrice || p.price) * qty}</span></strong></div>
      </div>
    </div>
  `; 
  document.getElementById('cartArea').innerHTML = ''; 
  document.getElementById('cartArea').appendChild(wrapper);

  // Handle +/- quantity buttons on single product view
  const qtyVal = document.getElementById('qtyVal'); 
  const subtotal = document.getElementById('subtotal');
  document.getElementById('incBtn').addEventListener('click', ()=>{ 
    qty = Number(qty)+1; 
    qtyVal.textContent = qty; 
    subtotal.textContent = (p.salePrice || p.price) * qty; 
  });
  document.getElementById('decBtn').addEventListener('click', ()=>{ 
    qty = Math.max(1, Number(qty)-1); 
    qtyVal.textContent = qty; 
    subtotal.textContent = (p.salePrice || p.price) * qty; 
  });

  // Add button - saves item to localStorage and shows confirmation
  document.getElementById('finalAdd').addEventListener('click', ()=>{
    const item = { id, name: p.name, price: (p.salePrice || p.price), qty: Number(qty), img: p.img };
    window.cartUtils.addItemToCart(item);
    showToast(`${p.name} added to cart (${qty})`);
  });
}

// renderCartList - show full cart & totals
document.addEventListener('DOMContentLoaded', ()=>{
  const id = qs('id');
  const qtyParam = Number(qs('qty')) || 1;
  if(id){ 
    // Show single product detail page
    renderSingleProduct(id, qtyParam); 
  }
  else {
    // Show full cart list
    const container = document.getElementById('cartArea');
    const finalBtn = document.getElementById('finalAdd');

    // Render cart list function
    function renderCartList(){
      const cart = window.cartUtils.getCart();
      container.innerHTML = '';
      if(!cart || cart.length === 0){
        container.innerHTML = '<p>Your cart is empty.</p>';
        if(finalBtn) finalBtn.classList.add('hidden');
        return;
      }
      if(finalBtn) finalBtn.classList.add('hidden');

      let total = 0;
      const listWrap = document.createElement('div');
      cart.forEach((it, idx)=>{
        const subtotal = it.price * it.qty;
        total += subtotal;
        const row = document.createElement('div'); 
        row.className = 'cart-row'; 
        row.dataset.index = idx;
        const product = window.getProduct ? window.getProduct(it.id) : null;
        const benefitsHtml = product && product.benefits ? `<p class="benefits-inline"><strong>Benefits:</strong> ${product.benefits}</p>` : ''; 
        row.innerHTML = `
          <img src="${window.resolveImg ? window.resolveImg(it.img) : it.img}" alt="${it.name}">
          <div class="cart-flex">
            <h2>${it.name}</h2>
            <p class="prod-desc">${it.desc || ''}</p>
            ${benefitsHtml}
            <p class="price-strong">Price: Rs. ${it.price}</p>
            <div class="row-controls">
              <div class="qty-controls">
                <button class="dec" data-index="${idx}">-</button>
                <span class="qty-val" data-index="${idx}">${it.qty}</span>
                <button class="inc" data-index="${idx}">+</button>
              </div>
              <div class="subtotal-margin"><strong>Subtotal: Rs. <span class="subtotal" data-index="${idx}">${subtotal}</span></strong></div>
            </div>
            <div class="mt-10"><button class="btn-outline remove-btn" data-index="${idx}">Remove</button></div>
          </div>
        `;
        listWrap.appendChild(row);
      });

      // Total price and action buttons
      const totalDiv = document.createElement('div');
      totalDiv.className = 'cart-total';
      totalDiv.innerHTML = `<h3>Total: Rs. ${total}</h3><div class="total-actions"><button id="clearCart" class="btn-outline">Clear Cart</button><a href="products.html" class="btn-primary">Continue shopping</a></div>`;

      container.appendChild(listWrap);
      container.appendChild(totalDiv);
    }

    renderCartList();

    // item controls - inc/dec/remove (delegation)
    container.addEventListener('click', e=>{
      const idx = e.target.dataset.index;
      if(typeof idx === 'undefined') return;
      const cart = window.cartUtils.getCart();
      const i = Number(idx);

      if(e.target.classList.contains('inc')){
        // Increment button - increase quantity by 1
        cart[i].qty += 1;
        window.cartUtils.saveCart(cart);
        renderCartList();
        return;
      }
      if(e.target.classList.contains('dec')){
        // Decrement button - decrease quantity (minimum 1)
        cart[i].qty = Math.max(1, cart[i].qty - 1);
        window.cartUtils.saveCart(cart);
        renderCartList();
        return;
      }
      if(e.target.classList.contains('remove-btn')){
        // Remove button - delete entire item from cart
        cart.splice(i,1);
        window.cartUtils.saveCart(cart);
        showToast('Item removed from cart');
        renderCartList();
        return;
      }
    });

    // clear cart
    document.addEventListener('click', e=>{
      if(e.target && e.target.id === 'clearCart'){
        localStorage.removeItem('cart');
        showToast('Cart cleared');
        renderCartList();
      }
    });
  }
});