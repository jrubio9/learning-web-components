const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    width: 100%;
    height: auto;
    gap: 15px;
    background-color: var(--marble-2);
    border: 1px solid var(--periwinkle-light);
    border-radius: 8px;
}
  .header {
      display: flex;
      justify-content: space-between;
      padding: 6px 8px;
      color: var(--royal-blue);
      font-size: 12px;
      font-weight: 500;
  }

  .header.info {
    display: flex;
    gap: 6px;
  }

  .number {
    color: var(--slate);
  }

  .cards {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 12px;
  }

</style>
<div class="header">
    <div class="info">
        <span id="title"></span>
        <span id="cardsNumber" class="number"></span>
    </div>
    <span class="ico">...</span>
</div>
<div class="cards"></div>
`;

const cardStyles = `
<style>
    :host {
        min-height: 75px;
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 6px 12px;
        border-radius: 4px;
        border: 1px solid var(--pale-grey-2);
        background-color: var(--pale-grey-3);
        font-size: 12px;
        transition: transform 100ms;
    }

    :host(:hover) {
        box-shadow: rgba(6, 24, 44, 0.08) 0px 0px 0px 2px, rgba(6, 24, 44, 0.25) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    }

    .principal {
        font-size: 16px;
        color: var(--royal-blue);
        font-weight: 500;
    }

    .descripcion {
        color: var(--blue-grey);
    }

    .etiquetas {
    
    }
</style>
`;

class KanbanGroup extends HTMLElement {
    #groupId;
    #title;
    #cards;

    #titleElement;
    #cardsNumberElement;
    #cardsContainer;

    constructor() {
        super();
        this.#groupId = -1;
        this.#title = "";
        this.#cards = [];
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.content.cloneNode(true));

        this.#titleElement = shadowRoot.getElementById("title");
        this.#cardsNumberElement = shadowRoot.getElementById("cardsNumber");
        this.#cardsContainer = shadowRoot.querySelector(".cards");
    }

    set groupId(groupId) {
        if (this.#groupId === groupId) {
            return;
        }
        this.#groupId = groupId;
        console.log("GroupId:", groupId);
    }

    set title(data) {
        if (data === this.#title) {
            return;
        }
        console.log("Kanban Group - Set title");
        this.#title = data.title;
        this.#titleElement.textContent = data;
    }

    set titleColor(data) {
        var customStyle = "color: " + data;
        this.#titleElement.setAttribute("style", customStyle);
        this.#titleElement
    }

    set cards(data) {
        if (data === this.#cards) {
            return;
        }
        console.log("Kanban Group - Set cards");

        this.#cards = data;
        this.render();
    }

    filterGroupCards() {
        return this.#cards.filter((card) => card.groupId === this.#groupId);
    }

    getHtmlFromCard(card) {
        return (
            card &&
            `<span class="principal">${card.title}</span>
            <span class="descripcion">${card.desc}</span>
            <div class="etiquetas">${card.tags ? card.tags : ""}</div>
            `
        );
    }

    renderCardContainers(needed) {
        while (this.#cardsContainer.childNodes.length > needed) {
            this.#cardsContainer.removeChild(this.#cardsContainer.firstChild);
        }

        while (this.#cardsContainer.childNodes.length < needed) {
            let card = document.createElement("wc-card");
            card.estilos = cardStyles; // Asignamos el CSS personalizado.
            this.#cardsContainer.appendChild(card);
        }
        return this.#cardsContainer.childNodes;
    }

    render() {
        const groupCards = this.filterGroupCards();
        this.#cardsNumberElement.textContent = "(" + groupCards.length + ")";
        let cardsComponents = this.renderCardContainers(groupCards.length);
        if (!cardsComponents || !groupCards) {
            return;
        }

        cardsComponents.forEach((cardComponent, index) => {
            cardComponent.estilos = cardStyles;
            cardComponent.datos = groupCards[index];
            cardComponent.vista = this.getHtmlFromCard(groupCards[index]);
        });
    }
}
customElements.define("wc-kanban-group", KanbanGroup);
