# Portfolio — Nguyễn Thị Ngọc Hân · Event Executive

Trang portfolio song ngữ **Tiếng Việt / English**, viết bằng HTML + CSS thuần.
Không cần cài đặt gì, không cần build — mở file lên sửa là xong.

```
index.html                     ← trang chủ (giới thiệu, kinh nghiệm, dự án, kỹ năng, liên hệ)
projects/                      ← 10 trang chi tiết sự kiện
assets/
  css/style.css                ← TOÀN BỘ giao diện nằm ở đây
  js/main.js                   ← chuyển ngôn ngữ, hiệu ứng cuộn, phóng to ảnh
  img/portrait.jpg             ← ảnh chân dung
  img/events/<tên-sự-kiện>/    ← ảnh của từng sự kiện
  CV_Nguyen_Thi_Ngoc_Han.pdf   ← CV cho nhà tuyển dụng tải về
.nojekyll                      ← cần thiết cho GitHub Pages, đừng xoá
```

---

## 1. Đưa trang lên mạng (làm một lần, khoảng 5 phút)

1. Tạo tài khoản GitHub (nếu chưa có), ví dụ tên `ngochan`.
2. Tạo một repository **public** tên là `<tên-tài-khoản>.github.io`
   (ví dụ: `ngochan.github.io`).
3. Tải toàn bộ file trong thư mục này lên repo đó:
   - Cách dễ nhất: bấm **Add file → Upload files**, kéo thả tất cả vào, rồi **Commit changes**.
   - Nhớ kéo cả thư mục `assets` và `projects`.
4. Vào **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**.
5. Đợi 1–2 phút. Trang sẽ chạy tại `https://<tên-tài-khoản>.github.io`.

> **Lưu ý:** file `.nojekyll` là file ẩn. Nếu kéo thả không lên, có thể tạo lại
> bằng **Add file → Create new file**, đặt tên `.nojekyll` rồi để trống nội dung.

---

## 2. Cách hoạt động của hai ngôn ngữ

Mỗi dòng chữ trên trang được viết sẵn **cả hai thứ tiếng** trong cùng một thẻ HTML:

```html
<h2 data-vi="Quá trình làm việc" data-en="Where I have worked">Quá trình làm việc</h2>
```

- Chữ nằm giữa hai thẻ `>...<` là **tiếng Việt** (hiển thị mặc định).
- `data-vi="..."` là bản tiếng Việt, `data-en="..."` là bản tiếng Anh.
- Khi bấm nút **VI / EN** trên thanh điều hướng, JavaScript đổi nội dung tương ứng
  và ghi nhớ lựa chọn cho những lần sau.

**Khi sửa chữ, nhớ sửa cả ba chỗ:** phần giữa hai thẻ, `data-vi` và `data-en`.
Nếu chỉ sửa phần giữa hai thẻ mà quên `data-vi`, chữ sẽ quay về bản cũ khi người
xem bấm đổi ngôn ngữ qua lại.

---

## 3. Sửa nội dung thường gặp

| Muốn sửa gì | Mở file nào |
|---|---|
| Tên, câu giới thiệu, số liệu, kinh nghiệm, kỹ năng, liên hệ | `index.html` |
| Nội dung một sự kiện cụ thể | `projects/<tên-sự-kiện>.html` |
| Màu sắc, phông chữ, khoảng cách | `assets/css/style.css` |
| Thay CV | ghi đè `assets/CV_Nguyen_Thi_Ngoc_Han.pdf` (giữ nguyên tên file) |
| Thay ảnh chân dung | ghi đè `assets/img/portrait.jpg` (nên dùng ảnh dọc, tỉ lệ 3:4) |

Toàn bộ màu sắc nằm ở đầu file `style.css`, chỉ cần đổi mã màu:

```css
:root {
  --ink:   #29095d;   /* tím chủ đạo */
  --gold:  #b08d57;   /* màu nhấn */
  --tint:  #f7f4fc;   /* nền tím nhạt */
}
```

---

## 4. Thêm một sự kiện mới

1. Tạo thư mục ảnh: `assets/img/events/ten-su-kien-moi/`, đặt tên ảnh theo thứ tự
   `01.jpg`, `02.jpg`, `03.jpg`… Ảnh **01.jpg** sẽ là ảnh bìa.
   Nên chỉnh ảnh rộng khoảng 1200px để trang tải nhanh.
2. Sao chép một file trong `projects/` (ví dụ `porsche-club-golf-open.html` là file
   ngắn và dễ sửa nhất), đổi tên thành `ten-su-kien-moi.html`, rồi sửa:
   - tiêu đề, mô tả ngắn
   - bảng thông tin: thời gian, địa điểm, quy mô, vai trò, đơn vị tổ chức
   - phần "Về giải đấu"
   - danh sách ảnh trong khối `<div class="gallery">`
   - liên kết trước/sau ở cuối trang
3. Thêm thẻ sự kiện vào `index.html`, trong đúng khối năm tương ứng:

```html
<a class="card" href="projects/ten-su-kien-moi.html">
  <div class="card-img">
    <span class="card-num">11</span>
    <img src="assets/img/events/ten-su-kien-moi/01.jpg" alt="Tên sự kiện" loading="lazy">
  </div>
  <div class="card-body">
    <h3 data-vi="Tên sự kiện" data-en="Event name">Tên sự kiện</h3>
    <p class="card-meta" data-vi="Ngày · Quy mô" data-en="Date · Scale">Ngày · Quy mô</p>
    <span class="card-role" data-vi="Vai trò" data-en="Role">Vai trò</span>
  </div>
</a>
```

Muốn thêm **một năm mới**, sao chép cả khối `<div class="year-block reveal">` và
đổi con số năm bên trong.

---

## 5. Về quyền riêng tư

Trang này ai có đường link đều xem được, nên:

- Trang **chỉ hiển thị email**, không hiển thị số điện thoại.
- File CV đăng kèm đã được **xoá cả hai số điện thoại**: số của bạn và số của
  người tham chiếu (anh Trịnh Văn Chính). Số điện thoại của người khác không nên
  đăng công khai khi chưa có sự đồng ý của họ.
- Nếu muốn gửi CV có đầy đủ số điện thoại cho nhà tuyển dụng, hãy gửi trực tiếp
  qua email thay vì thay file trong repo.

---

## 6. Xem thử trên máy trước khi đăng

Mở thư mục này trong Terminal và chạy:

```bash
python3 -m http.server 8000
```

Rồi mở trình duyệt vào `http://localhost:8000`.
