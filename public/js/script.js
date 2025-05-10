// ambil elemen
const popupOverlay = document.getElementById('popupBeli');
const closePopup = document.getElementById('closePopup');
const cartIcon = document.getElementById('cartIcon');
const popupCart = document.getElementById('popupCart');
const closeCartBtn = document.getElementById('closeCartBtn');
const quantityInput = document.getElementById('quantity');
const decreaseQty = document.getElementById('decreaseQty');
const increaseQty = document.getElementById('increaseQty');
let cartItems = [];

// ketika tombol "beli" diklik
function openPopup(button) {
    const itemMenu = button.closest('.item-menu');
    const productName = itemMenu.querySelector('h3').innerText;
    const productPriceText = itemMenu.querySelector('span').innerText;
    const productId = itemMenu.getAttribute('data-id');

    const productPrice = parseInt(productPriceText.replace(/[^\d]/g, ''), 10);
    
    document.querySelector('#popup-title').innerText = productName;
    document.querySelector('#popup-price').innerText = productPrice;
    document.querySelector('#popup-price').innerText = `Rp ${productPrice.toLocaleString()}`;
    document.querySelector('#popup-id').innerText = productId;
    quantityInput.value = 1;

    const popupImage = document.querySelector('.popup-image');
    popupImage.src = `/public/images/${productId}.jpg`;
    popupImage.alt = productName;

    document.querySelector('.popup-beli').style.display = 'flex';
};

// ketika tombol "close" diklik
closePopup.addEventListener('click', () => {
    popupOverlay.style.display = 'none'; // sembunyikan modal
});

decreaseQty.addEventListener('click', () => {
    let qty = parseInt(quantityInput.value);
    if (qty > 1) {
        quantityInput.value = qty - 1;
    }
});

increaseQty.addEventListener('click', () => {
    let qty = parseInt(quantityInput.value);
    quantityInput.value = qty + 1;
});

cartIcon.addEventListener('click', () => {
    popupCart.style.display = 'flex';
});

closeCartBtn.addEventListener('click', () => {
    popupCart.style.display = 'none';
});

// ketika tombol "keranjang" di klik (menu-actions)
function addToCartFromItem(button) {
    const item = button.closest('.item-menu');
    const name = item.querySelector('h3').innerText;
    const priceText = item.querySelector('span').innerText;
    const id = item.getAttribute('data-id') || name.toLowerCase().replace(/\s/g, '-');
    const price = parseInt(priceText.replace(/[^\d]/g, ''), 10);

    addItemToCart({id, name, price })
    /*cartItems.push({ id, name, price });
    updateCartUI();*/
}

// ketika tombol "keranjang di klik" (btn-actions)
function addToCartFromPopup() {
    const name = document.querySelector('#popup-title').innerText;
    const priceText = document.querySelector('#popup-price').innerText;
    const price = parseInt(priceText.replace(/[^\d]/g, ''), 10)
    const id = name.toLowerCase().replace(/\s/g, '-');
    const qty = parseInt(quantityInput.value);

    addItemToCart({ id, name, price, qty })
    popupOverlay.style.display
    /*cartItems.push({ id, name, price });
    updateCartUI();*/
}

function addItemToCart({ id, name, price, qty = 1 }) {
    const existing = cartItems.find(item => item.id === id);
    if (existing) {
        existing.qty += qty;
    } else {
        cartItems.push({ id, name, price, qty });
    }
    updateCartUI();
}

// Fungsi popup keranjang
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotal = document.getElementById('cartTotal');

    cartCount.innerText = cartItems.length;

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Keranjang Kosong, Yuk pilih mau makan apa hari ini!</p>';
        cartTotal.innerText = 'Rp 0';
        return;
    } 
    cartItemsContainer.innerHTML = cartItems.map((item, index) => `
        <div class="cart-item">
            <span class="item-name">${item.name}</span>
            <div class="qty-controls">
                <button onclick="changeQty(${index}, -1)">-</button>
                <span class="item-qty">x${item.qty}</span>
                <button onclick="changeQty(${index}, 1)">+</button>
            </div>
            <span class="item-price">${item.price.toLocaleString()}</span>
            <button onclick="removeCartItem(${index})" class="remove-btn">Hapus</button>
        </div> 
    `).join('');

    cartTotal.innerText = `Rp ${calculateTotal().toLocaleString()}`;
    cartCount.innerText = cartItems.length; // update angka pada ikon keranjang
}

function calculateTotal() {
    return cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function changeQty(index, change) {
    if (cartItems[index].qty === undefined) cartItems[index].qty = 1;
    cartItems[index].qty += change;
    if (cartItems[index].qty < 1) {
        cartItems.splice(index, 1);
    }
    updateCartUI();
}

// fungsi untuk hapus produk dari keranjang
function removeCartItem(index) {
    cartItems.splice(index, 1);
    updateCartUI();
}

// buka pop-up keranjang
document.getElementById('cartIcon').addEventListener('click', () => {
    document.getElementById('popupCart').style.display = 'flex';
});

// tutup pop-up keranjang
document.getElementById('closeCartPopup').addEventListener('click', () => {
    document.getElementById('cartPopup').style.display = 'none';
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetElement = document.querySelector(this.getAttribute('href'));
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            console.error('Target element not found for:', this.getAttribute('href'));
        }
    });
});

// JavaScript untuk fitur scroll ke atas
window.onscroll = function() {
    toggleScrollToTopButton();
};

function toggleScrollToTopButton() {
    const scrollToTopButton = document.getElementById("scrollToTop");

    // Jika scroll lebih dari 300px, tampilkan tombol
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollToTopButton.style.display = "block";
    } else {
        scrollToTopButton.style.display = "none";
    }
}

// Fungsi untuk scroll ke atas
document.getElementById("scrollToTop").onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};


