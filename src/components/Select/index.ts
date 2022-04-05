import { hasClass } from 'utils'
import { Drop } from 'components/Drop'
const downArrow = '<svg class="hub-select-icon"width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z" fill="currentColor" /></svg>'
const upArrow = '<svg class="hub-select-icon"width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.6569 16.2427L19.0711 14.8285L12.0001 7.75739L4.92896 14.8285L6.34317 16.2427L12.0001 10.5858L17.6569 16.2427Z" fill="currentColor" /></svg>'
class HubSelect extends HTMLElement {
  public container: HTMLDivElement
  public input: HTMLInputElement
  public drop: Drop| null = null

  public _datasource: any[] = []
  public _onselect: (key?: string) => void = () => {}

  constructor () {
    super()
    this.container = document.createElement('div')
    this.container.classList.add('hub-select')
    this.input = document.createElement('input')
    this.input.readOnly = true
    this.input.classList.add('hub-input')
    this.input.value = 'a'
    this.container.appendChild(this.input)
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
    const initial = ['hub-select-item']
    if (data.disable === true) {
      initial.push('is-disabled')
    }
    if (data.selected === true) {
      initial.push('is-selected')
    }
    return initial.join(' ')
  }

  refresh (): void {
    const html = this._datasource.map((data) => `<li class="${this.getItemClassName(data)}">${(data.label as string)}</li>`)
    if (this.drop?.content != null) {
      this.drop.content.innerHTML = `<ul class="hub-select-drop" style="width:${this.input.offsetWidth}px">${html.join('')}</ul>`
    } else {
      this.drop = new Drop({
        target: this.input,
        content: `<ul class="hub-select-drop">${html.join('')}</ul>`,
        contentClasses: 'hub-select',
        position: 'bottom center',
        constrainToWindow: false,
        constrainToScrollParent: false
      })
    }
    const icon = this.container.querySelector('.hub-select-icon')

    if (icon != null) {
      icon.remove()
      if (!this.drop.isOpened()) {
        this.container.insertAdjacentHTML('beforeend', downArrow)
      } else {
        this.container.insertAdjacentHTML('beforeend', upArrow)
      }
    } else {
      this.container.insertAdjacentHTML('beforeend', downArrow)
    }
  }

  handleSelect = (e): void => {
    if (e.target.tagName.toLowerCase() !== 'li') return
    if (hasClass(e.target, 'is-disabled')) return
    this.input.value = (e.target as HTMLElement).innerHTML
    this.selectCallback((e.target as HTMLElement).innerHTML)
    this.drop?.close(e)
  }

  handleOpen = (): void => {
    this.refresh()
  }

  bindEvent (): void {
    this.input.addEventListener('click', this.handleOpen)
    this.drop?.content?.addEventListener('click', this.handleSelect)
  }

  // TODO multiple
}

customElements.define('hub-select', HubSelect)
