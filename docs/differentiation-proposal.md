# DanaBus — Đề xuất chức năng khác biệt (Differentiation)

> Tài liệu độc lập phục vụ proposal / product roadmap.  
> Không thay thế README tính năng hiện có.  
> Cập nhật: 2026-08.

---

## 1. Bối cảnh cạnh tranh

Các app xe buýt / giao thông công cộng phổ biến trên thị trường (Moovit, Google Maps Transit, app xe buýt địa phương, ví vé điện tử…) thường đã có:

| Nhóm phổ biến | Ví dụ |
|---------------|--------|
| Tra cứu tuyến / trạm | Có ở hầu hết app |
| Tìm đường A→B | Google Maps, Moovit |
| Vé điện tử / QR | Nhiều hệ thống đô thị |
| Tin tức / thông báo | Cơ bản |
| Đa ngôn ngữ | Một số app lớn |

**DanaBus đã có lợi thế tương đối:**

- Gói **hành khách + nhân viên soát vé** trong cùng một sản phẩm (ít app địa phương làm đủ cả hai).
- Luồng **vé QR + ca làm + báo cáo ca + xin nghỉ** gắn với vận hành thực tế.
- i18n **vi / en / ja** (phù hợp Đà Nẵng / khách du lịch).

**Chưa đủ để “nổi bật rõ”** nếu chỉ dừng ở mức tra cứu + mua vé + quét QR — vì đối thủ lớn đã cover phần “hành khách cơ bản”.

---

## 2. Hướng khác biệt nên nhắm

Ưu tiên các điểm **đối thủ địa phương yếu** hoặc **Google/Moovit không làm sâu** (vận hành nội bộ, trải nghiệm địa phương, gắn tuyến–nhân viên–doanh thu).

### Trục A — “Thông minh hơn khi đi xe” (hành khách cảm nhận ngay)

| # | Chức năng đề xuất | Vì sao khác biệt | Độ khó* | Impact |
|---|-------------------|------------------|---------|--------|
| A1 | **Theo dõi xe realtime + ETA** (GPS xe / ước lượng theo lịch + scan gần nhất) | Đây là kỳ vọng #1 của hành khách; thiếu = “app tra cứu”, có = “app đi xe” | Cao | Rất cao |
| A2 | **Thông báo đẩy thông minh** (xe sắp tới trạm đã chọn, trễ chuyến, đổi lộ trình) | Biến app thành “người nhắc” thay vì phải mở lại | Trung | Cao |
| A3 | **Cảnh báo đông / ghế trống ước lượng** (từ mật độ quét QR theo chuyến) | Dùng dữ liệu scan staff → insight hành khách; đối thủ khó copy nếu không có phía vận hành | Trung | Cao |
| A4 | **Gợi ý “tuyến chưa đánh giá sau khi đi”** (đã có nền API `unreviewedOnly`) | Tăng feedback chất lượng + engagement sau chuyến thật | Thấp | Trung |
| A5 | **Chế độ du lịch / khách Nhật–Anh** (gói tuyến hot, cách mua vé, FAQ theo ngữ cảnh) | Khai thác i18n ja đã có; phù hợp thương hiệu Đà Nẵng | Thấp–Trung | Trung–Cao |

\*Độ khó: ước lượng effort kỹ thuật + dữ liệu.

### Trục B — “Vận hành số hóa” (B2B / nhà xe / Sở — điểm bán proposal)

| # | Chức năng đề xuất | Vì sao khác biệt | Độ khó | Impact |
|---|-------------------|------------------|--------|--------|
| B1 | **Admin Web Console** (user/KPI/loại vé/lịch ca/duyệt báo cáo/tuyến–trạm/tin tức) | API gần đủ; thiếu UI = hệ thống chưa “đóng vòng”; đây là sản phẩm bán cho đơn vị vận hành | Trung | Rất cao |
| B2 | **Duyệt nghỉ phép + lịch ca kéo–thả** | Khép quy trình nhân sự vận hành trên cùng nền | Trung | Cao |
| B3 | **Bảng điều khiển ca realtime** (staff nào đang active, scan/phút, doanh thu ca) | Dashboard vận hành “live” — khác app chỉ báo cáo cuối ngày | Trung–Cao | Cao |
| B4 | **Triage báo cáo sự cố tuyến** (hành khách gửi → admin xử lý trạng thái) | API tạo report đã có; thêm UI 2 phía = kênh phản ánh chính thức | Thấp–Trung | Cao |
| B5 | **Xuất báo cáo Excel/PDF** (doanh thu, lượt quét, tuyến nóng) | Argument mạnh khi demo cho ban lãnh đạo | Thấp | Trung–Cao |

