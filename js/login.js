document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const messageDiv = document.getElementById("login-message");

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    messageDiv.innerHTML = `<p class="success">✅ Login successful! Redirecting...</p>`;
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setTimeout(() => {
      window.location.href = "mybooks.html";
    }, 1000);
  } else {
    messageDiv.innerHTML = `<p class="error">❌ Invalid username or password.</p>`;
  }
});
