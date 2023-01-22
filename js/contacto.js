
const form = document.querySelector("#formulario")
const inputs = document.querySelectorAll(".form")

const inputNombre = document.querySelector("#nombre")
const inputApellido = document.querySelector("#apellido")
const inputEmail = document.querySelector("#email")
const inputTextarea = document.querySelector("#textarea")


const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    textarea: /^[a-zA-ZÀ-ÿ0-9.\s]{1,1000}$/, // Letras y espacios, pueden llevar acentos.
}

const campos = {
    nombre: false,
    apellido: false,
    email: false,
    textarea: false,
}


form.onsubmit = (event) => {
    event.preventDefault();

    fetch("https://63c45ab88067b6bef6d8004c.mockapi.io/api/v1/formulariodecontacto", {
    method: "POST",
    body: JSON.stringify({
        nombre: inputNombre.value,
        apellido: inputApellido.value,
        email: inputEmail.value,
        textarea: inputTextarea.value,
    }),
    headers: {
        "Content-Type": "application/json"
    }
    })
    .then(res => res.json())
    .then(data => (data))

    if(campos.nombre && campos.apellido && campos.email && campos.textarea){
        form.reset();

        document.getElementById("formulario__mensaje-exito").style.display = "block";
        document.getElementById("formulario__mensaje").style.display = "none";
    }else{
        document.getElementById("formulario__mensaje").style.display = "block";
        document.getElementById("formulario__mensaje-exito").style.display = "none";
    }

    

}


const validarFormulario = (e) => {
    switch (e.target.name){
        case "nombre":
            validarCampo(expresiones.nombre, e.target, `nombre`)
        break

        case "apellido":
            validarCampo(expresiones.apellido, e.target, `apellido`)
        break

        case "email":
            validarCampo(expresiones.email, e.target, `email`)
        break

        case "textarea":
            validarCampo(expresiones.textarea, e.target, `textarea`)
        break
    }
}
const validarCampo = (expresion, input, campo) => {
if (expresion.test(input.value)){
    document.getElementById(`grupo__${campo}`).style.color = "#1ed12d ";
    document.getElementById(`${campo}`).style.border = "3px solid #1ed12d";
    campos[campo] = true;

}else {
    document.getElementById(`grupo__${campo}`).style.color = "#bb2929";
    document.getElementById(`${campo}`).style.border = "3px solid #bb2929";
    campos[campo] = false;
}
}

inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario)
    input.addEventListener("blur", validarFormulario)
})