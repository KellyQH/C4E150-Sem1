let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(item, price) {
    let found = cart.find(product => product.name === item);
    if (found) {
        found.quantity++;
    } else {
        cart.push({ name: item, price: price, quantity: 1 });
    }
    saveCart();
    updateCartDisplay();
}

function removeFromCart(item) {
    let index = cart.findIndex(product => product.name === item);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
    }
    saveCart();
    updateCartDisplay();
}

function removeItems(item) {
    let index = cart.findIndex(product => product.name === item);
    if (index !== -1) {
        cart.splice(index, 1);
    }
    saveCart();
    updateCartDisplay();
}

function updateQuantity(item, quantity) {
    let found = cart.find(product => product.name === item);
    if (found) {
        found.quantity = parseInt(quantity);
        if (found.quantity <= 0) {
            removeFromCart(item);
        } else {
            saveCart();
            updateCartDisplay();
        }
    }
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const totalCost = document.getElementById('totalCost');

    if (cartCount) cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartItems) cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const li = document.createElement('li');
        li.innerHTML = `<span class="cart-items">${item.name}</span>
                        <button class="cart-buttons" onclick="removeFromCart('${item.name}')">-</button>
                        <input class="cart-input" type="number" min="1" value="${item.quantity}" onchange="updateQuantity('${item.name}', this.value)">
                        <button class="cart-buttons" onclick="addToCart('${item.name}', ${item.price})">+</button>
                        <span class="cart-price">VND${item.price}.00</span>
                        <button class="cart-buttons" onclick="removeItems('${item.name}')">x</button>`;

        if (cartItems) cartItems.appendChild(li);
    });

    // Apply discount if already used
    let discountMultiplier = 1;
    if (localStorage.getItem('discountApplied') === 'true') {
        discountMultiplier = 0.8;
    }
    total *= discountMultiplier;

    if (totalCost) totalCost.textContent = total.toFixed(2);
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function applyDiscount() {
    const discountCode = document.getElementById('discountCode').value;
    let discountMultiplier = 1; // Default multiplier for no discount

    // Check if the discount has already been applied
    if (localStorage.getItem('discountApplied') === 'true') {
        alert('Discount code has already been used.');
        return;
    }

    // Check if the discount code is valid
    if (discountCode === 'ILOVESUSHI') {
        discountMultiplier = 0.8; // 20% discount (80% of original price)
        alert('Discount code applied successfully!');
        localStorage.setItem('discountApplied', 'true'); // Mark the discount as applied
    } else {
        alert('Invalid discount code. Please try again.');
    }

    // Recalculate total cost and display it
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    total *= discountMultiplier;
    document.getElementById('totalCost').textContent = total.toFixed(2);
}

function placeOrder() {
    let discountMultiplier = 1; // Default multiplier for no discount

    // Check if the discount code has already been applied
    if (localStorage.getItem('discountApplied') === 'true') {
        discountMultiplier = 0.8; // 20% discount (80% of original price)
    }

    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    total *= discountMultiplier;

    if (cart.length > 0) {
        alert('Order placed successfully! Your total cost is VND' + total.toFixed(2));
        cart = [];
        saveCart();
        updateCartDisplay();
        localStorage.removeItem('discountApplied'); // Reset the discount flag
    } else {
        alert('Your cart is empty!');
    }
}

document.addEventListener('DOMContentLoaded', updateCartDisplay);