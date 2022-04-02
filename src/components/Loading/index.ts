const loadingClassName = 'hub-loading'

const Loading = (el, options?): void => {
  el.classList.add(loadingClassName)
}
const unLoading = (el, options?): void => {
  el.classList.remove(loadingClassName)
}
Object.defineProperty(HTMLElement.prototype, 'loading', {
  value (val: boolean = true, options?) {
    if (val) {
      Loading(this, options)
    } else {
      unLoading(this, options)
    }
  }
})
