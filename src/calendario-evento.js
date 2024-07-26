import attachCssToShadowDom from "./funciones";
const template = document.createElement("div");
template.className = "evento";
template.innerHTML = `
    <span class="evento__hora"></span>
    <span class="evento__descripcion"></span>
`;

class Evento extends HTMLElement {
  static get observedAttributes() {
    return ["hora", "descripcion", "tipo"];
  }

  constructor() {
    super();
  }

  connectedCallback() {
      this.attachShadow({ mode: "open" });
      // Attach del CSS al Shadow DOM
      this.shadowRoot.appendChild(attachCssToShadowDom("calendario.css"));

      this.shadowRoot.appendChild(template.cloneNode(true));
      this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[name] = newValue;
  }

  render() {
    const hora = this.getAttribute("hora");
    const descripcion = this.getAttribute("desc");
    const tipo = this.getAttribute("tipo");

    const eventoElement = this.shadowRoot.querySelector(".evento");
    const horaElement = eventoElement.querySelector(".evento__hora");
    const descripcionElement = eventoElement.querySelector(".evento__descripcion");

    if (horaElement) {
        horaElement.textContent = hora;
    }
    if (descripcionElement) {
        console.log("Tenemos desc", descripcion);
        descripcionElement.textContent = descripcion;
    }
    
    switch (tipo) {
      case "tipo1":
        eventoElement.style.backgroundColor = "#EDF0F3";
        break;
      case "tipo2":
        eventoElement.style.backgroundColor = "#FFE6B7";
        break;
      case "tipo3":
        eventoElement.style.backgroundColor = "#C5ECD9";
        break;
      case "tipo4":
        eventoElement.style.backgroundColor = "#C5ECD9";
        break;
      default:
        eventoElement.style.backgroundColor = "#fff";
    }
  }
}

customElements.define("calendario-evento", Evento);
