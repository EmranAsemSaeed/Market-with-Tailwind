document.addEventListener('DOMContentLoaded', function() {
    // Product data
    const products = [
        {
            id: 1,
            name: "Smartphone X1 Pro",
            company: "TechCorp",
            price: "$799.99",
            originalPrice: "$899.99",
            rating: 4,
            image: "../images/small.png",
            description: "Premium smartphone with 6.7\" AMOLED display, triple 48MP camera system, and 5000mAh battery. Features the latest processor for exceptional performance."
        },
        {
            id: 2,
            name: "Smart Watch Elite",
            company: "ElectroGadgets",
            price: "$249.99",
            originalPrice: "$299.99",
            rating: 3,
            image: "../images/picMouse.png",
            description: "Advanced smartwatch with health monitoring, GPS, and 7-day battery life. Water resistant up to 50 meters with always-on display."
        },
        {
            id: 3,
            name: "Wireless Noise-Canceling Headphones",
            company: "AudioMaster",
            price: "$349.99",
            originalPrice: "$399.99",
            rating: 5,
            image: "../images/headPhone.png",
            description: "Industry-leading noise cancellation with 30-hour battery life. Premium sound quality with deep bass and crystal-clear highs."
        },
        {
            id: 4,
            name: "Ultrabook Pro",
            company: "CompuTech",
            price: "$1,299.99",
            originalPrice: "$1,499.99",
            rating: 4,
            image: "../images/syanPhone.png",
            description: "Sleek and powerful ultrabook with 14\" 4K display, 16GB RAM, and 1TB SSD. Weighs just 2.8lbs with all-day battery life."
        },
        {
            id: 5,
            name: "Professional DSLR Camera",
            company: "PhotoPro",
            price: "$1,599.99",
            originalPrice: "$1,799.99",
            rating: 4,
            image: "../images/bluePhone.png",
            description: "24.2MP full-frame sensor with 4K video recording. Includes 24-70mm f/2.8 lens and advanced autofocus system."
        },
        {
            id: 6,
            name: "Premium Tablet",
            company: "TechCorp",
            price: "$599.99",
            originalPrice: "$699.99",
            rating: 3,
            image: "../images/small.png",
            description: "10.5\" tablet with stylus support, 128GB storage, and all-day battery. Perfect for productivity and entertainment."
        }
    ];

    // DOM Elements
    const productSlider = document.getElementById('product-slider');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const productModal = document.getElementById('product-modal');
    const closeModal = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalCompany = document.getElementById('modal-company');
    const modalRating = document.getElementById('modal-rating');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');
    const modalDiscount = document.getElementById('modal-discount');

    // Render product cards
    function renderProducts() {
        productSlider.innerHTML = '';
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'flex-none w-72 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer group';
            productCard.innerHTML = `
                <div class="p-5" data-id="${product.id}">
                    <div class="relative overflow-hidden rounded-lg mb-4 h-48">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                    </div>
                    <h3 class="text-lg font-semibold mb-2 text-gray-900">${product.name}</h3>
                    <div class="flex items-center mb-3">
                        ${renderStars(product.rating, false, product.id)}
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-indigo-600 font-bold text-lg">${product.price}</span>
                        <span class="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    </div>
                </div>
            `;
            
            productSlider.appendChild(productCard);
        });
        
        // Add click event to each product card
        document.querySelectorAll('[data-id]').forEach(card => {
            card.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                openProductModal(productId);
            });
        });
    }

    // Render star rating
    function renderStars(rating, interactive = false, productId = null) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            const starClass = i <= rating ? 'text-yellow-400' : 'text-gray-300';
            const interactiveClass = interactive ? 'cursor-pointer hover:scale-125 transition-transform' : '';
            stars += `<i class="fas fa-star ${starClass} ${interactiveClass} star-${i}" data-rating="${i}" data-product-id="${productId}"></i>`;
        }
        return stars;
    }

    // Open product modal
    function openProductModal(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        
        modalTitle.textContent = product.name;
        modalImage.src = product.image;
        modalImage.alt = product.name;
        modalCompany.textContent = `by ${product.company}`;
        modalDescription.textContent = product.description;
        modalPrice.textContent = product.price;
        modalDiscount.textContent = product.originalPrice;
        
        // Render interactive stars
        modalRating.innerHTML = renderStars(product.rating, true, productId);
        
        // Add click events to stars
        document.querySelectorAll('#modal-rating .fa-star').forEach(star => {
            star.addEventListener('click', function() {
                const newRating = parseInt(this.getAttribute('data-rating'));
                updateProductRating(productId, newRating);
            });
        });
        
        productModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    // Update product rating
    function updateProductRating(productId, newRating) {
        // Update rating in products array
        const productIndex = products.findIndex(p => p.id === productId);
        if (productIndex !== -1) {
            products[productIndex].rating = newRating;
        }
        
        // Update stars in modal
        modalRating.innerHTML = renderStars(newRating, true, productId);
        
        // Update stars on product card
        const productCard = document.querySelector(`[data-id="${productId}"]`);
        if (productCard) {
            const starsContainer = productCard.querySelector('.flex.items-center');
            starsContainer.innerHTML = renderStars(newRating, false, productId);
        }
        
        // Re-add click events to new stars
        document.querySelectorAll('#modal-rating .fa-star').forEach(star => {
            star.addEventListener('click', function() {
                const clickedRating = parseInt(this.getAttribute('data-rating'));
                updateProductRating(productId, clickedRating);
            });
        });
    }

    // Slider navigation
    let scrollAmount = 0;
    const scrollStep = 300;
    
    nextBtn.addEventListener('click', () => {
        productSlider.scrollLeft += scrollStep;
    });
    
    prevBtn.addEventListener('click', () => {
        productSlider.scrollLeft -= scrollStep;
    });
    
    // Auto-scrolling
    let autoScrollInterval;
    
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            const maxScroll = productSlider.scrollWidth - productSlider.clientWidth;
            
            if (productSlider.scrollLeft >= maxScroll - 10) {
                productSlider.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                productSlider.scrollBy({
                    left: scrollStep,
                    behavior: 'smooth'
                });
            }
        }, 4000);
    }
    
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }
    
    productSlider.addEventListener('mouseenter', stopAutoScroll);
    productSlider.addEventListener('mouseleave', startAutoScroll);
    
    // Close modal
    closeModal.addEventListener('click', () => {
        productModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });
    
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !productModal.classList.contains('hidden')) {
            productModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Initialize
    renderProducts();
    startAutoScroll();
});