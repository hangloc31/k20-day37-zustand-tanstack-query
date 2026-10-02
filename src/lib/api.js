let API_BASE = 'https://dummyjson.com/products'

/**
 * Đổi base URL tạm thời để tự kiểm tra nhánh lỗi HTTP.
 * Ví dụ: setApiBase('https://dummyjson.com/api-typo') -> server trả 404,
 * UI sẽ hiện "Tải ... thất bại (HTTP 404)". Gọi lại không truyền tham số để khôi phục.
 */
export function setApiBase(base) {
  API_BASE = base ?? 'https://dummyjson.com/products'
}

/** Kiểm tra response.ok rồi mới đọc JSON, ném Error kèm mã HTTP khi 4xx/5xx. */
async function requestJSON(url, errorMessage) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`${errorMessage} (HTTP ${response.status})`)
  }

  return response.json()
}

/** Danh sách tên danh mục: trả về mảng string. */
export function fetchCategories() {
  return requestJSON(`${API_BASE}/category-list`, 'Tải danh mục thất bại')
}

/** Sản phẩm theo danh mục: object có thuộc tính `products`. */
export async function fetchProductsByCategory(category) {
  const data = await requestJSON(
    `${API_BASE}/category/${encodeURIComponent(category)}`,
    `Tải sản phẩm danh mục "${category}" thất bại`,
  )

  return data.products ?? []
}