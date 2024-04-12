document.addEventListener("DOMContentLoaded", () => {
  setNotifications();

  //Search for books based on title
  const searchBar = document.querySelector(".search-bar");

  searchBar.addEventListener("input", function() {
    performSearch(this.value.trim().toLowerCase());
  });

  //Display the favourites popup when user clicks on the heart icon
  //Open cart page when user clicks on cart icon
  const heartButton = document.querySelector(".heart-button");
  const cartButton = document.querySelector(".cart-button");
  if (heartButton && cartButton) {
    heartButton.addEventListener("click", () => {
      toggleFavouritesPopup();
    });

    cartButton.addEventListener("click", () => {
      window.location.href = "cart.html";
    });
  }

  //Go back to main page when logo is clicked
  const logo = document.querySelector("#logo");
  if (logo) {
    logo.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
});

//Search for books and display results based on input
function performSearch(searchText) {
  let resultContainer = document.getElementById("searchResultsMain");  
   resultContainer.innerHTML = ""; 

  if (searchText !== "") {
    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchText));
    
    if (filteredBooks.length > 0) {
      resultContainer.style.display = "block"; 
      filteredBooks.forEach(book => {
        const bookElement = document.createElement("div");
        bookElement.className = "search-book";
        bookElement.innerHTML = `
          <img src="${book.image}" alt="${book.title}" class="search-book-image">
          <p class="search-title-text">${book.title}</p>
          <p class="search-author-text">${book.author}</p>
        `;
        resultContainer.appendChild(bookElement);
      });
    } 
    else {
      resultContainer.innerHTML = "<div class='no-result-message'>No results found</div>";
      resultContainer.style.display = "block"; 
    }
  } 
  else {
    resultContainer.style.display = "none"; 
  }
}

//Set notifications for favourites and cart when page is loaded
function setNotifications() {
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateNotification(".heart-button .notification", favourites.length);
  updateNotification(".cart-button .notification", cart.length);
}

//Update the cart and favourites notification with the amount of favourites and borrows
function updateNotification(selector, count) {
  const notification = document.querySelector(selector);
  notification.textContent = count;
  notification.style.display = count > 0 ? "block" : "none";
}