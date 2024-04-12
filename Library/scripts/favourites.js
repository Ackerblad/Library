//Display favourites in the popup
function displayFavourites() {
  const favouritesContainer = document.querySelector(".favourites-container");
  const favouritesId = JSON.parse(localStorage.getItem("favourites")) || [];
  favouritesContainer.innerHTML = "";

  if (favouritesId.length == 0) {
    favouritesContainer.innerHTML = '<p id="empty-favourites-message">No favourite books yet</p>';
    return;
  }

  const favouriteBooks = books.filter(book => favouritesId.includes(book.bookId));

  favouriteBooks.forEach(book => {
    const div = document.createElement("div");
    div.className = "favourite-book";
    div.innerHTML = `
      <img src="${book.image}" class="book-image">
      <div class="favourite-book-details">
        <p class="book-title" title="${book.title}">${book.title}</p>
        <p class="book-author">${book.author}</p>
        <button class="remove-favourite-button" onclick="removeFromFavourites(${book.bookId})">
          <img class="favourite-icon" src="icons/heart-icon-red.png">
        </button>
      </div>
    `;
    favouritesContainer.appendChild(div);
  });
}

//Remove book from favourites and refresh list
function removeFromFavourites(bookId) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  favourites = favourites.filter(id => id !== bookId);
  localStorage.setItem("favourites", JSON.stringify(favourites));
  displayFavourites();
  updateNotification(".heart-button .notification", favourites.length);
}

//Toggle favourites popup visibility
function toggleFavouritesPopup() {
  const popup = document.getElementById("favouritesPopup");
  popup.classList.toggle("active");
  if (popup.classList.contains("active")) {
    displayFavourites();
  }
}