import { useQuery } from '@tanstack/react-query'
import { fetchCategories, fetchProductsByCategory } from './lib/api.js'
import { useCartStore } from './stores/useCartStore.js'
import { useCategoryStore } from './stores/useCategoryStore.js'
import { Header } from './components/Header.jsx'
import { CategoryList } from './components/CategoryList.jsx'
import { ProductList } from './components/ProductList.jsx'
import { CartDrawer } from './components/CartDrawer.jsx'
import { StatusMessage } from './components/StatusMessage.jsx'

function CatalogContent() {
  const selectedCategory = useCategoryStore((state) => state.selectedCategory)
  const isCartOpen = useCartStore((state) => state.isOpen)

  // Query 1: danh sách danh mục
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  // Query 2: sản phẩm theo danh mục đang chọn.
  // Đổi danh mục chỉ đổi queryKey -> TanStack Query tự lấy dữ liệu theo key mới,
  // không cần useEffect + refetch().
  const productsQuery = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => fetchProductsByCategory(selectedCategory),
    enabled: Boolean(selectedCategory),
  })

  return (
    <>
      <Header />

      {/* Khi drawer mở, phần này bị inert để focus không lọt ra khỏi dialog */}
      <div
        inert={isCartOpen}
        className="mx-auto max-w-7xl px-4 py-6 sm:px-6"
      >
        <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:gap-8">
          <CategoryList categoriesQuery={categoriesQuery} />

          {selectedCategory ? (
            <ProductList
              selectedCategory={selectedCategory}
              productsQuery={productsQuery}
            />
          ) : (
            <StatusMessage
              variant="info"
              title="Vui lòng chọn danh mục"
              description="Chọn một danh mục bên trái để xem danh sách sản phẩm."
            />
          )}
        </div>
      </div>
    </>
  )
}

export default function App() {
  return (
    <div className="min-h-dvh bg-canvas">
      <CartDrawer />
      <CatalogContent />
    </div>
  )
}