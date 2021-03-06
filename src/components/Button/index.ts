export class HubBtn extends HTMLButtonElement {
  public get btnType (): BtnType {
    const type = this.getAttribute('btnType') as BtnType
    return type
  }

  public set btnType (type: BtnType) {
    type != null && this.setAttribute('btnType', type)
    this.classList.add(...this.getClassName())
  }

  public get size (): BtnSize {
    const size = this.getAttribute('size') as BtnSize
    return size
  }

  public getClassName (): string[] {
    const baseClassNameArr = ['hub-btn']
    if (this.btnType != null) {
      baseClassNameArr.push(`btn-${this.btnType}`)
    }
    if (this.size != null) {
      baseClassNameArr.push(`btn-${this.size}`)
    }
    return baseClassNameArr
  }

  connectedCallback (): void {
    this.classList.add(...this.getClassName())
  }
}

window.customElements.define('hub-btn', HubBtn, { extends: 'button' })

// types
// --------------------------------------------------------------------------------------------------------------
export type BtnType = 'primary' | 'danger' | 'normal' | null
export type BtnSize = 'lg' | 'sm' | null
