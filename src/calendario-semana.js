//import templateStr from './calendario-semana.html';
import attachCssToShadowDom from "./funciones";

const template = document.createElement("div");
template.className = "contenedor";
template.innerHTML = `
    <!-- El style no hace falta ya que linkamos el archivo css en 'conectedCallback' -->
    <div id="eventos-semana" class="semana"></div>
`;

class CalendarioSemana extends HTMLElement {
    static get observedAttributes() {
        return []; // TODO: Aquí añadiremos filtros
    }

    constructor() {
        super();
        this._semana = [];
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });

        // Attach del CSS al Shadow DOM
        this.shadowRoot.appendChild(attachCssToShadowDom("calendario.css"));

        this.shadowRoot.appendChild(template.cloneNode(true));
        this.render();
    }

    setEventosSemana(data) {
        this._semana = data;
        this.render();
    }


    render() {
        if (!this._semana) return;
        const semanaContainer = this.shadowRoot.getElementById(
            "eventos-semana",
          );
        console.log("SemanaContainer", semanaContainer);
        let first = true;
        Object.keys(this._semana).map(dia => {
            if (!first) {
                let separador = document.createElement('div');
                separador.className = "separador-dia";
                semanaContainer.appendChild(separador);
            } else {
                first = false;
            }
            // Crea un elemento 'calendario-dia' y establece sus atributos
            let componenteDia = document.createElement('calendario-dia');
            componenteDia.className = "componente-dia";
            componenteDia.setAttribute('dia', dia);
            // Añade el componente al shadowRoot
            semanaContainer.appendChild(componenteDia);
            // Asignamos los eventos
            componenteDia.setEventosDia(this._semana[dia]);
        }).join('');
    }
}

customElements.define('calendario-semana', CalendarioSemana);