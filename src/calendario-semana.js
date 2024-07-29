//import templateStr from './calendario-semana.html';
import attachCssToShadowDom from "./funciones";

const template = document.createElement("div");
template.className = "contenedor";
template.innerHTML = `<div id="eventos-semana" class="semana"></div>`;

class CalendarioSemana extends HTMLElement {
  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();
    this._semana = [];
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });

    // Attach del CSS al Shadow DOM
    this.shadowRoot.appendChild(attachCssToShadowDom("calendario.css"));
    this.shadowRoot.className = "calendario__semana";
    this.shadowRoot.appendChild(template.cloneNode(true));
    this.render();
  }

  setEventosSemana(data) {
    this._semana = data;
    this.render();
  }

  render() {
    if (!this._semana) return;
    const semanaContainer = this.shadowRoot.getElementById("eventos-semana");
    let first = true;
    this._semana.map((dia) => {
      if (!first) {
        let separador = document.createElement("div");
        separador.className = "separador-dia";
        semanaContainer.appendChild(separador);
      } else {
        first = false;
      }
      // Crea un elemento 'calendario-dia' y establece sus atributos
      let componenteDia = document.createElement("calendario-dia");
      componenteDia.className = "componente-dia";
      componenteDia.setAttribute("dia", dia.fecha);
      // Añade el componente al shadowRoot
      semanaContainer.appendChild(componenteDia);
      // Asignamos los eventos
      componenteDia.setEventosDia(dia.eventos);
    });
  }
}

customElements.define("calendario-semana", CalendarioSemana);