### Trục C — “Thanh toán & giữ chân” (tăng giá trị lặp lại)

| # | Chức năng đề xuất | Vì sao khác biệt | Độ khó | Impact |
|---|-------------------|------------------|--------|--------|
| C1 | **Ví nội bộ / nạp tiền** (hoặc deep-link MoMo/ZaloPay thật) | Hiện mới lưu thẻ–NH; chưa phải thanh toán sống | Cao | Cao |
| C2 | **Loyalty thật** (điểm sau mỗi scan hợp lệ, đổi vé/ưu đãi) | Profile đang hiển thị điểm demo — biến thành chương trình giữ chân | Trung | Cao |
| C3 | **Vé nhóm / học sinh–sinh viên / ưu tiên** (`is_priority_user` đã có trên User) | Chính sách giá địa phương — Google Maps không làm | Trung | Trung–Cao |
| C4 | **Gia hạn vé tháng 1-tap + nhắc hết hạn** | Giảm bỏ cuộc sau tháng đầu | Thấp | Trung |

### Trục D — “Offline & độ tin cậy soát vé” (staff ngoài thực địa)

| # | Chức năng đề xuất | Vì sao khác biệt | Độ khó | Impact |
|---|-------------------|------------------|--------|--------|
| D1 | **Quét QR offline + đồng bộ sau** | Xe buýt thường mất sóng; đây là pain thật của soát vé | Cao | Rất cao |
| D2 | **Chống gian lận QR** (one-time token / rotate / anti-replay) | Tăng niềm tin đơn vị vận hành so với QR tĩnh | Trung–Cao | Cao |
| D3 | **Chế độ máy quét chuyên dụng** (volume key, haptic, âm thanh OK/FAIL rõ) | UX soát vé nhanh giờ cao điểm | Thấp | Trung |

### Trục E — “Địa phương hóa Đà Nẵng” (khó copy toàn cầu)

| # | Chức năng đề xuất | Vì sao khác biệt | Độ khó | Impact |
|---|-------------------|------------------|--------|--------|
| E1 | **Gói “Sự kiện / lễ hội / biển”** (tuyến tăng cường, điểm POI: sân bay, chợ, biển Mỹ Khê…) | Nội dung địa phương > thuật toán chung | Thấp | Trung–Cao |
| E2 | **Tích hợp thời tiết / ngập / điều chỉnh lộ trình** | Giá trị mùa mưa — narrative “thông minh vì thành phố” | Trung | Trung |
| E3 | **Accessibility** (giọng đọc trạm, tương phản cao, ưu tiên xe người khuyết tật nếu có dữ liệu) | Íề xuất ESG / chính quyền đô thị dễ “ghi điểm” | Trung | Trung |

---

## 3. Bộ “killer combo” đề xuất cho proposal (chọn ít nhưng sắc)

Thay vì liệt kê 20 tính năng, nên **cam kết 1 gói khác biệt** gồm 5 hạng mục:

1. **Realtime + ETA + push** (A1 + A2) — mặt trận hành khách.  
2. **Admin Console đóng vòng vận hành** (B1 + B2 + B4) — mặt trận B2B.  
3. **Scan offline + chống gian lận** (D1 + D2) — mặt trận tin cậy.  
4. **Loyalty + ưu đãi đối tượng** (C2 + C3) — mặt trận giữ chân.  
5. **Insight đông xe từ dữ liệu quét** (A3) — mặt trận “chỉ hệ thống có staff mới làm được”.

Narrative một câu:

> *DanaBus không chỉ là app tra cứu tuyến — mà là nền tảng khép kín từ hành khách mua vé QR, nhân viên soát vé theo ca, đến quản trị theo dõi KPI và phản hồi sự cố theo thời gian thực.*

Đây là câu chuyện **Google Maps / Moovit không bán** cho một nhà xe địa phương.

---

## 4. Roadmap gợi ý (theo giai sóng)

### Wave 1 — Nhanh, tăng độ tin cậy proposal (4–8 tuần)

- Admin Web Console MVP: user, loại vé, lịch ca, duyệt báo cáo ca, CRUD tin tức/tuyến cơ bản.  
- UI báo cáo sự cố (hành khách) + triage admin.  
- Duyệt nghỉ phép (API + admin).  
- Push cơ bản (tin tức, hết hạn vé tháng, duyệt đơn).  
- Màn “tuyến chưa đánh giá” sau chuyến.

