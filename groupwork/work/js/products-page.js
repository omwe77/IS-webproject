// For: products page (pages/products.html)
// Products filtering & rendering (short comments only)

// Global variables to store products
let allProducts = [];

// renderProductsGrid - populate #productGrid
function renderProductsGrid(products = window.PRODUCTS || []){
  const grid = document.getElementById('productGrid');
  if(!grid) return;
  
  // Handle empty state when no products match filters
  if(!products || products.length === 0) {
    grid.innerHTML = '<div class="empty-state"><h3>No products found</h3><p>Try adjusting your filters to see more products.</p></div>';
    return;
  }

  // Clear grid and render all products
  grid.innerHTML = '';
  products.forEach(p => {
    const el = document.createElement('div');
    el.className = 'product-card';
    el.innerHTML = `
      <div class="product-img-wrapper">
        <img src="${window.resolveImg ? window.resolveImg(p.img) : p.img}" alt="${p.name}">
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <div class="product-price">${(p.discount && p.discount > 0) ? `<span class="orig-price">Rs. ${p.price}</span> <span class="sale-price">Rs. ${p.salePrice}</span> <span class="sale-badge">Sale ${p.discount}%</span>` : `Rs. ${p.price}`}</div>
          <div class="product-actions">
            <a href="cart.html?id=${p.id}" class="btn-view">View More</a>
            <button class="btn-add add-to-cart" data-id="${p.id}" data-name="${p.name}" data-price="${p.salePrice || p.price}" data-img="${p.img}">Add to Cart</button>
          </div>
        </div> 
      </div>
    `;
    grid.appendChild(el);
  });
}

// applyFilters - search / price / sort
function applyFilters() {
  let results = [...allProducts];
  
  // search filter (name & desc)
  const searchValue = document.getElementById('searchFilter')?.value?.toLowerCase() || '';
  if(searchValue) {
    results = results.filter(p => p.name.toLowerCase().includes(searchValue) || p.desc.toLowerCase().includes(searchValue));
  }

  // price filter (max price)
  const maxPrice = Number(document.getElementById('priceFilter')?.value || 1000);
  results = results.filter(p => p.price <= maxPrice);

  // sort filter (price/name)
  const sortValue = document.getElementById('sortFilter')?.value || 'none';
  if(sortValue === 'price-low') results.sort((a, b) => a.price - b.price);
  else if(sortValue === 'price-high') results.sort((a, b) => b.price - a.price);
  else if(sortValue === 'name-a-z') results.sort((a, b) => a.name.localeCompare(b.name));
  else if(sortValue === 'name-z-a') results.sort((a, b) => b.name.localeCompare(a.name));

  // Re-render grid with results
  renderProductsGrid(results);
}

// resetFilters - clear inputs & show all
function resetFilters() {
  document.getElementById('searchFilter').value = '';
  document.getElementById('priceFilter').value = '1000';
  document.getElementById('priceValue').textContent = '1000';
  document.getElementById('sortFilter').value = 'none';
  applyFilters();
}

// init - set listeners & render
document.addEventListener('DOMContentLoaded', ()=>{
  // Load all products from data.js
  allProducts = window.PRODUCTS || [];
  renderProductsGrid(allProducts);

  // Get filter elements from DOM
  const searchFilter = document.getElementById('searchFilter');
  const priceFilter = document.getElementById('priceFilter');
  const priceValue = document.getElementById('priceValue');
  const sortFilter = document.getElementById('sortFilter');
  const resetButton = document.getElementById('resetFilter');

  // SEARCH FILTER LISTENER
  // Re-applies filters whenever user types in search box
  if(searchFilter) searchFilter.addEventListener('input', applyFilters);
  
  // PRICE FILTER LISTENER
  // Re-applies filters when user moves price slider
  // Also updates displayed price value
  if(priceFilter) {
    priceFilter.addEventListener('input', () => {
      priceValue.textContent = priceFilter.value;
      applyFilters();
    });
  }
  
  // SORT FILTER LISTENER
  // Re-applies filters when user changes sort option
  if(sortFilter) sortFilter.addEventListener('change', applyFilters);
  
  // RESET FILTERS BUTTON LISTENER
  // Clears all filters and shows all products
  if(resetButton) resetButton.addEventListener('click', resetFilters);

  // handle add-to-cart (uses cartUtils)
  document.addEventListener('click', e=>{
    const btn = e.target.closest('.add-to-cart');
    if(!btn) return;
    e.preventDefault();
    const id = btn.dataset.id;
    const name = btn.dataset.name;
    const price = Number(btn.dataset.price) || 0;
    const img = btn.dataset.img;
    if(window.cartUtils) {
      window.cartUtils.promptAddToCart({ id, name, price, qty: 1, img });
    }
  });
});