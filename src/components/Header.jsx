import { useCartStore } from '../stores/useCartStore.js'
import { CartIcon } from './icons.jsx'

export function Header() {
  const openCart = useCartStore((state) => state.openCart)
  // Tổng số lượng = cộng hết quantity, không phải số loại sản phẩm.
  const items = useCartStore((state) => state.items)
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <h1 className="font-display text-lg font-bold tracking-tight sm:text-xl">
            K20 Shop
          </h1>
          <p className="hidden text-xs text-muted sm:block">
            Zustand cho giỏ hàng · TanStack Query cho dữ liệu API
          </p>
        </div>

        <button
          type="button"
          onClick={openCart}
          className="flex min-h-11 items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:px-4"
        >
          <CartIcon />
          <span>Giỏ hàng</span>
          <span
            data-testid="cart-quantity"
            aria-live="polite"
            className="flex min-w-6 items-center justify-center rounded-full bg-white/20 px-1.5 py-0.5 text-xs font-bold tabular-nums"
          >
            {totalQuantity}
          </span>
          <span className="sr-only">sản phẩm trong giỏ</span>
        </button>
      </div>
    </header>
  )
}