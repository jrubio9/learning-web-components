const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
    display: flex;
    flex: 1 1 auto;
    gap: 15px;
}
</style>
<div class="header">
    <div>
        <span id="title"></span>
        <span id="cardsNumber"></span>
    </div>
    <span class="ico">opciones</span>
</div>
<div class="cards"></div>
`;

const cardStyles = `
<style>
    :host {
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        gap: 8px;
    }
</style>
`;

class KanbanGroup extends HTMLElement {
  #title;
  #cards;

  #titleElement;
  #cardsNumberElement;
  #cardsContainer;

  constructor() {
    super();
    this.#title = "";
    this.#cards = [];
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.#titleElement = shadowRoot.querySelector("span:nth-child(1)");
    this.#cardsNumberElement = shadowRoot.querySelector("span:nth-child(2)");
    this.#cardsContainer = shadowRoot.querySelector(".cards");
  }

  set title(data) {
    this.#title = data.title;
    this.render();
  }

  set cards(data) {
    this.#cards = data;
    this.render();
  }

  filterGroupCards() {
    return this.#cards.filter((card) => card.group === this.group);
  }

  getHtmlFromCard(card) {
    return `
        <span class="principal">${card.vista}</span>
        <span class="descripcion">${card.descr}</span>
        <div class="etiquetas">${card.tags}</div>
        `;
    // <div class="otros">${card.otros}</div>
  }

  renderCardContainers(needed) {
    while (this.#cardsContainer.childNodes.length > needed) {
      this.#cardsContainer.removeChild(this.shadowRoot.firstChild);
    }

    while (this.#cardsContainer.childNodes.length < needed) {
      let card = document.createElement("wc-card");
      card.estilos = cardStyles; // Asignamos el CSS personalizado.
      this.#cardsContainer.appendChild(card);
    }
    return this.shadowRoot.childNodes;
  }

  render() {
    this.#titleElement.textContent = this.#title;
    this.#cardsNumberElement.textContent = this.#cards.length;

    const groupCards = filterGroupCards();
    let cardsComponents = renderCardContainers(groupCards.length);

    cardsComponents.forEach((cardComponent, index) => {
      cardComponent.datos = groupCards[index];
      cardComponent.vista = getHtmlFromCard(groupCards[index]);
    });
  }
}
customElements.define("wc-kanban-group", KanbanGroup);