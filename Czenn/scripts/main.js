// Data produk (sebagai contoh)
const products = {
    lightstick: {
        name: "Lightstick NCT 127 V2",
        price: 600000,
        image: "assets/images/LS NCT.png"
    },
    album: {
        name: "Album Taeyong - TAP",
        price: 300000,
        image: "assets/images/album.png"
    },
    keyring: {
        name: "Starfish Keyring NCT 127",
        price: 200000,
        image: "assets/images/doll.png"
    },
    sumbu: {
        name: "CRAFT Sumbu Lilin",
        price: 128,
        image: "assets/images/sumbu.webp"
    },
    amplop: {
        name: "CRAFT Amplop Vintage",
        price: 284,
        image: "assets/images/amplop.webp"
    },
    holder: {
        name: "CRAFT Holder Sumbu Lilin",
        price: 300,
        image: "assets/images/sumbu.webp"
    },
    kaki: {
        name: "Kaos Kaki",
        price: 128,
        image: "assets/images/kaos kaki.webp"
    },
    random: {
        name: "LUCKY RANDOM BOX",
        price: 65000,
        image: "assets/images/random box.webp"
    },
    shredded: {
        name: "CRAFT SHREDDED PAPPER",
        price: 1000,
        image: "assets/images/shredded.webp"
    }
};




// Mendapatkan parameter dari URL
function getProductFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("product");
}

// Menampilkan detail produk di halaman detail
function displayProductDetail() {
    const productId = getProductFromUrl();
    const product = products[productId];

    if (product) {
        document.getElementById("product-name").textContent = product.name;
        document.getElementById("product-price").textContent = `IDR ${product.price.toLocaleString()}`;
        document.getElementById("product-image").src = product.image;
    }
}

// Function untuk menambahkan produk ke cart
function addToCart(productName, price, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists in cart
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ name: productName, price: price, quantity: quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}

document.addEventListener('DOMContentLoaded', function() {
    displayProductDetail();

    const addToCartButton = document.getElementById("add-to-cart");
    addToCartButton.addEventListener("click", function() {
        const productId = getProductFromUrl();
        const product = products[productId];
        const quantity = parseInt(document.getElementById("quantity").value);

        if (product && quantity > 0) {
            addToCart(product.name, product.price, quantity);
        }
    });
});

// Function to display cart items on the invoice page
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');
    let total = 0;

    cartItemsContainer.innerHTML = ""; // Clear the container

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>IDR ${item.price.toLocaleString()}</td>
            <td>IDR ${itemTotal.toLocaleString()}</td>
            <td><button class="remove-item" data-index="${index}">Remove</button></td>
        `;
        cartItemsContainer.appendChild(row);
    });

    totalPriceContainer.textContent = `IDR ${total.toLocaleString()}`;

    // Add event listeners to remove buttons
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const index = parseInt(this.dataset.index);
            removeFromCart(index);
        });
    });
}

// Function to remove an item from the cart
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // Refresh the cart display
}

// Initialize the invoice page
if (document.body.contains(document.getElementById('cart-items'))) {
    displayCart();
}

// Simulated user data (for demonstration purposes)
const users = [
    { email: "user1@gmail.com", password: "password123" },
    { email: "user2@gmail.com", password: "securepass" }
];

// Handle login form submission
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form input values
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Validate input
    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    // Check credentials
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        alert("Login successful!");
        // Redirect to home or dashboard
        window.location.href = "index.html";
    } else {
        alert("Invalid email or password. Please try again.");
    }
});
