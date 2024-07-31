//import templateStr from './calendario-semana.html';
import attachCssToShadowDom from "./funciones";

const template = document.createElement("template");
template.id = "eventos-semana";
template.classList.add("eventos-semana");
template.innerHTML = `<div id="dias" class="semana"></div>`;

class CalendarioSemana extends HTMLElement {
  // Elementos
  #diasContainers;
  // Datos
  #diasVisibles = 7;
  #eventos;
  #fechaInicial;
  // Visualización
  #vistaCalendario; 

  constructor() {
    super();
    this.#eventos = [];
    this.#fechaInicial = new Date();
  }

  connectedCallback() {
    let shadowRoot = this.attachShadow({ mode: "open" });

    // Attach del CSS al Shadow DOM
    shadowRoot.appendChild(attachCssToShadowDom("calendario.css"));
    shadowRoot.appendChild(template.content.cloneNode(true));
    shadowRoot.getRootNode().host.classList.add("eventos-semana");

    this.#diasContainers = shadowRoot.getElementById("dias");
    this.masterRender();
  }
  // ===========
  // GETS Y SETS
  // ===========

  set fecha_inicial(valor) {
    let fecha = valor instanceof Date ? valor : new Date(valor);
    if (this.#fechaInicial === fecha) {
      return;
    }
    this.#fechaInicial = fecha;
    this.masterRender();
  }

  get fecha_inicial() {
    return this.#fechaInicial;
  }

  set dias(valor) {
    if (this.#diasVisibles === valor) {
      return;
    }
    this.#diasVisibles = valor;
    this.masterRender();
  }

  get dias() {
    return this.#diasVisibles;
  }

  set eventos(data) {
    this.#eventos = data;
    this.render();
  }

  // ===========
  // MÉTODOS
  // ===========

  addDays = (date, days) => {
    let newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
  };

  masterRender() {
    let necesarios = this.#diasVisibles;
    while (this.#diasContainers.childNodes.length > necesarios) {
      this.#diasContainers.removeChild(this.#diasContainers.firstChild);
    }

    while (this.#diasContainers.childNodes.length < necesarios) {
      let componenteDia = document.createElement("calendario-dia");
      this.#diasContainers.appendChild(componenteDia);
    }

    this.render();

    return this.shadowRoot.childNodes;
  }

  render() {
    if (!this.#eventos || this.#eventos.length === 0) return;

    for (let i = 0; i < this.#diasVisibles; i++) {
      let fecha = this.addDays(this.#fechaInicial, i);
      // Obtener los eventos de esa fecha
      let componenteDia = this.#diasContainers.childNodes[i];
      componenteDia.dia = fecha;
      componenteDia.eventos = this.#eventos;
    }
  }
}

customElements.define("calendario-semana", CalendarioSemana);
