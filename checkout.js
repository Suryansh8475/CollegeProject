document.addEventListener('DOMContentLoaded', function () {
    function renderCheckout() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const checkoutItemsContainer = document.getElementById('checkout-items');
        const checkoutTotal = document.getElementById('checkout-total');

        checkoutItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const checkoutItem = document.createElement('div');
            checkoutItem.classList.add('checkout__item');
            checkoutItem.innerHTML = `
                <div class="checkout__item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="checkout__item-details">
                    <h3>${item.title}</h3>
                    <p>₹${item.price.toFixed(2)}</p>
                </div>
            `;
            checkoutItemsContainer.appendChild(checkoutItem);
            total += item.price;
        });

        checkoutTotal.textContent = `₹${total.toFixed(2)}`;
    }

    window.proceedToPayment = function () {
        const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
        alert(`Proceeding to ${selectedPayment} payment...`);
    };

    renderCheckout();
});