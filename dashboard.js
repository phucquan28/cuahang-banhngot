document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("authToken");
  
    // Nếu không có token => quay lại trang đăng nhập
    if (!token) {
      window.location.href = "index.html";
      return;
    }
  
    try {
      const response = await fetch("https://banhngot.fitlhu.com/api/auth/profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error("Không thể lấy thông tin người dùng. Hãy đăng nhập lại.");
      }
  
      const data = await response.json();
  
      if (data.success && data.data) {
        const user = data.data;
        document.getElementById("userId").textContent = user.id;
        document.getElementById("username").textContent = user.username;
        document.getElementById("fullName").textContent = user.full_name;
        document.getElementById("email").textContent = user.email;
        
        document.getElementById("avatar").src = user.avatar || "https://via.placeholder.com/120";
      } else {
        throw new Error(data.message || "Lỗi không xác định khi lấy thông tin.");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert(error.message);
      localStorage.clear();
      window.location.href = "index.html";
    }
  
    // Xử lý nút đăng xuất
    document.getElementById("logoutBtn").addEventListener("click", function () {
      localStorage.clear();
      window.location.href = "index.html";
    });
  });
  