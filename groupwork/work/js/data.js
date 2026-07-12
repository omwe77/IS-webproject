// For: all pages (product data)

// PRODUCTS (12 items) - used by cart/product pages
window.PRODUCTS = [
  { id: 'bamboo-utensil', name: 'Bamboo Utensil Set', price: 800, discount: 10, salePrice: 720, img: '/images/bamboutensil.png', desc: 'Lightweight bamboo utensil set for zero-waste lunches.', benefits: 'Biodegradable • Chemical-free • Perfect for picnics • Reduces plastic waste • Durable and reusable' },
  { id: 'plant-candle', name: 'Plant-Based Candle', price: 650, discount: 10, salePrice: 585, img: '/images/plantbasedcandle.jpg', desc: 'Non-toxic, naturally aromatic plant-based candle.', benefits: 'No harmful chemicals • Natural fragrance • Burns cleaner • Supports sustainable farming • Long-lasting' },
  { id: 'beeswax-wrap', name: 'Beeswax Wrap', price: 450, discount: 10, salePrice: 405, img: '/images/beeswaxwrap.jpg', desc: 'Reusable beeswax wrap - replace single-use plastic.', benefits: 'Replaces plastic wrap • Washable and reusable • Antibacterial properties • Biodegradable • Lasts 12+ months' },
  { id: 'edible-spoon', name: 'Edible Spoon', price: 550, discount: 10, salePrice: 495, img: '/images/ediblespoon.png', desc: 'Edible spoon — an eco-friendly replacement for disposable cutlery.', benefits: 'Completely edible • Zero waste • Perfect for events • Tasty and nutritious • Reduces landfill waste' },
  { id: 'cleaning-spray', name: 'Plant Based Spray', price: 299, discount: 10, salePrice: 269, img: '/images/cleaningbrush.jpg', desc: 'Natural cleaning spray, gentle on surfaces and planet-friendly.', benefits: 'Non-toxic formula • Safe for kids and pets • Biodegradable • Effective on most surfaces • No harsh chemicals' },
  { id: 'pencil-box', name: 'Pencil Box', price: 599, discount: 10, salePrice: 539, img: '/images/pencil.jpg', desc: 'Sturdy and eco-friendly pencil box.', benefits: 'Made from recycled materials • Durable and sturdy • Spacious compartments • Eco-certified • Perfect for students' },
  { id: 'bottle', name: 'Reusable Bottle', price: 180, discount: 10, salePrice: 162, img: '/images/bamboo bottle.webp', desc: 'Keep hydrated with a reusable water bottle.', benefits: 'Reduces plastic bottles • BPA-free • Keeps drinks cold for hours • Lightweight and portable • Saves money' },
  { id: 'reusable-tote', name: 'Reusable Tote Bag', price: 490, discount: 10, salePrice: 441, img: '/images/reuseabletotebag.jpg', desc: 'Durable, washable tote for daily shopping.', benefits: 'Replaces plastic bags • Machine washable • Strong handles • Spacious capacity • Eco-certified cotton' },
  { id: 'stainless-straw', name: 'Stainless Steel Straw', price: 150, discount: 10, salePrice: 135, img: '/images/stainlesssteelstraw.jpg', desc: 'Eco-friendly reusable straw.', benefits: 'Eliminates single-use plastic • Durable stainless steel • Easy to clean • Comes with brush • Portable case' },
  { id: 'natural-soap', name: 'Natural Soap', price: 199, discount: 10, salePrice: 179, img: '/images/soap.jpg', desc: 'Gentle, natural soap bar.', benefits: 'Handmade with natural oils • Cruelty-free • No plastic packaging • Long-lasting • Suitable for sensitive skin' },
  { id: 'bamboo-comb', name: 'Bamboo Comb', price: 220, discount: 10, salePrice: 198, img: '/images/bamboocomb.jpg', desc: 'Smooth bamboo comb for everyday use.', benefits: 'Sustainable bamboo • Reduces static • Gentle on scalp • Splinter-free • Biodegradable' },
  { id: 'phone-case-biodegradable', name: 'Biodegradable Phone Case', price: 799, discount: 10, salePrice: 719, img: '/images/Biodegradable phone cases.webp', desc: 'Compostable phone case made from plant-based materials.' }
];

// lookup map
window.PRODUCT_MAP = Object.fromEntries(window.PRODUCTS.map(p => [p.id, p]));

// getProduct(id) - lookup by id
window.getProduct = function(id){ 
  return window.PRODUCT_MAP && window.PRODUCT_MAP[id]; 
};

// resolveImg(img) - make image path work from any page
window.resolveImg = function(img){
  if(!img) return img;
  // If file protocol and absolute path, strip leading slash for relative resolution
  if(location && location.protocol === 'file:' && img.startsWith('/')) img = img.slice(1);
  // From /pages/ subfolders, add ../ prefix to reach /images/ from root
  if(!img.startsWith('/') && location && location.pathname && location.pathname.includes('/pages/') && !img.startsWith('../')){
    return '../' + img;
  }
  return img;
};
