const loadingClassName = 'hub-loading'
const defaultOptions = {
  row: '2'
}
const Loading = (el: HTMLElement, options: Options): void => {
  el.classList.add(loadingClassName)
}
const unLoading = (el: HTMLElement, options?): void => {
  el.classList.remove(loadingClassName)
}
Object.defineProperty(HTMLElement.prototype, 'loading', {
  value (val: boolean = true, options?) {
    const opts: Options = { ...defaultOptions, ...options }
    if (val) {
      Loading(this, opts)
    } else {
      unLoading(this, opts)
    }
  }
})

export interface Options {
  row: string
}
