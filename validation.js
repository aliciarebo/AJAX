const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('.fcontrol input');


const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{9}$/
}

let campos = {
  Nombre: false,
  Email: false,
  Telefono: false,
  Direccion: false
}

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "fname":
      validarCampo(expresiones.nombre, e.target, 'Nombre');
      break;
    case "email":
      validarCampo(expresiones.correo, e.target, 'Email');
      break;
    case "telef":
      validarCampo(expresiones.telefono, e.target, 'Telefono');
      break;
    case "direccion":
      validarDireccion();
      break;
  }
}

inputs.forEach((input) => {
  input.addEventListener('keyup', validarFormulario);
  input.addEventListener('blur', validarFormulario);
});

const validarCampo = (epresion, input, campo) => {
  if (epresion.test(input.value)) {
    document.getElementById(`grupo${campo}`).classList.remove('fcontrol-error');
    document.getElementById(`grupo${campo}`).classList.add('fcontrol-sucess');
    document.querySelector(`#grupo${campo} i`).classList.add('fcontrol-sucess');
    document.getElementById(`grupo${campo}`).classList.remove('fcontrol-error');
    campos[campo] = true;
  } else {
    document.getElementById(`grupo${campo}`).classList.add('fcontrol-error');
    document.getElementById(`grupo${campo}`).classList.remove('fcontrol-sucess');
    campos[campo] = false;

  }
}

const validarDireccion = () => {
  const inputDireccion = document.getElementById('direccion');
  if (inputDireccion.value == '') {
    document.getElementById("grupoDireccion").classList.add('fcontrol-error');
    document.getElementById("grupoDireccion").classList.remove('fcontrol-sucess');
    campos['Direccion'] = false;
  } else {
    document.getElementById("grupoDireccion").classList.add('fcontrol-sucess');
    document.getElementById("grupoDireccion").classList.remove('fcontrol-error');
    campos['Direccion'] = true;
  }
}

const validateRadio = () => {
  let selected = document.querySelector('input[type=radio]:checked');
  if (!selected) {
    return false
  }

  return true

}

const validateChecks = () => {
  let selected = document.querySelector('input[type=checkbox]:checked');
  if (!selected) {
    return false
  }

  return true
}

//----MODIFICACIÓN DEL CÓDIGO ORIGINAL-----
function getSizesAndIngredients() { //Reutilizamos parte del código de index.js

  let xmlHttp = new XMLHttpRequest()

  xmlHttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        calcularPrecio(JSON.parse(this.responseText))
      } else {
        swal("Error", "Error al obtener la información necesaria", "error");
      }
    }
  }

  xmlHttp.open('GET', URL_DESTINO + RECURSO, true)
  xmlHttp.send()
}

//FUNCIÓN QUE CALCULA EL PRECIO DE LOS TAMAÑOS E INGREDIENTES DE PIZZA
function calcularPrecio(json) {
  let price = 0;
  //Obtenemos el value del input marcado por el usuario
  let size = document.querySelector('input[type=radio]:checked').value;

  /*Obtenemos a través del NAME el PRICE de los tamaños de la pizza
  y lo guardamos en la variable price. Tenemos que parsearlo para convertirlo
  de tipo String a tipo Int para poder sumarlo*/
  price += parseInt(json.PIZZA.SIZES.find((element) => element.NAME === size).PRICE);

  /*Para obtener el precio de los ingredientes se hace igual solo que no podemos
    usar querySelector, sino que debemos usar querySelectorAll porque podemos seleccionar
    más de un ingrediente */
  document.querySelectorAll('input[type=checkbox]:checked').forEach(element => {
    price += parseInt(json.PIZZA.INGREDIENTS.find((el) => el.NAME === element.value).PRICE);
  });

  return swal('Enviado!', 'El precio final de la pizza es: ' + price + '$', 'success');

}

formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  let radioValid = validateRadio();
  let checkValid = validateChecks();

  if (campos.Nombre && campos.Email && campos.Telefono && campos.Direccion && radioValid && checkValid) {
    getSizesAndIngredients();
  } else if (!radioValid) {
    swal('Debes elegir el tamaño de la pizza');
  } else if (!checkValid) {
    swal('Debes elegir al menos un ingrediente');
  } else {
    swal("Error", "Rellena todos los campos", "error");
  }
})
