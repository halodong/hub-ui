export class HubBtn extends HTMLButtonElement {
  public get btnType (): BtnType {
    const type = this.getAttribute('btnType') as BtnType
    return type
  }

  public set btnType (type: BtnType) {
    type != null && this.setAttribute('btnType', type)
    this.className = this.getClassName()
  }

  public get size (): BtnSize {
    const type = this.getAttribute('size') as BtnSize
    return type
  }

  public getClassName (): string {
    const baseClassNameArr = ['hub-btn']
    if (this.btnType != null) {
      baseClassNameArr.push(`btn-${this.btnType}`)
    }
    if (this.size != null) {
      baseClassNameArr.push(`btn-${this.size}`)
    }
    return baseClassNameArr.join(' ')
  }

  connectedCallback (): void {
    this.className = this.getClassName()
  }
}

window.customElements.define('hub-btn', HubBtn, { extends: 'button' })

// types
// --------------------------------------------------------------------------------------------------------------
export type BtnType = 'primary' | 'danger' | 'normal' | null
export type BtnSize = 'lg' | 'sm' | null
