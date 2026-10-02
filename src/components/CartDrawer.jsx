import { useEffect, useRef } from 'react'
import { useCartStore } from '../stores/useCartStore.js'
import { formatCurrency } from '../lib/formatCurrency.js'
import { CartItemRow } from './CartItemRow.jsx'
import { CloseIcon } from './icons.jsx'
import { StatusMessage } from './StatusMessage.jsx'

export function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen)
  const closeCart = useCartStore((state) => state.closeCart)
  // Phải chọn items để component render lại mỗi khi giỏ đổi,
  // nếu chỉ lấy getTotalPrice thì tổng tiền sẽ không cập nhật.
  const items = useCartStore((state) => state.items)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeFromCart = useCartStore((state) => state.removeFromCart)

  const closeButtonRef = useRef(null)

  // Đóng bằng phím Esc
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeCart()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeCart])

  // Khoá cuộn trang + đưa focus vào drawer khi mở
  useEffect(() => {
    if (!isOpen) return

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Overlay: click để đóng. aria-hidden vì không mang thông tin. */}
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-ink/40 transition-opacity duration-200 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Giỏ hàng"
        // Khi đóng, drawer bị ẩn hoàn toàn nên không để focus/AT chạm vào.
        // Khi mở, phần nội dung phía sau được đánh dấu inert trong App.jsx.
        inert={!isOpen}
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-line bg-surface transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-lg font-semibold">
            Giỏ hàng
            {items.length > 0 ? (
              <span className="ml-2 text-sm font-normal text-muted">
                {items.length} loại
              </span>
            ) : null}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeCart}
            aria-label="Đóng giỏ hàng"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line text-ink transition-colors duration-150 hover:bg-line/60 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <CloseIcon />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <div className="py-6">
              <StatusMessage
                variant="empty"
                title="Giỏ hàng trống"
                description="Chọn danh mục rồi bấm “Thêm vào giỏ” ở sản phẩm bạn muốn."
              />
            </div>
          ) : (
            <ul>
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                  onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                  onRemove={() => removeFromCart(item.id)}
                />
              ))}
            </ul>
          )}
        </div>

        <footer className="border-t border-line px-5 py-4">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-muted">Tổng thanh toán</span>
            <span
              data-testid="cart-total"
              aria-live="polite"
              className="font-display text-xl font-bold tabular-nums text-ink"
            >
              {formatCurrency(getTotalPrice())}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted">
            Giỏ hàng tạm thời, tải lại trang sẽ trở về rỗng.
          </p>
        </footer>
      </aside>
    </>
  )
}