document.addEventListener("DOMContentLoaded", function () {
  // Clear session data
  localStorage.removeItem("loggedInUser");

  // Display logout message using DOM
  const messageBox = document.getElementById("message");
  messageBox.innerHTML = `<p class="info">✅ You’ve been logged out. Redirecting to login...</p>`;

  // Redirect after delay
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
});