### Wave 2 — Khác biệt cảm nhận được (2–4 tháng)

- ETA / vị trí xe (dù chỉ ước lượng từ lịch + last scan).  
- Quét QR offline + đồng bộ.  
- Loyalty điểm thật gắn scan hợp lệ.  
- Dashboard ca realtime cho admin.

### Wave 3 — Dẫn dắt thị trường địa phương (4–8 tháng)

- Thanh toán sống (MoMo/ZaloPay/Napas).  
- Anti-fraud QR nâng cao.  
- Gói du lịch / sự kiện / accessibility.  
- Open data / báo cáo xuất cho Sở.

---

## 5. Việc **không** nên ưu tiên sớm

Tránh phân tán nếu chưa có Wave 1–2:

- Mạng xã hội trong app, chat hành khách–tài xế.  
- Game hóa phức tạp.  
- AI chatbot chung chung không gắn dữ liệu tuyến/vé.  
- Driver navigation kiểu Google Maps turn-by-turn (scope khác hẳn app soát vé).

---

## 6. Cách trình bày trong proposal

| Mục | Nội dung gợi ý |
|-----|----------------|
| **Hiện trạng** | Đã có app User + Staff + API 3 role (xem README app) |
| **Khoảng trống thị trường** | App địa phương thiếu khép kín vận hành; app quốc tế thiếu vận hành nhà xe |
| **Giải pháp khác biệt** | Killer combo mục 3 |
| **Lợi ích đo được** | ↑ lượt dùng lại; ↓ thời gian soát vé; ↑ tỷ lệ đúng giờ cảm nhận; ↑ phản hồi sự cố có xử lý; báo cáo doanh thu theo ca |
| **Lộ trình** | Wave 1 → 2 → 3 |
| **Rủi ro** | Phụ thuộc GPS xe / thiết bị staff; cần chính sách dữ liệu & hạ tầng mạng |

---

## 7. Tiêu chí chọn feature (checklist nội bộ)

Trước khi thêm vào backlog proposal, hỏi:

1. Hành khách **cảm nhận được trong 1 tuần** dùng thử không?  
2. Nhà xe / admin **giảm việc giấy tờ** rõ ràng không?  
3. Có tận dụng dữ liệu **chỉ DanaBus mới có** (scan, ca, vé) không?  
4. Đối thủ lớn **khó copy nhanh** ở quy mô địa phương không?  
5. Effort có nằm trong Wave tương ứng không?

Nếu ≥ 3 câu “có” → đưa vào danh sách ngoài README; nếu không → để backlog thấp.

---

## 8. Liên kết tài liệu liên quan

- Tính năng đã có (app): `Mobile-SmartBus/README.md`  
- Tổng quan backend: `Backend-SmartBus/doc/project.md`  
- Role API: `Backend-SmartBus/doc/roles/*.md`

---

## 9. Trục A — Điều kiện cần có & luồng nghiệp vụ

> Mục này trả lời: **muốn làm Trục A thì cần bổ sung gì**, và **luồng end-to-end** từng hạng mục A1–A5.

### 9.1. Hiện trạng hệ thống (đã có / chưa có)

| Thành phần | Hiện có? | Ghi chú |
|------------|----------|---------|
| Tuyến + điểm dừng (tọa độ GeoJSON) | ✅ | `Route`, `Stop.location` 2dsphere |
| Lịch giờ chạy theo trạm | ✅ một phần | `Stop.times` — đủ để ETA **ước lượng lịch** |
| Active shift (staff đang chạy tuyến nào) | ✅ | `ActiveShift` — **chưa có GPS / stop hiện tại lưu server** |
| ScanLog (quét vé) | ✅ | Có `scannedBy`, `ticket`, `isValid` — **chưa gắn stopId / shiftId / tọa độ** |
| Ticket + lịch sử chuyến | ✅ | Biết user đã đi tuyến nào → phục vụ A4 |
| API `unreviewedOnly` (tuyến đã đi chưa review) | ✅ | Nền cho A4 |
| i18n vi/en/ja | ✅ | Nền cho A5 |
| Vị trí xe realtime (GPS) | ❌ | Chưa có model / API / thiết bị |
| Push notification (FCM/APNs) | ❌ | Chưa tích hợp |
| Subscription “theo dõi trạm/tuyến” | ❌ | Chưa có |
| Crowding / load factor | ❌ | Cần suy ra từ scan + sức chứa xe |

