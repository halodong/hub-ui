import { hasClass } from 'utils'
import {
  baseClassName,
  itemClassName,
  disabledClassName,
  activeClassName
} from './classNames'

class HubTabs extends HTMLElement {
  public container: HTMLUListElement
  public activeTab: HTMLLIElement | null = null
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
      initial.push(disabledClassName)
    }
    return initial.join(' ')
  }

  refresh (): void {
    const html = this._datasource.map(
      (data) =>
        `<li class="${this.getItemClassName(data)}" dataindex="${
          data.index as string
        }">${data.label as string}</li>`
    )
    this.container.innerHTML = html.join('')
  }

  handleClick = (e): void => {
    if (e.target.tagName.toLowerCase() !== 'li') return
    if (hasClass(e.target, disabledClassName)) return
    if (this.activeTab != null && hasClass(this.activeTab, activeClassName)) {
      this.activeTab.classList.remove(activeClassName)
    }
    this.activeTab = e.target as HTMLLIElement
    this.activeTab.classList.add(activeClassName)
    this.selectCallback(e.target.getAttribute('dataindex'))
  }

  bindEvent (): void {
    this.container.addEventListener('click', this.handleClick)
  }
}

customElements.define(baseClassName, HubTabs)
