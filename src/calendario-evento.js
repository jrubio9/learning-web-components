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
  // Elementos
  #eventoElement;
  #horaElement;
  #vehiculoElement;
  #descripcionElement;
  #duracionElement;
  // Datos -> {hora, vehiculo, descripcion, duracion}
  #datos
  
  constructor() {
    super();
    this.#datos = null;
  }

  connectedCallback() {
      this.attachShadow({ mode: "open" });
      // Attach del CSS al Shadow DOM
      this.shadowRoot.appendChild(attachCssToShadowDom("calendario.css"));
      this.shadowRoot.appendChild(template.cloneNode(true));

      this.#eventoElement = this.shadowRoot.querySelector(".evento");
      this.#horaElement = this.shadowRoot.querySelector(".evento__hora");
      this.#vehiculoElement = this.shadowRoot.querySelector(".evento__datos--vehiculo");
      this.#descripcionElement = this.shadowRoot.querySelector(".evento__datos--descripcion");
      this.#duracionElement = this.shadowRoot.querySelector(".evento__duracion");

      this.#eventoElement.addEventListener("click", () => this.lanzarEventoClickCard());
  }

  disconnectedCallback() {
    this.#eventoElement.removeEventListener("click", () => this.lanzarEventoClickCard());
  }

  lanzarEventoClickCard = () => {
    const event = new CustomEvent("click-evento", {
      detail: this.#datos,
      bubbles: true,
      composed: true
    });

    this.shadowRoot.firstChild.dispatchEvent(event);
  };

  // ===========
  // GETS / SETS
  // ===========

  set datos(datos) {
    if (this.#datos && this.esIgual(datos)) {
      return;
    }
    this.#datos = datos;
    this.render();
  }

  get datos() {
    return this.#datos;
  }

  esIgual(evento) {
    return this.#datos.hora === evento.hora && this.#datos.vehiculo === evento.vehiculo && this.#datos.descripcion === evento.descripcion && this.#datos.duracion === evento.duracion;
  }

  render() {
    const evento = this.#datos;
    switch (evento.tipo) {
      case "tipo2":
        this.#eventoElement.classList.add("evento--warning");
        this.#horaElement.classList.add("evento__hora--claro");
        break;
      case "tipo3":
        this.#eventoElement.classList.add("evento--done");
        this.#horaElement.classList.add("evento__hora--claro");
        break;
      case "tipo4":
        this.#eventoElement.classList.add("evento--error");
        this.#horaElement.classList.add("evento__hora--claro");
        break;
        default:
          // borrar las clases que tenga evento y hora (para que se muestre correctamente si estamos actualizando)
          this.#eventoElement.className = "evento";
          this.#horaElement.classList.remove("evento__hora--claro");
          break;
    }

    if (evento.vehiculo) {
      this.#vehiculoElement.textContent = evento.vehiculo;
    } else {
      this.#vehiculoElement.remove();
    }

    if (evento.hora) {
      this.#horaElement.textContent = evento.hora;
    } else {
      this.#horaElement.remove();
    }

    this.#descripcionElement.textContent = evento.vehiculo ? "- " + evento.desc : evento.desc;

    if (evento.duracion) {
      this.#duracionElement.textContent = evento.duracion;
    }
  }
}

customElements.define("calendario-evento", Evento);
