class HubSelect extends HTMLElement {
  public _datasource: any[] = []
  public set datasource (datasource: any[]) {
    this._datasource = datasource
    this.refresh()
  }

  public get datasource (): any[] {
    return this._datasource
  }

  public refresh (): void {
    console.log(this._datasource)
  }

  attributeChangedCallback (name, oldValue, newValue): void {
    console.log('属性变化')
  }
}

window.customElements.define('hub-select', HubSelect)
