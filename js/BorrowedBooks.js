document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("borrowed-books");
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser) {
    alert("❌ Please log in first.");
    window.location.href = "login.html";
    return;
  }

  const borrowedBooks = books.filter(book =>
    book.borrower === loggedInUser.username &&
    (book.status === "Borrowed" || book.status === "In Possession")
  );

  if (borrowedBooks.length === 0) {
    container.innerHTML = "<p>😶 You haven't borrowed any books yet.</p>";
    return;
  }

  borrowedBooks.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card";
    
    const receivedDate = book.receivedDate ? new Date(book.receivedDate).toLocaleDateString() : "Not yet received";
    const returnDate = book.returnDate ? new Date(book.returnDate).toLocaleDateString() : "Pending";

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Owner:</strong> ${book.owner}</p>
      <p><strong>Duration:</strong> ${book.duration}</p>
      <p><strong>Status:</strong> ${book.status}</p>
      <p><strong>Received Date:</strong> ${receivedDate}</p>
      <p><strong>Return Date:</strong> ${returnDate}</p>
    `;

    // Show "Mark as Received" only if status is Borrowed
    if (book.status === "Borrowed") {
      const receiveBtn = document.createElement("button");
      receiveBtn.textContent = "📦 Mark as Received";
      receiveBtn.addEventListener("click", () => {
        const today = new Date();
        const duration = book.duration;

        // Calculate return date
        let returnDate = new Date(today);
        if (duration === "1 Week") returnDate.setDate(today.getDate() + 7);
        else if (duration === "2 Weeks") returnDate.setDate(today.getDate() + 14);
        else if (duration === "3 Weeks") returnDate.setDate(today.getDate() + 21);

        book.status = "In Possession";
        book.receivedDate = today.toISOString();
        book.returnDate = returnDate.toISOString();

        // Save and reload
        localStorage.setItem("books", JSON.stringify(books));
        alert(`✅ Book marked as received. Please return by ${returnDate.toDateString()}`);
        location.reload();
      });

      card.appendChild(receiveBtn);
    }

    container.appendChild(card);
  });
});
