const equipments = [
  {
    id: 1,
    name: "Americano",
    description: "Strong and bold coffee with rich flavor.",
    price: 100,
    image: "images/equipment.webp",
  },
  {
    id: 2,
    name: "Cappuccino",
    description: "Espresso mixed with hot water.",
    price: 100,
    image: "images/maker.avif",
  },
  {
    id: 3,
    name: "Espresso",
    description: "Espresso with steamed milk and milk foam.",
    price: 100,
    image: "images/maker.avif",
  },
  {
    id: 4,
    name: "AAA",
    description: "Smooth espresso with steamed milk.",
    price: 100,
    image: "images/maker.avif",
  },
];

// Store selected quantity for each coffee
let quantities = {};

// Shopping cart
let cart = [];

// Initialize quantity
equipments.forEach(function (coffee) {
  quantities[coffee.id] = 1;
});

// Change Quantity on Coffee Card
function changeQuantity(id, amount) {
  quantities[id] += amount;

  // Minimum quantity is 1
  if (quantities[id] < 1) {
    quantities[id] = 1;
  }

  document.getElementById(`quantity-${id}`).textContent = quantities[id];
}

// Add Coffee to Cart
function addToCart(id) {
  const equip = equipments.find(function (item) {
    return item.id === id;
  });

  const selectedQuantity = quantities[id];

  const existingItem = cart.find(function (item) {
    return item.id === id;
  });

  if (existingItem) {
    existingItem.quantity += selectedQuantity;
  } else {
    cart.push({
      id: equip.id,
      name: equip.name,
      price: equip.price,
      image: equip.image,
      quantity: selectedQuantity,
    });
  }

  // Reset card quantity to 1
  quantities[id] = 1;

  updateCartCount();

  // // Refresh cards
  // displayCoffees();

  alert(equip.name + " added to cart!");
}

// Update Cart Count
function updateCartCount() {
  let totalItems = 0;

  cart.forEach(function (item) {
    totalItems += item.quantity;
  });

  document.getElementById("cartCount").textContent = totalItems;
}

// Show Cart
function showCart() {
  document.getElementById("cartModal").style.display = "block";

  displayCart();
}

// Close Cart
function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

// Display Cart
function displayCart() {
  const cartItems = document.getElementById("cartItems");

  const totalPrice = document.getElementById("totalPrice");

  cartItems.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";

    totalPrice.textContent = "0.00";

    return;
  }

  cart.forEach(function (item) {
    const itemTotal = item.price * item.quantity;

    total += itemTotal;

    const div = document.createElement("div");

    div.className = "cart-item";

    div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">

        <div class="cart-item-info">

            <h4>${item.name}</h4>

            <p>
                $${item.price.toFixed(2)}
            </p>

            <div class="cart-quantity">

                <button onclick="changeCartQuantity(${item.id}, -1)">
                    -
                </button>

                <span>${item.quantity}</span>

                <button onclick="changeCartQuantity(${item.id}, 1)">
                    +
                </button>

            </div>

        </div>

        <strong>
            $${itemTotal.toFixed(2)}
        </strong>

        <button
            class="remove-btn"
            onclick="removeFromCart(${item.id})"
        >
            Remove
        </button>
    `;

    cartItems.appendChild(div);
  });

  totalPrice.textContent = total.toFixed(2);
}

// Change Quantity in Cart
function changeCartQuantity(id, amount) {
  const item = cart.find(function (product) {
    return product.id === id;
  });

  if (!item) {
    return;
  }

  item.quantity += amount;

  if (item.quantity <= 0) {
    removeFromCart(id);

    return;
  }

  updateCartCount();

  displayCart();
}

// Remove Item from Cart
function removeFromCart(id) {
  cart = cart.filter(function (item) {
    return item.id !== id;
  });

  updateCartCount();

  displayCart();
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");

    return;
  }

  alert("Thank you for your order!");

  // Clear cart
  cart = [];

  updateCartCount();

  displayCart();

  closeCart();
}

// Close cart when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("cartModal");

  if (event.target === modal) {
    closeCart();
  }
};

// Start Application
// displayEquipments();
