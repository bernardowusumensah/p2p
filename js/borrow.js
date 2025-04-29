document.addEventListener("DOMContentLoaded", function () {
  const bookSelect = document.getElementById("book-id");
  const books = JSON.parse(localStorage.getItem("books")) || [];

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser) {
    alert("❌ Please log in first.");
    window.location.href = "login.html";
    return;
  }

  const availableBooks = books.filter(book => 
    book.status === "Available" && book.owner !== loggedInUser.username
  );

  availableBooks.forEach(book => {
    const option = document.createElement("option");
    option.value = book.id;
    option.textContent = `${book.title} (ID: ${book.id})`;
    bookSelect.appendChild(option);
  });

  document.getElementById("borrow-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const bookId = parseInt(document.getElementById("book-id").value);
    const duration = document.getElementById("duration").value;

    const books = JSON.parse(localStorage.getItem("books")) || [];
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
      alert("Book not found!");
      return;
    }

    if (books[bookIndex].status !== "Available") {
      alert("Book is no longer available.");
      return;
    }

    // ❗Request instead of immediate borrow
    books[bookIndex].status = "Requested";
    books[bookIndex].requester = loggedInUser.username;
    books[bookIndex].requestDuration = duration;

    localStorage.setItem("books", JSON.stringify(books));
    displayMessage("✅ Borrow request submitted. Redirecting...", "success");

    setTimeout(() => {
      window.location.href = "./mybooks.html";
    }, 1500);
  


    function displayMessage(message, type) {
      const messageDiv = document.getElementById("message");
      messageDiv.innerHTML = `<p class="${type}">${message}</p>`;
    }
  });
});
