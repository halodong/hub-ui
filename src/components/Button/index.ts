class HubBtn extends HTMLButtonElement {
  constructor() {
    super();
  }
  static addClass () {
    console.log('addclass')
    return 'hub-btn'
  }
  connectedCallback(){
    console.log('connectedCallback')
    this.className = 'hub-btn'
  }
}

window.customElements.define("hub-btn", HubBtn,{ extends: 'button' });
