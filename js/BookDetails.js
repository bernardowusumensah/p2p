// BookDetails.js

// Utility to get query parameters
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}



document.addEventListener("DOMContentLoaded", function () {
  const bookId = getQueryParam("id");
  const detailsContainer = document.getElementById("book-details");
  const books = JSON.parse(localStorage.getItem("books")) || [];

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    alert("❌ You must be logged in to view your books.");
    window.location.href = "login.html";
    return;
  }



  if (!bookId || !books[bookId]) {
    detailsContainer.innerHTML = "<p>Book not found.</p>";
    return;
  }

  const book = books[bookId];

  detailsContainer.innerHTML = `
    <h2>${book.title}</h2>
    <p><strong>Author:</strong> ${book.author}</p>
    <p><strong>ISBN:</strong> ${book.isbn}</p>
    <p><strong>Genre:</strong> ${book.genre}</p>
    <p><strong>Description:</strong> ${book.description || "No description provided."}</p>
  `;
});
