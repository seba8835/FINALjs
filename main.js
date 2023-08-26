//Variable que mantiene el estado visible del carrito
let carritoVisible = false;

//Esperamos que todos los elementos de la pàgina cargen para ejecutar el script
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
/* card de producto */
fetch("productos.json")
  .then((response) => response.json())
  .then((data) => {
    const productos = data.productos;

    /* traigo el elemento desde el DOM donde cargo el producto */
    const productosContainer = document.getElementById("productos-container");

    /* Recorrido del array y creación de los elementos para mostrarlos */
    productos.forEach((prod, index) => {
      let productoElement = document.createElement("div");
      productoElement.innerHTML = `
        <h2>${prod.producto}</h2>
        <p>${prod.precio}</p>
        <button data-index="${index}">Agregar al carrito</button>
        <img src="${prod.imagen}" alt="">
      `;
      const buttonClick = productoElement.querySelector("button");
      buttonClick.addEventListener("click", (event) => {
        // Lógica para agregar el producto al carrito utilizando el índice
        agregarAlCarritoClicked(event);
      });

      productosContainer.appendChild(productoElement);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function ready() {
  /*  Agregremos funcionalidad a los botones eliminar del carrito */
  let botonesEliminarItem = document.getElementsByClassName("btn-eliminar");
  for (let i = 0; i < botonesEliminarItem.length; i++) {
    let button = botonesEliminarItem[i];
    button.addEventListener("click", eliminarItemCarrito);
  }

  //Agrego funcionalidad al boton sumar cantidad
  let botonesSumarCantidad = document.getElementsByClassName("sumar-cantidad");
  for (let i = 0; i < botonesSumarCantidad.length; i++) {
    let button = botonesSumarCantidad[i];
    button.addEventListener("click", sumarCantidad);
  }

  //Agrego funcionalidad al buton restar cantidad
  let botonesRestarCantidad =
    document.getElementsByClassName("restar-cantidad");
  for (let i = 0; i < botonesRestarCantidad.length; i++) {
    let button = botonesRestarCantidad[i];
    button.addEventListener("click", restarCantidad);
  }

  //Agregamos funcionalidad al boton Agregar al carrito
  let botonesAgregarAlCarrito = document.getElementsByClassName("boton-item");
  for (let i = 0; i < botonesAgregarAlCarrito.length; i++) {
    let button = botonesAgregarAlCarrito[i];
    button.addEventListener("click", agregarAlCarritoClicked);
  }

  //Agregamos funcionalidad al botón comprar
  document
    .getElementsByClassName("btn-pagar")[0]
    .addEventListener("click", pagarClicked);
}
//Eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked() {
  Swal.fire("Gracias por la compra");
  //Elimino todos los elmentos del carrito
  let carritoItems = document.getElementsByClassName("carrito-items")[0];
  while (carritoItems.hasChildNodes()) {
    carritoItems.removeChild(carritoItems.firstChild);
  }
  actualizarTotalCarrito();
  ocultarCarrito();
}
//Funciòn que controla el boton clickeado de agregar al carrito
function agregarAlCarritoClicked(event) {
  const button = event.target;
  const productoElement = button.parentElement;
  const producto = productoElement.querySelector("h2").textContent;
  const precio = productoElement.querySelector("p").textContent;
  const imagen = productoElement.querySelector("img").getAttribute("src");

  agregarItemAlCarrito(producto, precio, imagen);

  hacerVisibleCarrito();
}

function agregarAlCarrito(producto, precio) {
  const Carrito = producto.find((producto) => producto.id === id);

  // Si el producto existe, agregarlo al carrito
  if (productoEncontrado) {
    const carritoItem = document.createElement("li");
    carritoItem.innerText = productoEncontrado.nombre;
    carritoContainer.appendChild(carritoItem);
  }
}

//Funcion que hace visible el carrito
function hacerVisibleCarrito() {
  carritoVisible = true;
  const carrito = document.getElementsByClassName("carrito")[0];
  carrito.style.marginRight = "0";
  carrito.style.opacity = "1";

  let items = document.getElementsByClassName("productos-container")[0];
  items.style.width = "60%";
}

//Funciòn que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc) {
  let item = document.createElement("div");
  item.classList.add = "item";
  let itemsCarrito = document.getElementsByClassName("carrito-items")[0];

  //controlamos que el item que intenta ingresar no se encuentre en el carrito
  let nombresItemsCarrito = itemsCarrito.getElementsByClassName(
    "carrito-item-titulo"
  );
  for (let i = 0; i < nombresItemsCarrito.length; i++) {
    if (nombresItemsCarrito[i].innerText == titulo) {
      Swal.fire("El item ya se encuentra en el carrito");
      return;
    }
  }

  const itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;

  item.innerHTML = itemCarritoContenido;
  itemsCarrito.append(item);

  //Agregamos la funcionalidad eliminar al nuevo item
  item
    .getElementsByClassName("btn-eliminar")[0]
    .addEventListener("click", eliminarItemCarrito);

  //Agregmos al funcionalidad restar cantidad del nuevo item
  const botonRestarCantidad = item.getElementsByClassName("restar-cantidad")[0];
  botonRestarCantidad.addEventListener("click", restarCantidad);

  //Agregamos la funcionalidad sumar cantidad del nuevo item
  const botonSumarCantidad = item.getElementsByClassName("sumar-cantidad")[0];
  botonSumarCantidad.addEventListener("click", sumarCantidad);

  //Actualizamos total
  actualizarTotalCarrito();
}
//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event) {
  let buttonClicked = event.target;
  let selector = buttonClicked.parentElement;
  console.log(
    selector.getElementsByClassName("carrito-item-cantidad")[0].value
  );
  let cantidadActual = selector.getElementsByClassName(
    "carrito-item-cantidad"
  )[0].value;
  cantidadActual++;
  selector.getElementsByClassName("carrito-item-cantidad")[0].value =
    cantidadActual;
  actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event) {
  let buttonClicked = event.target;
  let selector = buttonClicked.parentElement;
  console.log(
    selector.getElementsByClassName("carrito-item-cantidad")[0].value
  );
  let cantidadActual = selector.getElementsByClassName(
    "carrito-item-cantidad"
  )[0].value;
  cantidadActual--;
  if (cantidadActual >= 1) {
    selector.getElementsByClassName("carrito-item-cantidad")[0].value =
      cantidadActual;
    actualizarTotalCarrito();
  }
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  //Actualizamos el total del carrito
  actualizarTotalCarrito();

  //la siguiente funciòn controla si hay elementos en el carrito
  //Si no hay elimino el carrito
  ocultarCarrito();
}
//Funciòn que controla si hay elementos en el carrito. Si no hay oculto el carrito
function ocultarCarrito() {
  let carritoItems = document.getElementsByClassName("carrito-items")[0];
  if (carritoItems.childElementCount == 0) {
    let carrito = document.getElementsByClassName("carrito")[0];
    carrito.style.marginRight = "-100%";
    carrito.style.opacity = "0";
    carritoVisible = false;

    let items = document.getElementsByClassName("contenedor-items")[0];
    items.style.width = "100%";
  }
}
//Actualizamos el total de Carrito

function actualizarTotalCarrito() {
  //seleccionamos el contenedor carrito
  let carritoContenedor = document.getElementsByClassName("carrito")[0];
  let carritoItems = carritoContenedor.getElementsByClassName("carrito-item");
  let total = 0;

  //recorremos cada elemento del carrito para actualizar el total
  for (let i = 0; i < carritoItems.length; i++) {
    let item = carritoItems[i];
    let precioElemento = item.getElementsByClassName("carrito-item-precio")[0];

    //quitamos el simobolo peso y el punto de milesimos
    let precio = parseFloat(
      precioElemento.innerText.replace("$", "").replace(".", "")
    );
    let cantidadItem = item.getElementsByClassName("carrito-item-cantidad")[0];
    console.log(precio);
    let cantidad = cantidadItem.value;
    total = total + precio * cantidad;
  }
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("carrito-precio-total")[0].innerText =
    "$" + total.toLocaleString("es") + ",00";
}
