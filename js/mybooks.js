document.addEventListener("DOMContentLoaded", function () {
  const bookList = document.getElementById("book-list");
  const userArea = document.querySelector(".user-area span");

  // Get the logged-in user
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    alert("❌ You must be logged in to view your books.");
    window.location.href = "login.html";
    return;
  }

  // Update the user name in the header
  userArea.innerHTML = `Welcome, <strong>${loggedInUser.username}</strong>`;

  // Get all books
  const allBooks = JSON.parse(localStorage.getItem("books")) || [];

  // Filter books that belong to the logged-in user
  const userBooks = allBooks.filter(book => book.owner === loggedInUser.username);

  if (userBooks.length === 0) {
    bookList.innerHTML = "<p>You haven't added any books yet.</p>";
    return;
  }

  // Render user's books
  userBooks.forEach((book) => {
    const div = document.createElement("div");
    div.className = "book-card";
    div.innerHTML = `
      <img src="${book.cover}" alt="Book Cover">
      <div class="book-info">
        <p><strong>Title:</strong> ${book.title}</p>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Status:</strong> ${book.status}</p>
        
      </div>
    `;
    bookList.appendChild(div);
  });
});
