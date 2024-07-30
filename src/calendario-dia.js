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
   #titulo;
   #listaEventos;
   #botonAnadir;

  static get observedAttributes() {
    return ["dia"];
  }

  constructor() {
    super();
    this._eventosDia = [];
    this.anadirEventoDia = this.anadirEventoDia.bind(this);
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
    this.#listaEventos = this.shadowRoot.querySelector(".eventos-dia");
    this.#botonAnadir = this.shadowRoot.querySelector(".dia__anadir");
    this.#botonAnadir.addEventListener('click', this.anadirEventoDia);
  }

  disconnectedCallback() {
    this.#botonAnadir.removeEventListener('click', this.anadirEventoDia);
  }

  adoptedCallback() {
    // Segurament serà útil quan canviem una card d'un dia a un altre.
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    //this.setAttribute(name, newValue)
    this[name] = newValue;
  }

  get dia() {
    return this.getAttribute('dia');
  }

  set dia(value) {
    this.setAttribute('dia', value);
  }

  anadirEventoDia() {
    console.log(this.dia);
    let evento = generarEventoAleatorio(this.dia);
    console.log(evento);
    // TODO: Aquí render o mejor añadimos solo el que estamos poniendo???
    this._eventosDia.push(evento);
    this.render();
  }

  setEventosDia(eventos) {
    if (!Array.isArray(eventos)) {
      return;
    }
    this._eventosDia = eventos;
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
      this.#titulo.textContent = this.formatearFecha(this.dia);

      // Añadir clase CSS si la fecha es hoy
      if (this.esHoy(this.dia)) {
        this.#titulo.classList.add("hoy");
      } else {
        this.#titulo.classList.remove("hoy");
      }
  
      let necesarios = this._eventosDia.length;
       while (this.#listaEventos.childNodes.length > necesarios) {
        this.#listaEventos.removeChild(this.#listaEventos.firstChild);
      }

       while (this.#listaEventos.childNodes.length < necesarios) {
        this.#listaEventos.appendChild(document.createElement("calendario-evento"));
      }

      this._eventosDia.forEach((ev, index) => {
        let evtExistente = this.#listaEventos.childNodes[index];
        // Para evitar re-renders (solo asignamos datos cuando es nuevo o ha cambiado alguno de sus valores)
        if (!evtExistente.getDatos() || !evtExistente.esIgual(ev)) {
          this.#listaEventos.childNodes[index].setDatos(ev);
        }
      });
  }
}

customElements.define("calendario-dia", CalendarioDia);
