export class HubBtn extends HTMLButtonElement {
  public get btnType (): string {
    const type = this.getAttribute('btnType')
    return type == null ? '' : type
  }

  public set btnType (type: string) {
    // setAttribute
    this.setAttribute('btnType', type)
    // update className
    this.className = this.getClassName()
  }

  public getClassName (): string {
    const baseClassNameArr = ['hub-btn']
    if (this.btnType != null) {
      baseClassNameArr.push(`btn-${this.btnType}`)
    }
    return baseClassNameArr.join(' ')
  }

  connectedCallback (): void {
    console.log('connectedCallback', this.getClassName())
    this.className = this.getClassName()
  }
}

window.customElements.define('hub-btn', HubBtn, { extends: 'button' })
