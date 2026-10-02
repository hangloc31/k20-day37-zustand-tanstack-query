# K20 Shop — Zustand + TanStack Query

Một trang mua sắm gộp hai bài:

- **Bài 1 — Giỏ hàng tạm thời bằng Zustand**: `useCartStore` chia sẻ dữ liệu giỏ giữa danh sách sản phẩm, Header và drawer giỏ hàng, không truyền props qua nhiều cấp.
- **Bài 2 — Danh mục & danh sách sản phẩm bằng TanStack Query**: hai `useQuery` gọi DummyJSON, phân biệt rõ client state (`selectedCategory`) với server state (danh mục, sản phẩm).

## Chạy

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint
```

## Cấu trúc

```
src/
  main.jsx                  QueryClientProvider
  App.jsx                   Header + CatalogContent + CartDrawer
  lib/queryClient.js        QueryClient khởi tạo ở module scope (tạo đúng 1 lần)
  lib/api.js                fetchCategories / fetchProductsByCategory (kiểm tra response.ok)
  lib/formatCurrency.js     formatCurrency + formatCategoryName
  stores/useCartStore.js    items, addToCart, updateQuantity, removeFromCart, getTotalPrice
  stores/useCategoryStore.js selectedCategory
  components/Header.jsx     tổng số lượng = cộng hết quantity
  components/CategoryList.jsx
  components/ProductList.jsx
  components/ProductCard.jsx
  components/CartDrawer.jsx
  components/CartItemRow.jsx
  components/StatusMessage.jsx  loading / error / rỗng
  components/icons.jsx
```

## Điểm cần chú ý

- **Giỏ hàng không mất khi đổi danh mục**: giỏ nằm ở `useCartStore`, danh mục chỉ là client state riêng.
- **Component hiển thị tổng tiền phải chọn `items`**: `CartDrawer` chọn cả `items` lẫn `getTotalPrice`; nếu chỉ lấy action thì tổng tiền không render lại.
- **Đổi danh mục không dùng `useEffect` + `refetch()`**: chỉ đổi `queryKey` thành `['products', selectedCategory]`, TanStack Query tự lấy dữ liệu hoặc dùng cache.
- **`updateQuantity` từ chối** số lượng không phải số nguyên dương (0, âm, 1.5, `'2'`); muốn bỏ sản phẩm thì dùng nút xóa.
- **Tiền tệ**: `price` của DummyJSON là USD nên hiển thị `$199.99`. Muốn đổi sang VND thì sửa `formatCurrency` trong `src/lib/formatCurrency.js`.
- **Tự kiểm tra nhánh lỗi HTTP**: gọi `setApiBase('https://dummyjson.com/api-typo')` trong console để thấy thông báo `(HTTP 404)`, rồi gọi `setApiBase()` để khôi phục.

## Kiểm thử nhanh

Thêm A (100) hai lần và B (50) một lần → Header hiện **3**, giỏ có **2 dòng**, tổng **250**. Đổi A thành 3 → tổng **350**. Xóa A → Header **1**, tổng **50**. Giỏ rỗng → số lượng và tổng tiền đều **0**, hiện “Giỏ hàng trống”.