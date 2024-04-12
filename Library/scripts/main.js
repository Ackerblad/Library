document.addEventListener("DOMContentLoaded", () => {
  displayBooks();
  setHeartIcons();

  //Handle click for favourite and borrow buttons
  document.querySelectorAll(".favourite-button").forEach(button => {
    button.addEventListener("click", function() {
      const bookId = parseInt(this.getAttribute("data-book-id"));
      updateFavourite(bookId);
      updateHeartIcon(this);
    });
  });

  document.querySelectorAll(".borrow-button").forEach(button => {
    button.addEventListener("click", function() {
      const bookId = parseInt(this.getAttribute("data-book-id"));
      addToCart(bookId);
    });
  });
});

//Display all book objects in the main section
function displayBooks() {
  const mainSection = document.querySelector(".main");
  mainSection.innerHTML = "";

  books.forEach(book => {
    const bookElement = document.createElement("div");
    bookElement.className = "book";
    bookElement.innerHTML = `
      <img src ="${book.image}">
      <p class="title-text" title="${book.title}">${book.title}</p>
      <p class="author-text">${book.author}</p>
      <div class="button-container">
        <button class ="favourite-button" data-book-id="${book.bookId}"> <img class="favourite-icon" src="icons/heart-icon.png"></button>
        <button class="borrow-button" data-book-id="${book.bookId}"> <img class="borrow-icon" src="icons/shopping-bag-icon.png"></button>
      </div>
    `;
    mainSection.appendChild(bookElement);
  });
}

//Set heart icon to red if the book is saved as favourite in local storage
function setHeartIcons() {
  const favouriteButtons = document.querySelectorAll(".favourite-button");
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  
  favouriteButtons.forEach(button => {
    const bookId = parseInt(button.getAttribute("data-book-id"));
    const icon = button.querySelector(".favourite-icon");
    if (favourites.includes(bookId)) {
      icon.setAttribute("src", "icons/heart-icon-red.png");
    } 
    else {
      icon.setAttribute("src", "icons/heart-icon.png");
    }
  });
}

//Change the heart icon when user adds or removes a favourite
function updateHeartIcon(button) {
  const icon = button.querySelector(".favourite-icon");
  const bookId = parseInt(button.getAttribute("data-book-id"));
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  const isFavourite = favourites.includes(bookId);
  icon.setAttribute("src", isFavourite ? "icons/heart-icon-red.png" : "icons/heart-icon.png");
}

//Add or remove a book from favourites and update the favourites notification 
function updateFavourite(bookId) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  if (favourites.includes(bookId)) {
    favourites = favourites.filter(id => id !== bookId);
  } else {
    favourites.push(bookId);
  }
  localStorage.setItem("favourites", JSON.stringify(favourites));
  updateNotification(".heart-button .notification", favourites.length);
}

//Add a book to the cart and update the cart notification
function addToCart(bookId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart.includes(bookId)) {
    cart.push(bookId);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateNotification(".cart-button .notification", cart.length);
}