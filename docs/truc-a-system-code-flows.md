# Trục A — Flow hệ thống & Flow code (chi tiết)

> Tài liệu kỹ thuật cho team: **luồng nghiệp vụ** + **luồng code** của “Thông minh hơn khi đi xe”.  
> Trạng thái: **MVP đã ship** (A1-Lite, A1-Full API, A2 Expo Push, A3, A4, A5).  
> Product roadmap tổng: [`differentiation-proposal.md`](./differentiation-proposal.md).

---

## Mục lục

1. [Tổng quan Trục A](#1-tổng-quan-trục-a)
2. [Sơ đồ hệ thống end-to-end](#2-sơ-đồ-hệ-thống-end-to-end)
3. [Model & dữ liệu nền](#3-model--dữ-liệu-nền)
4. [A1 — Live xe + ETA](#4-a1--live-xe--eta)
5. [A2 — Push thông minh](#5-a2--push-thông-minh)
6. [A3 — Crowding](#6-a3--crowding)
7. [A4 — Gợi ý đánh giá](#7-a4--gợi-ý-đánh-giá)
8. [A5 — Tour packs](#8-a5--tour-packs)
9. [Bảng API nhanh](#9-bảng-api-nhanh)
10. [Cây file liên quan](#10-cây-file-liên-quan)
11. [Cách test / ops](#11-cách-test--ops)
12. [Giới hạn MVP & việc còn lại](#12-giới-hạn-mvp--việc-còn-lại)

---

## 1. Tổng quan Trục A

| Mã | Tên | Ý nghĩa nghiệp vụ | Nguồn tín hiệu chính |
|----|-----|-------------------|----------------------|
| **A1-Lite** | Xe realtime + ETA | User thấy xe đang chạy trên tuyến + ước lượng phút tới trạm | GPS điện thoại **staff** khi ca `active` + `advance-stop` |
| **A1-Full** | GPS cố định trên xe | Cùng UI user; độ ổn định cao hơn phone | Thiết bị/tablet POST theo **biển số** |
| **A2** | Push thông minh | Nhắc user khi xe sắp tới trạm đã theo dõi | `TripSubscription` + ETA + Expo Push |
| **A3** | Mức đông | Badge “Còn chỗ / Đông…” trên thẻ xe | Đếm `ScanLog` hợp lệ / sức chứa xe |
| **A4** | Gợi ý đánh giá | Prompt Home sau khi đã đi nhưng chưa review | Ticket đã dùng − Review đã có |
| **A5** | Gói du lịch | Card Home đa ngữ (vi/en/ja) | Pack tĩnh trên backend |

**Phụ thuộc bắt buộc:** không có ca staff `active` (+ vị trí) thì A1/A2/A3 gần như trống với user.

---

## 2. Sơ đồ hệ thống end-to-end

```text
┌──────────────┐  check-in / GPS ~20s / advance-stop / quét QR
│ Staff Mobile │──────────────────────────────────────────────┐
└──────────────┘                                              │
                                                              ▼
┌──────────────┐  vehicle-gps (biển số + secret)    ┌─────────────────────┐
│ GPS trên xe  │───────────────────────────────────►│  Backend-SmartBus    │
└──────────────┘                                    │                     │
                                                    │  ActiveShift        │
┌──────────────┐  live poll 15s                     │  ScanLog            │
│ User Mobile  │◄── route-vehicles / map markers ───│  liveService        │
│              │──► theo dõi trạm (subscription) ──►│  TripSubscription   │
│              │──► register Expo push token ──────►│  DevicePushToken    │
│ Home         │◄── review prompt / tour packs ─────│  routes / tour-packs│
└──────────────┘                                    └──────────┬──────────┘
                                                               │
                     cron / POST /notify/dispatch / sau GPS    │
                                                               ▼
                                                    ┌─────────────────────┐
                                                    │ Expo Push API       │
                                                    │ → thiết bị user     │
                                                    └─────────────────────┘
```

### Chuỗi sự kiện tối thiểu để user thấy xe

```text
1. Admin đã có Route + Stop (+ lịch ca gắn staff/biển số — khuyến nghị)
2. Staff login → Nhận ca → ActiveShift(status=active, routeId, plateNumber?)
3. Staff cho GPS → mỗi ~20s cập nhật lastLat/lastLng
4. User mở chi tiết cùng routeId → tab “Xe đang chạy” + marker map
5. (Tuỳ chọn) User chọn theo dõi trạm → TripSubscription
6. (Tuỳ chọn) ETA ≤ ngưỡng → worker gửi push
```

---

## 3. Model & dữ liệu nền

### 3.1. `ActiveShift` (tim của A1)

| Field | Ý nghĩa |
|-------|---------|
| `staffId`, `routeId`, `plateNumber`, `vehicleId` | Định danh ca / xe |
| `status` | `active` \| `ended` — live chỉ lấy `active` |
| `currentStopOrder` | Index 0-based trong danh sách Stop đã sort `order` |
| `lastLat`, `lastLng`, `lastLocationAt`, `heading` | Vị trí gần nhất |
| `locationSource` | `staff` \| `vehicle` \| `stop` — ưu tiên nguồn |

**File:** `Backend-SmartBus/src/models/ActiveShift.js`

### 3.2. `ScanLog` (nuôi A3 + gắn ca)

| Field | Ý nghĩa |
|-------|---------|
| `shiftId` | Gắn chuyến/ca đang chạy |
| `stopId`, `lat`, `lng` | Ngữ cảnh lúc quét |
| `isValid` | Chỉ scan hợp lệ mới đếm crowding |
| `createdAt` | Cửa sổ thời gian 45 phút |

### 3.3. `TripSubscription` + `DevicePushToken` (A2)

- Subscription: `(userId, routeId, stopId)` unique + `notifyBeforeMinutes` + `lastNotifiedAt`
- Token: `(userId, token)` + `platform` (`expo` …) + `active`

### 3.4. `Vehicle`

- `capacity` dùng cho A3; thiếu → mặc định **40**.

---

## 4. A1 — Live xe + ETA

### 4.1. Flow hệ thống (A1-Lite)

```text
[Staff] Dashboard → “Nhận ca hôm nay”
        → POST /api/staff-shifts/check-in
        → ActiveShift { status: active, currentStopOrder: 0, routeId, plateNumber… }
        ↓
[Staff] Màn Active Shift (foreground)
        → useStaffShiftLocation: mỗi 20s + khi app active
        → Location.getCurrentPositionAsync
        → POST /api/staff-shifts/location { lat, lng, heading?, currentStopOrder? }
        → ActiveShift.lastLat/Lng, locationSource='staff'
        → triggerDispatchInBackground()   // phục vụ A2
        ↓
[Staff] (Tuỳ chọn) Bấm qua trạm
        → POST /api/staff-shifts/advance-stop
        → currentStopOrder++; có thể snap vị trí theo Stop → locationSource='stop'
        ↓
[User] Chi tiết tuyến
        → POST /api/live/route-vehicles { routeId, stopId? }
        → Danh sách xe + ETA + crowding + location
        → Map: marker vàng theo lat/lng
```

**Quy tắc ưu tiên vị trí:** nếu vừa có GPS `vehicle` (&lt; 90 giây) thì **bỏ qua** GPS phone staff — tránh nhảy vị trí.

### 4.2. Flow hệ thống (A1-Full)

```text
[Thiết bị trên xe] định kỳ
        → POST /api/live/vehicle-gps
           Header: x-vehicle-gps-key: <VEHICLE_GPS_SECRET>
           Body: { plateNumber, lat, lng, heading? }
        → Tìm ActiveShift active có plateNumber khớp (normalize)
        → locationSource='vehicle'
        → triggerDispatchInBackground()
```

Không có ca active đúng biển số → lỗi (thiết bị **không** tự tạo ca).

### 4.3. Flow code — Staff check-in & GPS

```text
Mobile
  screen/Staff/Dashboard/hooks/useCheckInShift.ts
    → services/StaffShiftService.checkIn()
    → POST /api/staff-shifts/check-in

  screen/Staff/ActiveShift/index.tsx
    → hooks/useStaffShiftLocation (enabled khi có ca active)
         getCurrentPositionAsync
         → StaffShiftService.updateLocation()
         → POST /api/staff-shifts/location

Backend
  routes/activeShiftRoutes.js
  controllers/activeShiftController.js
    checkIn / updateLocation / advanceStop
  services/activeShiftService.js
    checkIn()
    updateLocation()          // locationSource staff + skip nếu vehicle mới
    advanceStop()             // currentStopOrder + optional snap stop
    updateLocationByVehicleDevice()  // A1-Full
```

### 4.4. Flow code — User live + map

```text
Mobile
  screen/Route/Detail/index.tsx
    loadLiveVehicles() mỗi 15s
      → LiveService.listRouteVehicles({ routeId })
      → <RouteDetailMap stops vehicles={liveVehicles} />

  screen/Route/Detail/RouteDetailMap.native.tsx
    Marker trạm (xanh/đỏ) + Marker xe (vàng) từ vehicle.location

  screen/Route/Detail/LiveTab/index.tsx
    Poll route-vehicles 15s (có stopId đang theo dõi để ETA)
    Chip trạm → NotifyService.upsertSubscription()

Backend
  routes/liveRoutes.js
    POST /route-vehicles | /eta | /crowding | /vehicle-gps
  controllers/liveController.js
  services/liveService.js
    listRouteVehicles()
    buildVehicleCard(shift, stops, targetStopId)
    getEta() / getCrowding()
  utils/liveTransit.js
    etaMinutesFromLocation()   // Haversine, ~5 m/s
    etaMinutesByStopGap()      // fallback ~3 phút/trạm
    crowdingLevel(loadRatio)
```

### 4.5. Cách tính ETA (MVP)

1. Nếu có `lastLat/lastLng` và trạm đích có tọa độ → khoảng cách / tốc độ ước lượng → phút.  
2. Nếu thiếu GPS → ước lượng theo số trạm còn lại (`currentStopOrder` → index đích).  
3. `getEta` trả `nearestEtaMinutes` = ETA nhỏ nhất trong các xe trên tuyến.

---

## 5. A2 — Push thông minh

### 5.1. Flow hệ thống

```text
[User] Login (dev/production build, không phải Expo Go)
        → usePushNotifications
        → xin quyền thông báo
        → getExpoPushTokenAsync
        → POST /api/notify/devices/register { token, platform: 'expo' }
        → DevicePushToken

[User] Tab “Xe đang chạy” → chọn trạm theo dõi
        → POST /api/notify/subscriptions/upsert
           { routeId, stopId, notifyBeforeMinutes: 5 }
        → TripSubscription

[Backend] Khi nào chạy dispatch?
        (a) Sau mỗi lần cập nhật GPS / advance-stop → triggerDispatchInBackground()
        (b) Cron / thủ công: npm run worker:push
        (c) HTTP: POST /api/notify/dispatch + x-worker-secret

[dispatchDueNotifications]
        Với mỗi TripSubscription active:
          - Bỏ qua nếu lastNotifiedAt < 20 phút (cooldown)
          - getEta(routeId, stopId)
          - Nếu nearestEtaMinutes ≤ notifyBeforeMinutes
            → pushService.sendToUser (Expo Push API)
            → cập nhật lastNotifiedAt
```

### 5.2. Flow code

```text
Mobile
  app/_layout.tsx → usePushNotifications()
  hooks/usePushNotifications/index.ts
    - Không import expo-notifications trên Expo Go (SDK 53+)
    - Dynamic import chỉ khi không phải StoreClient
  services/NotifyService → /notify/*

  LiveTab → notifyService.upsertSubscription()

Backend
  routes/subscriptionRoutes.js
    /devices/register, /subscriptions/*, /dispatch
  services/subscriptionService.js
  services/pushDispatchService.js
    dispatchDueNotifications()
    triggerDispatchInBackground()
  services/pushService.js
    sendToUser() → https://exp.host/--/api/v2/push/send
  workers/runPushDispatch.js   // npm run worker:push
```

### 5.3. Loại push đã làm / chưa làm

| Loại (theo proposal) | MVP hiện tại |
|----------------------|--------------|
| Xe sắp tới trạm (ETA ≤ ngưỡng) | ✅ |
| Xe trễ so với lịch | ❌ |
| Hết ca / không còn xe | ❌ |
| Vé tháng sắp hết hạn | ❌ |
| Deep-link từ push → màn live | ❌ (payload có `routeId`/`stopId` sẵn) |

---

## 6. A3 — Crowding

### 6.1. Flow hệ thống

```text
[Staff] Quét QR hợp lệ trong ca
        → POST /api/tickets/verify-scanned-qr
        → ScanLog { shiftId, stopId?, isValid: true, … }
        → (vé lượt có thể chuyển used)

[User / API] live route-vehicles hoặc /crowding
        → Với mỗi ActiveShift:
             validScans = count ScanLog (shiftId, isValid, 45 phút gần nhất)
             capacity = Vehicle.capacity || 40
             loadRatio = min(validScans / capacity, 1.5)
             level = low | medium | high | full | unknown
        → Badge trên LiveTab
```

### 6.2. Flow code

```text
Ghi: ticketService.verifyScannedQr → ScanLog.create (có shiftId từ ca active)
Đọc: liveService.buildVehicleCard → ScanLog.countDocuments → crowdingLevel()
UI:  LiveTab crowdingLabel() + i18n live.crowding.*
```

**Giả định MVP:** chưa mô hình xuống xe; chỉ đếm lên xe qua scan hợp lệ trong cửa sổ thời gian.

---

## 7. A4 — Gợi ý đánh giá

### 7.1. Flow hệ thống

```text
[User] Đã có ticket “đã đi” (used / usedAt) trên tuyến X
        và chưa có Review(user, route X)
        ↓
[User] Mở Home
        → ReviewPromptCard
        → POST list routes { unreviewedOnly: true, limit: 1 }
        → Nếu có tuyến → hiện card “Đánh giá chuyến đi”
        → CTA → màn tạo review
        → “Để sau” → AsyncStorage dismiss 24h
```

### 7.2. Flow code

```text
Mobile
  screen/Home/index.tsx → <ReviewPromptCard />
  screen/Home/ReviewPromptCard.tsx
    routeService.getRoutes({ unreviewedOnly: true })
    DISMISS_KEY + cooldown 24h

Backend
  routeController.listRoutes (optionalAuth)
  routeService.listUnreviewedTraveledRoutes()
    Ticket.distinct(routeId đã dùng) − Review.distinct(route của user)
```

---

## 8. A5 — Tour packs

### 8.1. Flow hệ thống

```text
[Backend] TOUR_PACKS tĩnh (biển, sân bay…) đa ngữ vi/en/ja
[User] Home → TourPackPreview
        → POST /api/tour-packs/list { locale }
        → Card “Dành cho khách du lịch”
        → Tap → /help (FAQ / hướng dẫn — deep-link mua vé còn mỏng)
```

### 8.2. Flow code

```text
Backend: services/tourPackService.js (TOUR_PACKS) + tourPackRoutes
Mobile:  services/TourPackService + screen/Home/TourPackPreview.tsx
```

---

## 9. Bảng API nhanh

| Method | Path | Auth | Dùng cho |
|--------|------|------|----------|
| POST | `/api/staff-shifts/check-in` | staff | A1 tạo ca |
| POST | `/api/staff-shifts/location` | staff | A1-Lite GPS |
| POST | `/api/staff-shifts/advance-stop` | staff | A1 tiến trạm |
| POST | `/api/live/vehicle-gps` | `VEHICLE_GPS_SECRET` | A1-Full |
| POST | `/api/live/route-vehicles` | public | A1/A3 list xe |
| POST | `/api/live/eta` | public | A1/A2 ETA |
| POST | `/api/live/crowding` | public | A3 |
| POST | `/api/notify/devices/register` | user | A2 token |
| POST | `/api/notify/subscriptions/upsert` | user | A2 theo dõi |
| POST | `/api/notify/dispatch` | `WORKER_SECRET` | A2 worker HTTP |
| POST | `/api/tickets/verify-scanned-qr` | staff | A3 + A4 nền |
| POST | `/api/routes/listRoutes` + `unreviewedOnly` | user | A4 |
| POST | `/api/tour-packs/list` | public | A5 |

Env backend: `WORKER_SECRET`, `VEHICLE_GPS_SECRET` (xem `.env.example`).

---

## 10. Cây file liên quan

### Backend (`Backend-SmartBus`)

```text
app.js                          # mount /live /notify /staff-shifts /tour-packs
src/models/
  ActiveShift.js
  ScanLog.js
  TripSubscription.js
  DevicePushToken.js
  Vehicle.js
src/services/
  activeShiftService.js         # GPS staff / vehicle / advance-stop
  liveService.js                # buildVehicleCard, ETA, crowding
  pushDispatchService.js
  pushService.js
  subscriptionService.js
  tourPackService.js
src/utils/liveTransit.js
src/workers/runPushDispatch.js
src/routes/
  activeShiftRoutes.js
  liveRoutes.js
  subscriptionRoutes.js
  tourPackRoutes.js
```

### Mobile (`Mobile-SmartBus`)

```text
src/app/_layout.tsx             # usePushNotifications
src/hooks/
  useStaffShiftLocation/
  usePushNotifications/         # no-op Expo Go
src/services/
  LiveService/
  NotifyService/
  TourPackService/
  StaffShiftService/
src/screen/
  Staff/ActiveShift/
  Route/Detail/index.tsx        # poll vehicles + map
  Route/Detail/LiveTab/
  Route/Detail/RouteDetailMap.native.tsx
  Home/ReviewPromptCard.tsx
  Home/TourPackPreview.tsx
```

---

## 11. Cách test / ops

### Demo A1 (2 tài khoản)

1. Backend `npm run dev`.  
2. Staff: login → `/staff` → Nhận ca → cho GPS → giữ Active Shift.  
3. User: mở **cùng tuyến** → tab **Xe đang chạy** → marker vàng + ETA.  
4. Sai tuyến / chưa GPS / `API_BASE` sai → list trống.

### Demo A1-Full

```bash
curl -X POST http://localhost:3000/api/live/vehicle-gps \
  -H "Content-Type: application/json" \
  -H "x-vehicle-gps-key: <VEHICLE_GPS_SECRET>" \
  -d "{\"plateNumber\":\"43A-12345\",\"lat\":16.0544,\"lng\":108.2022}"
```

### Demo A2

1. User theo dõi trạm (subscription đã lưu — ngay cả Expo Go).  
2. Đưa ETA ≤ 5 phút (đứng gần / mock vehicle-gps).  
3. `cd Backend-SmartBus && npm run worker:push`  
4. Push hiển thị chỉ trên **dev/production build** (không Expo Go SDK 53+).

### Polling phía client

| Nguồn | Chu kỳ |
|-------|--------|
| Staff GPS | ~20s |
| User live list + map | ~15s |
| Push worker | theo cron / sau GPS (fire-and-forget) |

---

## 12. Giới hạn MVP & việc còn lại

| Hạng mục | Ghi chú |
|----------|---------|
| Expo Go | Không remote push; live map/ETA/subscription vẫn test được |
| Socket / &lt;5s live | Chưa — đang poll HTTP |
| “Xe gần tôi” trên Home | Chưa |
| ETA so với lịch (độ trễ) | Chưa |
| CrowdingSnapshot persist | Chưa — tính on-the-fly |
| Tour CMS / deep-link mua vé | Pack tĩnh; UX còn mỏng |
| Cron production | Cần gắn `worker:push` + EAS `projectId` |
| Hardware GPS xe | API sẵn; cần thiết bị thật gọi `vehicle-gps` |

---

## Liên kết

- Proposal / checklist Trục A: [`differentiation-proposal.md`](./differentiation-proposal.md) (§9)  
- README app (B2C + B2B overview): [`../README.md`](../README.md)  
- Backend roles / admin API: `Backend-SmartBus/doc/`
