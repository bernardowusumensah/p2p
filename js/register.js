document.getElementById("register-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const messageDiv = document.getElementById("register-message");

  // Clear previous messages
  messageDiv.innerHTML = "";

  if (password !== confirmPassword) {
    messageDiv.innerHTML = `<p class="error">❌ Passwords do not match!</p>`;
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const userExists = users.some((user) => user.username === username);
  if (userExists) {
    messageDiv.innerHTML = `<p class="error">❗ Username already taken!</p>`;
    return;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  messageDiv.innerHTML = `<p class="success">✅ Registration successful! Redirecting to login...</p>`;

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
});
