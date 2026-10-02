import { useState } from 'react'
import { useCategoryStore } from '../stores/useCategoryStore.js'
import { formatCategoryName } from '../lib/formatCurrency.js'
import { StatusMessage } from './StatusMessage.jsx'

export function CategoryList({ categoriesQuery }) {
  const selectedCategory = useCategoryStore((state) => state.selectedCategory)
  const setSelectedCategory = useCategoryStore(
    (state) => state.setSelectedCategory,
  )

  // Mobile: 24 danh mục dạng chip sẽ đẩy lưới sản phẩm xuống rất xa,
  // nên mặc định thu gọn, chỉ mở khi người dùng bấm. Desktop luôn hiện đủ.
  const [isExpanded, setIsExpanded] = useState(false)

  // Chọn danh mục thì thu gọn lại ngay để lưới sản phẩm lọt vào khung nhìn.
  const handleSelectCategory = (category) => {
    setSelectedCategory(category)
    setIsExpanded(false)
  }

  const { isPending, isError, error, data, refetch } = categoriesQuery
  const categories = data ?? []

  return (
    <nav aria-label="Danh mục sản phẩm" className="lg:sticky lg:top-24">
      <h2 className="font-display text-base font-semibold">Danh mục</h2>

      {isPending ? (
        <div className="mt-3 space-y-2" aria-busy="true">
          <p className="text-sm text-muted">Đang tải danh mục...</p>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="skeleton h-11 w-full" />
          ))}
        </div>
      ) : null}

      {isError ? (
        <div className="mt-3">
          <StatusMessage
            variant="error"
            title="Không tải được danh mục"
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

      {!isPending && !isError && categories.length === 0 ? (
        <div className="mt-3">
          <StatusMessage
            variant="empty"
            title="Không có danh mục nào"
            description="API trả về danh sách rỗng."
          />
        </div>
      ) : null}

      {!isPending && !isError && categories.length > 0 ? (
        <>
          {/* Mobile: chip của danh mục đang chọn + nút mở danh sách */}
          <div className="mt-3 flex flex-col gap-2 lg:hidden">
            {selectedCategory && !isExpanded ? (
              <p className="flex min-h-11 items-center rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-white">
                {formatCategoryName(selectedCategory)}
              </p>
            ) : null}

            <button
              type="button"
              onClick={() => setIsExpanded((value) => !value)}
              aria-expanded={isExpanded}
              aria-controls="category-list"
              className="min-h-11 w-full rounded-lg border border-line px-3 py-2 text-sm font-semibold text-ink transition-colors duration-150 hover:bg-line/60 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {isExpanded
                ? 'Ẩn danh mục'
                : `Chọn danh mục khác (${categories.length})`}
            </button>
          </div>

          <ul
            id="category-list"
            className={`mt-3 flex-wrap gap-2 lg:mt-3 lg:flex lg:flex-col lg:gap-1 ${
              isExpanded ? 'flex' : 'hidden'
            }`}
          >
            {categories.map((category) => {
              const isSelected = category === selectedCategory

              return (
                <li key={category} className="lg:w-full">
                  <button
                    type="button"
                    onClick={() => handleSelectCategory(category)}
                    aria-pressed={isSelected}
                    className={`min-h-11 w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                      isSelected
                        ? 'bg-accent text-white'
                        : 'bg-surface text-muted hover:bg-line/60 hover:text-ink'
                    }`}
                  >
                    {formatCategoryName(category)}
                  </button>
                </li>
              )
            })}
          </ul>
        </>
      ) : null}
    </nav>
  )
}