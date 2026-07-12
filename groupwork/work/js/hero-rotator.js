// For: hero sections (home, blog, products, about, research)

// Home page hero section - 3 rotation images
const homeHeroImages = [
    'background2.jpg',
    'bamboutensil.png',
    'plantbasedcandle.jpg',
    
];

// Blog page hero section - 3 rotation images
const blogHeroImages = [
    'background3.png',
    'bamboutensil.png',
    'reuseabletotebag.jpg'
];

// Products page hero section - 3 rotation images
const productsHeroImages = [
    'background1.jpg',
    'pencil.jpg',
    'plantbasedcandle.jpg',
    
];

// About Us page hero section - 3 rotation images
const aboutHeroImages = [
    'soap.jpg',
    'plantbasedcandle.jpg',
    'toothbrush.jpg'
];

// Research page hero section - 3 rotation images
const researchHeroImages = [
    'pencil.jpg',
    'paper cups.jpg',
    'paper bags.jpg'
];

// Track current image index for each hero section
let heroImageIndices = {}; 
// Guard to prevent double initialization when script is loaded multiple times
window.__heroRotatorInitialized = window.__heroRotatorInitialized || false;

// initHeroRotator - start rotators (5s)
function initHeroRotator() {
    if (window.__heroRotatorInitialized) return;
    window.__heroRotatorInitialized = true;

    try {
        const heroSelectors = [
            { selector: '.hero', images: homeHeroImages, id: 'home' },
            { selector: '.blog-hero', images: blogHeroImages, id: 'blog' },
            { selector: '.products-hero', images: productsHeroImages, id: 'products' },
            { selector: '.about-hero', images: aboutHeroImages, id: 'about' },
            { selector: '.research-header', images: researchHeroImages, id: 'research' }
        ];
        
        heroSelectors.forEach(hero => {
            const element = document.querySelector(hero.selector);
            if (element && Array.isArray(hero.images) && hero.images.length) {
                heroImageIndices[hero.id] = 0;
                // Run once immediately, but catch any errors per-run to avoid uncaught exceptions
                try {
                    rotateHeroImage(element, hero.images, hero.id);
                } catch (err) {
                    console.error('Hero rotator initial run error for', hero.selector, err);
                }
                setInterval(() => {
                    try {
                        rotateHeroImage(element, hero.images, hero.id);
                    } catch (err) {
                        console.error('Hero rotator interval error for', hero.selector, err);
                    }
                }, 5000);
            }
        });
    } catch (err) {
        console.error('initHeroRotator error:', err);
    }
}

// rotateHeroImage - set background & advance index
function rotateHeroImage(heroEl, imageArray, pageId) {
    try {
        if (!heroEl || !Array.isArray(imageArray) || imageArray.length === 0) return;
        const isSubPage = window.location.pathname.includes('/pages/');
        const currentIndex = heroImageIndices[pageId] || 0;
        const imagePath = isSubPage 
            ? `../images/${imageArray[currentIndex]}`
            : `images/${imageArray[currentIndex]}`;
        
        // Apply transition and update background image
        heroEl.style.transition = 'background-image 0.8s ease';
        heroEl.style.backgroundImage = `url("${imagePath}")`;
        
        // Update index for next rotation (cycles back to 0 when reaching end)
        heroImageIndices[pageId] = (currentIndex + 1) % imageArray.length;
    } catch (err) {
        console.error('rotateHeroImage error:', err);
    }
}

// Start rotator when DOM is ready
document.addEventListener('DOMContentLoaded', initHeroRotator);

// Also run on full page load as backup
window.addEventListener('load', initHeroRotator);