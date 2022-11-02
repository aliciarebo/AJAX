
const URL_DESTINO = "http://localhost:5500/"

const RECURSO = "resources.json"

getSizesAndIngredients()

/*
Una vez le damos al botón de enviar llamamos nuevamente a nuestro método getSizesAndIngredients 
para traer la información del JSON */
document.getElementById('refresh').addEventListener('click', getSizesAndIngredients)

/*
Función que al darle al botón de refrescar borra los 
datos para que no se repita lo que hemos creado */
function limpiarDatos() {
  document.querySelectorAll('#fradio .radio').forEach(element => element.remove());
  document.querySelectorAll('#fcheckbox .check').forEach(element => element.remove());
}

function getSizesAndIngredients() {

  let xmlHttp = new XMLHttpRequest()

  xmlHttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        limpiarDatos()
        procesarRespuestaRadio(this.responseText)
        procesarRespuestaCheck(this.responseText)
      } else {
        swal("Error", "Error al obtener la información necesaria", "error");
      }
    }
  }

  xmlHttp.open('GET', URL_DESTINO + RECURSO, true)
  xmlHttp.send()
}

/*
Función que crea divs, inputs de tipo radio y label (con su textNode) por cada tamaño de pizza
que tenemos en el JSON */
function procesarRespuestaRadio(jsonDoc) {
  let objetoJson = JSON.parse(jsonDoc)
  let arraySizes = objetoJson.PIZZA.SIZES;

  for (let size of arraySizes) {
    let div = document.createElement('div');
    div.setAttribute('class', 'radio');

    document.getElementById('fradio').appendChild(div);

    div.appendChild(createInput(size.NAME, 'radio', 'formradio', size.NAME));
    div.appendChild(createLabel(size.NAME)).appendChild(createTextNode(size.NAME));
  }

}

/*
Función que crea divs, inputs de tipo checkbox y label (con su textNode) por cada 
ingrediente de pizza que tenemos en el JSON */
function procesarRespuestaCheck(jsonDoc) {
  let objetoJson = JSON.parse(jsonDoc)
  let arrayIngre = objetoJson.PIZZA.INGREDIENTS;

  for (let ingredient of arrayIngre) {
    let div = document.createElement('div');
    div.setAttribute('class', 'check');

    document.getElementById('fcheckbox').appendChild(div);
    div.appendChild(createInput(ingredient.NAME, 'checkbox', ingredient.NAME, ingredient.NAME));
    div.appendChild(createLabel(ingredient.NAME)).appendChild(createTextNode(ingredient.NAME));
  }

}

//--- Funciones para crear Inputs, TextNode y Label reutilizado de la primera actividad------
function createInput(id, type, name, value = '') {
  let input = document.createElement('input');
  input.setAttribute('id', id);
  input.setAttribute('type', type);
  input.setAttribute('name', name);

  if (value !== '') {
    input.setAttribute('value', value);
  }

  return input;
}

function createTextNode(text) {
  let textNode = document.createTextNode(text)
  return textNode;
}

function createLabel(id) {
  let label = document.createElement('label');
  label.setAttribute('for', id);
  return label;
}
