document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("offerModal");
  const closeModal = document.getElementById("closeModal");
  const offerForm = document.getElementById("offerForm");

  // Check if the user has already seen or claimed the offer
  const isFirstTimeUser = !localStorage.getItem("discountClaimed");

  if (isFirstTimeUser) {
    // Optional delay before triggering the pop-up (e.g., 1 second)
    setTimeout(() => {
      modal.style.display = "flex";
    }, 1000);
  }

  // Close modal via 'X' button
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal by clicking outside the modal box
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Handle form submission
  offerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("userName").value;
    const email = document.getElementById("userEmail").value;

    // Save flag so pop-up won't show again for this user
    localStorage.setItem("discountClaimed", "true");

    // Close the modal
    // modal.style.display = "none";

    const modalContent = document.querySelector(".modal-content");
    modalContent.innerHTML = `
                <h2>Thank You!</h2>
                <p>Your 10% discount code is: <strong>WELCOME10</strong></p>
                <p>We've sent it to your email as well.</p>
                <button id="continueShopping" style="margin-top: 20px;">Continue Shopping</button>
            `;
    // Add event listener to the new button
    document
      .getElementById("continueShopping")
      .addEventListener("click", function () {
        document.getElementById("offerModal").style.display = "none";
      });
    // Trigger alert confirmation with discount code
    // alert(
    //   `Thank you, ${name}! Your discount code is FIRST20. We've sent details to ${email}.`,
    // );
  });
});