**Kết luận:** Có thể làm **MVP Trục A không cần gắn GPS phần cứng lên xe**, bằng cách dùng: lịch chạy + vị trí staff app khi quét/điểm dừng + ActiveShift. GPS xe (OBD/tablet cố định) là phase sau để tăng độ chính xác.

---

### 9.2. Những thứ bắt buộc phải bổ sung (nền tảng chung)

#### A. Dữ liệu / model mới hoặc mở rộng

| Model / field | Mục đích | Dùng cho |
|---------------|----------|----------|
| `Vehicle` (biển số, sức chứa ghế, tuyến mặc định) | Định danh xe trong ca | A1, A3 |
| `ActiveShift.vehicleId`, `currentStopOrder`, `lastLat`, `lastLng`, `lastLocationAt`, `heading` | Biết xe/ca đang ở đâu | A1, A2, A3 |
| `ScanLog.shiftId`, `stopId`, `lat`, `lng` | Mỗi lần quét = tín hiệu vị trí + mật độ | A1, A3 |
| `TripSubscription` (userId, routeId, stopId, notifyBeforeMinutes, active) | User “theo dõi” trạm để nhận push | A2 |
| `CrowdingSnapshot` (routeId, shiftId, stopOrder, boardedCount, estimatedLoad, at) | Cache mức đông theo chuyến | A3 |
| `DevicePushToken` (userId, token, platform) | Gửi FCM/APNs | A2, A4 |
| `TourPack` / content CMS (POI, tuyến gợi ý, FAQ theo locale) | Gói du lịch | A5 |

#### B. Backend API mới (gợi ý)

| API | Ai gọi | Việc |
|-----|--------|------|
| `POST /api/staff-shifts/location` | Staff app (định kỳ 10–30s khi ca active) | Cập nhật lat/lng + optional stopOrder |
| `POST /api/staff-shifts/advance-stop` | Staff app (đã có UX “qua trạm” — cần sync server) | Cập nhật `currentStopOrder` |
| `POST /api/tickets/verify-scanned-qr` (mở rộng) | Staff | Ghi thêm `shiftId`, `stopId`, tọa độ lúc quét |
| `POST /api/live/route-vehicles` | User app | Danh sách xe đang chạy trên tuyến + last location + ETA các trạm |
| `POST /api/live/eta` | User app | ETA tới 1 stop cụ thể |
| `POST /api/live/crowding` | User app | Mức đông ước lượng theo tuyến/chuyến |
| `POST /api/subscriptions/upsert` + `list` + `delete` | User app | Đăng ký theo dõi trạm/tuyến |
| `POST /api/devices/register-push` | User/Staff app | Lưu FCM token |
| Worker / cron push | Server | So khớp location vs subscription → gửi notify |
| `POST /api/reviews/prompt-candidates` (hoặc dùng `listRoutes` + `unreviewedOnly`) | User app | A4 |
| `POST /api/tour/packs` | User app (public) | A5 nội dung gói du lịch |

#### C. App mobile

| Phía | Cần thêm |
|------|----------|
| **Staff** | Background/foreground location khi ca active; nút “đã tới trạm X” ghi server; quyền Location “always/when in use”; pin bản đồ theo vị trí thật |
| **User** | Màn “Xe đang chạy” trên chi tiết tuyến; marker xe + ETA; bật theo dõi trạm + nhận push; banner đông xe; prompt đánh giá sau chuyến; tab/gói Du lịch |
| **Hạ tầng** | Firebase Cloud Messaging (hoặc Expo Notifications) + cấu hình iOS/Android; (tuỳ chọn) Redis/Socket.io nếu muốn live < 5s |

#### D. Vận hành / phi kỹ thuật

| Hạng mục | Vì sao cần |
|----------|------------|
| Quy định staff **bắt buộc mở app + GPS khi nhận ca** | Không có tín hiệu = không có live |
| Sức chứa ghế / loại xe gắn lịch ca | A3 mới ra số “còn chỗ / đông” có ý nghĩa |
| Nội dung POI + FAQ đa ngữ (biên tập) | A5 không chỉ là code |
| Chính sách quyền riêng tư vị trí staff | Bắt buộc khi thu GPS |

---

### 9.3. Hai tầng triển khai A1 (quan trọng)

