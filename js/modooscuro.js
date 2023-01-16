  // Modo oscuro

    const botonModos = document.querySelector("#claro-oscuro")
    const body = document.querySelector(".modo-claro")

    botonModos.onclick = () => {
        body.classList.toggle("modo-oscuro")
    }