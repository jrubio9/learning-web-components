const template = document.createElement("template");
template.innerHTML = `
<style>
    /* ==================== */
    /*  CALENDARIO-DIA      */
    /* ==================== */
    :host {
        display: flex;
        position: relative;
        border-radius: 8px;
        padding: 10px;
        min-width: 400px;
        min-height: 250px;
        flex-direction: column;
        overflow-y: hidden;
        justify-content: flex-start;
    }

    :host:after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 1px;
        background: black;
        z-index: 1;
    }

    :host:last-child:before {
        display: none;
    }

    :host(.disabled) {
        background-color: aliceblue;
    }

    /* ==================== */
    /*    RELATIVO A DÍA    */
    /* ==================== */


    .dia__cabecera {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--royal-blue);
        font-weight: 600;
        font-size: 14px;
        margin: 10px 0;
    }

    .titulo-dia {
        font-size: 1.2em;
        padding: 6px 0;
    }

    .royal-add:hover {
        cursor: pointer;
        color: var(--warm-blue);
    }

    .hoy {
        color: var(--white);
        background-color: var(--periwinkle);
        border-radius: 6px;
        padding: 6px 10px;
    }

    .eventos-dia {
        display: flex;
        flex-direction: column;
        overflow-y: hidden;
        gap: 10px;
        padding: 4px;
        margin-bottom:15px;
    }

    .crecer {
        flex: 1 1 auto;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .dia__anadir {
        display: flex;
        gap: 6px;
        color: var(--steel);
        font-weight: 600;
        margin-top: 10px;
        cursor: pointer;
        align-items: center;
    }

    .underline {
        text-decoration: underline;
    }

    .dia__anadir:hover {
        color: var(--blue-grey);
    }

    ::-webkit-scrollbar {
        width: var(--scrollbar-width);
    }

    ::-webkit-scrollbar-track {
        background: transparent;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: var(--cool-grey);
        border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: var(--cool-grey);
    }

    .mas-eventos {
        position: absolute;
        bottom: 5px;
        left: 5px;
        display: none;
        background-color: rgba(255, 255, 255, 0.8);
        padding: 2px 5px;
        border-radius: 4px;
        font-size: 11px;
        cursor: pointer;
    }
</style>
<div class="dia__cabecera">
    <span class="titulo-dia"></span>
    <span class="royal-add">+</span>
</div>
<div class="eventos-dia"></div>
<span class="mas-eventos"></span>
`;

// De momento no lo usamos, sería para añadir al final de la lista
//const templateBotonAnadir = document.createElement("template");
//const templateBotonAnadirHtml = `
//<div class="dia__anadir">
//    <span class="material-icons">add</span>
//    <span class="underline">Añadir tarjeta</span>
//</div>
//`;

class CalendarioDia extends HTMLElement {
    // Datos
    #dia;
    #titulo;
    #eventos;
    // Elementos
    #eventosContainer;
    #masEventosSpan;
    //#botonAnadir;
    #iconoAnadir;

    // Visualización
    #verDiaSemanaTitulo;
    #vistaMensual; // Nos lo indicará obligatoriamente el padre

    constructor() {
        super();
        this.#eventos = [];
        this.#verDiaSemanaTitulo = false;
        this.#vistaMensual = false;
    }

