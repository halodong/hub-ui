import { hasClass } from 'utils'
import { baseClassName, itemClassName, itemDisabledClassName, itemActiveClassName } from './constant'

class HubTabs extends HTMLElement {
  public container: HTMLUListElement
  public active: HTMLLIElement | null = null
  public _datasource: any[] = []
  public _onselect: (key?: string) => void = () => {}
  constructor () {
    super()
    this.container = document.createElement('ul')
    this.container.classList.add(baseClassName)
    this.refresh()
    this.bindEvent()
    this.appendChild(this.container)
  }

  public set datasource (datasource: any[]) {
    this._datasource = datasource
    this.refresh()
  }

  public get datasource (): any[] {
    return this._datasource
  }

  public set selectCallback (onselect: (key?: string) => void) {
    this._onselect = onselect
    this.refresh()
  }

  public get selectCallback (): (key?: string) => void {
    return this._onselect
  }

  getItemClassName (data): string {
    const initial = [itemClassName]
    if (data.disable === true) {
      initial.push(itemDisabledClassName)
    }
    return initial.join(' ')
  }

  refresh (): void {
    const html = this._datasource.map(
      (data) =>
        `<li class="${this.getItemClassName(data)}">${
          data.label as string
        }</li>`
    )
    this.container.innerHTML = html.join('')
  }

  handleClick (e): void {
    if (e.target.tagName.toLowerCase() !== 'li') return
    if (hasClass(e.target, itemDisabledClassName)) return
    if (this.active != null) {
      this.active.classList.remove(itemActiveClassName)
    }
    this.active = e.target as HTMLLIElement
    this.active.classList.add(itemActiveClassName)
    console.log(this.active.classList)
  }

  bindEvent (): void {
    this.container.addEventListener('click', this.handleClick)
  }
}

customElements.define(baseClassName, HubTabs)
