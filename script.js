// Menu toggle functionality
const menu = document.querySelector(".navbar");

document.querySelector(".menu-icon").addEventListener("click", () => {
    // Toggle the 'show' class on the menu when the menu icon is clicked
    menu.classList.toggle("show");
    document.querySelector(".menu-icon").classList.toggle("active");
    document.querySelector(".menu-icon").classList.toggle("fa-xmark");
});

// Cart functionality
const cart = [];
const cartTab = document.querySelector(".cartTab");
const listCart = document.querySelector(".listCart");
const cartCount = document.querySelector(".cart-count");
const cartTotal = document.querySelector("#cartTotal");
const cartIcon = document.querySelector(".carts");

// Toggle cart visibility
cartIcon.addEventListener("click", () => {
    cartTab.classList.toggle("show");
});

// Close cart
document.querySelector(".cartTab .close").addEventListener("click", () => {
    cartTab.classList.remove("show");
});

// Add to cart functionality
document.querySelectorAll(".btn-cart").forEach((button) => {
    button.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        const name = this.getAttribute("data-name");
        const price = parseFloat(this.getAttribute("data-price"));
        const image = this.getAttribute("data-image");

        // Check if item already exists in cart
        const existingItem = cart.find((item) => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id,
                name,
                price,
                image,
                quantity: 1,
            });
        }

        updateCart();
        cartTab.classList.add("show");

        // Show added animation
        this.textContent = "Added!";
        setTimeout(() => {
            this.textContent = "Add to Cart";
        }, 1000);
    });
});

// Update cart display
function updateCart() {
    listCart.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach((item) => {
        total += item.price * item.quantity;
        count += item.quantity;
        
        const pesoSign = "₱";
        const priceWithPeso = pesoSign + item.price.toLocaleString();

        const cartItem = document.createElement("div");
        cartItem.className = "cartItem";
        cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="itemInfo">
                        <div class="itemName">${item.name}</div>
                        <div class="itemPrice">${priceWithPeso}</div>
                        <div class="quantity">
                            <button class="decrease" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="increase" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <button class="remove" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
                `;

        listCart.appendChild(cartItem);
    });

    cartTotal.textContent = total.toLocaleString();
    cartCount.textContent = count;

    // Add event listeners to quantity buttons
    document.querySelectorAll(".increase").forEach((button) => {
        button.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
            const item = cart.find((item) => item.id === id);
            if (item) {
                item.quantity += 1;
                updateCart();
            }
        });
    });

    document.querySelectorAll(".decrease").forEach((button) => {
        button.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
            const item = cart.find((item) => item.id === id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                updateCart();
            }
        });
    });

    document.querySelectorAll(".remove").forEach((button) => {
        button.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
            const index = cart.findIndex((item) => item.id === id);
            if (index !== -1) {
                cart.splice(index, 1);
                updateCart();
            }
        });
    });
}

// Checkout button
document.querySelector(".checkOut").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Checkout functionality would go here!");
        // In a real application, you would redirect to a checkout page
        // window.location.href = 'checkout.html';
    }
});
