export class HubBtn extends HTMLButtonElement {
  static getClassName (): string {
    console.log('getClassName')
    return 'hub-btn'
  }

  connectedCallback (): void {
    console.log('connectedCallback')
    this.className = HubBtn.getClassName()
  }
}

window.customElements.define('hub-btn', HubBtn, { extends: 'button' })
