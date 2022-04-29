const loadingClassName = 'hub-loading'
const Loading = (el: HTMLElement, options: Options): void => {
  if (options.size != null) {
    el.classList.add(`${loadingClassName}-${options.size}`)
  } else {
    el.classList.add(loadingClassName)
  }
}
const unLoading = (el: HTMLElement, options: Options): void => {
  if (options.size != null) {
    el.classList.remove(`${loadingClassName}-${options.size}`)
  } else {
    el.classList.remove(loadingClassName)
  }
}
Object.defineProperty(HTMLElement.prototype, 'loading', {
  value (val: boolean = true, options?) {
    const opts: Options = { ...options }
    if (val) {
      Loading(this, opts)
    } else {
      unLoading(this, opts)
    }
  }
})

export interface Options {
  size: 'sm' | 'lg'
}
