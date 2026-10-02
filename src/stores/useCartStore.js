import { create } from 'zustand'

/**
 * Client state (Bài 1): giỏ hàng tạm thời.
 * Mỗi item: { id: number|string, title: string, price: number, quantity: number }
 * Không persist, không gọi API, không thanh toán. Tải lại trang là giỏ trở về rỗng.
 */
export const useCartStore = create((set, get) => ({
  items: [],
  isOpen: false,

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  /** Chưa có id -> thêm dòng mới quantity 1. Đã có -> tăng quantity lên 1. */
  addToCart: (product) =>
    set((state) => {
      const existing = state.items.find((item) => item.id === product.id)

      if (existing) {
        // Tạo mảng + object mới, không mutate state cũ.
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }
      }

      return {
        items: [
          ...state.items,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
          },
        ],
      }
    }),

  /** Chỉ nhận số lượng là số nguyên dương. Muốn bỏ sản phẩm thì dùng removeFromCart. */
  updateQuantity: (id, quantity) => {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      console.warn(
        `[useCartStore] Bỏ qua updateQuantity("${id}", ${quantity}): số lượng phải là số nguyên dương.`,
      )
      return
    }

    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    }))
  },

  /** Xóa hẳn dòng sản phẩm, bất kể số lượng hiện tại. */
  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  /** Tổng price * quantity của mọi sản phẩm trong giỏ. */
  getTotalPrice: () =>
    get().items.reduce((total, item) => total + item.price * item.quantity, 0),
}))