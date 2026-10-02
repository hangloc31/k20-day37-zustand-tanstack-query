const ICON_PROPS = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
}

export function CartIcon(props) {
  return (
    <svg {...ICON_PROPS} {...props}>
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M2 3h2.2l2.3 12.2a1.5 1.5 0 0 0 1.5 1.3h9.1a1.5 1.5 0 0 0 1.5-1.2L21 7H5.2" />
    </svg>
  )
}

export function CloseIcon(props) {
  return (
    <svg {...ICON_PROPS} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

export function PlusIcon(props) {
  return (
    <svg {...ICON_PROPS} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function MinusIcon(props) {
  return (
    <svg {...ICON_PROPS} {...props}>
      <path d="M5 12h14" />
    </svg>
  )
}

export function TrashIcon(props) {
  return (
    <svg {...ICON_PROPS} {...props}>
      <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13M10 11v5M14 11v5" />
    </svg>
  )
}