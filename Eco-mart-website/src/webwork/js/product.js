// For: product page (pages/product.html)

// qs - get URL param
function qs(key){ return new URLSearchParams(location.search).get(key); }

// Load product data and populate page elements
document.addEventListener('DOMContentLoaded', ()=>{
  const id = qs('id');
  const p = window.getProduct ? window.getProduct(id) : null;
  
  // Handle product not found error
  if(!id || !p){
    document.getElementById('prod-name').textContent = 'Product not found';
    document.getElementById('prod-desc').textContent = 'Sorry, this product does not exist.';
    document.getElementById('prod-price').textContent = '0';
    document.getElementById('prod-img').src = (window.resolveImg ? window.resolveImg('/images/backgroundimage.png') : '/images/backgroundimage.png');
    document.getElementById('add-to-cart').disabled = true;
    return;
  }
  
  // Populate product details on page
  document.getElementById('prod-name').textContent = p.name;
  document.getElementById('prod-desc').textContent = p.desc;
  document.getElementById('prod-price').innerHTML = (p.discount && p.discount > 0) ? `<span class="orig-price">Rs. ${p.price}</span> <span class="sale-price">Rs. ${p.salePrice}</span>` : `Rs. ${p.price}`;
  document.getElementById('prod-img').src = (window.resolveImg ? window.resolveImg(p.img) : p.img);
  document.getElementById('prod-img').alt = p.name;
  
  // Show product benefits if available
  if(p.benefits){
    document.getElementById('prod-benefits').innerHTML = `<strong>Benefits:</strong><br>${p.benefits}`;
  }

  // qty controls (+ / -)
  let qty = 1;
  const qtyEl = document.getElementById('qty');
  qtyEl.textContent = qty;
  document.getElementById('inc').addEventListener('click', ()=>{ 
    qty++; 
    qtyEl.textContent = qty; 
  });
  document.getElementById('dec').addEventListener('click', ()=>{ 
    qty = Math.max(1, qty-1); 
    qtyEl.textContent = qty; 
  });

  // add-to-cart -> redirect to cart.html
  document.getElementById('add-to-cart').addEventListener('click', ()=>{
    const params = new URLSearchParams();
    params.set('id', id);
    params.set('qty', qty);
    window.location.href = 'cart.html?' + params.toString();
  });
});