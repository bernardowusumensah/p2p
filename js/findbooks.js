document.addEventListener("DOMContentLoaded", function () {
    const bookList = document.getElementById("book-list");
    const searchInput = document.getElementById("search");
    const genreFilter = document.getElementById("genre-filter");
  
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  
    if (!loggedInUser) {
      alert("❌ Please log in to view and request books.");
      window.location.href = "login.html";
      return;
    }
  
    function getFilteredBooks() {
      const search = searchInput.value.toLowerCase();
      const genre = genreFilter.value;
  
      return books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(search) ||
                              book.author.toLowerCase().includes(search);
        const matchesGenre = genre === "" || book.genre === genre;
  
        return (
          book.status === "Available" &&
          book.owner !== loggedInUser.username &&
          matchesSearch &&
          matchesGenre
        );
      });
    }
  
    function renderBooks(filteredBooks) {
      bookList.innerHTML = "";
  
      if (filteredBooks.length === 0) {
        bookList.innerHTML = "<p>No books match your search.</p>";
        return;
      }
  
      filteredBooks.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML = `
          <img src="${book.cover}" alt="${book.title}" class="book-cover" />
          <h3>${book.title}</h3>
          <p><strong>Author:</strong> ${book.author}</p>
          <p><strong>Genre:</strong> ${book.genre}</p>
          <p>${book.description}</p>
        `;
  
        // Create dropdown for duration
        const durationSelect = document.createElement("select");
        durationSelect.innerHTML = `
          <option value="">-- Select Duration --</option>
          <option value="1 Week">1 Week</option>
          <option value="2 Weeks">2 Weeks</option>
          <option value="3 Weeks">3 Weeks</option>
        `;
        durationSelect.style.marginTop = "10px";
        durationSelect.style.width = "100%";
        durationSelect.style.padding = "5px";
  
        // Request Button
        const requestBtn = document.createElement("button");
        requestBtn.textContent = "📨 Request Book";
        requestBtn.style.marginTop = "10px";
  
        requestBtn.addEventListener("click", () => {
          const duration = durationSelect.value;
  
          if (!duration) {
            alert("⏳ Please select a duration.");
            return;
          }
  
          const books = JSON.parse(localStorage.getItem("books")) || [];
          const bookIndex = books.findIndex(b => b.id === book.id);
  
          if (bookIndex === -1 || books[bookIndex].status !== "Available") {
            alert("❌ This book is no longer available.");
            return;
          }
  
          books[bookIndex].status = "Requested";
          books[bookIndex].requester = loggedInUser.username;
          books[bookIndex].requestDuration = duration;
  
          localStorage.setItem("books", JSON.stringify(books));
          alert("✅ Book request sent! Waiting for owner approval.");
          renderBooks(getFilteredBooks());
        });
  
        card.appendChild(durationSelect);
        card.appendChild(requestBtn);
        bookList.appendChild(card);
      });
    }
  
    searchInput.addEventListener("input", () => renderBooks(getFilteredBooks()));
    genreFilter.addEventListener("change", () => renderBooks(getFilteredBooks()));
  
    renderBooks(getFilteredBooks());
  });
  