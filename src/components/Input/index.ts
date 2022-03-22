export class HubInput extends HTMLElement {
  public wrapEl: HTMLDivElement
  public innerEl: HTMLInputElement
  public afterEl: HTMLDivElement | null = null
  public beforeEl: HTMLDivElement | null = null

  constructor () {
    super()

    const wrap = (this.wrapEl = document.createElement('div'))
    const inner = (this.innerEl = document.createElement('input'))
    wrap.className = 'hub-input-wrapper'
    inner.className = 'hub-input-inner'
    wrap.appendChild(inner)
    this.append(wrap)
  }

  public addBeforeEl (label: string): void {
    const before = document.createElement('div')
    before.className = 'hub-input-group-prepend'
    before.innerHTML = label
    this.beforeEl = before
    this.wrapEl.insertBefore(before, this.innerEl)
  }

  public addAfterEl (label: string): void {
    const after = document.createElement('div')
    after.className = 'hub-input-group-append'
    after.innerHTML = label
    this.afterEl = after
    this.wrapEl.append(after)
  }

  public get addonBefore (): string {
    const beforeLabel = this.getAttribute('addonBefore') as string
    return beforeLabel
  }

  public set addonBefore (beforeLabel: string) {
    beforeLabel != null && this.setAttribute('addonBefore', beforeLabel)
  }

  public get addonAfter (): string {
    const afterLabel = this.getAttribute('addonAfter') as string
    return afterLabel
  }

  public set addonAfter (afterLabel: string) {
    afterLabel != null && this.setAttribute('addonAfter', afterLabel)
  }

  public get size (): InputSize {
    const type = this.getAttribute('size') as InputSize
    return type
  }

  public get disabled (): InputDisabled {
    const disabled = this.getAttribute('disabled') as InputDisabled
    return disabled
  }

  connectedCallback (): void {
    if (this.addonBefore != null) {
      this.addBeforeEl(this.addonBefore)
      this.wrapEl.classList.add('input-group-prepend')
    }
    if (this.addonAfter != null) {
      this.addAfterEl(this.addonAfter)
      this.wrapEl.classList.add('input-group-append')
    }
    if (this.size != null) {
      this.wrapEl.classList.add(`input-size-${this.size}`)
    }
    if (this.disabled === '' || this.disabled === 'true') {
      this.innerEl.setAttribute('disabled', 'true')
    }
    this.wrapEl.classList.add('input-group')
  }
}

window.customElements.define('hub-input', HubInput)

// types
// --------------------------------------------------------------------------------------------------------------
export type InputSize = 'lg' | 'sm' | null
export type InputDisabled = string| null
