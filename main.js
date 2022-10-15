//BASE DE DATOS//////////////////////////////////////////
let baseDatos = []

function guardarEnLocalStorage() {
  localStorage.setItem('base-datos', JSON.stringify(baseDatos))
}

function recuperValoresLocalStorage() {
  return JSON.parse(localStorage.getItem('base-datos'))
}

//RECUPERAR LOS VALORES DEL LOCAL STORAGE Y RENDERIZARLOS POR PRIMERA VEZ
window.addEventListener('load', () => {
  valor = localStorage.getItem('base-datos')

  if (valor !== null || undefined) {
    baseDatos = recuperValoresLocalStorage()
  }

  MostrarTareas()
})

//RENDERIZAR LAS TAREAS////////
function MostrarTareas() {

  let contenido = ''

  baseDatos.forEach(elemento => {
    contenido = `
    <article id='${elemento.id}' onclick="tacharTarea(${elemento.id})">
    <p class='contenido ${elemento.tachado ? 'tachado' : ''}' >${elemento.contenido}</p>
    <button class="boton-eliminar" onclick="eliminarTarea(${elemento.id})" >X</button>
    </article>
    ` + contenido
  });

  document.getElementById('contenedor-tareas').innerHTML = contenido

  guardarEnLocalStorage(baseDatos)
}



//ALTERNAR EL EDITOR DE TEXTO///////////////
const seccionEditar = document.querySelector('#seccion-escribir')
const botonAgregar = document.querySelector('#boton-nueva-tarea')
const botonSalir = document.querySelector('#boton-salir')

botonAgregar.addEventListener('click', () => {
  seccionEditar.style.display = 'flex'
})

botonSalir.addEventListener('click', () => {
  seccionEditar.style.display = 'none'
})

//COMPROBAR CANTIDAD DE CARACTERES/////////
const texto = document.querySelector('#texto')
const botonGuardar = document.querySelector('#boton-guardar')
const contador = document.querySelector('#contador')

texto.addEventListener('input', () => {
  let valor = 50 - texto.value.length

  if (valor < 0) {
    botonGuardar.disabled = true
  } else {
    botonGuardar.disabled = false
  }

  contador.textContent = valor
})

//GUARDAR TAREAS/////////////////////////////
class Tarea {
  constructor(id, contenido, tachado) {
    this.id = id
    this.contenido = contenido
    this.tachado = tachado
  }
}

botonGuardar.addEventListener('click', guardarTarea)

function guardarTarea() {
  const texto = document.querySelector('#texto').value
  const id = Math.floor(Math.random() * 1000)

  const nuevaTarea = new Tarea(id, texto, false)
  baseDatos.push(nuevaTarea)

  //limpiar la pantalla despues de darle click en guardar
  document.querySelector('#texto').value = ''

  MostrarTareas()
}

//TACHAR TAREAS//////////////////////////////
function tacharTarea(id) {
  let tarea = baseDatos.filter(x => x.id == id)
  tarea.some(x => x.tachado = !x.tachado)

  MostrarTareas()
}

//ELIMINAR TAREAS////////////////////////////
function eliminarTarea(idParaEliminar) {
  baseDatos = baseDatos.filter(x => x.id !== idParaEliminar)

  MostrarTareas()
}


