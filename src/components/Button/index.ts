class HubBtn extends HTMLElement {
  constructor() {
    super();
    console.log("1", this.childNodes);
    var shadow = this.attachShadow({ mode: "closed" });
    var content = document.createElement("button");
    content.innerHTML = "h";
    shadow.appendChild(content);
  }
}

window.customElements.define("hub-btn", HubBtn);
