document.getElementById("addCakeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("cakeName").value.trim();
  const category = document.getElementById("cakeCategory").value.trim();
  const price = Number(document.getElementById("cakePrice").value);
  const image = document.getElementById("cakeImage").value.trim();
  const description = document.getElementById("cakeDescription").value.trim();
  const messageEl = document.getElementById("responseMessage");

  messageEl.textContent = "";
  messageEl.className = "addcake__message";

  const token = localStorage.getItem("authToken");
  if (!token) {
    messageEl.textContent = "⚠️ Bạn chưa đăng nhập!";
    messageEl.classList.add("addcake__message--error");
    return;
  }

  try {
    const res = await fetch("https://banhngot.fitlhu.com/api/cakes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, category, price, image, description }),
    });

    const data = await res.json();

    // Xử lý phản hồi tương tự hình minh họa
    if (res.status === 201) {
      messageEl.textContent = "✅ Tạo bánh thành công!";
      messageEl.classList.add("addcake__message--success");
      e.target.reset();
    } else if (res.status === 400) {
      messageEl.textContent = "❌ Thiếu thông tin hoặc dữ liệu không hợp lệ.";
      messageEl.classList.add("addcake__message--error");
    } else if (res.status === 401) {
      messageEl.textContent = "🔒 Bạn chưa đăng nhập.";
      messageEl.classList.add("addcake__message--error");
    } else {
      messageEl.textContent = "⚠️ Lỗi server. Vui lòng thử lại.";
      messageEl.classList.add("addcake__message--error");
    }

    console.log("Phản hồi API:", data);
  } catch (err) {
    console.error("Lỗi khi tạo bánh:", err);
    messageEl.textContent = "🚫 Không thể kết nối đến server.";
    messageEl.classList.add("addcake__message--error");
  }
});
