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
      align-items: center;
      padding: 6px 8px;
      color: var(--royal-blue);
      font-size: 12px;
      font-weight: 500;

      &.info {
        display: flex;
        gap: 6px;
      }

      .ico {
        cursor: pointer;
        font-size: 12px;
        color: var(--royal-blue);

        &.ascii {
          font-size: 16px;
        }
      }
    }

  .title {
    color: var(--titleColor, --royal-blue);
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

  .footer {
    display: flex;
    align-items: center;
    padding: 0 10px 10px 10px;
    color: var(--slate);
    font-size: 12px;
    font-weight: 500;
    
    .add {
      cursor: pointer;
    }
  }

</style>
<div class="header">
    <div class="info">
        <span class="title" contenteditable="true"></span>
        <span id="cardsNumber" class="number"></span>
    </div>
    <span class="ico ascii">⋮</span>
</div>
<div class="cards"></div>
<div class="footer" style="visibility: var(--add-visibility, 'hidden')">
    <span class="add">+ Add card</span>
</div>
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

    .title {
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
    #group;
    #cards;

    #titleElement;
    #cardsNumberElement;
    #cardsContainer;
    #addCardContainer;

    constructor() {
        super();
        this.#group = null;
        this.#cards = [];
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.content.cloneNode(true));

        this.#titleElement = shadowRoot.querySelector(".title");
        this.#cardsNumberElement = shadowRoot.getElementById("cardsNumber");
        this.#cardsContainer = shadowRoot.querySelector(".cards");
        this.#addCardContainer = shadowRoot.querySelector(".add");


        this.#addCardContainer.addEventListener("click", () => this.clickAddCard());

    }

    clickAddCard() {
        let newCard = document.createElement("wc-card");
        newCard.classList.add("wc-card");
        newCard.estilos = cardStyles;
        this.#cardsContainer.appendChild(newCard);
        let card = {
            groupId: this.#group.id,
            title: "Click to edit this card",
            desc: "Test text as description",
        }; 
        
        newCard.vista = this.getHtmlFromCard(card);
    }    

    set group(group) {
        if (this.#group === group) {
            return;
        }
        console.log("Kanban Group - Set group");
        this.#group = group;
        console.log(group);
        this.render();
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
        return this.#cards.filter((card) => card.groupId === this.#group.id);
    }

    getHtmlFromCard(card) {
        return (
            card &&
            `<span class="title">${card.title}</span>
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
        this.#titleElement.textContent = this.#group.title;
        if (this.#group.color && this.#group.color !== "") {
            this.style.setProperty("--titleColor", this.#group.color);
        }

        if (this.#group.editable) {
            this.style.setProperty("--add-visibility", "visible");
        }

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
