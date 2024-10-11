let productos = 
[
    {nombre: "Camiseta", precio: 15, stock: 20},
    {nombre: "Pantalones", precio: 25, stock: 20},
    {nombre: "Zapatos", precio:50, stock: 5},
    {nombre: "Sombrero", precio:10, stock: 1},
]

// Instruccion 2
let carrito = []

function agregarAlCarrito(productoNombre,cantidad)
{
    for (let producto of productos)
    {
        if (producto.nombre === productoNombre)
        {
            if (producto.stock> cantidad)
            {
                carrito.push({
                    nombre: productoNombre,
                    cantidad: cantidad,
                    precio: producto.precio,
                });
                producto.stock -= cantidad;
                console.info(`${cantidad} ${productoNombre}(s) agregado(s) al carrito`);
            }
            else
            {
                console.error(`No hay sufucuente stock de ${productoNombre}`)
            }
            return;
        } 
    }
    console.error(`El producto ${productoNombre} no existe.`)
}

// Instruccion 3
function calcularTotal()
{
    let total = 0;
    for (let item of  carrito)
    {
        total += item.precio * item.cantidad;
    }

    return total;
}

// Instruccion 4
function aplicarDescuento(total)
{
    if( total > 100)
    {
        // aplica 10% de descuento
        return total * 9;
    }
    return total;
}

// Instrucion 5
function mostrarTiempoRestante(segundos, callback) {
  let tiempoRestante = segundos;

  // Mostrar el tiempo inicial
  console.log(`Tiempo restante: ${tiempoRestante} segundos`);

  let countdownInterval = setInterval(function () {
    tiempoRestante--;
    console.log(`Tiempo restante: ${tiempoRestante} segundos`);

    if (tiempoRestante <= 0) {
      clearInterval(countdownInterval);
      console.log("El tiempo ha terminado.");
      callback();  // Ejecutar el callback para finalizar la compra
    }
  }, 1000);
}

function procesarCompra() {
  console.log("Procesando compra...");
  
  // Mostrar un contador de 5 segundos antes de completar la compra
  mostrarTiempoRestante(5, function() {
    let total = calcularTotal();
    total = aplicarDescuento(total);
    console.log(`Compra completada. Total a pagar: $${total.toFixed(2)}`);
  });
}

function eliminarDelCarrito(productoNombre, cantidad) {
    for (let i = 0; i < carrito.length; i++) {
      if (carrito[i].nombre === productoNombre) {
        if (carrito[i].cantidad >= cantidad) {
          // Restablecer el stock en la lista de productos
          for (let producto of productos) {
            if (producto.nombre === productoNombre) {
              producto.stock += cantidad;
              break;
            }
          }
  
          // Reducir la cantidad en el carrito o eliminar si es la última unidad
          carrito[i].cantidad -= cantidad;
          console.info(`${cantidad} ${productoNombre}(s) eliminado(s) del carrito`);
  
          if (carrito[i].cantidad === 0) {
            carrito.splice(i, 1); // Eliminar el producto si la cantidad llega a 0
          }
        } else {
          console.error(`No tienes ${cantidad} ${productoNombre}(s) en el carrito para eliminar.`);
        }
        return;
      }
    }
    console.error(`El producto "${productoNombre}" no está en el carrito.`);
    }

agregarAlCarrito("Pantalones", 3);
agregarAlCarrito("Pantalones", 5);
eliminarDelCarrito("Pantalones", 3);
agregarAlCarrito("Camiseta", 3);
agregarAlCarrito("Camiseta", 6);
agregarAlCarrito("Camiseta", 4);
eliminarDelCarrito("Camiseta", 6);
agregarAlCarrito("Pantalones", 4);
agregarAlCarrito("Zapatos", 3);
agregarAlCarrito("Sombrero", 2)
console.log(carrito);

procesarCompra();