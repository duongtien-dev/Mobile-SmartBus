# DanaBus — Ứng dụng xe buýt thông minh

Ứng dụng di động **DanaBus** (Expo / React Native) hỗ trợ hành khách tra cứu tuyến, tìm đường, mua vé QR và quản lý thanh toán; đồng thời hỗ trợ nhân viên vận hành ca làm, quét vé và nghỉ phép.

Hỗ trợ đa ngôn ngữ: **Tiếng Việt**, **English**, **日本語**.

<p align="center">
  <img src="assets/images/logo.png" alt="DanaBus logo" width="120" />
</p>

---

## Mục lục

- [Tính năng chính](#tính-năng-chính)
- [Ảnh giao diện ứng dụng](#ảnh-giao-diện-ứng-dụng)
- [Công nghệ](#công-nghệ)
- [Cài đặt & chạy](#cài-đặt--chạy)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)

---

## Tính năng chính

### Hành khách

| Nhóm | Chức năng |
|------|-----------|
| **Tài khoản** | Đăng nhập, đăng ký (OTP email), quên / đặt lại mật khẩu |
| **Trang chủ** | Tìm điểm đi–đến, lối tắt (tra cứu tuyến, trạm gần, yêu thích, đánh giá), tuyến nổi bật, mẹo đi lại, tin tức, FAQ |
| **Tìm chuyến** | Lộ trình A→B (đi bộ + xe buýt), bản đồ, chi tiết từng chặng, mua vé từ kết quả |
| **Vé** | Vé lượt, vé tháng đơn tuyến, vé tháng liên tuyến → cấu hình → thanh toán → nhận QR |
| **Vé của tôi** | Danh sách vé đã mua, trạng thái (còn hiệu lực / đã dùng), xem QR lên xe |
| **Tuyến & trạm** | Tra cứu tuyến, chi tiết (bản đồ, giờ chạy, danh sách trạm, thông tin giá, đánh giá), trạm xung quanh, yêu thích |
| **Đánh giá** | Xem / viết / xóa đánh giá tuyến |
| **Thanh toán** | Quản lý phương thức, thêm / sửa tài khoản ngân hàng |
| **Thông báo** | Tin tức & thông báo dịch vụ (mới nhất / cũ nhất) |
| **Hồ sơ** | Điểm & thống kê, sửa thông tin, lịch sử chuyến, đổi ngôn ngữ |
| **Trợ giúp** | Trung tâm trợ giúp / FAQ, Điều khoản, Chính sách bảo mật, Về DanaBus |
| **Quét QR** | Tab quét mã vé (kiểm tra / lên xe) |

### Nhân viên

| Nhóm | Chức năng |
|------|-----------|
| **Dashboard** | Check-in ca, tuyến được giao, lịch tuần, lối tắt nhanh |
| **Ca đang chạy** | Bản đồ tuyến, quét QR vé hành khách, lịch sử quét, kết thúc ca |
| **Nghỉ phép** | Gửi yêu cầu nghỉ |
| **Hoạt động** | Lịch sử hoạt động / ca làm |
| **Thông báo** | Thông báo nội bộ nhân viên |

### Đa ngôn ngữ (i18n)

Đổi ngôn ngữ tại **Tài khoản → Ngôn ngữ**: `vi` · `en` · `ja`. Catalog nằm trong `src/i18n/locales/`.

---

## Ảnh giao diện ứng dụng

> Mở preview README (`Ctrl+Shift+V`) để xem ảnh inline. Nguồn: thư mục [`public/`](public/).

### Trang chủ & điều hướng

| Trang chủ — tìm đường | Trang chủ — tin tức & FAQ | Thông báo |
|:---:|:---:|:---:|
| <img src="public/image_1.jpg" alt="Trang chủ tìm đường" width="260" /> | <img src="public/image_2.jpg" alt="Trang chủ tin tức FAQ" width="260" /> | <img src="public/image_3.jpg" alt="Thông báo" width="260" /> |
| Tìm điểm đi–đến, lối tắt, tuyến nổi bật | Mẹo đi lại, tin tức, FAQ | Tin tức–thông báo, sắp xếp mới/cũ |

| Thanh toán | Tài khoản |
|:---:|:---:|
| <img src="public/image_4.jpg" alt="Thanh toán" width="260" /> | <img src="public/image_5.jpg" alt="Tài khoản" width="260" /> |
| Phương thức đã lưu, thêm ngân hàng/thẻ | Hồ sơ, điểm, vé, lịch sử, dịch vụ |

### Tìm lộ trình & mua vé

| Chọn loại vé | Kết quả lộ trình | Chi tiết lộ trình |
|:---:|:---:|:---:|
| <img src="public/image_6.jpg" alt="Chọn loại vé" width="260" /> | <img src="public/image_7.jpg" alt="Kết quả lộ trình" width="260" /> | <img src="public/image_8.jpg" alt="Chi tiết lộ trình" width="260" /> |
| Vé lượt / tháng đơn / liên tuyến | Bản đồ, thời gian, mua vé | Timeline từng chặng |

| Chọn vé (luồng mua) | Form vé tháng | Thanh toán vé |
|:---:|:---:|:---:|
| <img src="public/image_9.jpg" alt="Chọn vé" width="260" /> | <img src="public/image_10.jpg" alt="Form vé tháng" width="260" /> | <img src="public/image_11.jpg" alt="Thanh toán vé" width="260" /> |
| Chọn loại trước khi điền form | Điểm đi–đến, tháng, số lượng | Xác nhận & thanh toán |

| QR vé thành công | Vé của tôi |
|:---:|:---:|
| <img src="public/image_12.jpg" alt="QR vé thành công" width="260" /> | <img src="public/image_21.jpg" alt="Vé của tôi" width="260" /> |
| Mã QR lên xe, mã vé | Danh sách vé, trạng thái, mở QR |

### Tuyến, bản đồ & đánh giá

| Bản đồ tìm trạm | Tuyến yêu thích | Danh sách đánh giá |
|:---:|:---:|:---:|
| <img src="public/image_13.jpg" alt="Bản đồ tìm trạm" width="260" /> | <img src="public/image_14.jpg" alt="Yêu thích" width="260" /> | <img src="public/image_15.jpg" alt="Danh sách đánh giá" width="260" /> |
| Tìm trạm / địa điểm | Tuyến & trạm đã lưu | Xem / xóa đánh giá |

| Viết đánh giá | Chi tiết tuyến — giờ chạy | Chi tiết tuyến — trạm |
|:---:|:---:|:---:|
| <img src="public/image_16.jpg" alt="Viết đánh giá" width="260" /> | <img src="public/image_17.jpg" alt="Giờ chạy" width="260" /> | <img src="public/image_18.jpg" alt="Danh sách trạm" width="260" /> |
| Chấm sao, gửi feedback | Lưới giờ xuất phát | Danh sách trạm + mã |

| Chi tiết tuyến — thông tin | Chi tiết tuyến — đánh giá |
|:---:|:---:|
| <img src="public/image_19.jpg" alt="Thông tin tuyến" width="260" /> | <img src="public/image_20.jpg" alt="Đánh giá tuyến" width="260" /> |
| Giá vé, giờ hoạt động, mô tả | Tổng quan điểm & bình luận |

<details>
<summary><strong>Xem từng ảnh full size (click để mở rộng)</strong></summary>

<br/>

**1. Trang chủ — tìm đường**

<img src="public/image_1.jpg" alt="Trang chủ tìm đường" width="320" />

**2. Trang chủ — tin tức & FAQ**

<img src="public/image_2.jpg" alt="Trang chủ tin tức FAQ" width="320" />

**3. Thông báo**

<img src="public/image_3.jpg" alt="Thông báo" width="320" />

**4. Thanh toán**

<img src="public/image_4.jpg" alt="Thanh toán" width="320" />

**5. Tài khoản**

<img src="public/image_5.jpg" alt="Tài khoản" width="320" />

**6. Chọn loại vé**

<img src="public/image_6.jpg" alt="Chọn loại vé" width="320" />

**7. Kết quả lộ trình**

<img src="public/image_7.jpg" alt="Kết quả lộ trình" width="320" />

**8. Chi tiết lộ trình**

<img src="public/image_8.jpg" alt="Chi tiết lộ trình" width="320" />

**9. Chọn vé (luồng mua)**

<img src="public/image_9.jpg" alt="Chọn vé" width="320" />

**10. Form vé tháng**

<img src="public/image_10.jpg" alt="Form vé tháng" width="320" />

**11. Thanh toán vé**

<img src="public/image_11.jpg" alt="Thanh toán vé" width="320" />

**12. QR vé thành công**

<img src="public/image_12.jpg" alt="QR vé thành công" width="320" />

**13. Bản đồ tìm trạm**

<img src="public/image_13.jpg" alt="Bản đồ tìm trạm" width="320" />

**14. Tuyến yêu thích**

<img src="public/image_14.jpg" alt="Yêu thích" width="320" />

**15. Danh sách đánh giá**

<img src="public/image_15.jpg" alt="Danh sách đánh giá" width="320" />

**16. Viết đánh giá**

<img src="public/image_16.jpg" alt="Viết đánh giá" width="320" />

**17. Chi tiết tuyến — giờ chạy**

<img src="public/image_17.jpg" alt="Giờ chạy" width="320" />

**18. Chi tiết tuyến — trạm**

<img src="public/image_18.jpg" alt="Danh sách trạm" width="320" />

**19. Chi tiết tuyến — thông tin**

<img src="public/image_19.jpg" alt="Thông tin tuyến" width="320" />

**20. Chi tiết tuyến — đánh giá**

<img src="public/image_20.jpg" alt="Đánh giá tuyến" width="320" />

**21. Vé của tôi**

<img src="public/image_21.jpg" alt="Vé của tôi" width="320" />

</details>

---

## Công nghệ

- **Expo** ~54 · **expo-router** (file-based routing)
- **React Native** + **NativeWind** (Tailwind)
- **TypeScript**
- **React Hook Form** + Zod
- **Axios** · AsyncStorage
- **expo-location** · **expo-camera** (bản đồ / QR)

---

## Cài đặt & chạy

### Yêu cầu

- Node.js 18+
- npm (hoặc yarn / pnpm)
- Expo Go hoặc Android Emulator / iOS Simulator

### Cài đặt

```bash
cd app-native-smartbus
npm install
```

### Chạy app

```bash
npx expo start
```

Sau đó mở bằng:

- [Expo Go](https://expo.dev/go)
- Android emulator: `a`
- iOS simulator: `i`
- Web: `w`

Hoặc:

```bash
npm run android
npm run ios
npm run web
```

### Lint

```bash
npm run lint
```

---

## Cấu trúc thư mục

```
app-native-smartbus/
├── public/                 # Ảnh chụp màn hình (README)
├── assets/images/          # Logo, icon, banner trong app
├── src/
│   ├── app/                # Routes (expo-router)
│   │   ├── (auth)/         # Đăng nhập, đăng ký, OTP, quên MK
│   │   ├── (tabs)/         # Home, thông báo, thanh toán, hồ sơ, quét QR
│   │   ├── (pages)/        # Tuyến, chuyến, vé, profile, payment, notice…
│   │   └── staff/          # Luồng nhân viên
│   ├── screen/             # UI theo tính năng
│   ├── components/         # Component dùng chung
│   ├── i18n/               # vi / en / ja
│   ├── services/           # API
│   └── store/              # State (auth, locale…)
├── app.json
├── package.json
└── README.md
```

---

## Liên hệ / ghi chú

- Brand trong sản phẩm: **DanaBus**
- Repo package: `app-native-smartbus`
- Ảnh demo README: thư mục [`public/`](./public/) (`image_1.jpg` … `image_21.jpg`)
