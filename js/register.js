// ========================================
// EVENT REGISTRATION
// ========================================

// Open registration popup
function registerEvent() {
  openModal("authModal");
}

// ========================================
// MODAL FUNCTIONS
// ========================================

function openModal(id) {
  document.getElementById(id).classList.remove("hidden");
}

function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
}

// ========================================
// SAVE REGISTERED USER
// ========================================

document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    // Prevent page refresh
    event.preventDefault();

    // Get form values
    const name = document.getElementById("registerName").value.trim();

    const email = document
      .getElementById("registerEmail")
      .value.trim()
      .toLowerCase();

    const password = document.getElementById("registerPassword").value;

    const message = document.getElementById("registerMessage");

    // ========================================
    // GET EXISTING USERS FROM LOCAL STORAGE
    // ========================================

    let users = JSON.parse(localStorage.getItem("registerUsers")) || [];

    // ========================================
    // CHECK IF EMAIL ALREADY EXISTS
    // ========================================

    const existingUser = users.find(function (user) {
      return user.email === email;
    });

    if (existingUser) {
      message.textContent = "This email is already registered.";
      return;
    }

    // ========================================
    // CREATE NEW USER
    // ========================================

    const newUser = {
      name: name,
      email: email,
      password: password,
    };

    // Add user to array
    users.push(newUser);

    // ========================================
    // SAVE USERS TO LOCAL STORAGE
    // ========================================

    localStorage.setItem("registerUsers", JSON.stringify(users));

    // ========================================
    // SUCCESS MESSAGE
    // ========================================

    message.textContent = "Registration successful!";

    console.log("Registered Users:", users);

    // Reset form
    document.getElementById("registerForm").reset();

    // Close popup after a short delay
    setTimeout(function () {
      closeModal("authModal");
      message.textContent = "";
    }, 1000);
  });
