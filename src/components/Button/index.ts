export class HubBtn extends HTMLButtonElement {
  public get btnType (): string {
    const type = this.getAttribute('h-type')
    return type == null ? '' : type
  }

  public set btnType (type: string) {
    this.setAttribute('h-type', type)
    // TODO
    // process className
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
