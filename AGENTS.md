# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v54.0.0/ before writing any code.

## Routing

**Đọc [docs/ROUTING.md](../docs/ROUTING.md) trước khi thêm/sửa route.**

Tóm tắt:

- `(tabs)/` — chỉ bottom tab (1 file = 1 tab), không nested Stack
- `(pages)/` — màn `router.push` / `router.back` (chi tiết, danh sách, form…)
- `src/screen/` — UI thật; `src/app/` — route mỏng
- Path dùng `src/constants/routes.ts`, không hardcode string rải rác
