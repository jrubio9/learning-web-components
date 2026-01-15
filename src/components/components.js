import "../styles/modal.css";
import "./wc-testimonials";
import { showToast } from "../toasts.js";

function Components() {
    console.log("Exec components");
    const components = document.querySelector(".components-list");

    //
    // MODAL
    //
    const modal = document.getElementById("custom-modal");
    const openButton = document.getElementById("open-button");

    openButton.addEventListener("click", () => {
        console.log("Abrir modal");
        modal.open();
    });

    // TOGGLE SWITCH
    const toggle = document.querySelector("wc-toggle-text");
    toggle.addEventListener("change", e => {
        console.log("Evento change ->", e.detail.value);
    });

    // TOASTS

    document.getElementById("show-success-toast-btn").addEventListener("click", () => {
        showToast("This is a success message!", "success");
    });

    document.getElementById("show-error-toast-btn").addEventListener("click", () => {
        showToast("This is a error message!", "error");
    });

    document.getElementById("show-warning-toast-btn").addEventListener("click", () => {
        showToast("This is a warning message!", "warning");
    });
}

export default Components = new Components();