const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
    display: flex;
    flex: 1 1 auto;
    gap: 15px;
    height: 100%;
    overflow-y: scroll;
}
.columns {
    display: flex;
    flex: 1 1 auto;
    gap: 15px;
}
.column {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  gap: 10px;
  min-width: 300px;
  max-width: 350px;
}
.last-column {
    display: flex;
    min-width: 180px;
    width: 200px;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    height: min-content;
    border: 1px solid var(--periwinkle-light);
    border-radius: 8px;
    padding: 6px 2px;
    cursor: pointer;

    &:hover {
        background-color: var(--marble-2);
    }

    & span {
        font-size: 12px;
        color: var(--slate);
        font-weight: 500;
    }    
}
</style>

<div class="columns"></div>
<div class="last-column">
    <span>+ Add column</span>
</div>
`;

class Kanban extends HTMLElement {
  #columnsStructure;
  #cards;

  #columnsElement;
  #addColumnElement;

  constructor() {
    super();
    this.#cards = [];
    this.#columnsStructure = [];
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.#columnsElement = this.shadowRoot.querySelector(".columns");
    this.#addColumnElement = this.shadowRoot.querySelector(".last-column");

    this.#addColumnElement.addEventListener("click", () =>
      this.clickAddColumn()
    );
    this.render();

    // Este listener escuchará cambios y llamará al método de actualizarCard, que pasará la información a todas las columnas
    // y estas a todos los grupos, y estos comprobaran si tienen la tarjeta y qué tienen que hacer con ella (eliminarla, añadirla o cambiar su estado).
    this.shadowRoot.addEventListener("card-changed", (e) =>
      this.actualizarCard(e)
    );
  }

  clickAddColumn() {
    let columnaKanban = document.createElement("wc-kanban-column");
    columnaKanban.classList.add("wc-kanban-column");
    columnaKanban.classList.add("column");
    columnaKanban.id = this.#columnsElement.childNodes.length;
    this.#columnsElement.appendChild(columnaKanban);
    this.#columnsStructure.push({ groups: [] });
    columnaKanban.groups = this.#columnsStructure;
  }

  // ===========
  // GETS / SETS
  // ===========

  set columnsStructure(data) {
    if (data === undefined || this.#columnsStructure === data) return;
    this.#columnsStructure = data;
  }

  set cards(data) {
    if (data === undefined || this.#cards === data) return;
    this.#cards = data;
    this.render();
  }

  // ===========
  //   RENDER
  // ===========

  renderColumns() {
    let necesarios = this.#columnsStructure.length;
    const columns = this.#columnsElement;
    while (columns.childNodes.length > necesarios) {
      columns.removeChild(columns.firstChild);
    }

    while (columns.childNodes.length < necesarios) {
      let columnaKanban = document.createElement("wc-kanban-column");
      columnaKanban.classList.add("wc-kanban-column");
      columnaKanban.classList.add("column");
      columns.appendChild(columnaKanban);
    }

    return this.#columnsElement.childNodes;
  }

  render() {
    const renderedColumns = this.renderColumns();
    renderedColumns.forEach((renderedCol, index) => {
      renderedCol.id = index;
      renderedCol.groups = this.#columnsStructure; // List<InfoGroup>
      renderedCol.cards = this.#cards;
    });
  }

  actualizarCard(eventArgs) {
    // const {card, origen, destino, accion } = eventArgs;
    //console.log("Se llama actualizarCard");
    this.#columnsElement.childNodes.forEach((column) => {
      column.actualizarCard(eventArgs);
    });
  }
}
if (!customElements.get("wc-kanban")) {
  customElements.define("wc-kanban", Kanban);
}