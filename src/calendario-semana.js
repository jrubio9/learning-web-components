//import templateStr from './calendario-semana.html';

const template = document.createElement("div");
template.className = "contenedor";
template.innerHTML = `
    <style>
    .contenedor {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .semana {
        min-width: 500px;
        display: flex;
        overflow-x: scroll;
        gap: 10px;
    }
    </style>
    <h1>Semana</h1>
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
        Object.keys(this._semana).map(dia => {
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