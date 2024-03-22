const categorias = document.querySelectorAll('.li-categoria');
const menu = document.querySelector('.menu');
const containProducs = document.querySelector('.container-productos')
const h2 = document.getElementById('titulo-categoria')
const numCarrito = document.querySelector('#numCarrito')
let num = totalProductos();

categorias.forEach((categ) => {
   categ.addEventListener('click', () => {
      for (let i = 0; i < categorias.length; i++) {
         categorias[i].classList.remove('active');
         categorias[i].firstElementChild.classList.replace("bi-caret-down-square-fill", "bi-caret-right-square")
      }
      categ.firstElementChild.classList.replace("bi-caret-right-square", "bi-caret-down-square-fill");
      categ.classList.add('active');
      h2.innerHTML = categ.lastElementChild.innerHTML;
   })
})


crearProductos();
categorias.forEach(categ => {
   categ.addEventListener('click', () => {
      let idCateg = categ.id;
      containProducs.innerHTML = "";
      crearProductos(idCateg);

   })
});



function crearProductos(idCateg) {
   let prodElegidos = productosObj.filter(prod => prod.categoria === idCateg)
   if (prodElegidos.length === 0) {
      prodElegidos = productosObj.map(prod => prod)
   }
   prodElegidos.forEach(producto => {
      let newProducto = `
        <div class="producto">
           <div class="wrap-produc_img">
            <img src="${producto.imagen}" alt="" class="producto-img">
         </div>
         <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <div class="wrap-precioBoton">                  
               <p class="producto-precio">$${producto.precio}</p>
               <button class="producto-agregar">AGREGAR</button>
            </div>
           </div>
        </div>`;
      containProducs.innerHTML += newProducto;

      aside.classList.remove("menu-toggle");
      glass.classList.add('glass-hidden');
   })

   
   /* CARRITO */
   const botonesAgregar = document.querySelectorAll('.producto-agregar');

   botonesAgregar.forEach(btnAgregar => {
      btnAgregar.addEventListener('click', () => {
         let srcImg = btnAgregar.parentElement.parentElement.previousElementSibling.lastElementChild.getAttribute('src')
         let producto = productoAdd(srcImg);

         if (!localStorage.getItem(producto.id)) {
            localStorage.setItem(producto.id, producto.id);
            localStorage.setItem(`CANTIDAD${producto.id}`, 1);
         } else {
            let cantidad = parseInt(localStorage.getItem(`CANTIDAD${producto.id}`));
            cantidad++
            localStorage.setItem(`CANTIDAD${producto.id}`, cantidad)
         }
         num++
         numCarrito.innerHTML = num;
      })
   });
}


numCarrito.innerHTML = num;





/* FUNCIONES */

function productoAdd(srcImg) {
   let prod = productosObj.filter(producto => producto.imagen === srcImg)
   return prod[0];
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

