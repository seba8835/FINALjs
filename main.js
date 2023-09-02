// Variable para almacenar el carrito en el LocalStorage
const carritoEnLocalStorage = "carrito";

// Variable global para el carrito de compras
let carrito = [];

// Esperamos a que todos los elementos de la página carguen para ejecutar el script
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Carga de los productos desde el archivo JSON (uso de api local)
fetch("productos.json")
  .then((response) => response.json())
  .then((data) => {
    const productos = data.productos;
    const productosContainer = document.getElementById("productos-container");

    // Recorrido del array y creación de los elementos para mostrarlos
    productos.forEach((prod, index) => {
      let productoElement = document.createElement("div");
      productoElement.innerHTML = `
        <h2>${prod.producto}</h2>
        <p>$${prod.precio.toFixed(2)}</p>
        <button data-index="${index}" data-producto="${prod.producto}" class="boton-item">Agregar</button>
        <img src="${prod.imagen}" alt="${prod.producto}">
      `
      productoElement.style.border= "3px solid"
      productoElement.style.width= "250px"
      ;

      const buttonClick = productoElement.querySelector("button.boton-item");
      buttonClick.addEventListener("click", (event) => {
        // Lógica para agregar el producto al carrito utilizando el índice
        agregarAlCarrito(event);
      });

      productosContainer.appendChild(productoElement);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Función que se ejecuta cuando la página está lista
function ready() {
  document.querySelector(".btn-pagar").addEventListener("click", pagarClicked);
  recuperarCarritoFromLocalStorage();
}



// IMPLEMENTACION DE METODOS PARA CONTROLAR EL CARRITO

// Función para agregar un producto al carrito
function agregarAlCarrito(event) {
  const button = event.target;
  const productoElement = button.parentElement;
  const producto = productoElement.querySelector("h2").textContent;
  const precio = parseFloat(productoElement.querySelector("p").textContent.replace("$", ""));
  const imagen = productoElement.querySelector("img").getAttribute("src");

  // Buscar si el producto ya está en el carrito
  const productoExistente = carrito.find((item) => item.producto === producto);

  if (productoExistente) {
    // Si el producto existe en el carrito, solo aumentamos la cantidad
    productoExistente.cantidad++;
    Swal.fire("ya ah añadido este producto");
  } else {
    // Si el producto no existe, lo agregamos al carrito
    const carritoItem = {
      producto,
      precio,
      imagen,
      cantidad: 1,
    };
    carrito.push(carritoItem);
  }

  actualizarCarrito();
  guardarCarritoToLocalStorage();
}

// Función para actualizar el carrito en el DOM
function actualizarCarrito() {
  const carritoItemsContainer = document.getElementById("carrito-items-container");
  carritoItemsContainer.innerHTML = ""; // Limpia el contenido existente

  carrito.forEach((item) => {
    const carritoItem = document.createElement("div");
    carritoItem.classList.add("carrito-item");
    carritoItem.innerHTML = `
      <img src="${item.imagen}" alt="${item.producto}" class="carrito-item-imagen">
      <div class="carrito-item-detalle">
        <h4 class="carrito-item-nombre">${item.producto}</h4>
        <p class="carrito-item-precio">$${item.precio.toFixed(2)}</p>
        <input type="number" min="1" value="${item.cantidad}" class="carrito-item-cantidad">
        <button class="btn btn-danger carrito-item-eliminar">Eliminar</button>
      </div>
    `;
    carritoItem
      .getElementsByClassName("carrito-item-eliminar")[0]
      .addEventListener("click", () => eliminarItemCarrito(item.producto));

    carritoItem
      .getElementsByClassName("carrito-item-cantidad")[0]
      .addEventListener("change", (event) => cantidadCambiada(item.producto, event.target.value));

    carritoItemsContainer.appendChild(carritoItem);
  });

  actualizarTotalCarrito();
}

// Función para eliminar un producto del carrito
function eliminarItemCarrito(producto) {
  carrito = carrito.filter((item) => item.producto !== producto);
  actualizarCarrito();
  guardarCarritoToLocalStorage();
}

// Función para actualizar el total del carrito
function actualizarTotalCarrito() {
  const carritoItemsContainer = document.querySelector(".carrito-items");
  const carritoItems = carritoItemsContainer.getElementsByClassName("carrito-item");
  let total = 0;
  for (let i = 0; i < carritoItems.length; i++) {
    const carritoItem = carritoItems[i];
    const precioElement = carritoItem.querySelector(".carrito-item-precio");
    const cantidadElement = carritoItem.querySelector(".carrito-item-cantidad");
    const precio = parseFloat(precioElement.innerText.replace("$", ""));
    const cantidad = parseInt(cantidadElement.value);
    total += precio * cantidad;
  }
  document.querySelector(".carrito-precio-total").innerText = `$${total.toFixed(2)}`;
}

// Función para cambiar la cantidad de un producto en el carrito
function cantidadCambiada(producto, nuevaCantidad) {
  const productoEnCarrito = carrito.find((item) => item.producto === producto);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad = parseInt(nuevaCantidad);
    actualizarCarrito();
    guardarCarritoToLocalStorage();
  }
}

// Función para procesar el pago
function pagarClicked() {
  Swal.fire("Gracias por la compra");
  carrito = []; // Vaciar el carrito
  actualizarCarrito();
  guardarCarritoToLocalStorage();
}

// Función para guardar el carrito en el LocalStorage
function guardarCarritoToLocalStorage() {
  localStorage.setItem(carritoEnLocalStorage, JSON.stringify(carrito));
}

// Función para recuperar el carrito desde el LocalStorage
function recuperarCarritoFromLocalStorage() {
  const carritoEnLocalStorageData = localStorage.getItem(carritoEnLocalStorage);
  if (carritoEnLocalStorageData) {
    carrito = JSON.parse(carritoEnLocalStorageData);
    actualizarCarrito();
  }
}