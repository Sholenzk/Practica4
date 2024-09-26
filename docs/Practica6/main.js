const d = document;
const $listaCarrito = d.querySelector("#lista-carrito");
const $totalCarrito = d.querySelector("#total-carrito");
const $btnCompra = d.querySelector("#btn-compra");
const $mensajeCompra = d.querySelector("#mensaje-compra");
const $carrito = d.querySelector("#carrito");
const $loader = d.querySelector("#loader");

d.addEventListener("click", function (e) {
    if (!e.target.matches(".producto")) {
      return false;
    }
  
    const $producto = e.target;
    let nombre = $producto.getAttribute("data-nombre");
    let precio = parseFloat($producto.getAttribute("data-precio"));
  
    const $itemCarrito = d.createElement("li");
    $itemCarrito.innerHTML = `${nombre} - $${precio.toFixed(2)} <button class="eliminar-item">Eliminar</button>`;
  
    $listaCarrito.appendChild($itemCarrito);
  
    let totalActual = parseFloat($totalCarrito.innerText);
    $totalCarrito.innerText = (totalActual + precio).toFixed(2);
  });
  
$listaCarrito.addEventListener("click", function (e) {
    if (e.target.matches(".eliminar-item")) {
      const $item = e.target.parentElement;
      let precio = parseFloat($item.innerText.split("- $")[1]);
      let totalActual = parseFloat($totalCarrito.innerText);
      $totalCarrito.innerText = (totalActual - precio).toFixed(2);
      $item.remove();
    }
  });

  $btnCompra.addEventListener("click", function (e) {
    console.log($listaCarrito.children);
    if ($listaCarrito.children.length > 0) {
      $mensajeCompra.classList.remove("hidden");
      let i = 5
      let countdownTimer = setInterval(function() {
          i = i - 1;
          if (i <= 0) {
              clearInterval(countdownTimer);
              $loader.classList.remove("loader")
              $loader.textContent = "¡Compra realizada con exito!"

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
