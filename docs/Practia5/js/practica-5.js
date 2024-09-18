let productos = 
[
    {nombre: "Camiseta", precio: 15, stock: 10},
    {nombre: "Pantalones", precio: 25, stock: 20},
    {nombre: "Zapatos", precio:50, stock: 5},
    {nombre: "Sombrero", precio:10, stock: 10},
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
function procesarCompra()
{
    console.log("Procesando compra...")
    setTimeout(function()
{
    let total = calcularTotal();
    total = aplicarDescuento(total);
    console.log(`Compra completada. Total a pagar: $${total.toFixed(2)}`);
}, 3000);
}

agregarAlCarrito("Pantalones", 3);
agregarAlCarrito("Camiseta", 3);
agregarAlCarrito("Pantalones", 4);
agregarAlCarrito("Zapatos", 3);
console.log(carrito);

procesarCompra();