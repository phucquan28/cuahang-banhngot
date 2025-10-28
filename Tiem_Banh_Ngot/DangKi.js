document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const errorEl = document.getElementById("errorMessage");

  errorEl.textContent = "";

  if (!username || !fullName || !email || !password || !confirmPassword) {
    errorEl.textContent = "Vui lòng nhập đầy đủ thông tin.";
    return;
  }

  if (password !== confirmPassword) {
    errorEl.textContent = "Mật khẩu xác nhận không khớp.";
    return;
  }

  try {
    // Giả lập API thật
    const response = await fetch("https://banhngot.fitlhu.com/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        full_name: fullName,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Đăng ký thất bại.");

    alert("🎉 Đăng ký thành công! Hãy đăng nhập để tiếp tục.");
    window.location.href = "index.html";
  } catch (err) {
    errorEl.textContent = err.message;
    console.error("Lỗi đăng ký:", err);
  }
});
