import { ProductCard } from './ProductCard.jsx'
import { StatusMessage } from './StatusMessage.jsx'
import { formatCategoryName } from '../lib/formatCurrency.js'

function ProductGridSkeleton() {
  return (
    <div
      className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4"
      aria-hidden="true"
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-xl border border-line">
          <div className="skeleton aspect-square w-full rounded-none" />
          <div className="space-y-2 p-3">
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-2/3" />
            <div className="skeleton h-11 w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

/** Parent đã xử lý nhánh "chưa chọn danh mục" trước khi render component này. */
export function ProductList({ selectedCategory, productsQuery }) {
  const { isPending, isError, error, data, refetch } = productsQuery
  // Ở lần render đầu khi mới đổi danh mục, data có thể chưa có -> luôn có giá trị mặc định.
  const products = data ?? []
  const hasProducts = products.length > 0

  return (
    <section aria-label="Danh sách sản phẩm" aria-busy={isPending}>
      <div className="flex flex-wrap items-baseline gap-2">
        <h2 className="font-display text-base font-semibold">Sản phẩm</h2>
        <p className="text-sm text-muted" aria-live="polite">
          {formatCategoryName(selectedCategory)} · {products.length} sản phẩm
        </p>
      </div>

      {isError ? (
        <div className="mt-3">
          <StatusMessage
            variant="error"
            title="Không tải được danh sách sản phẩm"
            description={error.message}
            action={
              <button
                type="button"
                onClick={() => refetch()}
                className="mt-2 min-h-11 rounded-lg border border-danger/40 px-4 text-sm font-semibold text-danger transition-colors duration-150 hover:bg-danger/10 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Thử lại
              </button>
            }
          />
        </div>
      ) : null}

      {isPending ? (
        <div className="mt-3">
          <p className="mb-3 text-sm text-muted" role="status">
            Đang tải...
          </p>
          <ProductGridSkeleton />
        </div>
      ) : null}

      {!isPending && !isError && products.length === 0 ? (
        <div className="mt-3">
          <StatusMessage
            variant="empty"
            title="Không có sản phẩm nào"
            description={`Danh mục ${formatCategoryName(
              selectedCategory,
            )} hiện chưa có sản phẩm.`}
          />
        </div>
      ) : null}

      {!isPending && !isError && hasProducts ? (
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : null}
    </section>
  )
}