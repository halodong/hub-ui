class HubBtn extends HTMLElement {
  constructor() {
    super();
    console.log("1", this.childNodes);
    var shadow = this.attachShadow({ mode: "open" });
    var content = document.createElement("button");
    content.innerHTML = "h";
    content.setAttribute("class", "hui");
    shadow.appendChild(content);
  }
}

window.customElements.define("hub-btn", HubBtn);
