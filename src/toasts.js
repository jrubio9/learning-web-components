var __injected = false;

// Inyectar CSS si no existe
function injectToastStyles() {
  if (__injected) return; // evitar duplicados

  const style = document.createElement("style");
  style.id = "toast-styles";
  style.textContent = `
    #toast-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 9999;
    }

    .toast {
      display: flex;
      align-items: center;
      padding: 12px 18px;
      border-radius: 6px;
      color: white;
      font-size: 14px;
      min-width: 200px;
      max-width: 350px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      opacity: 0;
      transform: translateX(100%);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .toast.success { background-color: #4caf50; }
    .toast.error   { background-color: #f44336; }
    .toast.warning { background-color: #ff9800; color: #222; }
    .toast.info    { background-color: #2196f3; }

    .toast.show {
      opacity: 1;
      transform: translateX(0);
    }

    .toast span {
      flex: 1;
    }
  `;
  document.head.appendChild(style);
  __injected = true;
}

function getToastContainer() {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }
  return container;
}

export function showToast(message, type = "info", duration = 4000) {

  const container = getToastContainer();

  // Limitar máximo 5 toasts
  if (container.children.length >= 5) {
    container.children[0].remove();
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("show"));

  setTimeout(() => {
    toast.classList.remove("show");
    toast.addEventListener("transitionend", () => toast.remove());
  }, duration);
}

injectToastStyles();