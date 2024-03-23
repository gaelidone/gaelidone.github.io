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
      window.scrollTo({
         top: 0,
     });
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
         Toastify({
            text: "Producto agregado",
            duration: 1850,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, green,  rgb(15, 153, 96))",
              borderRadius: "2rem",
              textTransform: "uppercase",
              fontSize: ".95em",
              fontFamily: "sans-serif",
              fontWeight: "700",
            },
            offset: {
                x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
              },
            onClick: function(){} // Callback after click
          }).showToast();
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

/* SCROLL */
const icono = document.querySelector('.bi-chevron-double-up');


function verificarPosicionScroll() {
   const alturaVentanaVisible = window.innerHeight; // Altura de la ventana visible (viewport height)
   const posicionScroll = window.scrollY || window.pageYOffset; // Posición actual del scroll

   // Calcular la posición del usuario en relación con la altura visible de la ventana
   const posicionRelativa = posicionScroll / alturaVentanaVisible;

   if (posicionRelativa >= 0.35) {
      icono.classList.add('visible');
   } else {
      icono.classList.remove('visible');
   }
}

window.addEventListener('scroll', verificarPosicionScroll);
icono.addEventListener('click', ()=>{
   window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
})