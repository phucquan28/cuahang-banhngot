let currentPage = 1;
const limit = 10;

async function loadCakes(category = "") {
  const token = localStorage.getItem("authToken");
  const cakesList = document.getElementById("cakesList");
  const pageInfo = document.getElementById("pageInfo");

  cakesList.innerHTML = "<p>⏳ Đang tải dữ liệu...</p>";

  try {
    const res = await fetch(
      `https://banhngot.fitlhu.com/api/cakes?page=${currentPage}&limit=${limit}&category=${category}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!data.success) throw new Error("Không thể tải danh sách bánh.");

    const cakes = data.data;
    const pagination = data.pagination;

    cakesList.innerHTML = "";

    if (cakes.length === 0) {
      cakesList.innerHTML = "<p>❌ Không có bánh nào được tìm thấy.</p>";
      return;
    }

    cakes.forEach((cake) => {
      const card = document.createElement("div");
      card.classList.add("cake-card");

      card.innerHTML = `
        <img src="${cake.image || "https://via.placeholder.com/250"}" class="cake-card__img" alt="${cake.name}">
        <h3 class="cake-card__name">${cake.name}</h3>
        <p class="cake-card__category">📂 ${cake.category}</p>
        <p class="cake-card__price">💰 ${cake.price.toLocaleString()} VNĐ</p>
        <p class="cake-card__desc">${cake.description}</p>
        <p class="cake-card__creator">👤 ${cake.creator_name} (${cake.creator_email})</p>
      `;
      cakesList.appendChild(card);
    });

    pageInfo.textContent = `Trang ${pagination.page} / ${pagination.totalPages}`;
  } catch (err) {
    cakesList.innerHTML = `<p style="color:red;">🚫 Lỗi: ${err.message}</p>`;
    console.error(err);
  }
}

// ====== SỰ KIỆN LỌC ======
document.getElementById("filterBtn").addEventListener("click", () => {
  const category = document.getElementById("categoryFilter").value.trim();
  currentPage = 1;
  loadCakes(category);
});

// ====== PHÂN TRANG ======
document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadCakes(document.getElementById("categoryFilter").value.trim());
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  currentPage++;
  loadCakes(document.getElementById("categoryFilter").value.trim());
});

// ====== TẢI LẦN ĐẦU ======
loadCakes();
