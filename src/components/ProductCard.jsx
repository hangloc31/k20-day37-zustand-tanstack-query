import { useCartStore } from '../stores/useCartStore.js'
import { formatCurrency } from '../lib/formatCurrency.js'
import { PlusIcon } from './icons.jsx'

export function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart)
  const { id, title, price, thumbnail } = product

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors duration-150 hover:border-primary/40">
      <div className="aspect-square overflow-hidden bg-line/40">
        <img
          src={thumbnail}
          // Ảnh sản phẩm mang thông tin nên alt phải có nghĩa.
          alt={title}
          width="400"
          height="400"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-3">
        <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-ink">
          {title}
        </h3>

        <p className="font-display text-lg font-bold tabular-nums text-ink">
          {formatCurrency(price)}
        </p>

        <button
          type="button"
          onClick={() => addToCart({ id, title, price })}
          className="mt-auto flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          <PlusIcon width={16} height={16} />
          Thêm vào giỏ
        </button>
      </div>
    </article>
  )
}