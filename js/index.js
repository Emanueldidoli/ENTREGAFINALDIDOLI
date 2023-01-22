const swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
    delay: 2500,
    disableOnInteraction: false,
    },
    pagination: {
    el: ".swiper-pagination",
    clickable: true,
    },
    navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
    },
});

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
    document.querySelector(".index").innerHTML = contenedor
    
}

// metodo fetch para llamar a los productos mediante mockapi
fetch("./js/ofertas.json")
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

fetch("./js/ofertas.json")
.then(res => res.json())
.then(data => {
agregarAlCarrito(data)

})
