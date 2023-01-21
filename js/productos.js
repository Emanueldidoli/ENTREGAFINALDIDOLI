// funcion para mequetar los productos en html

function productosHtml (array){
    const contenedor = document.querySelector(".row ");
    for (let i = 0; i < array.length;i++) {
        const card = document.createElement("div")
        card.className = "col-sm-6 col-md-4 col-lg-3"
        card.innerHTML = `
        <div class="fluid maps" id="producto-${array[i].id}">
                        <img src=${array[i].img} class="img-fluid" alt=${array[i].producto}>
                        <div class="card-body">
                            <h2 class="card-title">${array[i].producto}</h2>
                            <p class="card-text">$${array[i].precio}</p>
                            <button id="boton-${array[i].id}" class="boton-card btn btn-primary">Agregar al carrito</button>
                        </div>
                    </div>
                    </div>
        `
        contenedor.appendChild(card)
    }
}

// metodo fetch para llamar a los productos mediante mockapi
fetch("https://63c45ab88067b6bef6d8004c.mockapi.io/api/v1/joyas")
.then(res => res.json())
.then(data => {
    productosHtml(data)
})

// variable de carrito
let carrito = []

// funcion para agregar los productos al carrito
function agregarAlCarrito (array){
    const botonAgregar = document.querySelectorAll(".boton-card")
    botonAgregar.forEach(boton => {
        boton.onclick = () => {
            const id = boton.id.slice(6)
            const filtrarProducto = array.find((elemento) =>{
                return elemento.id === Number(id)
            })
            carrito.push(filtrarProducto)
            localStorage.setItem("carrito", JSON.stringify(carrito))
        }
    })
}


const productosElegidos = JSON.parse(localStorage.getItem("carrito"))
carrito = productosElegidos || []

fetch("https://63c45ab88067b6bef6d8004c.mockapi.io/api/v1/joyas")
.then(res => res.json())
.then(data => {
agregarAlCarrito(data)

})

