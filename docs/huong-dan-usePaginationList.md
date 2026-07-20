# Cách dùng `usePaginationList` trong React Native

## 1. Gọi API

```tsx
const {
    list: courses,
    loadFirstPage,
    loadMore,
    isSkeletonLoading: loading,
} = usePaginationList<ICourse>({
    fetchFn: async (payload) => {
        const res = await courseService.getListCourses(payload);
        return res.data;
    },
    limit: 18,
    params: { keyword: search, filter },
});
```

## 2. Gọi `loadFirstPage`

```tsx
useEffect(() => {
    loadFirstPage();
}, [search, filter]);
```

Khi `search` hoặc `filter` thay đổi, danh sách sẽ tải lại từ trang đầu.

## 3. Tải thêm khi cuộn trong React Native

React Native không dùng `Layout.Body` và `containerRef`. Dùng `FlatList` với `onEndReached`:

```tsx
<FlatList
    data={courses}
    keyExtractor={(item) => item._id}
    renderItem={({ item }) => (
        <CourseCard course={item} />
    )}
    onEndReached={loadMore}
    onEndReachedThreshold={0.5}
    ListEmptyComponent={!loading ? <NoData /> : null}
/>
```

- `onEndReached`: gọi `loadMore()` khi gần cuối danh sách.
- `onEndReachedThreshold={0.5}`: tải thêm khi còn khoảng 50% màn hình tới cuối.
- Vì vậy không cần dùng `useScrollToEnd` trong React Native.
