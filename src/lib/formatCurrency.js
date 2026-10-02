// DummyJSON trả `price` theo USD (ví dụ 199.99), nên format theo USD cho đúng dữ liệu.
// Muốn hiển thị VND thì đổi currency thành 'VND' và bỏ maximumFractionDigits: 0.
const CURRENCY_FORMAT = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatCurrency(value) {
  return CURRENCY_FORMAT.format(value)
}

/** "home-decoration" -> "Home Decoration" */
export function formatCategoryName(category) {
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}