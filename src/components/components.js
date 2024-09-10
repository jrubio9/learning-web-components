
function Components() {
    console.log("Exec components");
    const components = document.querySelector(".components-list");

    //
    // MODAL
    //
    const modal = document.getElementById('custom-modal');
    const openButton = document.getElementById('open-button');
  
    openButton.addEventListener('click', () => {
        console.log("Abrir modal");
      modal.openModal();
    });
}

export default Components = new Components();