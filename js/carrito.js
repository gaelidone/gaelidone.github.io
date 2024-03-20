const wrapCarrito = document.querySelector('.carrito-productos');
const textoPrecioTotal = document.querySelector("#total");

function crearProdCarrito(idProd) {
    let producto = productosObj.filter(prod => prod.id === idProd);
    producto = producto[0];
    let cantidad = localStorage.getItem(`CANTIDAD${idProd}`);
    let newProducto = `<div class="producto">
    <div class="carritoMain">
       <div class="wrap-produc_img">
          <img src="${producto.imagen}" alt="Nike Air Max" class="producto-img">
       </div>
       <div class="carrito-titulo">
          <small>Titulo</small>
          <h3>${producto.titulo}</h3>
       </div>
    </div>
    <div class="prod-carrito_info">
       <div class="carrito-cantidad">
          <small>Cantidad</small>
          <p>${cantidad}</p>
       </div>
       <div class="carrito-precio">
          <small>Precio</small>
          <p>$${producto.precio}</p>
       </div>
       <div class="carrito-subTotal">
          <small>Subtotal</small>
          <p>$${producto.precio * cantidad}</p>
       </div>
       <i class="bi bi-trash"></i>
    </div>
 </div>`
    wrapCarrito.innerHTML += newProducto;
    return producto.precio
 }


let total = 0

Object.keys(localStorage).forEach(idProd =>{
   if (idProd.includes("CANTIDAD") === false) {
      let precioProd = crearProdCarrito(idProd)
      total += precioProd
   }
})

textoPrecioTotal.innerHTML = `$${total}`;





/* eliminar productos carrito */
