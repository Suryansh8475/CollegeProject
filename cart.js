document.addEventListener('DOMContentLoaded', function () {
    // Update cart count in header
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const countElements = document.querySelectorAll('.header__action-btn .count');
        countElements.forEach(element => {
            element.textContent = cart.length;
        });
    }

    // Render cart items
    function renderCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');

        if (!cartItemsContainer || !cartTotal) return;

        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart__item');
            cartItem.innerHTML = `
                <div class="cart__item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart__item-details">
                    <h3>${item.title}</h3>
                    <p>₹${item.price}</p>
                </div>
                <button class="cart__item-remove" onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += parseFloat(item.price);
        });

        cartTotal.textContent = `₹${total.toFixed(2)}`;
    }

    window.removeFromCart = function (index) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    };

    window.addToCart = function (title, price, image) {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const item = {
            title: title,
            price: parseFloat(price.toString().replace(/[^0-9.]/g, "")),
            image: image
        };
        cartItems.push(item);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCartCount();
    };

    // Initial render
    renderCart();
    updateCartCount();
});