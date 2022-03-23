export class HubInput extends HTMLInputElement {
  public get inputSize (): InputSize {
    const size = this.getAttribute('inputSize') as InputSize
    return size
  }

  public getClassName (): string {
    const baseClassNameArr = ['hub-input']
    if (this.size != null) {
      baseClassNameArr.push(`input-size-${this.size}`)
    }
    return baseClassNameArr.join(' ')
  }

  connectedCallback (): void {
    this.className = this.getClassName()
  }
}

window.customElements.define('hub-input', HubInput, { extends: 'input' })

// types
// --------------------------------------------------------------------------------------------------------------
export type InputSize = 'lg' | 'sm' | null
