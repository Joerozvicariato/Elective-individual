let cart = [];

// Cart functionality
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const checkoutButton = document.getElementById('checkout-btn');
const checkoutMessage = document.getElementById('checkout-message');

// Add event listeners to all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));

        // Check if the item is already in the cart
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            // If it exists, increase the quantity
            existingItem.quantity += 1;
        } else {
            // If it doesn't exist, add it to the cart with quantity 1
            cart.push({ name, price, quantity: 1 });
        }
        updateCart();
    });
});

// Function to update the cart display
function updateCart() {
    if (cartItemsContainer) { // Check if cartItemsContainer exists
        // Clear the current cart items
        cartItemsContainer.innerHTML = '';

        // Calculate total price
        let total = 0;

        // Display each item in the cart
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${item.name} - $${item.price.toFixed(2)} (x${item.quantity})`;
            
            // Create a remove button for each item
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                removeFromCart(item.name);
            });
            
            itemElement.appendChild(removeButton);
            cartItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity; // Update total price based on quantity
        });

        // Update total price
        totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;

        // Enable or disable the checkout button based on cart contents
        checkoutButton.disabled = cart.length === 0;
    }
}

// Function to remove an item from the cart
function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName); // Remove item from cart
    updateCart(); // Update the cart display
}

// Checkout button functionality
if (checkoutButton) { // Check if checkoutButton exists
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        // Confirmation message
        const confirmation = confirm("Are you sure you want to purchase this item?");
        if (confirmation) {
            const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            checkoutMessage.textContent = `Thank you for your purchase! Your product has been sent to the supplier. Please wait for delivery confirmation. Total amount: $${totalAmount.toFixed(2)}`;
            cart = []; // Clear the cart after checkout
            updateCart(); // Update the cart display
        } else {
            // User canceled the checkout
            checkoutMessage.textContent = "Checkout canceled.";
        }
    });
}

// Contact form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) { // Check if the contact form exists
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the values from the form fields
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Display a thank-you message
        document.getElementById('responseMessage').innerText = `Thank you, ${name}! Your message has been sent.`;

        // Reset the form fields
        contactForm.reset();
    });
}