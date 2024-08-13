const template = document.createElement("template");
template.id = "eventos-semana";
template.innerHTML = `
<style>
    /* ==================== */
    /* calendario-completo  */
    /* ==================== */
    :host {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        overflow-y: scroll;
        overflow-x: scroll;
        width: 100%;
        background-color: var(--marble-2);
        border-radius: 10px;
    }

    /* ==================== */
    /*      VISTA MES       */
    /* ==================== */
    .mes {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        /*grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); con esto lo hacemos dinámico pero luego los bordes van mal*/
    }

    .mes .componente-dia {
        min-width: 235px;
        border-bottom: 1px solid black;
        border-radius: 0;
        height: 275px;
    }

    .mes .componente-dia:nth-child(-n+5) {
        border-top: none; /* Quitar borde superior a los primeros 4 elementos (primera fila en un grid de 5 columnas) */
    }

    /* ==================== */
    /*     VISTA SEMANA     */
    /* ==================== */

    .semana {
        display: flex;
        overflow-x: scroll;
        flex: 1 1 auto;
    }

</style>
<div id="dias" class="semana"></div>

`;

class Calendario extends HTMLElement {
    // Elementos
    #diasContainers;

    // Datos
    #diasVisibles = 7;
    #fechaInicial;
    #eventos;

    // Visualización
    #vistaMes;

    // Informativos hacia afuera
    #rangeStart;
    #rangeEnd;

    constructor() {
        super();
        this.#eventos = [];
        var today = new Date();
        this.#fechaInicial = new Date(today.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)));
    }

    connectedCallback() {
        let shadowRoot = this.attachShadow({mode: "open"});

        // Attach del CSS al Shadow DOM
        shadowRoot.appendChild(template.content.cloneNode(true));

        this.#diasContainers = shadowRoot.getElementById("dias");

        this.#rangeStart = this.#vistaMes ? this.startOfMonth() : this.startOfWeek();
        this.#rangeEnd = this.endOfRange();

        this.masterRender();

// TODO: Actualmente se pilla directamente en el abrir, valorar que está mejor.
//        // Notificamos que el componente está listo
//        this.dispatchEvent(new CustomEvent('calendario-inicializado', {
//            detail: {instancia: this},
//            bubbles: true,
//            composed: true
//        }));
    }

    // ===========
    // GETS Y SETS
    // ===========

    startOfWeek() {
        let date = new Date();
        let day = date.getDay();
        let diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is sunday
        return new Date(date.setDate(diff));
    }

    startOfFechaInicialWeek() {
        const day = this.#fechaInicial.getDay();
        const diff = this.#fechaInicial.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        return new Date(this.#fechaInicial.setDate(diff));
    }

