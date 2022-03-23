export class HubTextarea extends HTMLTextAreaElement {
  public getClassName (): string {
    const baseClassNameArr = ['hub-textarea']
    return baseClassNameArr.join(' ')
  }

  connectedCallback (): void {
    this.className = this.getClassName()
  }
}

window.customElements.define('hub-textarea', HubTextarea, {
  extends: 'textarea'
})

// types
// --------------------------------------------------------------------------------------------------------------
