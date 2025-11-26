<<<<<<< HEAD
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
=======
document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
  
    const errorEl = document.getElementById("errorMessage");
    errorEl.textContent = "";
  
    try {
      const response = await fetch("https://banhngot.fitlhu.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });
  
      if (!response.ok) {
        // Nếu response status khác 2xx
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Sai tên đăng nhập hoặc mật khẩu.");
      }
  
      const data = await response.json();
      if (data.success && data.data && data.data.token) {
        const token = data.data.token;
        localStorage.setItem("authToken", token);
        localStorage.setItem("username", data.data.username);
        localStorage.setItem("fullName", data.data.full_name);
        localStorage.setItem("email", data.data.email);
        localStorage.setItem("avatar", data.data.avatar);
        // Chuyển sang dashboard
        window.location.href = "dashboard.html";
      } else {
        throw new Error(data.message || "Đăng nhập thất bại, không có token.");
      }
    } catch (error) {
      errorEl.textContent = error.message;
      console.error("Lỗi đăng nhập:", error);
    }
  });
  
>>>>>>> 13dcc329366462087e62e6a0d33cca1609742fd4
