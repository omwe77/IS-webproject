// For: floating cart widget (site-wide)
(function(){
  // widget (count + preview)
  const WIDGET_ID = 'floating-cart-widget';
  function resolveCartPage(){
    return window.location.pathname.includes('/pages/') ? 'cart.html' : 'pages/cart.html';
  }

  function readCart(){
    try{ return JSON.parse(localStorage.getItem('cart')||'[]') }catch(e){ return []; }
  }

  function formatRs(n){ return Number(n).toLocaleString(); }

  function createWidget(){
    if(document.getElementById(WIDGET_ID)) return;
    const widget = document.createElement('div');
    widget.id = WIDGET_ID;
    widget.className = 'floating-cart';
    widget.innerHTML = `
      <button class="cart-button" aria-label="Open cart">
        🧺 <span class="cart-badge" aria-hidden="true">0</span>
      </button>
      <div class="cart-preview" aria-hidden="true">
        <div class="cart-preview-head"><strong>Your Cart</strong><button class="preview-close" aria-label="Close">✕</button></div>
        <div class="cart-preview-body">Loading…</div>
        <div class="cart-preview-actions"><a class="btn-outline view-cart" href="#">View Cart</a></div>
      </div>
    `;
    document.body.appendChild(widget);

    const btn = widget.querySelector('.cart-button');
    const preview = widget.querySelector('.cart-preview');
    const body = widget.querySelector('.cart-preview-body');
    const closeBtn = widget.querySelector('.preview-close');
    const viewLink = widget.querySelector('.view-cart');
    viewLink.href = resolveCartPage();

    btn.addEventListener('click', (e)=>{ e.stopPropagation(); togglePreview(); });
    closeBtn.addEventListener('click', (e)=>{ e.stopPropagation(); hidePreview(); });
    document.addEventListener('click', (e)=>{ if(!widget.contains(e.target)) hidePreview(); });

    function togglePreview(){
      if(preview.getAttribute('aria-hidden') === 'false') hidePreview(); else showPreview();
    }
    function showPreview(){
      buildPreview();
      preview.setAttribute('aria-hidden','false');
      preview.style.transform = 'translateY(0)';
    }
    function hidePreview(){
      preview.setAttribute('aria-hidden','true');
      preview.style.transform = 'translateY(12px)';
    }

    function buildPreview(){
      const cart = readCart();
      if(!cart || cart.length === 0){
        body.innerHTML = '<p class="empty">Your cart is empty.</p>';
        return;
      }
      let html = '<ul class="cart-items">';
      let total = 0;
      cart.forEach((it, i)=>{
        const subtotal = (it.price || 0) * (it.qty || 1);
        total += subtotal;
        html += `<li class="cart-item"><div class="item-meta"><strong>${escapeHtml(it.name)}</strong><span>Qty: ${it.qty}</span></div><div class="item-sub">Rs. ${formatRs(subtotal)}</div></li>`;
      });
      html += `</ul><div class="cart-total"><strong>Total: Rs. ${formatRs(total)}</strong></div>`;
      body.innerHTML = html;
    }

    function escapeHtml(s){ return String(s||'').replace(/[&<>\"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }

    return widget;
  }

  function updateCount(){
    const widget = document.getElementById(WIDGET_ID);
    if(!widget) return;
    const badge = widget.querySelector('.cart-badge');
    const cart = readCart();
    const count = cart.reduce((s,i)=>s + (Number(i.qty)||0), 0);
    badge.textContent = count || 0;
    badge.style.display = (count>0) ? 'inline-block' : 'none';
  }

  // Poll for cart changes (works on same page where localStorage set without storage event)
  let last = JSON.stringify(readCart());
  function poll(){
    const cur = JSON.stringify(readCart());
    if(cur !== last){ last = cur; updateCount(); }
    setTimeout(poll, 700);
  }

  // Init
  document.addEventListener('DOMContentLoaded', ()=>{
    createWidget();
    updateCount();
    poll();
  });

})();
