// For: home page (index.html)

document.addEventListener('DOMContentLoaded', function() {
  // init add-to-cart buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get product data from button attributes
      const productId = this.getAttribute('data-id');
      const productName = this.getAttribute('data-name');
      const productPrice = this.getAttribute('data-price');
      const productImg = this.getAttribute('data-img');
      
      // Show quantity modal with product info
      window.cartUtils.promptAddToCart({
        id: productId,
        name: productName,
        price: parseInt(productPrice),
        img: productImg
      });
    });
  });
});
