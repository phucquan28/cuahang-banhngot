<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", async () => {
  // ====== KIỂM TRA ĐĂNG NHẬP ======
  const token = localStorage.getItem("authToken");
  if (!token) {
    alert("Bạn chưa đăng nhập!");
    window.location.href = "index.html";
    return;
  }

  // ====== LẤY THÔNG TIN NGƯỜI DÙNG ======
  try {
    const res = await fetch("https://banhngot.fitlhu.com/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    if (!res.ok || !data.success)
      throw new Error("Không thể tải thông tin người dùng.");

    const user = data.data;
    document.getElementById("userId").textContent = user.id;
    document.getElementById("userFullName").textContent = user.full_name;
    document.getElementById("userEmail").textContent = user.email;
    document.getElementById("userAvatar").src =
      user.avatar || "https://via.placeholder.com/100";
  } catch (err) {
    console.error("Lỗi:", err);
    alert("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.");
    localStorage.clear();
    window.location.href = "index.html";
  }

  // ====== ĐĂNG XUẤT ======
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });

  // ====== HIỆU ỨNG ACTIVE MENU ======
  const menuItems = document.querySelectorAll(".menu__item");
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      menuItems.forEach((i) => i.classList.remove("menu__item--active"));
      item.classList.add("menu__item--active");
    });
  });

  // ====== CÁC BIẾN TRUY CẬP MỤC MENU ======
  const addBtn = document.querySelector(".menu__item--add");
  const listBtn = document.querySelector(".menu__item--list");
  const updateBtn = document.querySelector(".menu__item--update");
  const deleteBtn = document.querySelector(".menu__item--delete");
  const categoriesBtn = document.querySelector(".menu__item--categories");
  const searchBtn = document.querySelector(".menu__item--search");

  // ====== CHUYỂN HƯỚNG TỚI TRANG TƯƠNG ỨNG ======

// --- Thêm bánh ngọt ---
if (addBtn) {
  addBtn.addEventListener("click", () => {
    window.location.href = "/GoiAPI/ThemBanh/ThemBanhMoi.html";
  });
}

// --- Xem danh sách bánh ---
if (listBtn) {
  listBtn.addEventListener("click", () => {
    window.location.href = "/GoiAPI/XemDanhSach/XemBanh.html";
  });
}

// --- Cập nhật bánh ---
if (updateBtn) {
  updateBtn.addEventListener("click", () => {
    window.location.href = "/GoiAPI/CapNhatBanh/CapNhatBanh.html";
  });
}

// --- Xóa bánh ---
if (deleteBtn) {
  deleteBtn.addEventListener("click", () => {
    window.location.href = "/GoiAPI/XoaBanh/XoaBanh.html";
  });
}

// --- Danh mục bánh ---
if (categoriesBtn) {
  categoriesBtn.addEventListener("click", () => {
    window.location.href = "/GoiAPI/DanhMucBanh/DanhMucBanh.html";
  });
}

// --- Tìm kiếm bánh ---
if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    window.location.href = "/GoiAPI/TimKiemBanh/TimKiemBanh.html";
  });
}

});
=======
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
  
>>>>>>> 13dcc329366462087e62e6a0d33cca1609742fd4
