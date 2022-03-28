const className = 'hub-msg'

/**
 * TODO
 * messages no overlapping
 */
const allMsgs: Set<HTMLElement> = new Set()
const createMessageEl = (text): HTMLElement => {
  const container = document.createElement('div')
  container.classList.add(className)
  container.innerHTML = text
  return container
}
const addClassByType = (type: string, el: HTMLElement): void => {
  el.classList.add(`${className}-${type}`)
}

const handleOffsets = (el: HTMLElement): void => {
  el.style.top = `${allMsgs.size * 50}px`
}
const defaults = {
  type: 'primary',
  delay: 2000
}
export function message (options): void {
  const opts = { ...defaults, ...options }
  if (opts.text == null) {
    throw new Error('hubui message Error: You must provide a text.')
  }

  const { text, delay, type } = opts
  const container = createMessageEl(text)
  addClassByType(type, container)
  handleOffsets(container)
  document.body.append(container)
  allMsgs.add(container)

  setTimeout(() => {
    container.remove()
    allMsgs.delete(container)
  }, delay)
}

;(window as any).message = message
