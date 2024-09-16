// src/components/wc-login.js
const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="/modales.css" type="text/css">
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

const LoginModalHtml = () => {
  const modalTemplate = document.createElement("template");
  modalTemplate.innerHTML = `
    <style>
      #login-modal {
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        justify-content: center;
        align-items: center;
        z-index: 100;
      }
      .window {
        background-color: white;
        border-radius: 10px;
        padding: 20px;
        max-width: 300px;
        width: 100%;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 10px;
        font-weight: bold;
      }
      .body {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 5px 10px;
      }

      .footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        justify-content: center;
      }

      .close-button {
        cursor: pointer;
      }
    </style>
    <div id="login-modal">
      <div class="window">
        <div class="header">
          <span>Log in</span>
          <span class="close-button">X</span>
        </div>
        <div class="body">
          <input type="text" id="modal-username" placeholder="Username" />
          <input type="password" id="modal-password" placeholder="Password" />
          <button id="modal-login-button">Log in</button>
        </div>
        <div class="footer">
          <span>Don't have an account? <a id="modal-signup-button" href="#">Sign up</a></span>
          <span>Test User: Rubz / 1234</span>
        </div>
      </div>
    </div>
  `;
  return modalTemplate.content.cloneNode(true);
};

// Mockup
const users = [
  {
    id: 1,
    name: "Rubz",
    color: "blue",
  },
  {
    id: 2,
    name: "User 2",
    color: "red",
  },
  {
    id: 3,
    name: "User 3",
    color: "green",
  },
];

class WcLogin extends HTMLElement {
  #isLoggedIn = false;
  #username = "";

  #loginModal = null;
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

    this.#loginButton?.addEventListener("click",() => this.showLoginModal());
    this.#logoutButton?.addEventListener("click",() => this.handleLogoutClick());

    this.render();
  }

  get loggedIn () {
    return this.#isLoggedIn;
  }

  get username () {
    return this.#username;
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

  showLoginModal() {
    const modal = LoginModalHtml();

    // Append modal to the shadow DOM
    this.shadowRoot.appendChild(modal);

    // Select the modal and its buttons
    const loginModal = this.shadowRoot.querySelector("#login-modal");
    const closeButton = this.shadowRoot.querySelector(".close-button");
    const modalLoginButton = this.shadowRoot.querySelector("#modal-login-button");

    // Event listener to close modal
    closeButton?.addEventListener("click", () => this.handleModalLoginClose(loginModal));

    // Event listener for login button inside modal
    modalLoginButton?.addEventListener("click", () => this.handleLogin(loginModal));
  }

  handleLogin(modal) {
    const usernameInput = this.shadowRoot.querySelector("#modal-username");
    // TODO: check if usernameInput value exists in users array

    const validLogin = usernameInput.value === "Rubz";

    if (validLogin) {
      this.#username = usernameInput.value;
      this.#isLoggedIn = true;
      window.localStorage.setItem("user", {id: "1", username: this.#username, color: "#3ff4c6"});

      this.render();
      this.handleModalLoginClose(modal);  // Close the modal after successful login
    } else {
      alert("Por favor, introduce un nombre de usuario válido.");
    }
  }

  handleModalLoginClose(modal) {
    if (modal) {
      modal.remove();  // Remove the modal from the DOM
    }
  }

  handleLogoutClick() {
    // Mock logout logic for now
    window.localStorage.removeItem("user");
    this.#isLoggedIn = false;
    this.#username = "";
    this.render();
  }
}

customElements.define("wc-login", WcLogin);
