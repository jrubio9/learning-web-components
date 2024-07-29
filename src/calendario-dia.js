import attachCssToShadowDom from "./funciones";
import { attachLinkToShadowDom } from "./funciones";

const template = document.createElement("div");
template.className = "dia";
template.innerHTML = `
<!-- El estilo "host corresponde al mismo que el nombre definido en "customElements.define() -->
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
  static get observedAttributes() {
    return ["dia"];
  }

  constructor() {
    super();
    this._dia = "";
    this._eventos = [];
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
  }

  adoptedCallback() {
    // Segurament serà útil quan canviem una card d'un dia a un altre.
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[name] = newValue;
  }

  set dia(value) {
    this._dia = value;
  }

  get dia() {
    return this._dia;
  }

  setEventosDia(eventos) {
    if (!Array.isArray(eventos)) {
      return;
    }
    this._eventos = eventos;
    this.render();
  }

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

  render() {
    if (!this._dia || !this._eventos) return;

    const titulo = this.shadowRoot.querySelector(".titulo-dia");
    const eventosContainer = this.shadowRoot.querySelector(".eventos-dia");

    if (titulo) {
      titulo.textContent = this.formatearFecha(this._dia);

      // Añadir clase CSS si la fecha es hoy
      if (this.esHoy(this._dia)) {
        titulo.classList.add("hoy");
      }
    }

    if (eventosContainer) {
      this._eventos.map((ev) => {
        let componenteEvento = document.createElement("calendario-evento");
        componenteEvento.setAttribute("hora", ev.hora);
        componenteEvento.setAttribute("desc", ev.desc);
        componenteEvento.setAttribute("tipo", ev.tipo);
        componenteEvento.setAttribute("duracion", ev.duracion);
        componenteEvento.setAttribute("vehiculo", ev.vehiculo);
        // Añade el componente al shadowRoot
        eventosContainer.appendChild(componenteEvento);
      });
    }

    // Span añadir tarjeta
  }
}

customElements.define("calendario-dia", CalendarioDia);
