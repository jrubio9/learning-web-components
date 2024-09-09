// src/components/wc-login.js
const template = document.createElement("template");
template.innerHTML = `
<style>
  :host {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 10px;
  }
  #login-button {
    background-color: #4CAF50;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  #logout-button {
    background-color: #e74c3c;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  #avatar {
    display: none;
    border-radius: 50%;
  }
</style>

  <span id="username"></span>
  <img id="avatar" src="https://via.placeholder.com/50" alt="Avatar" />
  <button id="logout-button" style="display: none">Log out</button>
  <button id="login-button">Log in</button>
`;

class WcLogin extends HTMLElement {
  #isLoggedIn = false;
  #username = "";

  #loginButton = null;
  #logoutButton = null;
  #userNameSpan = null;
  #avatarElement = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.#loginButton = this.shadowRoot.querySelector("#login-button");
    this.#logoutButton = this.shadowRoot.querySelector("#logout-button");
    this.#userNameSpan = this.shadowRoot.querySelector("#username");
    this.#avatarElement = this.shadowRoot.querySelector("#avatar");

    this.#loginButton?.addEventListener(
      "click",
      this.handleLoginClick.bind(this)
    );
    this.#logoutButton?.addEventListener(
      "click",
      this.handleLogoutClick.bind(this)
    );

    this.render();
  }

  render() {
    if (this.#isLoggedIn) {
      this.#userNameSpan.textContent = this.#username;
      this.#loginButton.style.display = "none";
      this.#logoutButton.style.display = "block";
      this.#avatarElement.style.display = "block";
    } else {
      this.#userNameSpan.textContent = "";
      this.#loginButton.style.display = "block";
      this.#logoutButton.style.display = "none";
      this.#avatarElement.style.display = "none";
    }
  }

  handleLoginClick() {
    // Mock login logic for now
    this.#isLoggedIn = true;
    this.#username = "John Doe";
    this.render();
  }

  handleLogoutClick() {
    // Mock logout logic for now
    this.#isLoggedIn = false;
    this.#username = "";
    this.render();
  }
}

customElements.define("wc-login", WcLogin);
