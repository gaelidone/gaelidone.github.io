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
      
      /* actualizar precio total */
      let idProd = localStorage.getItem(idProdRemove);
      let cantidadProd = localStorage.getItem(`CANTIDAD${idProdRemove}`)
      actualizarPrecioTotal(idProd, cantidadProd)
      /************************************/

      localStorage.removeItem(idProdRemove);
      localStorage.removeItem(`CANTIDAD${idProdRemove}`);
      trash.parentElement.parentElement.remove()
      numCarrito.innerHTML = totalProductos()
      if (numCarrito.innerHTML == "0") {
         carritoAcciones.classList.add("disabled");
         carritoVacio.classList.remove("disabled");   
      }
      Toastify({
         text: "Producto eliminado",
         duration: 1850,
         close: true,
         gravity: "top", // `top` or `bottom`
         position: "right", // `left`, `center` or `right`
         stopOnFocus: true, // Prevents dismissing of toast on hover
         style: {
           background: "rgb(181, 26, 26)",
           borderRadius: "2rem",
           textTransform: "uppercase",
           fontSize: ".95em",
           fontFamily: "sans-serif",
           fontWeight: "700"
         },
         offset: {
             x: '2em', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
             y: '2em' // vertical axis - can be a number or a string indicating unity. eg: '2em'
           },
         onClick: function(){} // Callback after click
       }).showToast();

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
      numCarrito.innerHTML = totalProductos()
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
      timer: 1800
    });
   vaciarCarrito();
   textoCompra.classList.remove('disabled');
   carritoAcciones.classList.add("disabled");
   numCarrito.innerHTML = totalProductos();

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




/* num carrito */
let num = totalProductos();
numCarrito.innerHTML = num;



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

function actualizarPrecioTotal(idProdRemove, cantidad) {
   let prod = productosObj.filter(producto => producto.id === idProdRemove);
   let precioProd = prod[0].precio;
   let precioDesactualizadoString = textoPrecioTotal.innerHTML;
   let precioDesactualizado = removerSigno(precioDesactualizadoString);
   let precioActualizado = precioDesactualizado - (precioProd * cantidad);
   textoPrecioTotal.innerHTML = `$${precioActualizado}`;
}

function removerSigno(numConSigno) {
   return parseInt(numConSigno.replace("$", ""));
}

