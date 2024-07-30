//import templateStr from './calendario-semana.html';
import attachCssToShadowDom from "./funciones";

const template = document.createElement("div");
template.id = "eventos-semana";
template.classList.add("eventos-semana");
template.innerHTML = `<div id="dias" class="semana"></div>`;

class CalendarioSemana extends HTMLElement {
  #diasContainers;
  diasVisibles = 2;

  static get observedAttributes() {
    return ["fechaInicial"];
  }

  constructor() {
    super();
    this._eventos = [];
    this.fechaInicial = new Date();
  }

  connectedCallback() {
    let shadowRoot = this.attachShadow({ mode: "open" });

    // Attach del CSS al Shadow DOM
    shadowRoot.appendChild(attachCssToShadowDom("calendario.css"));
    shadowRoot.className = "calendario__semana";
    shadowRoot.appendChild(template.cloneNode(true));

    this.#diasContainers = shadowRoot.getElementById("dias");

    this.render();
  }

  // get fechaInicial() {
  //   return this.fechaInicial;
  // }

  // set fechaInicial(valor) {
  //   this.fechaInicial = valor;
  // }

  setDiasVisibles(valor) {
    this.diasVisibles = valor;
  }

  setEventosSemana(data) {
    this._eventos = data;
    this.render();
  }

  masterRender(dias) {
    let necesarios = dias || thisdiasVisibles;

    while (this.#diasContainers.childNodes.length > necesarios) {
      this.#diasContainers.removeChild(this.#diasContainers.firstChild);
    }

    while (this.#diasContainers.childNodes.length < necesarios) {
      this.#diasContainers.appendChild(
        document.createElement("calendario-evento")
      );
    }

    return this.shadowRoot.childNodes;
  }

  addDays = (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
  };

  filtrarEventosPorFecha = (eventos, fecha) => {
    const fechaISO = fecha.toISOString().split("T")[0];
    return eventos.filter((evento) => evento.fecha === fechaISO);
  };

  render() {
    if (!this._eventos || this._eventos.length === 0) return;
    let first = true;

    for (let i = 0; i < this.diasVisibles; i++) {
      let fecha = this.addDays(this.fechaInicial, i);
      // Obtener los eventos de esa fecha
      const eventosDia = this.filtrarEventosPorFecha(this._eventos, fecha);

      if (i !== 0 && i != this.diasVisibles) {
        let separador = document.createElement("div");
        separador.className = "separador-dia";
        this.#diasContainers.appendChild(separador);
      }
    
      // Crea un elemento 'calendario-dia' y establece sus atributos
      let componenteDia = document.createElement("calendario-dia");
      componenteDia.className = "componente-dia";
      componenteDia.setAttribute("dia", fecha);
      // Añade el componente al shadowRoot
      this.#diasContainers.appendChild(componenteDia);

      // Asignamos los eventos
      componenteDia.setEventosDia(eventosDia);
    }
  }
}

customElements.define("calendario-semana", CalendarioSemana);
