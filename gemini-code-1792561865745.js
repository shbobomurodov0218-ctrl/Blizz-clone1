// Namuna uchun tovarlar bazasi
const products = [
    { id: 1, name: "Ko'ylak (Erkaklar uchun)", price: 150000 },
    { id: 2, name: "Jinsi shim", price: 220000 },
    { id: 3, name: "Sport oyoq kiyim", price: 350000 },
    { id: 4, name: "Futbolka", price: 80000 },
    { id: 5, name: "Kroyka Kepka", price: 45000 }
];

let cart = [];

// Sahifa yuklanganda mahsulotlarni chiqarish
window.addEventListener('DOMContentLoaded', () => {
    renderProductGrid();
});

function renderProductGrid() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => addToCart(p.id);
        card.innerHTML = `
            <div class="p-name">${p.name}</div>
            <div class="p-price">${p.price.toLocaleString()} UZS</div>
        `;
        grid.appendChild(card);
    });
}

// Savatchaga mahsulot qo'shish
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
}

// Savatchadan o'chirish
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Miqdorni o'zgartirish
function changeQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

// Interfeysni yangilash
function updateCartUI() {
    const emptyState = document.getElementById('empty-cart-state');
    const cartTable = document.getElementById('cart-table');
    const itemsList = document.getElementById('cart-items-list');
    const cartCount = document.getElementById('cart-count');
    
    const subtotalEl = document.getElementById('subtotal');
    const totalPayEl = document.getElementById('total-pay');

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cart.length === 0) {
        emptyState.style.display = 'block';
        cartTable.style.display = 'none';
        subtotalEl.textContent = '0 UZS';
        totalPayEl.textContent = '0 UZS';
        return;
    }

    emptyState.style.display = 'none';
    cartTable.style.display = 'table';
    itemsList.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${item.name}</strong></td>
            <td>${item.price.toLocaleString()} UZS</td>
            <td>
                <button onclick="changeQuantity(${item.id}, -1)" style="padding:2px 6px;">-</button>
                <span style="margin:0 5px;">${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, 1)" style="padding:2px 6px;">+</button>
            </td>
            <td>${itemTotal.toLocaleString()} UZS</td>
            <td><button class="delete-item-btn" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash"></i></button></td>
        `;
        itemsList.appendChild(row);
    });

    subtotalEl.textContent = total.toLocaleString() + ' UZS';
    totalPayEl.textContent = total.toLocaleString() + ' UZS';
}

// To'lov tugmasi bosilganda
function checkout() {
    if (cart.length === 0) {
        alert("Savatcha bo'sh! Oldin tovar qo'shing.");
        return;
    }
    alert("To'lov muvaffaqiyatli amalga oshirildi! Xarid uchun rahmat.");
    cart = [];
    updateCartUI();
}

// Qidiruv inputi orqali ishlash
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    // Bu yerda qidiruv logikasini kengaytirishingiz mumkin
});