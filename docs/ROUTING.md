# Routing

Expo Router file structure cho dự án DagoBus. Mục tiêu: **tab chỉ là tab**, màn **push/back** nằm riêng — tránh lẫn stack giữa các tab.

## Cây thư mục

```
src/app/
├── _layout.tsx              # Root Stack
├── (auth)/                  # Luồng đăng nhập (không có tab bar)
│   ├── _layout.tsx
│   ├── login.tsx            → /login
│   └── register.tsx         → /register
├── (tabs)/                  # CHỈ các tab bottom bar — 1 file = 1 tab
│   ├── _layout.tsx          # Tabs
│   ├── index.tsx            → /           (Trang chủ)
│   ├── notifications.tsx    → /notifications
│   ├── scan.tsx             → /scan
│   ├── payment.tsx          → /payment
│   └── profile.tsx          → /profile
└── (pages)/                 # Màn push lên trên tab (router.push / router.back)
    ├── _layout.tsx          # Stack
    ├── help.tsx             → /help          (Trung tâm trợ giúp / FAQ)
    ├── notice/
    │   ├── list.tsx         → /notice/list
    │   └── [id].tsx         → /notice/:id
    └── payment/
        ├── add.tsx          → /payment/add
        └── visa.tsx         → /payment/visa
```

Route group `(tabs)`, `(pages)`, `(auth)` **không xuất hiện trong URL** — chỉ để tổ chức code.

## Quy tắc

### 1. `(tabs)` — chỉ entry point của tab

| Được | Không được |
|------|------------|
| Một file mỏng import `src/screen/*` | Nested Stack (`index/_layout.tsx`, `payment/add.tsx` trong tabs) |
| `index.tsx`, `notifications.tsx`, … | Đặt danh sách/chi tiết trong tab folder |

Tab bar luôn hiển thị khi user ở các màn này.

### 2. `(pages)` — màn điều hướng sâu (push)

Dùng khi:

- Có nút **Back** (`router.back()`)
- Mở từ **nhiều tab** (vd. chi tiết tin từ Trang chủ, danh sách, tab Thông báo)
- Form / wizard (vd. thêm thẻ thanh toán)

Push bằng `router.push(ROUTES.pages.…)` — màn nằm trên **root stack**, không pollute stack của tab khác.

### 3. `src/screen/` — logic UI

```
src/app/…          → route mỏng (vài dòng)
src/screen/…       → component màn hình thật
src/constants/routes.ts → path tập trung, tránh hardcode string
```

## Luồng điều hướng mẫu

```
Trang chủ (tab)
  └─ push /news          → Danh sách tin (pages)
       └─ push /notice/6 → Chi tiết (pages)
            └─ back      → Danh sách
       └─ back           → Trang chủ

Tab Thanh toán
  └─ push /payment/add   → Thêm thẻ (pages)
       └─ back           → Tab Thanh toán
```

## Vì sao không nest Stack trong `(tabs)`?

Cấu trúc cũ (gây lỗi back):

```
(tabs)/index/news.tsx          ← stack tab Home
(tabs)/notifications/[id].tsx  ← stack tab Thông báo
```

Khi Trang chủ `push("/notifications/list")`, Expo **chuyển sang tab Thông báo** và `router.back()` lùi trong stack đó — không về Trang chủ.

**Giải pháp:** tab phẳng + màn push trong `(pages)` (hoặc root stack chung).

## Thêm route mới

| Loại | Đặt file | Ví dụ URL |
|------|----------|-----------|
| Tab mới | `(tabs)/foo.tsx` + cập nhật `constants/tabs.ts` | `/foo` |
| Màn push | `(pages)/foo.tsx` hoặc `(pages)/foo/[id].tsx` | `/foo`, `/foo/123` |
| Auth | `(auth)/foo.tsx` | `/foo` |


## Tham chiếu

- [Expo Router — Route groups](https://docs.expo.dev/router/layouts/#route-groups)
- [Expo SDK 54 docs](https://docs.expo.dev/versions/v54.0.0/)
