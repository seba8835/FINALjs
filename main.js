// objeto constructor
const producto = function (producto, stock, precio) {

this.producto = producto
this.stock = stock
this.precio = precio
} 

let producto1 = new producto ("salame", 30, 1200)
let producto2 = new producto ("mortadela", 10, 1500)
let producto3 = new producto ("jamon natural", 25, 3500)
let producto4 = new producto ("queso pategras", 18, 4500)
let producto5 = new producto ("queso tybo", 35, 2500)
let producto6 = new producto ("queso azul", 5, 6500)

// array lista
let lista = [producto1,producto2,producto3,producto4,producto5,producto6]

// filtrado de lista
function filtrarProducto () {
  let palabraClave = prompt("ingrese su busqueda") 
  let resultado = lista.filter((producto)=> producto.producto.includes(palabraClave))

  if( resultado.length > 0){
    console.table(resultado)
  }else{ alert("producto inválido:" + palabraClave)
  }
}
// incorporacion de producto
function agregarProducto() {
  let nombre =prompt ("ingresar producto nuevo")
  let stock = parseInt (prompt("cantidad de producto a ingresar"))
  let precio = parseInt (prompt("ingresa precio"))

  if (isNaN(stock) || isNaN(precio) || nombre === "" ) {
    alert ("datos invalidos, revisa la informacion")
    return
    }
  
    let producto = new producto(nombre, precio, stock);
    lista.push(producto);
  console.table(lista)
}












/* let fechaNacimiento;
let continuar = true;

while (continuar) {
  // Pedimos al usuario que ingrese su fecha de nacimiento (en formato dd/mm/aaaa)
  fechaNacimiento = prompt("Ingrese su fecha de nacimiento en formato dd/mm/aaaa:");

  // Convertimos la fecha de nacimiento a un objeto Date de JavaScript
  let fechaNacimientoDate = new Date(fechaNacimiento);

  // Obtenemos la fecha actual
  let fechaActual = new Date();

  // Calculamos la edad de la persona en años redondeando hacia abajo
  let edad = Math.floor((fechaActual - fechaNacimientoDate) / (365.25 * 24 * 60 * 60 * 1000));

  // Determinamos si la persona está en edad jubilatoria
  if (edad >= 60 && fechaNacimientoDate.getFullYear() < fechaActual.getFullYear() - 60) {
    console.log("Usted está en edad jubilatoria.");
  } else if (edad >= 65 && fechaNacimientoDate.getFullYear() < fechaActual.getFullYear() - 65) {
    console.log("Usted está en edad jubilatoria.");
  } else {
    console.log("Usted no está en edad jubilatoria.");
  }

  // Preguntamos al usuario si desea continuar ingresando fechas
  let respuesta = prompt("¿Desea ingresar otra fecha de nacimiento? (S/N)");

  // Si la respuesta es "N", terminamos el bucle
  if (respuesta.toUpperCase() === "N") {
    continuar = false;
  }
} */