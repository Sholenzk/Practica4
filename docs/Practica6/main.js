const d = document;
const $listaCarrito = d.querySelector("#lista-carrito");
const $totalCarrito = d.querySelector("#total-carrito");
const $btnCompra = d.querySelector("#btn-compra");
const $mensajeCompra = d.querySelector("#mensaje-compra");
const $loader = d.querySelector("#loader");

d.addEventListener("click", function (e) {
  if (!e.target.matches(".producto")) {
    return false;
  }

  const $producto = e.target;
  let nombre = $producto.getAttribute("data-nombre");
  let precio = parseFloat($producto.getAttribute("data-precio"));
  
  let $itemCarritoExistente = Array.from($listaCarrito.children).find(item =>
    item.querySelector('.nombre').innerText === nombre
  );

  if ($itemCarritoExistente) {
    let cantidadElement = $itemCarritoExistente.querySelector('.cantidad');
    let cantidad = parseInt(cantidadElement.innerText) + 1;
    cantidadElement.innerText = cantidad;
  } else {
    const $itemCarrito = d.createElement("li");
    $itemCarrito.innerHTML = `
      <span class="nombre">${nombre}</span> - 
      $<span class="precio-unitario">${precio.toFixed(2)}</span>
      x <span class="cantidad">1</span>
      <button class="btn-mas">+</button>
      <button class="btn-menos">-</button>
    `;
    $listaCarrito.appendChild($itemCarrito);
  }

  let totalActual = parseFloat($totalCarrito.innerText);
  $totalCarrito.innerText = (totalActual + precio).toFixed(2);
});

$listaCarrito.addEventListener("click", function (e) {
  if (e.target.matches(".btn-mas") || e.target.matches(".btn-menos")) {
    const $itemCarrito = e.target.parentElement;
    const precioUnitario = parseFloat($itemCarrito.querySelector('.precio-unitario').innerText);
    let cantidadElement = $itemCarrito.querySelector('.cantidad');
    let cantidad = parseInt(cantidadElement.innerText);

    if (e.target.matches(".btn-mas")) {
      cantidad++;
      cantidadElement.innerText = cantidad;

      let totalActual = parseFloat($totalCarrito.innerText);
      $totalCarrito.innerText = (totalActual + precioUnitario).toFixed(2);
    }

    if (e.target.matches(".btn-menos")) {
      cantidad--;
      if (cantidad > 0) {
        cantidadElement.innerText = cantidad;

        let totalActual = parseFloat($totalCarrito.innerText);
        $totalCarrito.innerText = (totalActual - precioUnitario).toFixed(2);
      } else {
        $itemCarrito.remove();

        let totalActual = parseFloat($totalCarrito.innerText);
        $totalCarrito.innerText = (totalActual - precioUnitario).toFixed(2);
      }
    }
  }
});


$btnCompra.addEventListener("click", function (e) {
  if ($listaCarrito.children.length > 0) {
    $mensajeCompra.classList.remove("hidden");
    $loader.classList.add("loader");
  

    let i = 5;
    let countdownTimer = setInterval(function () {
      i = i - 1;
      if (i <= 0) {
        clearInterval(countdownTimer);

        $loader.classList.remove("loader");
        $loader.textContent = "¡Compra realizada con éxito!";

        
        $listaCarrito.innerHTML = "";
        $totalCarrito.innerText = "0";

        setTimeout(() => {
          $mensajeCompra.classList.add("hidden");
        }, 3000);
      }
    }, 1000);
  } else {
    alert("El carrito está vacío, no se puede realizar la compra.");
  }
});
