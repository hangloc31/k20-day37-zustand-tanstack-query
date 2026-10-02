import { create } from 'zustand'

/**
 * Client state (Bài 2): danh mục đang chọn.
 * Server state (danh mục + sản phẩm) nằm trong cache của TanStack Query, không copy vào đây.
 */
export const useCategoryStore = create((set) => ({
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}))