    startOfMonth() {
        var today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), 1);
    }

    startOfFechaInicialMonth() {
        return new Date(this.#fechaInicial.getFullYear(), this.#fechaInicial.getMonth(), 1);
    }

    endOfRange() {
        if (this.#vistaMes) {
            // Fin del mes en cuestión
            let year = this.#fechaInicial.getFullYear();
            let month = this.#fechaInicial.getMonth();
            return new Date(year, month + 1, 0);
        } else {
            // Fin de la semana
            return this.addDays(this.#fechaInicial, this.#diasVisibles - 1);
        }
    }

    get range_start() {
        return this.#rangeStart;
    }

    get range_end() {
        return this.#rangeEnd;
    }

    set fechaInicial(valor) {
        let fecha = valor instanceof Date ? valor : new Date(valor);
        if (this.#fechaInicial === fecha) {
            return;
        }
        this.#fechaInicial = fecha;

        this.masterRender();
    }

    get fechaInicial() {
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

    set vistaMes(valor) {
        this.#vistaMes = valor;
        this.actualizarVista(valor);
    }

    actualizarVista(valor) {
        if (valor) {
            this.#diasContainers.className = "mes";
            this.#fechaInicial = this.startOfMonth();
            // Ponemos 42 ya que será el máximo que podrá salir mostrando fechas de otros meses para empezar por lunes
            this.dias = 42; // Llama al set dias
        } else {
            this.#diasContainers.className = "semana";
            this.#fechaInicial = this.startOfWeek();
            this.dias = 7; // Llama al set dias
        }
    }
    // ===========
    // MÉTODOS
    // ===========

    addDays = (date, days) => {
        let newDate = new Date(date);
        newDate.setDate(date.getDate() + days);
        return newDate;
    }

    addMonths = (date, months) => {
        let newDate = new Date(date);
        newDate.setMonth(date.getMonth() + months);
        return newDate;
    }

    masterRender() {
        let necesarios = this.#diasVisibles;
        while (this.#diasContainers.childNodes.length > necesarios) {
            this.#diasContainers.removeChild(this.#diasContainers.firstChild);
        }

        while (this.#diasContainers.childNodes.length < necesarios) {
            let componenteDia = document.createElement("wc-calendario-dia");
            componenteDia.classList.add("componente-dia");
            this.#diasContainers.appendChild(componenteDia);
        }

        this.render();

        return this.shadowRoot.childNodes;
    }

    setDetallesRenderDia(componenteDia, i, isMesVista) {

    }

    render() {
        if (!this.#eventos || this.#eventos.length === 0)
            return;

        const vistaMes = this.#vistaMes;
        const fechaInicial = this.#fechaInicial;

        let fechaInicialAjustada;

        if (vistaMes) {
            const firstDayOfMonth = new Date(fechaInicial.getFullYear(), fechaInicial.getMonth(), 1);
            const startDayOfWeek = firstDayOfMonth.getDay();
            fechaInicialAjustada = this.addDays(firstDayOfMonth, -((startDayOfWeek + 6) % 7)); // La ajustamos para que empiece en Lunes
        } else {
            fechaInicialAjustada = fechaInicial;
        }

        for (let i = 0; i < this.#diasVisibles; i++) {
            const fecha = this.addDays(fechaInicialAjustada, i);
            const componenteDia = this.#diasContainers.childNodes[i];
            componenteDia.dia = fecha;
            componenteDia.verDiaSemanaTitulo = vistaMes ? (i < 7) : true;
            componenteDia.vistaMensual = vistaMes;
            componenteDia.eventos = this.#eventos;

            if (vistaMes) {
                if (fecha.getMonth() !== fechaInicial.getMonth()) {
                    componenteDia.classList.add("disabled"); // Si es un día de otro mes lo desactivamos
                    if (i >= 35 && fecha.getMonth() !== fechaInicial.getMonth()) {
                        componenteDia.style.display = "none"; // Si sobra toda una semana la ocultamos
                    } else {
                        componenteDia.style.display = "";
                    }
                } else {
                    componenteDia.classList.remove("disabled");
                    componenteDia.style.display = "";
                }
            } else {
                componenteDia.classList.remove("disabled");
                componenteDia.style.display = "";
            }
        }

        this.#rangeStart = vistaMes ? this.startOfFechaInicialMonth() : this.startOfFechaInicialWeek();
        this.#rangeEnd = this.endOfRange();
    }

    navegarHoy() {
        this.fechaInicial = this.#vistaMes ? this.startOfMonth() : this.startOfWeek();
    }

    cambiarPeriodoFijo(incrementar) {
        if (this.#vistaMes) {
            this.cambiarMes(incrementar);
        } else {
            this.cambiarSemana(incrementar);
        }
    }

    cambiarMes(incrementar) {
        let newDate = this.addMonths(this.#fechaInicial, incrementar);
        this.fechaInicial = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
    }

    cambiarSemana(incrementar) {
        this.fechaInicial = this.addDays(this.#fechaInicial, incrementar * 7);
    }
}

customElements.define("wc-calendario", Calendario);
