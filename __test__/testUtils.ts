export const elHasClassName = (el: HTMLElement | null = null, className: string): boolean => {
  if (el == null) return false
  return el?.classList.contains(className)
}
