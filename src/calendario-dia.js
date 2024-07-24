const template = document.createElement("div");
template.class= ":host";
template.innerHTML = `
<!-- El estilo "host corresponde al mismo que el nombre definido en "customElements.define() -->
<style>
:host {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    min-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.titulo {
    font-size: 1.2em;
    padding: 10px 0;
    color: var(--royal-blue);
}

.eventos {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.evento {
    display: flex;
    align-items: center;
    padding: 9px 12px;
    border-radius: 6px;
    border: 1px solid black;
}
.hora {
    font-weight: bold;
    margin-right: 10px;
}
.descripcion {
    flex-grow: 1;
}
</style>
<div class="componente-dia">
<span class="titulo"></span>
<div class="eventos"></div>
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

    const titulo = this.shadowRoot.querySelector(".titulo");
    const eventosContainer = this.shadowRoot.querySelector(".eventos");

    if (titulo) {
      titulo.textContent = this._dia;
    }
    console.log(this._eventos);
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
  }
}

customElements.define("calendario-dia", CalendarioDia);
