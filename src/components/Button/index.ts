class HubBtn extends HTMLButtonElement {
  static addClass (): string {
    console.log('addclass')

    return 'hub-btn'
  }

  connectedCallback (): void {
    console.log('connectedCallback')
    this.className = 'hub-btn'
  }
}

window.customElements.define('hub-btn', HubBtn, { extends: 'button' })
