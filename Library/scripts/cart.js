document.addEventListener("DOMContentLoaded", () => {
  displayCartItems();

  //Display message and clear the cart when user clicks checkout
  document.getElementById("checkoutButton").addEventListener("click", function() {
  alert("Your order has been sent!"); 
  localStorage.removeItem("cart"); 
  displayCartItems(); 
}); 
});

//Display books in the cart
function displayCartItems() {
  const cartContainer = document.querySelector(".cart-container");
  const cartItemIds = JSON.parse(localStorage.getItem("cart")) || [];
  cartContainer.innerHTML = "";

  if (cartItemIds.length === 0) {
      cartContainer.innerHTML = '<p id="empty-cart-message">Your cart is empty</p>';
      return;
  }

  const cartBooks = books.filter(book => cartItemIds.includes(book.bookId));

  cartBooks.forEach(book => {
      const div = document.createElement("div");
      div.className = "cart-book";
      div.innerHTML = `
        <img src="${book.image}">
        <div class="book-details">
            <p class="book-title" title="${book.title}">${book.title}</p>
            <p class="book-author">${book.author}</p>
            <button class="remove-button" onclick="removeFromCart(${book.bookId})">
                <img class="trash-bin-icon" src="icons/trash-bin-icon.png">
            </button>
        </div>
      `;
      cartContainer.appendChild(div);
  });
}

//Remove a book from the cart by its ID
function removeFromCart(bookId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(id => id !== bookId); 
  localStorage.setItem("cart", JSON.stringify(cart)); 
  displayCartItems(); 
  updateNotification(".cart-button .notification", cart.length);
}