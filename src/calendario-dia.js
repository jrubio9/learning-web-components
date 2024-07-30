import attachCssToShadowDom, { generarEventoAleatorio } from "./funciones";
import { attachLinkToShadowDom } from "./funciones";

const template = document.createElement("div");
template.className = "dia";
template.innerHTML = `
  <div class="dia__cabecera">
    <span class="titulo-dia"></span>
    <span class="material-icons royal-add">add</span>
  </div>
  <div class="eventos-dia"></div>
  <div class="dia__anadir">
    <span class="material-icons">add</span>
    <span class="underline">Añadir tarjeta</span>
  </div>
`;

class CalendarioDia extends HTMLElement {
  #dia;
  #titulo;
  #eventos;
  #eventosContainer;

  #botonAnadir;
  #iconoAnadir;

  constructor() {
    super();
    this.#eventos = [];
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    // Attach del CSS al Shadow DOM
    this.shadowRoot.appendChild(attachCssToShadowDom("calendario.css"));
    this.shadowRoot.appendChild(
      attachLinkToShadowDom(
        "https://fonts.googleapis.com/icon?family=Material+Icons",
        "stylesheet"
      )
    );
    this.shadowRoot.appendChild(template.cloneNode(true));

    // Guardamos estas referencias para utilizarlas más adelante.
    this.#titulo = this.shadowRoot.querySelector(".titulo-dia");
    this.#eventosContainer = this.shadowRoot.querySelector(".eventos-dia");
    // Eventos
    this.#botonAnadir = this.shadowRoot.querySelector(".dia__anadir");
    this.#iconoAnadir = this.shadowRoot.querySelector(".royal-add");
    this.#botonAnadir.addEventListener("click", () =>
      this.lanzarEventoAnadir()
    );
    this.#iconoAnadir.addEventListener("click", () =>
      this.lanzarEventoAnadir()
    );
  }

  lanzarEventoAnadir = () => {
    const event = new CustomEvent("nuevo", {
      detail: this.#dia,
      bubbles: true,
      composed: true
    });

    this.shadowRoot.firstChild.dispatchEvent(event);
  };

  disconnectedCallback() {
    this.#botonAnadir.removeEventListener("click", () => this.lanzarEventoAnadir());
    this.#iconoAnadir.removeEventListener("click", () => this.lanzarEventoAnadir());
  }

  adoptedCallback() {
    // Segurament serà útil quan canviem una card d'un dia a un altre.
  }

  // ===========
  // GETS / SETS
  // ===========

  get dia() {
    return this.#dia;
  }

  set dia(value) {
    if (this.#dia === value) return;
    this.#dia = value;
  }

  set eventos(eventos) {
    if (!Array.isArray(eventos)) {
      return;
    }
    this.#eventos = eventos;
    this.render();
  }

  get eventos() {
    return this.#eventos;
  }

  // ===========
  // MÉTODOS
  // ===========

  // Función para obtener el nombre del día de la semana y el día del mes
  formatearFecha(strFecha) {
    const diasSemana = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    var date = new Date(strFecha);
    const diaSemana = diasSemana[date.getDay()];
    const diaMes = date.getDate();
    return `${diaSemana} ${diaMes}`;
  }

  esHoy(strFecha) {
    const hoy = new Date();
    const fecha = new Date(strFecha);
    return (
      fecha.getDate() === hoy.getDate() &&
      fecha.getMonth() === hoy.getMonth() &&
      fecha.getFullYear() === hoy.getFullYear()
    );
  }

  filtrarEventosPorFecha = (fecha) => {
    const fechaISO = fecha.toISOString().split("T")[0];
    return this.#eventos.filter((evento) => evento.fecha === fechaISO);
  };

  crearDestruirContenedores = (necesarios) => {
    while (this.#eventosContainer.childNodes.length > necesarios) {
      this.#eventosContainer.removeChild(this.#eventosContainer.firstChild);
    }

    while (this.#eventosContainer.childNodes.length < necesarios) {
      this.#eventosContainer.appendChild(
        document.createElement("calendario-evento")
      );
    }
  }

  render() {
    this.#titulo.textContent = this.formatearFecha(this.#dia);

    // Añadir clase CSS si la fecha es hoy
    if (this.esHoy(this.#dia)) {
      this.#titulo.classList.add("hoy");
    } else {
      this.#titulo.classList.remove("hoy");
    }
    const eventosDia = this.filtrarEventosPorFecha(this.#dia);
    this.crearDestruirContenedores(eventosDia.length);

    eventosDia.forEach((ev, index) => {
      this.#eventosContainer.childNodes[index].datos = ev;
    });
  }
}

customElements.define("calendario-dia", CalendarioDia);
