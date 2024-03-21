const wrapCarrito = document.querySelector('.carrito-productos');
const carritoAcciones = document.querySelector('.carrito-acciones');
const textoPrecioTotal = document.querySelector("#total");

let precioTotal = 0;
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
   precioTotal += (producto.precio * cantidad)
   textoPrecioTotal.innerHTML = `$${precioTotal}`;
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







/* eliminar productos carrito */
const trashIcons = document.querySelectorAll('.bi-trash');
const vaciarBtn = document.querySelector('#vaciar');

trashIcons.forEach(trash => {
   trash.addEventListener('click', ()=>{
      let imagenProd = trash.parentElement.previousElementSibling.firstElementChild.firstElementChild.getAttribute('src')
      let idProdRemove = prodEliminar(imagenProd).id;
      localStorage.removeItem(idProdRemove);
      localStorage.removeItem(`CANTIDAD${idProdRemove}`);
      trash.parentElement.parentElement.remove()
   })
});

vaciarBtn.addEventListener('click',()=>{
   let total = totalProductos();
   Swal.fire({
      title: '¿Estás seguro?',
      icon: 'question',
      html: `Se van a borrar ${total} productos.`,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
  }).then(result =>{
   if (result.isConfirmed) {
      vaciarCarrito();
      carritoAcciones.classList.add("disabled");
      carritoVacio.classList.remove("disabled");
   }
  })
})



/* COMPRAR PRODUCTOS */
const btnComprar = document.querySelector('#comprar');
const textoCompra = document.querySelector('#carritoComprado');

btnComprar.addEventListener('click', ()=>{
   Swal.fire({
      icon: "success",
      title: "Compra realizada con éxito!",
      showConfirmButton: false,
      timer: 1500
    });
   vaciarCarrito();
   textoCompra.classList.remove('disabled');
   carritoAcciones.classList.add("disabled");

})



/* MENSAJES EN PANTALLA */
const carritoVacio = document.querySelector('#carritoVacio');

if (wrapCarrito.firstElementChild === null) {
   carritoAcciones.classList.add("disabled");
   carritoVacio.classList.remove("disabled");
}else{
   carritoAcciones.classList.remove("disabled");
   carritoVacio.classList.add("disabled");
}






/* FUNCIONES */

function prodEliminar(srcImg) {
   let prod = productosObj.filter(producto => producto.imagen === srcImg)
   return prod[0];
}

function vaciarCarrito() {
   wrapCarrito.remove();
   localStorage.clear();
}


function totalProductos() {
   let total = 0;
   let claves = Object.keys(localStorage);
   for (let i = 0; i < localStorage.length; i++) {
      if (claves[i].includes("CANTIDAD") === true) {
         let cantidad = parseInt(localStorage.getItem(claves[i]));
         total += cantidad;
      }
   }
   return total
}