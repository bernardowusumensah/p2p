document.getElementById("borrow-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const bookId = parseInt(document.getElementById("book-id").value);
  const borrowerName = document.getElementById("borrower-name").value;
  const duration = document.getElementById("duration").value;

  const books = JSON.parse(localStorage.getItem("books")) || [];

  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex === -1) {
    alert("Book not found. Please check the ID.");
    return;
  }

  if (books[bookIndex].status === "Borrowed") {
    alert("Sorry, this book is already borrowed.");
    return;
  }

  books[bookIndex].status = "Borrowed";
  books[bookIndex].borrowedBy = borrowerName;
  books[bookIndex].duration = duration;

  localStorage.setItem("books", JSON.stringify(books));
  alert("Borrow request successful!");
  this.reset();
});
