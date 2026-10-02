import { MinusIcon, PlusIcon, TrashIcon } from './icons.jsx'
import { formatCurrency } from '../lib/formatCurrency.js'

/** Presentational: nhận item + callback, không tự đọc store. */
export function CartItemRow({ item, onIncrease, onDecrease, onRemove }) {
  const lineTotal = item.price * item.quantity

  return (
    <li className="flex items-start gap-3 border-b border-line py-4 last:border-b-0">
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-ink">{item.title}</p>
        <p className="mt-0.5 text-sm text-muted">
          Đơn giá:{' '}
          <span className="tabular-nums">{formatCurrency(item.price)}</span>
        </p>

        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-line">
            <button
              type="button"
              onClick={onDecrease}
              // Số lượng tối thiểu là 1, muốn bỏ hẳn sản phẩm thì dùng nút xóa.
              disabled={item.quantity <= 1}
              aria-label={`Giảm số lượng ${item.title}`}
              className="flex min-h-11 min-w-11 items-center justify-center rounded-l-lg text-ink transition-colors duration-150 hover:bg-line/60 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <MinusIcon />
            </button>

            <span
              className="min-w-10 text-center text-sm font-bold tabular-nums"
              aria-live="polite"
            >
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={onIncrease}
              aria-label={`Tăng số lượng ${item.title}`}
              className="flex min-h-11 min-w-11 items-center justify-center rounded-r-lg text-ink transition-colors duration-150 hover:bg-line/60 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <PlusIcon />
            </button>
          </div>

          <button
            type="button"
            onClick={onRemove}
            aria-label={`Xóa ${item.title} khỏi giỏ hàng`}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line text-danger transition-colors duration-150 hover:bg-danger/10 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      <p className="shrink-0 text-right text-sm font-bold tabular-nums text-ink">
        {formatCurrency(lineTotal)}
      </p>
    </li>
  )
}