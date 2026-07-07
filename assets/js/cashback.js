// =========================
// Cashback
// =========================

const cashbackKeyword = document.getElementById("cashbackKeyword");
const cashbackBtn = document.getElementById("searchCashbackBtn");

const cashbackResult = document.getElementById("cashbackResult");
const cashbackStatus = document.getElementById("cashbackStatus");
const cashbackList = document.getElementById("cashbackList");
const cashbackTotal = document.getElementById("cashbackTotal");


// Không phải trang Cashback thì dừng
if (cashbackKeyword && cashbackBtn) {
    initCashback();
}


// =========================
// Khởi tạo
// =========================
function initCashback() {

    cashbackBtn.addEventListener("click", loadCashback);

    cashbackKeyword.addEventListener("keydown", function (e) {

        if (e.key === "Enter") {
            loadCashback();
        }

    });

}


// =========================
// Loading
// =========================
function loading(state) {

    if (!cashbackBtn) return;

    cashbackBtn.disabled = state;

    cashbackBtn.innerHTML = state
        ? '<span class="spinner"></span> Đang tra cứu...'
        : "TRA CỨU";

}


// =========================
// Tra cứu
// =========================
async function loadCashback() {

    const keyword = cashbackKeyword.value.trim();

    if (!keyword) {

        showToast("Vui lòng nhập ID đơn hàng hoặc SĐT");

        return;

    }

    loading(true);

    try {

        const response = await fetch(API + "/cashback", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                keyword
            })

        });

        if (!response.ok) {

            throw new Error("Không kết nối được máy chủ");

        }

        const json = await response.json();

        console.log("Cashback API:", json);

        if (!json.success) {

            throw new Error(json.error || "Không tìm thấy dữ liệu");

        }

        renderCashback(json);

    }

    catch (e) {

        cashbackResult.style.display = "block";

        cashbackStatus.className = "status error";

        cashbackStatus.innerHTML = "❌ " + e.message;

        cashbackTotal.innerHTML = "0đ";

        cashbackList.innerHTML = "";

    }

    finally {

        loading(false);

    }

}


// =========================
// Hiển thị kết quả
// =========================
function renderCashback(data) {

    cashbackResult.style.display = "block";

    if (!data.orders || data.orders.length === 0) {

        cashbackStatus.className = "status error";

        cashbackStatus.innerHTML = "❌ Không tìm thấy đơn hàng.";

        cashbackTotal.innerHTML = "0đ";

        cashbackList.innerHTML = "";

        return;

    }

    cashbackStatus.className = "status success";

    cashbackStatus.innerHTML =
        `✅ Tìm thấy ${data.orders.length} sản phẩm`;

    const totalCashback = Math.round(
    Number(data.totalCashback || 0)
);

cashbackTotal.innerHTML =
    totalCashback.toLocaleString("vi-VN") + "đ";

    cashbackList.innerHTML = "";

    data.orders.forEach(item => {
const orderTime = item.orderTime
    ? item.orderTime
        .replace("T", " ")
        .replace(".000Z", "")
    : "";
        cashbackList.innerHTML += `

<div class="cashback-item">

    

    <div class="cashback-row">

        <span class="cashback-label">
            Trạng thái
        </span>

        <span class="cashback-value">
            ${item.status}
        </span>

    </div>

    <div class="cashback-row">

        <span class="cashback-label">
            Giá trị đơn
        </span>

        <span class="cashback-value">
            ${Number(item.price).toLocaleString("vi-VN")}đ
        </span>

    </div>

    <div class="cashback-row">

        <span class="cashback-label">
            Tỷ lệ hoàn
        </span>

        <span class="cashback-value">
            ${(Number(item.rate) * 100).toLocaleString("vi-VN")}%
        </span>

    </div>

    <div class="cashback-row">

        <span class="cashback-label">
            Tiền hoàn dự kiến
        </span>

        <span class="cashback-value">
            ${Math.round(Number(item.cashback)).toLocaleString("vi-VN")}đ
        </span>

    </div>

    <div class="cashback-row">

        <span class="cashback-label">
            Thời gian đặt
        </span>

        <span class="cashback-value">
            ${orderTime}
        </span>

    </div>

</div>

`;

    });

}
