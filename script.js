document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorEl = document.getElementById("errorMessage");

  errorEl.textContent = "";

  if (!username || !password) {
    errorEl.textContent = "Vui lòng nhập đầy đủ thông tin.";
    return;
  }

  try {
    // Giả lập gọi API thật
    const response = await fetch("https://banhngot.fitlhu.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Đăng nhập thất bại.");

    alert("🎉 Đăng nhập thành công!");
    localStorage.setItem("authToken", data.data.token);
    window.location.href = "dashboard.html";
  } catch (err) {
    errorEl.textContent = err.message;
    console.error("Lỗi đăng nhập:", err);
  }
});
