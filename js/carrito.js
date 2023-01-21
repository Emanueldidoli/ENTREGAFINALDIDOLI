// informacion de localstorage guardada en una variable
let infoDelLs = JSON.parse(localStorage.getItem("carrito"))

// funcion para mostrar los productos en el carrito
const productosHtml = (array) => {
    const contenedor = array.reduce((acc, element) => {
        return acc + `
        <div class="col-sm-6 col-md-4 col-lg-3"> 
        <div class="fluid maps" id="producto-${element.id}">
                        <img src=${element.img} class="img-fluid" alt=${element.producto}>
                        <div class="card-body">
                            <h2 class="card-title">${element.producto}</h2>
                            <p class="card-text">$${element.precio}</p>
                            <p>Cantidad: 1 <span id="cantidad"</span></p>
                            <button id="boton-${element.id}" class="boton-card btn btn-primary">Eliminar del carrito</button>
                        </div>
                    </div>
                    </div>
        `
    }, "")
    document.querySelector(".carrito-contenedor").innerHTML = contenedor
    if(contenedor.length === 0){
        document.querySelector(".carrito-vacio").innerHTML = `
        <h3 class"col">Carrito vacio</h3>
        <strong>No tenés nada seleccionado.</strong>
        `
    }
    carritoTotal(infoDelLs)

}
// metodo fetch con funcion de mostar los productos en carrito
fetch("https://63c45ab88067b6bef6d8004c.mockapi.io/api/v1/joyas")
.then(res => res.json())
.then(data => {
    productosHtml(infoDelLs)
})

// funcion para borrar los productos del carrito
function borrarDelCarrito (array){
    const botonEliminar = document.querySelectorAll(".boton-card")
    botonEliminar.forEach(boton => {
        boton.onclick = () => {
            const id = boton.id.slice(6)
            const filtrarProducto = array.filter((elemento, i) =>{
                return elemento.id != Number(id)
            })
            infoDelLs = filtrarProducto
            localStorage.setItem("carrito", JSON.stringify(infoDelLs))
            productosHtml(infoDelLs)
            borrarDelCarrito(infoDelLs)
            
        }
    })
}


fetch("https://63c45ab88067b6bef6d8004c.mockapi.io/api/v1/joyas")
.then(res => res.json())
.then(data => {
borrarDelCarrito(infoDelLs)

})


const vaciarCarrito = document.querySelector("#vaciar-carrito")

// funcion para vaciar el carrito
vaciarCarrito.onclick = () => {
    localStorage.removeItem("carrito")
    document.querySelector(".carrito-vacio").innerHTML = `
    <h3 class"col">Carrito vacio</h3>
    <strong>No tenés nada seleccionado.</strong>
    `
}

// funcion para sumar el precio total del carrito
function carritoTotal() {
    let total = 0
    const itemCartTotal = document.querySelector(".item-cart-total")
    infoDelLs.forEach((item) =>{
        
        const precio = item.precio
        total = total + precio
    })
    itemCartTotal.innerHTML = `Total $${total}`
}

const finalizarCompra = document.querySelector("#finalizar-compra")

finalizarCompra.onclick = () => {
    localStorage.removeItem("carrito")
    document.querySelector(".carrito-vacio").innerHTML = `
    <h3 class"col">Carrito vacio</h3>
    <strong>No tenés nada seleccionado.</strong>
    <h4 class="exito">Compra realizada con exito</h4>
    `
}