| Tầng | Nguồn vị trí | Độ chính xác | Khi nào dùng |
|------|--------------|--------------|--------------|
| **A1-Lite (MVP)** | Staff phone GPS + “advance stop” + lịch `Stop.times` | Trung (phụ thuộc staff) | Demo / pilot nhanh, không cần thiết bị xe |
| **A1-Full** | Tablet/GPS cố định trên xe → API location | Cao, ổn định | Triển khai thật với nhà xe |

Proposal nên ghi rõ: *Wave A bắt đầu bằng A1-Lite tận dụng app staff hiện có.*

---

### 9.4. Luồng nghiệp vụ chi tiết

#### Luồng A1 — Theo dõi xe realtime + ETA

```text
[Admin] Gán lịch ca + (tuỳ chọn) biển số xe
        ↓
[Staff] Check-in ca → ActiveShift(status=active, routeId, vehicleId?)
        ↓
[Staff app] Mỗi N giây: gửi location (lat,lng) + pin bản đồ
        ↓ (song song)
[Staff] Quét vé / bấm “qua trạm” → cập nhật currentStopOrder (+ ScanLog gắn stop)
        ↓
[Backend] Lưu last location; tính ETA:
          - theo khoảng cách polyline còn lại / tốc độ TB
          - hoặc fallback: Stop.times + độ trễ (now - scheduled)
        ↓
[User] Mở chi tiết tuyến / “Xe gần tôi”
        → API live/route-vehicles + live/eta
        → Bản đồ: marker xe + ETA từng trạm phía trước
```

**Màn hình User cần có**

1. Chi tiết tuyến → tab/section **“Xe đang chạy”**.  
2. Chọn trạm lên → hiển thị **ETA + độ trễ**.  
3. (Tuỳ chọn) Bản đồ Home “xe gần vị trí tôi”.

**Điều kiện chấp nhận (MVP)**

- Íang ca active thì user thấy ≥ 1 marker cập nhật ≤ 30s.  
- ETA sai số chấp nhận ±3–5 phút so với thực tế pilot.

---

#### Luồng A2 — Push thông minh

```text
[User] Chọn tuyến + trạm xuống/đón → “Nhắc tôi khi xe còn ~X phút”
        → tạo TripSubscription + đăng ký DevicePushToken
        ↓
[Backend worker] mỗi 30–60s:
        lấy ActiveShift trên route
        tính ETA tới stop đã đăng ký
        nếu ETA ≤ notifyBeforeMinutes và chưa gửi trong cửa sổ thời gian
        → gửi FCM/APNs
        ↓
[User] Nhận push → mở app vào chi tiết tuyến / live map
```

**Các loại push tối thiểu**

| Loại | Trigger |
|------|---------|
| Xe sắp tới trạm | ETA ≤ ngưỡng user chọn (vd. 5 phút) |
| Xe trễ | ETA − lịch > ngưỡng (vd. 7 phút) |
| Hết ca / không còn xe | Không còn ActiveShift trên tuyến đã theo dõi |
| (Luồng chung) Vé tháng sắp hết hạn | `Ticket.validTo` − now ≤ N ngày — có thể làm cùng hạ tầng push |

**Điều kiện cần thêm ngoài A1:** FCM/APNs + model subscription + worker.  
**Không làm A2 nếu chưa có nguồn ETA ổn định (A1-Lite trở lên).**

---

#### Luồng A3 — Cảnh báo đông / ghế trống ước lượng

```text
[Admin] Khai báo Vehicle.capacity (hoặc mặc định theo loại xe)
        ↓
[Staff] Trong ca: mỗi scan hợp lệ (+1 boarded trên chuyến/segment)
        ↓
[Backend] estimatedLoad = f(validScans trên shift từ đầu chuyến hoặc giữa 2 đầu tuyến)
          loadRatio = estimatedLoad / capacity
          mức: thấp | vừa | đông | rất đông
        ↓
[User] Xem trên kết quả tìm chuyến / chi tiết tuyến / live vehicle card
```

**Giả định đơn giản (MVP)**

- Đếm `ScanLog.isValid=true` theo `shiftId` trong cửa sổ thời gian gần nhất (vd. 45 phút) hoặc từ lúc qua đầu tuyến.  
- Không cần biết xuống xe ngay (phase 2: scan xuống hoặc heuristic).

**Hiển thị User**

- Badge trên thẻ xe/tuyến: `Còn chỗ` / `Đông` / `Rất đông`.  
- Tooltip: “Ước lượng từ lượt quét vé trên chuyến đang chạy”.

---

