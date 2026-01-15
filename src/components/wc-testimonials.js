class TestimonialsComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.testimonios = [
        { texto: "Rubz ha revolucionado la gestión de mi empresa.", autor: "Juan Pérez", empresa: "Empresa Pérez", estrellas: 5 },
        { texto: "Excelente atención y resultados inmediatos.", autor: "María López", empresa: "Empresa López", estrellas: 4 },
        { texto: "Una herramienta indispensable para cualquier empresa que quiera crecer.", autor: "Carlos Ruiz", empresa: "Empresa Ruiz", estrellas: 5 },
        { texto: "Mis clientes están más satisfechos gracias a Rubz.", autor: "Laura García", empresa: "Empresa García", estrellas: 5 },
        { texto: "Todo mucho más fácil y rápido.", autor: "Pedro Sánchez", empresa: "Empresa Sánchez", estrellas: 4 },
        { texto: "Ahora controlo todos los pedidos desde mi tablet.", autor: "Ana Fernández", empresa: "Empresa Fernández", estrellas: 5 },
        { texto: "Perfecto para empresas medianos que buscan eficiencia.", autor: "Luis Martínez", empresa: "Empresa Martínez", estrellas: 4 },
        { texto: "La atención al cliente de Rubz es insuperable.", autor: "Sofía Torres", empresa: "Empresa Torres", estrellas: 5 },
        { texto: "Antes tardábamos horas en gestionar pedidos; ahora es cuestión de minutos.", autor: "Miguel Navarro", empresa: "Empresa Navarro", estrellas: 5 },
        { texto: "Nos ha permitido mejorar la organización del empresa y la satisfacción del cliente.", autor: "Elena Gómez", empresa: "Empresa Gómez", estrellas: 5 },
        { texto: "Rubz ha simplificado nuestra facturación y control de stock.", autor: "Javier Ruiz", empresa: "Empresa Ruiz", estrellas: 4 },
        { texto: "Todo el equipo lo usa a diario y está encantado.", autor: "Patricia Morales", empresa: "Empresa Morales", estrellas: 5 },
        { texto: "Gestión completa y fácil de entender.", autor: "Antonio Díaz", empresa: "Empresa Díaz", estrellas: 4 },
        { texto: "Recomiendo Rubz a todos mis colegas de empresa.", autor: "Beatriz Sánchez", empresa: "Empresa Sánchez", estrellas: 5 },
        { texto: "Gracias a Rubz, tenemos todo bajo control y sin estrés.", autor: "Manuel Ortega", empresa: "Empresa Ortega", estrellas: 5 },
        { texto: "Ideal para empresas que quieren digitalizarse sin complicaciones.", autor: "Carmen Ruiz", empresa: "Empresa Ruiz", estrellas: 4 },
        { texto: "El software de Rubz es intuitivo y muy completo.", autor: "Raúl Fernández", empresa: "Empresa Fernández", estrellas: 5 },
        { texto: "Nos ayuda a gestionar pedidos, clientes y facturación sin errores.", autor: "Isabel Jiménez", empresa: "Empresa Jiménez", estrellas: 5 },
        { texto: "El soporte técnico siempre responde rápido y eficaz.", autor: "David Castillo", empresa: "Empresa Castillo", estrellas: 5 },
        { texto: "Desde que usamos Rubz, hemos ganado tiempo y control.", autor: "Marta Vega", empresa: "Empresa Vega", estrellas: 4 },
        { texto: "Funcionalidades que otros programas solo prometen.", autor: "Fernando Paredes", empresa: "Empresa Paredes", estrellas: 5 },
        { texto: "Nuestro empresa nunca había estado tan organizado.", autor: "Lucía Molina", empresa: "Empresa Molina", estrellas: 5 },
        { texto: "La integración con Scryfall es perfecta.", autor: "Héctor Blanco", empresa: "Empresa Blanco", estrellas: 4 },
        { texto: "Rubz es imprescindible para gestionar un empresa moderno.", autor: "Nuria Santos", empresa: "Empresa Santos", estrellas: 5 },
        { texto: "Rápido, intuitivo y confiable.", autor: "Óscar Ramírez", empresa: "Empresa Ramírez", estrellas: 4 },
        { texto: "Ahora podemos hacer seguimientos de clientes y pedidos de forma sencilla.", autor: "Silvia Ortega", empresa: "Empresa Ortega", estrellas: 5 },
        { texto: "Una inversión que se nota desde el primer mes.", autor: "Jorge Hernández", empresa: "Empresa Hernández", estrellas: 5 },
        { texto: "Ideal para empresas familiares como el nuestro.", autor: "Patricia Delgado", empresa: "Empresa Delgado", estrellas: 4 },
        { texto: "El seguimiento de pedidos con tablet nos ha cambiado la forma de trabajar.", autor: "Ricardo Ruiz", empresa: "Empresa Ruiz", estrellas: 5 },
        { texto: "Rubz simplifica la gestión de empresa a otro nivel.", autor: "Sandra Molina", empresa: "Empresa Molina", estrellas: 5 },
        { texto: "Los informes de productividad son muy útiles para tomar decisiones.", autor: "Alberto Jiménez", empresa: "Empresa Jiménez", estrellas: 4 },
        { texto: "Nos permite atender mejor a nuestros clientes y aumentar la fidelización.", autor: "Laura Torres", empresa: "Empresa Torres", estrellas: 5 },
        { texto: "Todo integrado, sin perder tiempo con aplicaciones externas.", autor: "Iván López", empresa: "Empresa López", estrellas: 5 },
        { texto: "El módulo de planificador visual es fantástico.", autor: "Rosa García", empresa: "Empresa García", estrellas: 5 },
        { texto: "Más control, menos errores, más tranquilidad.", autor: "Miguel Ángel Díaz", empresa: "Empresa Díaz", estrellas: 4 },
        { texto: "Rubz es la columna vertebral de nuestro empresa.", autor: "Carla Sánchez", empresa: "Empresa Sánchez", estrellas: 5 },
        { texto: "Perfecto para empresas que quieren crecer sin caos.", autor: "Víctor Fernández", empresa: "Empresa Fernández", estrellas: 5 },
        { texto: "No sabemos cómo trabajábamos antes sin Rubz.", autor: "Elena Martín", empresa: "Empresa Martín", estrellas: 5 },
        { texto: "Integración con mensajería y documentos impecable.", autor: "Joaquín Ruiz", empresa: "Empresa Ruiz", estrellas: 4 },
        { texto: "Rubz facilita el trabajo diario y la comunicación interna.", autor: "Marina López", empresa: "Empresa López", estrellas: 5 },
        { texto: "Muy recomendable para empresas de cualquier tamaño.", autor: "Raúl Sánchez", empresa: "Empresa Sánchez", estrellas: 5 },
        { texto: "Un software que realmente entiende las necesidades de mi empresa.", autor: "Patricia Gómez", empresa: "Empresa Gómez", estrellas: 5 },
        { texto: "Gestión integral y fácil de usar.", autor: "Luis Torres", empresa: "Empresa Torres", estrellas: 4 }
    ];
    this.numTest = 8; // Número de testimonios a mostrar
    this.testimoniosSeleccionados = [];
  }

  connectedCallback() {
    this.seleccionarTestimonios();
    this.render();
  }

  seleccionarTestimonios() {
    const copia = [...this.testimonios];
    this.testimoniosSeleccionados = [];
    for (let i = 0; i < this.numTest; i++) {
      const idx = Math.floor(Math.random() * copia.length);
      this.testimoniosSeleccionados.push(copia[idx]);
      copia.splice(idx, 1);
    }
  }

  renderStars(count) {
    const max = 5;
    let html = "";

    for (let i = 1; i <= max; i++) {
      if (i <= count) {
        html += `<span class="on">★</span>`;
      } else {
        html += `<span class="off">★</span>`;
      }
    }

    return html;
  }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
            display: block;
            max-width: 100%;
            overflow: hidden;
            font-family: 'Montserrat', sans-serif;
            padding: 20px 0;
            }

            .scroll-wrapper {
            display: flex;
            width: max-content;
            animation: scroll 120s linear infinite;
            padding: 16px;
            }

            .card {
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            padding: 20px;
            margin-right: 20px;
            min-width: 220px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex-shrink: 0;
            min-width: 300px;
            max-width: 400px;
            }

            .texto {
            font-size: 14px;
            line-height: 1.4;
            color: #333;
            margin-bottom: 12px;
            }

            .autor {
            font-weight: 600;
            font-size: 13px;
            color: #555;
            text-align: right;
            }

            .estrellas {
            font-size: 18px;
            margin-top: 4px;
            text-align: left;
            }

            .estrellas .on {
            color: #f5b50a;
            }

            .estrellas .off {
            color: #ccc;
            }

            @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
            }
        </style>

        <div class="scroll-wrapper">
            ${[...this.testimoniosSeleccionados, ...this.testimoniosSeleccionados].map(t => `
            <div class="card">
                <p class="texto">"${t.texto}"</p>
                <span class="autor">— ${t.autor}</span>
                <span class="estrellas">${this.renderStars(t.estrellas)}</span>
            </div>
            `).join('')}
        </div>
        `;
    }
}

customElements.define("wc-testimonials", TestimonialsComponent);