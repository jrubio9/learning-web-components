const template = document.createElement("template");
template.innerHTML = `
<div class="header">
    <div class="info">
        <span class="title" contenteditable="true"></span>
        <span id="cardsNumber" class="number"></span>
    </div>
    <div style="display: flex; justify-content: center; align-items: center; gap: 10px">
        <span class="ico ascii">⋮</span>
    </div>
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
        border: 1px solid var(--marble);
        background-color: var(--white);
        font-size: 12px;
        transition: transform 100ms;
      }
      
    :host(.disabled) {
        opacity: 0.8;
        background-color: var(--marble-2);
        border: 1px solid var(--periwinkle-light);
    }

    :host(.incidencias) {
      background-color: var(--pale-grey-2);
    }

    :host(:hover) {
        box-shadow: rgba(6, 24, 44, 0.08) 0px 0px 0px 2px, rgba(6, 24, 44, 0.25) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    }

    .title {
        font-size: 16px;
        color: var(--royal-blue);
        font-weight: 600;
    }

    .descripcion {
        color: var(--steel);
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
    this.appendChild(template.content.cloneNode(true));

    this.#titleElement = this.querySelector(".title");
    this.#cardsNumberElement = this.querySelector(".number");
    this.#cardsContainer = this.querySelector(".cards");
    this.#addCardContainer = this.querySelector(".add");

    this.#addCardContainer.addEventListener("click", () => this.clickAddCard());

    // When a card is released we need to know where to put it.
    this.#cardsContainer.addEventListener("drop", this.handleCardDrop);
    this.#cardsContainer.addEventListener("dragover", this.handleCardDragOver);
    this.#cardsContainer.addEventListener("dragleave", this.handleCardDragLeave);
  }

  disconnectedCallback() {
    this.#cardsContainer.removeEventListener("drop", this.handleCardDrop);
    this.#cardsContainer.removeEventListener(
      "dragover",
      this.handleCardDragOver
    );
    this.#cardsContainer.removeEventListener(
      "dragleave",
      this.handleCardDragLeave
    );
    this.#addCardContainer.removeEventListener("click", () =>
      this.clickAddCard()
    );
  }

  // ===========
  // GETS / SETS
  // ===========

  get groupId() {
    return this.#group.id;
  }

  set group(group) {
    if (JSON.stringify(this.#group) === JSON.stringify(group)) {
      return;
    }

    this.#group = group;
    this.render();
  }

  get cards() {
    return this.#cards;
  }

  set cards(data) {
    if (JSON.stringify(data) === JSON.stringify(this.#cards)) {
      return;
    }

    this.#cards = data;
    this.render();
  }

  // ===========
  // CARD DRAG & DROP
  // ===========

  handleCardDragStart(event) {
    // El contexto de this en este punto es wc-card, no wc-kanban-group.
    const { target, dataTransfer } = event;
    const cardId = target.getAttribute("id");
    dataTransfer.setData("text/plain", cardId);
    dataTransfer.effectAllowed = "move";
  }

  handleCardDragEnd(event) {
  }

  handleCardDragOver (event) {
    event.preventDefault();
    console.log(event, this);
    const { target, dataTransfer } = event;
    const draggedCardId = dataTransfer.getData("text/plain");
    if (!draggedCardId) {
      console.error("No se pudo obtener el ID de la tarjeta arrastrada.");
      return;
    }

    const textId = target.getAttribute("id");
    const id = textId ? Number(textId?.split("-")[1]) : null;
    console.log(textId, id, this.groupId);
    // Ignore this event if the card is already in the group
    if (this.groupId === id) {
      return;
    }
    console.log("Drag over");
    event.dataTransfer.dropEffect = "move";
  }

  handleCardDragLeave(event) {
    event.preventDefault();
  }

  handleCardDrop = (event) => {
    event.preventDefault();
    console.log("drop", event, this); // this es el wc-kanban-group que recibe el objeto

    const { dataTransfer } = event;
    const cardId = dataTransfer.getData("text/plain");

    // Find the card with the matching cardId
    const cardIndex = this.#cards.findIndex(
      (card) => card.id === Number(cardId.split("-")[1])
    );

    // Save the original column to re-render after we change the card's column.
    if (cardIndex !== -1) {
      const originalGroupId = this.cards[cardIndex].groupId;
      //console.log("Card target", cardId, cardIndex, this.cards[cardIndex]);
      this.cards[cardIndex].groupId = this.groupId;

      this.lanzarActualizacionCard(originalGroupId, this.cards[cardIndex]);
    }
  }

  lanzarActualizacionCard(originalGroup, card) {
    const event = new CustomEvent("card-changed", {
      detail: {
        card: card,
        origen: originalGroup,
        destino: this.groupId,
        accion: "move",
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  actualizarCard(eventArgs) {
    //console.log(eventArgs);
    const { card, origen, destino, accion } = eventArgs.detail;

    if (!card) {
      return;
    }

    const groupCards = this.filterGroupCards();
    const cardGroupIndex = groupCards.findIndex(
      (groupCard) => groupCard.id === card.id
    );
    const cardIndex = this.#cards.findIndex((card) => card.id === card.id);

    if (accion === "update") {
    } else {
      if (cardIndex !== -1 && destino === this.groupId) {
        // ADD
        this.addCard(card);
      } else {
        // MOVE
        if (origen === this.groupId) {
          this.removeCard(card.id);
        } else if (destino === this.groupId) {
          this.addCard(card);
        }
      }
    }
    this.render();
  }

  // ===========
  //     AUX
  // ===========

  newCardComponent() {
    let cardComponent = document.createElement("wc-card");
    cardComponent.draggable = this.#group.editable;
    cardComponent.estilos = cardStyles; // Asignamos el CSS personalizado.
    if (!this.#group.editable) {
      cardComponent.classList.add("disabled");
    } else {
      cardComponent.addEventListener("dragstart", this.handleCardDragStart);
      cardComponent.addEventListener("dragEnd", this.handleCardDragEnd);
    }

    return cardComponent;
  }

  clickAddCard() {
    let card = {
      id: -1,
      groupId: this.#group.id,
      title: "Click to edit this card",
      desc: "Test text as description",
    };
    this.#cards.push(card);
    this.addCard(card);
  }

  getNextCardId() {
    const highestCardId = this.#cards.reduce((prev, current) => {
      return prev > current.id ? prev : current.id;
    }, 0);
    return highestCardId + 1;
  }

  addCard(card) {
    let newCard = this.newCardComponent();
    card.id = this.getNextCardId();
    let cardElement = this.#cardsContainer.appendChild(newCard);
    cardElement.setAttribute("id", "card-" + card.id);
    newCard.vista = this.getHtmlFromCard(card);
    const groupCards = this.filterGroupCards();
    this.#cardsNumberElement.textContent = "(" + groupCards.length + ")";
  }

  removeCard(cardId) {
    this.#cardsContainer.querySelector(`#card-${cardId}`)?.remove();
  }

  // ===========
  //    AUX
  // ===========

  /**
   * Filters the cards that belong to the current group.
   * @return {Array} An array of cards that belong to the current group.
   */
  filterGroupCards() {
    return this.#cards.filter((card) => card.groupId === this.#group.id);
  }

  getCardById(id) {
    return this.#cards.filter((card) => card.id === id);
  }

  /**
   * Returns the HTML representation of a card.
   *
   * @param {Object} card - The card object containing title, description, and tags.
   * @return {String} The HTML string representing the card.
   */
  getHtmlFromCard(card) {
    return (
      card &&
      `<span class="title">${card.title}</span>
            <span class="descripcion">${card.desc}</span>
            <div class="etiquetas">${card.tags ? card.tags : ""}</div>
            `
    );
  }

  // ===========
  //   RENDER
  // ===========

  renderCardContainers(needed) {
    while (this.#cardsContainer.childNodes.length > needed) {
      this.#cardsContainer.removeChild(this.#cardsContainer.firstChild);
    }

    while (this.#cardsContainer.childNodes.length < needed) {
      this.#cardsContainer.appendChild(this.newCardComponent());
    }
    return this.#cardsContainer.childNodes;
  }

  render() {
    //console.log("Kanban Groups - Render group " + this.#group.id);
    this.#titleElement.textContent = this.#group.title;
    if (this.#group.color && this.#group.color !== "") {
      this.style.setProperty("--titleColor", this.#group.color);
    }

    if (this.#group.editable) {
      this.style.setProperty("--add-visibility", "visible");
    } else {
      this.style.setProperty("--add-visibility", "hidden");
    }

    const groupCards = this.filterGroupCards();
    this.#cardsNumberElement.textContent = "(" + groupCards.length + ")";
    let cardsComponents = this.renderCardContainers(groupCards.length);
    if (!cardsComponents || !groupCards) {
      return;
    }

    cardsComponents.forEach((cardComponent, index) => {
      let card = groupCards[index];
      cardComponent.setAttribute("id", "card-" + card.id);
      cardComponent.estilos = cardStyles;
      cardComponent.datos = card;

      if (this.#group.incidencias) {
        cardComponent.classList.add("incidencias");
      } else {
        cardComponent.classList.remove("incidencias");
      }

      cardComponent.vista = this.getHtmlFromCard(card);
    });
  }
}
customElements.define("wc-kanban-group", KanbanGroup);
