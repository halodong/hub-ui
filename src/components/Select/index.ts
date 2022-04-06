import { hasClass } from 'utils'
import { Drop } from 'components/Drop'
import {
  baseClassName,
  disabledClassName,
  dropClassName,
  iconClassName,
  itemClassName,
  selectedClassName,
  iconCommonClassName
} from './classNames'
const downArrow = `<svg class="${iconClassName}"width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z" fill="currentColor" /></svg>`
const upArrow = `<svg class="${iconClassName}"width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.6569 16.2427L19.0711 14.8285L12.0001 7.75739L4.92896 14.8285L6.34317 16.2427L12.0001 10.5858L17.6569 16.2427Z" fill="currentColor" /></svg>`
const close = `<svg class="${iconCommonClassName}" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z" fill="currentColor" /></svg>`
class HubSelect extends HTMLElement {
  public container: HTMLDivElement
  public multipleContainer: HTMLDivElement | null = null
  public input: HTMLInputElement
  public drop: Drop | null = null
  public multiple: boolean
  public selectedIndexs: string[] = []
  public _datasource: any[] = []
  public _onselect: (key?: string | string[]) => void = () => {}

  constructor () {
    super()
    this.container = document.createElement('div')
    this.container.classList.add(baseClassName)
    this.input = document.createElement('input')
    const placeholder = this.getAttribute('placeholder')
    if (placeholder != null) this.input.placeholder = placeholder
    this.input.readOnly = true
    this.input.classList.add('hub-input')
    // TODO 初始选中的值

    if (this.getAttribute('multiple') != null) {
      this.multiple = true
    } else {
      this.multiple = false
    }

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

  public set selectCallback (onselect: (key?: string | string[]) => void) {
    this._onselect = onselect
    this.refresh()
  }

  public get selectCallback (): (key?: string | string[]) => void {
    return this._onselect
  }

  getItemClassName (data, isSelected: boolean): string {
    const initial = [itemClassName]
    if (data.disable === true) {
      initial.push(disabledClassName)
    }
    if (data.selected === true) {
      initial.push(selectedClassName)
    }
    if (isSelected) initial.push(selectedClassName)
    return initial.join(' ')
  }

  refresh (): void {
    const html = this._datasource.map((data) => {
      let isSelected = false
      if (this.selectedIndexs.includes(data.index)) {
        isSelected = true
      }
      return `<li class="${this.getItemClassName(
        data,
        isSelected
      )}" dataindex="${data.index as string}">${data.label as string}</li>`
    })
    if (this.drop?.content != null) {
      this.drop.content.innerHTML = `<ul class="${dropClassName}" style="width:${
        this.input.offsetWidth
      }px">${html.join('')}</ul>`
    } else {
      this.drop = new Drop({
        target: this.input,
        content: `<ul class="${dropClassName}">${html.join('')}</ul>`,
        contentClasses: baseClassName,
        position: 'bottom center',
        constrainToWindow: false,
        constrainToScrollParent: false
      })
    }
    const icon = this.container.querySelector(`.${iconClassName}`)

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

  renderMultiple = (): void => {
    if (this.multipleContainer == null) {
      this.multipleContainer = document.createElement('div')
      this.multipleContainer.classList.add('hub-selected-tags')
      this.container.append(this.multipleContainer)
    }
    const html = this.selectedIndexs.map((dataIndex) => {
      const label = this._datasource.find((data) => data.index === dataIndex)
        .label as string
      return `<span class="${'hub-tag'}" dataindex="${dataIndex}">${label}${close}</span>`
    })
    this.multipleContainer.innerHTML = html.join('')
    this.multipleContainer.addEventListener('click', this.handleCloseIcon)
    if (this.selectedIndexs.length !== 0 && this.multiple) {
      this.input.placeholder = ''
    }
  }

  handleSelect = (e): void => {
    if (e.target.tagName.toLowerCase() !== 'li') return
    if (hasClass(e.target, disabledClassName)) return
    const label = (e.target as HTMLElement).innerHTML
    const dataIndex = e.target.getAttribute('dataindex')
    if (this.multiple) {
      if (hasClass(e.target, selectedClassName)) {
        e.target.classList.remove(selectedClassName)
      } else {
        e.target.classList.add(selectedClassName)
      }
      if (this.selectedIndexs.includes(dataIndex)) {
        this.selectedIndexs = this.selectedIndexs.filter(
          (idx) => idx !== dataIndex
        )
      } else {
        this.selectedIndexs.push(dataIndex)
      }
      this.selectCallback(this.selectedIndexs)
      this.renderMultiple()
    } else {
      this.input.value = label
      this.selectCallback(dataIndex)
      this.drop?.close(e)
    }
  }

  handleOpen = (): void => {
    this.refresh()
  }

  handleCloseIcon = (e): void => {
    if (hasClass(e.target, iconCommonClassName)) {
      this.selectedIndexs = this.selectedIndexs.filter(
        (v) => v !== e.target.parentNode.getAttribute('dataindex')
      )
      e.target.parentNode.remove()
      this.drop?.close(e)
      this.refresh()
    }
  }

  bindEvent (): void {
    this.input.addEventListener('click', this.handleOpen)
    this.drop?.content?.addEventListener('click', this.handleSelect)
  }
}

customElements.define(baseClassName, HubSelect)
