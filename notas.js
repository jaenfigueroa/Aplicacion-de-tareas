/* Base de datos provisional -> contenedor de notas ////////*/
let BaseDatosProvicional = [
  // {
  //   id: 1,
  //   contenido: "nxsnxs xsjnxsnxs xsnxsxus xsnxsnxus xsjn 1"
  // },
]

/* formato para las nuevas notas ////////////////////////////*/
class Nota {
  constructor(id, contenido) {
    this.id = id
    this.contenido = contenido
  }
}
/* ///////////////////////////////////////////////// */
const texto = document.querySelector('#texto')
const contador = document.querySelector('#contador')

const botonGuardar = document.querySelector('#boton-guardar')

texto.addEventListener('input', () => {
  /* calcular numero de caracteres disponibles */
  const maximo = 100
  let usados = texto.value.length

  let disponibles = maximo - usados
  /* imprimir numero de caracteres disponibles */
  contador.textContent = disponibles

  /* desactivar boton */
  if (disponibles < 0) {
    botonGuardar.disabled = true
  } else {
    botonGuardar.disabled = false
  }
})

/* //////////////////////////////////////////////// */
const contenedor = document.querySelector('#contenedor')

botonGuardar.addEventListener('click', () => {

  /* comprobar que el input no este vacio */
  if (texto.value) {
    /* crear los elemento necesarios*/
    const articulo = document.createElement('article')
    const p = document.createElement('p')
    const boton = document.createElement('button')

    /* crear id para la nota */
    const id = Math.random() * (Math.pow(10, 16))

    /* fusionar los elementos y contenido */
    p.textContent = texto.value
    boton.textContent = 'X'
    articulo.append(p)
    articulo.append(boton)

    boton.setAttribute('id', id)
    articulo.setAttribute('id', `contenedor-${id}`)

    /* agregar la nueva nota nueva al contenedor de notas del html */
    contenedor.prepend(articulo)

    /* crear el objeto y guardar la informacion en la base de datos provicional */
    const nuevaNota = new Nota(id, texto.value)

    BaseDatosProvicional.push(nuevaNota)
    console.log(BaseDatosProvicional);

    /* agregarle un escuchador de eventos al boton de eliminar de la nueva tarea */
    agregarEscuchadorEvento(id)
  }

  /* eliminar el contendo del input despues de que el usuario lo guardo*/
  texto.value = ''

  // volver()
})

/* ELIMINAR NOTAS/TAREAS ////////////////////////////////////////// */

/* agregar un escuchador de eventos a todos los botones de eliminar */
const botonesDeBorrar = document.querySelectorAll('.boton-eliminar')

for (const boton of botonesDeBorrar) {
  agregarEscuchadorEvento(boton.id)
}

function agregarEscuchadorEvento(id) {
  document.getElementById(`${id}`).addEventListener('click', () => {
    /* para que elimine la tarea al que esta adjuntado*/
    borrarTarea(id)
  })
}

function borrarTarea(idParaBorrar) {
  /* verificar si existe la tarea en la base de datos provicional */
  resultado = BaseDatosProvicional.some(x => x.id === idParaBorrar)

  if (resultado) {
    console.log('existe la tarea');

    /* eliminar la tarea de la base de datos provicional */
    BaseDatosProvicional = BaseDatosProvicional.filter(x => x.id !== idParaBorrar)
  }

  /* eliminar al tarea del contenedor html */
  document.getElementById(`contenedor-${idParaBorrar}`).remove()
}

/* INTERCAMBIAR ENTRE SECCIONES//////////////////////////////////// */

/* mostrar la seccion de escribir/////////////////////////////////// */
const seccionEscribir = document.getElementById('seccion-escribir')
const seccionNotas = document.getElementById('seccion-tareas')

document.querySelector('#boton-escribir').addEventListener('click', () => {
  seccionEscribir.style.display = "flex"
  // seccionNotas.style.display = 'none'
})

/* mostrar la seccion de notas/////////////////////////////////// */
document.querySelector('#boton-salir').addEventListener('click', volver)

function volver() {
  seccionEscribir.style.display = "none"
  // seccionNotas.style.display = 'flex'
}