
// funcion para mequetar los productos en html

const productosHtml = (array) => {
    const contenedor = array.reduce((acc, element) => {
        return acc + `
        <div class="col-sm-6 col-md-4 col-lg-3"> 
        <div class="fluid maps" id="producto-${element.id}">
                        <img src=${element.img} class="img-fluid" alt=${element.producto}>
                        <div class="card-body">
                            <h2 class="card-title">${element.producto}</h2>
                            <p class="card-text">$${element.precio}</p>
                            <button id="boton-${element.id}" class="boton-card btn btn-primary">Agregar al carrito</button>
                        </div>
                    </div>
                    </div>
        `
    }, "")
    document.querySelector(".row").innerHTML = contenedor
    
}

// metodo fetch para llamar a los productos mediante mockapi
fetch("https://63c45ab88067b6bef6d8004c.mockapi.io/api/v1/joyas")
.then(res => res.json())
.then(data => {
    productosHtml(data) 
})


// funcion para filtrar productos

const ordenarPorMenor = array => {
    const arrayOrdenado = JSON.parse(JSON.stringify(array)).sort((a, b) => a.precio - b.precio)
    return arrayOrdenado
}

fetch("https://63c45ab88067b6bef6d8004c.mockapi.io/api/v1/joyas")
.then(res => res.json())
.then(data => {
    document.querySelector("#menor").onclick = () => {
    productosHtml(ordenarPorMenor(data))
    }
})

const ordenarPorMayor = array => {
    const arrayOrdenado = JSON.parse(JSON.stringify(array)).sort((a, b) => b.precio - a.precio)
    return arrayOrdenado
}

fetch("https://63c45ab88067b6bef6d8004c.mockapi.io/api/v1/joyas")
.then(res => res.json())
.then(data => {
    document.querySelector("#mayor").onclick = () => {
    productosHtml(ordenarPorMayor(data))
    }
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

