/**
 * Thông báo dùng chung cho các trạng thái: tải, lỗi, danh sách rỗng.
 * Không dùng màu làm tín hiệu duy nhất - luôn có icon + nhãn chữ kèm theo.
 */
export function StatusMessage({ variant = 'info', title, description, action }) {
  const styles = {
    info: 'border-line bg-surface text-muted',
    error: 'border-danger/40 bg-danger/5 text-danger',
    empty: 'border-line bg-surface text-muted',
  }[variant]

  const iconStyles = {
    info: 'text-muted',
    error: 'text-danger',
    empty: 'text-muted',
  }[variant]

  const icon = {
    info: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
    error: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M12 3l9 16H3l9-16z" />
        <path d="M12 9v4M12 17h.01" />
      </svg>
    ),
    empty: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M4 8h16l-1.2 11.2a1.5 1.5 0 0 1-1.5 1.3H6.7a1.5 1.5 0 0 1-1.5-1.3L4 8z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
    ),
  }[variant]

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={`flex flex-col items-center gap-2 rounded-xl border px-6 py-10 text-center ${styles}`}
    >
      <span className={iconStyles}>{icon}</span>
      <p className="font-semibold text-ink">{title}</p>
      {description ? <p className="text-sm">{description}</p> : null}
      {action}
    </div>
  )
}