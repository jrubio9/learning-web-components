const template = document.createElement("div");
template.className = "evento";
template.innerHTML = `
    <style>
        .evento {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 5px;
            border-radius: 4px;
        }
        .hora {
            font-weight: bold;
            margin-right: 10px;
        }
        .descripcion {
            flex-grow: 1;
        }
    </style>
    <span class="hora"></span>
    <span class="descripcion"></span>
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
      console.log("Creacion evento");
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
    const horaElement = eventoElement.querySelector(".hora");
    const descripcionElement = eventoElement.querySelector(".descripcion");

    if (horaElement) {
        horaElement.textContent = hora;
    }
    if (descripcionElement) {
        console.log("Tenemos desc", descripcion);
        descripcionElement.textContent = descripcion;
    }
    
    switch (tipo) {
      case "tipo1":
        eventoElement.style.backgroundColor = "#d3d3d3";
        break;
      case "tipo2":
        eventoElement.style.backgroundColor = "#f0e68c";
        break;
      case "tipo3":
        eventoElement.style.backgroundColor = "#98fb98";
        break;
      default:
        eventoElement.style.backgroundColor = "#fff";
    }
  }
}

customElements.define("calendario-evento", Evento);
