const categorias = document.querySelectorAll('.li-categoria');
const menu = document.querySelector('.menu');
const containProducs = document.querySelector('.container-productos')
const h2 = document.getElementById('titulo-categoria')


categorias.forEach((categ) => {
   categ.addEventListener('click', () => {
      for (let i = 0; i < categorias.length; i++) {
         categorias[i].classList.remove('active');
         categorias[i].firstElementChild.classList.replace("bi-caret-down-square-fill", "bi-caret-right-square")
      }
      categ.firstElementChild.classList.replace("bi-caret-right-square", "bi-caret-down-square-fill");
      categ.classList.add('active');
   })
})



categorias.forEach(categ => {
   categ.addEventListener('click', () => {
      click = mostrarProductos(categ)
      if (click === 'todo') {
         containProducs.innerHTML = "";
         crearProductos(camisetasObj);
         crearProductos(campesObj);
         crearProductos(lompasObj);
         crearProductos(zapasObj);
         h2.innerHTML = "Todos los productos"

      }else if (click === 'camisetas') {
         containProducs.innerHTML = "";
         crearProductos(camisetasObj);
         h2.innerHTML = "Camisetas"

      }else if (click === "campes") {
         containProducs.innerHTML = "";
         crearProductos(campesObj);
         h2.innerHTML = "Camperas"

      }else if (click === "lompas") {
         containProducs.innerHTML = "";
         crearProductos(lompasObj);
         h2.innerHTML = "Pantalones"

      }else if (click === "zapas") {
         containProducs.innerHTML = "";
         crearProductos(zapasObj);
         h2.innerHTML = "Zapatillas"
      }
   })
})


const mostrarProductos = (categ) => {
   let idCateg = categ.id;
   if (idCateg === "todo") {
      return idCateg;
   } else if (idCateg === "camisetas") {
      return idCateg;
   } else if (idCateg === "campes") {
      return idCateg;
   } else if (idCateg === "lompas") {
      return idCateg;
   } else if (idCateg === "zapas") {
      return idCateg;
   }
}





function crearProductos(categoria) {
   categoria.forEach(producto => {
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

   });
}




/**************************************/
crearProductos(camisetasObj);
crearProductos(campesObj);
crearProductos(lompasObj);
crearProductos(zapasObj);
