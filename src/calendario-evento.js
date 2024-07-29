import attachCssToShadowDom from "./funciones";
const template = document.createElement("div");
template.className = "evento";
template.innerHTML = `
    <span class="evento__hora"></span>
    <div class="evento__datos">
      <span class="evento__datos--vehiculo"></span>
      <span class="evento__datos--descripcion"></span>
    </div>
    <span class="evento__duracion"></span>
`;

class Evento extends HTMLElement {
  static get observedAttributes() {
    return ["hora", "vehiculo", "descripcion", "tipo, duracion"];
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
    const vehiculo = this.getAttribute("vehiculo");
    const descripcion = this.getAttribute("desc");
    const tipo = this.getAttribute("tipo");
    const duracion = this.getAttribute("duracion");

    const eventoElement = this.shadowRoot.querySelector(".evento");
    const horaElement = eventoElement.querySelector(".evento__hora");
    const vehiculoElement = eventoElement.querySelector(".evento__datos--vehiculo");
    const descripcionElement = eventoElement.querySelector(".evento__datos--descripcion");
    const duracionElement = eventoElement.querySelector(".evento__duracion");

    switch (tipo) {
      case "tipo2":
        eventoElement.classList.add("evento--warning");
        horaElement.classList.add("evento__hora--claro");
        break;
      case "tipo3":
        eventoElement.classList.add("evento--done");
        horaElement.classList.add("evento__hora--claro");
        break;
      case "tipo4":
        eventoElement.classList.add("evento--error");
        horaElement.classList.add("evento__hora--claro");
        break;
    }

    if (vehiculo) {
      vehiculoElement.textContent = vehiculo;
    } else {
      vehiculoElement.remove();
    }

    if (hora) {
        horaElement.textContent = hora;
    } else {
      horaElement.remove();
    }

    if (descripcionElement) {
        descripcionElement.textContent = vehiculo ? "- " + descripcion : descripcion;
    }

    if (duracion) {
      duracionElement.textContent = duracion;
    }

  }
}

customElements.define("calendario-evento", Evento);