#### Luồng A4 — Gợi ý đánh giá sau khi đi

```text
[User] Có ticket được scan hợp lệ (hoặc ticket status → used)
        ↓
[Backend] Đánh dấu “đã đi tuyến X”, chưa có Review(user, route)
        ↓
[User app]
  - Lần mở app tiếp theo / vào Home
  - hoặc sau 30–120 phút kể từ scan
  → Bottom sheet: “Bạn vừa đi tuyến 01 — đánh giá ngay?”
        ↓
[User] Viết review (màn Create hiện có) hoặc “Để sau” / “Không hỏi lại”
```

**Đã có sẵn:** API review + `unreviewedOnly` trên list routes.  
**Cần bổ sung:** trigger thời điểm (push hoặc in-app prompt), lưu preference “đừng hỏi lại”, (tuỳ chọn) gắn `ticketId` vào review.

**Effort thấp — nên làm song song Wave A đầu tiên để có metric engagement.**

---

#### Luồng A5 — Chế độ du lịch (ja / en)

```text
[Biên tập / Admin CMS]
  - Tạo TourPack: tiêu đề đa ngữ, danh sách tuyến + POI (lat/lng/mô tả),
    hướng dẫn mua vé, FAQ ngắn
        ↓
[User] Locale = ja|en (hoặc bật “Travel mode”)
        → Home hiện card “Dành cho khách du lịch”
        → Pack detail: map POI → chọn tuyến → deep-link tra cứu / mua vé
        → FAQ / cách thanh toán theo ngôn ngữ
```

**Cần có**

- Nội dung (không chỉ code): POI Đà Nẵng, copy ja/en.  
- API hoặc JSON tĩnh ban đầu (`tour-packs.json`) để demo nhanh.  
- Deep-link vào flow mua vé / chi tiết tuyến hiện có.

---

### 9.5. Sơ đồ tổng thể Trục A (phụ thuộc)

```text
                    ┌─────────────────────────┐
                    │  Staff ca active + GPS  │
                    │  + advance stop + scan  │
                    └───────────┬─────────────┘
                                │
                                ▼
                    ┌─────────────────────────┐
                    │  Live location service  │
                    │  + ETA engine           │
                    └───────────┬─────────────┘
                       ┌────────┼────────┐
                       ▼        ▼        ▼
                    [A1 Map] [A2 Push] [A3 Crowding]
                       │
                       ▼
                    [A4 Review prompt] ← Ticket/Scan used
                    [A5 Tour packs]   ← Content + i18n (độc lập hơn)
```

**Thứ tự làm recommended**

1. **Nền:** mở rộng `ActiveShift` location + `ScanLog` gắn stop/shift + staff gửi GPS.  
2. **A1-Lite** (map + ETA).  
3. **A4** (nhanh, không phụ thuộc live).  
4. **A2** (push trên nền ETA).  
5. **A3** (crowding từ scan + capacity).  
6. **A5** (song song với content).  
7. **A1-Full** (GPS cố định trên xe) khi pilot ổn.

---

### 9.6. Checklist “Đủ điều kiện bắt đầu Trục A”

- [x] Staff app gửi được location khi ca `active` (`useStaffShiftLocation`)  
- [x] Backend lưu `lastLat/lastLng/currentStopOrder` theo shift  
- [x] Scan/verify ghi `shiftId` + `stopId` (+ lat/lng)  
- [x] API: `/api/live/route-vehicles`, `/eta`, `/crowding`  
- [x] User: tab **Xe đang chạy** trên chi tiết tuyến (ETA + crowding)  
- [x] (A2) API device + subscription (`/api/notify/*`) + worker Expo Push (`npm run worker:push` / `POST /api/notify/dispatch`)  
- [x] User map: marker xe realtime trên `RouteDetailMap`  
- [x] (A1-Full API) `POST /api/live/vehicle-gps` (thiết bị GPS cố định theo biển số + `VEHICLE_GPS_SECRET`)  
- [x] (A3) Crowding từ scan hợp lệ / capacity mặc định 40  
- [x] (A4) Prompt đánh giá trên Home (`ReviewPromptCard`)  
- [x] (A5) Tour packs API + preview Home (`/api/tour-packs`)  

**Đã ship A1-Lite + A1-Full ingest + A2 Expo push worker + marker map + A3 + A4 + A5.**  
Còn lại (ops/hardware): gắn cron `worker:push`, cấu hình EAS `projectId` cho push production, lắp GPS/tablet thật trên xe.
