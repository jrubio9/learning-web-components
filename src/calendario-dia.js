import attachCssToShadowDom from "./funciones";
const template = document.createElement("div");
template.className = "dia";
template.innerHTML = `
<!-- El estilo "host corresponde al mismo que el nombre definido en "customElements.define() -->
  <div class="dia__cabecera">
    <span class="titulo-dia"></span>
    <span class="material-icons">add</span>
  </div>
  <div class="eventos-dia"></div>
  <div class="dia__anadir">
    <span class="material-icons">add</span>
    <span class="link">Añadir tarjeta</span>
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
    this.attachShadow({ mode: 'open' });
    // Attach del CSS al Shadow DOM
    this.shadowRoot.appendChild(attachCssToShadowDom("calendario.css"));
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

  render() {

    if (!this._dia || !this._eventos) return;

    const titulo = this.shadowRoot.querySelector(".titulo-dia");
    const eventosContainer = this.shadowRoot.querySelector(".eventos-dia");

    if (titulo) {
      titulo.textContent = this._dia;
    }

    if (eventosContainer) {
        this._eventos.map((ev) => {
            let componenteEvento = document.createElement("calendario-evento");
            componenteEvento.setAttribute("hora", ev.hora);
            componenteEvento.setAttribute("desc", ev.desc);
            componenteEvento.setAttribute("tipo", ev.tipo);
            // Añade el componente al shadowRoot
            eventosContainer.appendChild(componenteEvento);
        });
    }

    // Span añadir tarjeta
  }
}

customElements.define("calendario-dia", CalendarioDia);
