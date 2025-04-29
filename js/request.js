document.addEventListener("DOMContentLoaded", function () {
  const list = document.getElementById("incoming-requests-list");
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser) {
    displayMessage("❌ Please log in first.", "error");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
    return;
  }

  const incomingRequests = books.filter(
    (book) =>
      book.status === "Requested" &&
      book.owner === loggedInUser.username &&
      book.requester
  );

  if (incomingRequests.length === 0) {
    list.innerHTML = "<p>No one has requested your books yet.</p>";
    return;
  }

  incomingRequests.forEach((book) => {
    const li = document.createElement("li");
    li.className = "request-item";
    li.innerHTML = `
      <strong>📘 ${book.title}</strong><br />
      Requested by: <em>${book.requester}</em><br />
      Duration: <strong>${book.requestDuration}</strong><br />
    `;

    const approveBtn = document.createElement("button");
    approveBtn.textContent = "✅ Approve";
    approveBtn.className = "approve-btn";
    approveBtn.addEventListener("click", () => {
      book.status = "Borrowed";
      book.borrower = book.requester;
      book.duration = book.requestDuration;

      delete book.requester;
      delete book.requestDuration;

      localStorage.setItem("books", JSON.stringify(books));
      displayMessage(`✅ You approved the request for "${book.title}".`, "success");
      setTimeout(() => location.reload(), 1500);
    });

    const rejectBtn = document.createElement("button");
    rejectBtn.textContent = "❌ Reject";
    rejectBtn.className = "reject-btn";
    rejectBtn.addEventListener("click", () => {
      book.status = "Available";
      delete book.requester;
      delete book.requestDuration;

      localStorage.setItem("books", JSON.stringify(books));
      displayMessage(`❌ You rejected the request for "${book.title}".`, "error");
      setTimeout(() => location.reload(), 1500);
    });

    li.appendChild(approveBtn);
    li.appendChild(rejectBtn);
    list.appendChild(li);
  });

  function displayMessage(message, type) {
    const msgDiv = document.getElementById("message");
    msgDiv.innerHTML = `<p class="${type}">${message}</p>`;
  }
});
