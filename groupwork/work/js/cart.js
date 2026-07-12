// For: site-wide cart utilities (ALL pages)

// cart utilities (localStorage)
function getCart(){ return JSON.parse(localStorage.getItem('cart') || '[]'); }
function saveCart(cart){ localStorage.setItem('cart', JSON.stringify(cart)); }
function findCartItem(cart, name){ return cart.findIndex(i=>i.name === name); }

// Close the add-to-cart popup modal
function closeCartPopup(){
  const existing = document.getElementById('cart-popup-backdrop');
  if(existing) existing.remove();
}

// promptAddToCart(item) - show qty popup
function promptAddToCart(item){
  // show qty modal
  closeCartPopup();
  const backdrop = document.createElement('div');
  backdrop.id = 'cart-popup-backdrop';
  backdrop.className = 'cart-popup-backdrop';

  const box = document.createElement('div');
  box.className = 'cart-popup-box';

  const img = document.createElement('img');
  img.className = 'cart-popup-img';
  img.src = (window.resolveImg ? window.resolveImg(item.img || '/images/backgroundimage.png') : (item.img || '/images/backgroundimage.png'));
  img.alt = item.name || 'product';

  const meta = document.createElement('div');
  meta.className = 'cart-popup-meta';
  const benefits = item.benefits ? `<div class="benefits-small"><strong>Benefits:</strong> ${item.benefits}</div>` : ''; 
  meta.innerHTML = `<div class="cart-popup-title">${item.name}</div>
                    <div class="cart-popup-price">Price: Rs. ${item.price}</div>
                    ${benefits}`;

  // qty controls
  const qtyRow = document.createElement('div'); qtyRow.className = 'cart-popup-qty';
  const dec = document.createElement('button'); dec.className = 'qty-btn'; dec.textContent = '-';
  const qtyVal = document.createElement('div'); qtyVal.className = 'qty-val'; qtyVal.textContent = item.qty || 1;
  const inc = document.createElement('button'); inc.className = 'qty-btn'; inc.textContent = '+';
  qtyRow.appendChild(dec); qtyRow.appendChild(qtyVal); qtyRow.appendChild(inc);

  const actions = document.createElement('div'); actions.className = 'cart-popup-actions';
  const confirmBtn = document.createElement('button'); confirmBtn.className = 'btn-primary'; confirmBtn.textContent = 'Confirm & Add';
  const viewBtn = document.createElement('a'); viewBtn.className = 'btn-outline'; viewBtn.textContent = 'View Cart'; viewBtn.href = document.location.pathname.includes('/pages/') ? 'cart.html' : 'pages/cart.html';
  const contBtn = document.createElement('button'); contBtn.className = 'btn-outline'; contBtn.textContent = 'Continue Shopping';

  actions.appendChild(confirmBtn); actions.appendChild(viewBtn); actions.appendChild(contBtn);

  contBtn.addEventListener('click', closeCartPopup);

  box.appendChild(img);
  const right = document.createElement('div'); right.appendChild(meta); right.appendChild(qtyRow); right.appendChild(actions);
  box.appendChild(right);

  backdrop.appendChild(box);
  backdrop.addEventListener('click', (e)=>{ if(e.target === backdrop) closeCartPopup(); });
  document.body.appendChild(backdrop);

  // qty handlers
  let qty = Number(item.qty) || 1;
  function updateQty(){ qtyVal.textContent = qty; }
  inc.addEventListener('click', ()=>{ qty++; updateQty(); });
  dec.addEventListener('click', ()=>{ qty = Math.max(1, qty-1); updateQty(); });

  confirmBtn.addEventListener('click', ()=>{
    // add to storage
    addItemToCart({ id: item.id, name: item.name, price: item.price, qty, img: item.img });
    // visual confirmation (brief highlight)
    confirmBtn.textContent = 'Added'; confirmBtn.disabled = true;
    setTimeout(()=> closeCartPopup(), 900);
  });

  // animate in
  requestAnimationFrame(()=>{ box.classList.add('cart-popup-enter'); backdrop.classList.add('cart-popup-enter'); });
}



function addItemToCart(item){ // item: { id, name, price, qty, img }
  const cart = getCart();
  const idx = findCartItem(cart, item.name);
  if(idx > -1) { cart[idx].qty = (cart[idx].qty || 0) + (item.qty || 1); }
  else cart.push(item);
  saveCart(cart);
}

// Expose for other scripts
window.cartUtils = { getCart, saveCart, addItemToCart, promptAddToCart, closeCartPopup };

// For: home quick-add (.add-cart)
(function initQuickAddToCart() {
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.add-cart');
    if (!btn) return;
    e.preventDefault();
    
    // Get product info from button dataset attributes
    const id = btn.dataset.id;
    const name = btn.dataset.name;
    const price = Number(btn.dataset.price) || 0;
    const card = btn.closest('.product-card');
    const img = card ? card.querySelector('img')?.src : '';
    
    // Add item directly to cart (qty 1)
    addItemToCart({ id, name, price, qty: 1, img });
    
    // Visual confirmation - change button text to "✓ Added!" for 1.5 seconds
    const originalText = btn.textContent;
    btn.textContent = '✓ Added!';
    btn.classList.add('btn-temp');
    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove('btn-temp');
    }, 1500);
  });
})();
