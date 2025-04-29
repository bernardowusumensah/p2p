document.getElementById("book-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get logged-in user
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    alert("❌ You must be logged in to add a book.");
    window.location.href = "login.html";
    return;
  }

  // Create book object
  const book = {
    id: Date.now(),
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    isbn: document.getElementById("isbn").value,
    genre: document.getElementById("genre").value,
    description: document.getElementById("description").value,
    cover: document.getElementById("cover").value || "https://via.placeholder.com/150x200?text=No+Cover",
    status: "Available",
    owner: loggedInUser.username // ✅ Track which user added the book
  };

  // Store in localStorage
  const books = JSON.parse(localStorage.getItem("books")) || [];
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));

  // alert("✅ Book added successfully!");
  // window.location.href = "mybooks.html";

  displayMessage("✅ Book added successfully! Redirecting...", "success");
  setTimeout(() => {
    window.location.href = "mybooks.html";
  }, 1500);


});

function displayMessage(message, type) {
  const previewDiv = document.getElementById("cover-preview");
  previewDiv.innerHTML = `<p class="${type}">${message}</p>`;
}


  