    connectedCallback() {
        this.attachShadow({mode: "open"});
        // Attach del CSS al Shadow DOM

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Elementos
        this.#titulo = this.shadowRoot.querySelector(".titulo-dia");
        this.#eventosContainer = this.shadowRoot.querySelector(".eventos-dia");
        this.#iconoAnadir = this.shadowRoot.querySelector(".royal-add");
        this.#masEventosSpan = this.shadowRoot.querySelector(".mas-eventos");
        // Crear el botón añadir
//        this.#botonAnadir = document.createElement("div");
//        this.#botonAnadir.innerHTML = templateBotonAnadirHtml;
//        this.#botonAnadir.addEventListener("click", () => this.lanzarEventoAnadir());
        // Eventos
        this.#iconoAnadir.addEventListener("click", () => this.lanzarEventoAnadir());

        this.#masEventosSpan.addEventListener("click", () => {
            if (!this.#eventosContainer.classList.contains("crecer")) {
                this.#eventosContainer.classList.add("crecer");
            }
        });

        this.initObserver();
    }

    adoptedCallback() {
        // Segurament serà útil quan canviem una card d'un dia a un altre.
    }

    disconnectedCallback() {
        this.#iconoAnadir.removeEventListener("click", () => this.lanzarEventoAnadir());
    }

    lanzarEventoAnadir() {
        const event = new CustomEvent("nuevo", {
            detail: this.#dia,
            bubbles: true,
            composed: true
        });

        this.shadowRoot.firstChild.dispatchEvent(event);
    }

    // ===========
    // GETS / SETS
    // ===========

    get dia() {
        return this.#dia;
    }

    set dia(value) {
        if (this.#dia === value)
            return;
        this.#dia = value;
    }

    set eventos(eventos) {
        if (!Array.isArray(eventos)) {
            return;
        }
        this.#eventos = eventos;
        this.render();
    }

    get eventos() {
        return this.#eventos;
    }

    set verDiaSemanaTitulo(value) {
        this.#verDiaSemanaTitulo = value;
    }

    set vistaMensual(value) {
        this.#vistaMensual = value;
    }

    // ===========
    // MÉTODOS
    // ===========

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
        return this.#verDiaSemanaTitulo ? `${diaSemana} ${diaMes}` : diaMes;
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

    filtrarEventosPorFecha(fecha) {
        // Ajustar la fecha a la hora local
        const fechaLocal = new Date(fecha.getTime() - (fecha.getTimezoneOffset() * 60000));
        const fechaISO = fechaLocal.toISOString().split("T")[0];
        return this.#eventos.filter((evento) => evento.fecha === fechaISO);
    }

    crearDestruirContenedores(necesarios) {
        // Siempre -1 ya que el "Add element" estará dentro
        while (this.#eventosContainer.childNodes.length > necesarios) {
            this.#eventosContainer.removeChild(this.#eventosContainer.firstChild);
        }

        while (this.#eventosContainer.childNodes.length < necesarios) {
            let evento = document.createElement("wc-evento");
            this.#eventosContainer.appendChild(evento);
        }
    }

    prepararHtmlEvento(ev) {
        var template = "";
        if (ev.hora) {
            template += `<span class="evento__hora">${ev.hora}</span>`;
        }

        template += "<div class='evento__datos'>";

        if (ev.vehiculo) {
            template += `<span class="evento__datos--vehiculo">${ev.vehiculo}</span>`;
        }

        template += `<span class="evento__datos--descripcion">${ev.vehiculo ? "- " + ev.desc : ev.desc}</span>
                        </div>`;

        if (ev.duracion) {
            template += `<span class="evento__duracion">${ev.duracion}</span>`;
        }
        return template;
    }

    prepararEstilosEvento(ev) {
        var css = "";

        return css;
    }

    render() {
        this.#titulo.textContent = this.formatearFecha(this.#dia);

        // Añadir clase CSS si la fecha es hoy
        if (this.esHoy(this.#dia)) {
            this.#titulo.classList.add("hoy");
        } else {
            this.#titulo.classList.remove("hoy");
        }

        // Gestión CSS según vista semana/mes
        if (this.#vistaMensual) {
            this.#eventosContainer.classList.remove("crecer");
        } else {
            this.#eventosContainer.classList.add("crecer");
        }

        if (!this.#eventos || this.#eventos.length === 0)
            return;

        const eventosDia = this.filtrarEventosPorFecha(this.#dia);
        this.crearDestruirContenedores(eventosDia.length);

        eventosDia.forEach((ev, index) => {
            var rootCss = "evento";

            switch (ev.tipo) {
                case "tipo2":
                    rootCss += " evento--warning evento__hora--claro";
                    break;
                case "tipo3":
                    rootCss += " evento--done evento__hora--claro";
                    break;
                case "tipo4":
                    rootCss += " evento--error evento__hora--claro";
                    break;
            }

            //this.#eventosContainer.childNodes[index].estilos = ev;
            this.#eventosContainer.childNodes[index].className = rootCss;
            this.#eventosContainer.childNodes[index].datos = ev;
            this.#eventosContainer.childNodes[index].vista = this.prepararHtmlEvento(ev);
        });

        //this.#eventosContainer.appendChild(this.#botonAnadir);
        //
        // Actualizar el manejo del overflow solo si estamos en vista mensual
        if (this.#vistaMensual) {
            this.updateEventOverflow();
        }
    }

    initObserver() {
        this.observer = new IntersectionObserver(entries => {
            // Cada entrada representa un cambio en la intersección de un elemento observado con el viewport o un elemento contenedor.
            entries.forEach(entry => {
                if (!entry.isIntersecting) { // Si no está en el viewport
                    let totalEventos = this.#eventosContainer.children.length;

                    let visibleEventos = Array.from(this.#eventosContainer.children).filter(child => {
                        return child.getBoundingClientRect().bottom <= this.#eventosContainer.getBoundingClientRect().bottom;
                    }).length;

                    let eventosOcultos = totalEventos - visibleEventos;

                    if (eventosOcultos > 0) {
                        this.#masEventosSpan.style.display = 'block';
                        this.#masEventosSpan.textContent = `+${eventosOcultos} más`;
                    } else {
                        this.#masEventosSpan.style.display = 'none';
                        this.#masEventosSpan.textContent = '';
                    }
                }
            });
        }, {
            root: this.#eventosContainer, // Elemento contenedor dentro del cual se observa la intersección.
            threshold: 1.0 // el callback se invocará cuando el valor * 100 (%) del objetivo sea visible dentro del contenedor.
        });

        Array.from(this.#eventosContainer.children).forEach(child => {
            if (child !== this.#masEventosSpan) {
                this.observer.observe(child);
            }
        });
    }

    // Cuando se actualizan los eventos o se cambia la vista, es necesario reconectar el observador para que observe los nuevos elementos.
    updateEventOverflow() {
        this.observer.disconnect();
        this.initObserver();
    }
}

customElements.define("wc-calendario-dia", CalendarioDia);
