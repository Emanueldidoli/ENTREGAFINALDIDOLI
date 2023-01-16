function productosHtml (array){
    const contenedor = document.querySelector(".row ");
    for (let i = 0; i < array.length;i++) {
        const card = document.createElement("div")
        card.className = "col-sm-6 col-md-4 col-lg-3"
        card.innerHTML = `
        <div class="fluid maps">
                        <img src=${array[i].imagen} class="img-fluid" alt=${array[i].producto}>
                        <div class="card-body">
                            <h2 class="card-title">${array[i].producto}</h2>
                            <p class="card-text">$${array[i].precio}</p>
                            <a href="#" class="btn btn-primary">Agregar al carrito</a>
                        </div>
                    </div>
                    </div>
        `
        contenedor.appendChild(card)
    }
}


fetch("https://63c45ab88067b6bef6d8004c.mockapi.io/api/v1/joyas")
.then(res => res.json())
.then(data => {
    console.log(data)
    productosHtml(data)
})



