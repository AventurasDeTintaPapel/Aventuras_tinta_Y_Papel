const contenedorComics = document.getElementById("Comics");
 
// Función para listar los comics
const listarComics = (productos) => {
  contenedorComics.innerHTML = "";
  productos.forEach((producto) => {
    const titulo = producto.titulo;
    const maxLength = 20; // Máxima longitud deseada para el título
    let tituloResumido;
    if (titulo.length > maxLength) {
      tituloResumido = titulo.substring(0, maxLength) + "...";
    } else {
      tituloResumido = titulo;
    }

    const imagenSrc = `http://localhost:3400${producto.imagen}`;
    contenedorComics.innerHTML += `
            <div class="producto" id="productoss">
                <img src="${imagenSrc}" alt="">
                <h5>${tituloResumido} <i class="fi-rs-heart favoritos" id="favs" onclick="añadirFavorito(event)"  data-id=${producto._id}></i></h5>
                <p id="precio">Precio: ${producto.precio}</p>
                <div class="botonesProducto">
                    <a href="#" class="detalle">Detalles</a>
                    <button onclick="añadirCarrito(event)" class="comprar" data-id="${producto._id}">Comprar</button>
                    <button class="cantidad" style="display:none;">Agregado</button>
                </div>
                </div>
            </div>
        `;
  });
  const token = localStorage.getItem("token");
  const favorito = document.querySelectorAll(".inconoFavoritos");

  if (!token) {
    document.querySelector(".contenedorProductos").addEventListener("click", (event) => {
      alert("Debe registrarse para poder realizar esa tarea");
    });

    const comprarIcons = document.querySelectorAll("#comprar");

    comprarIcons.forEach(function (icon) {
      icon.addEventListener("click", function () {
        alert("Debe registrarse para poder realizar esa tarea");
      });
    });
  } else {
    document.querySelector(".contenedorProductos").addEventListener("click", (event) => {
      if (event.target.classList.contains("favoritos")) {
        let favorito = event.target;
        // Alternamos las clases para cambiar el ícono
        if (favorito.classList.contains("fi-rs-heart")) {
          favorito.classList.remove("fi-rs-heart");
          favorito.classList.add("fi-ss-heart");
        } else {
          favorito.classList.remove("fi-ss-heart");
          favorito.classList.add("fi-rs-heart");
        }
      }
    });
  }
};
//funcion para añadit al carrito
<<<<<<<< HEAD:client/src/assets/js/catalogo.js
const añadirCarrito = async (event) => {
  const idProducto = event.target.dataset.id;
  const cantidad = 1;
  const token = localStorage.getItem("token");
  try {
    if (!token) {
      alert("Debe registrarse para poder realizar esta tarea");
    } else {
      const cargarCarrito = await fetch(`http://localhost:3400/carrito`, {
        method: "POST",
        body: JSON.stringify({
          idProducto,
          cantidad,
        }),
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      if (cargarCarrito.ok) {
        alert("Se añadio el producto al carrito");
      }
========
    const añadirCarrito = async (event) => {
    const idProducto = event.target.dataset.id;
    const cantidad = 1;
    const token = localStorage.getItem("token");
    try {
        if (!token) {
            alert("Debe registrarse para poder realizar esta tarea");
        } else {
            const cargarCarrito = await fetch(`http://localhost:3400/api/carrito/`, {
                method: "POST",
                body: JSON.stringify({
                idProducto,
                cantidad,
            }),
            headers: {
                "Content-Type": "application/json",
                token: token,
            },
        });
        if (cargarCarrito.ok) {
            alert("Se añadio el producto al carrito");
        }
>>>>>>>> origin/JaquelineAtienza:client/src/assets/js/catalogoComics.js
    }
  } catch (error) {
    console.log(error);
  }
};
// Función para añadir al carrito
const obtenerProductos = async () => {
  try {
    const peticion = await fetch("http://localhost:3400/api/productos/catalogo/comic");

    if (!peticion.ok) {
      console.log("Hubo un error al obtener los productos");
      return;
    }

    const response = await peticion.json();
    console.log(response)
    listarComics(response);
  } catch (error) {
    console.error("Error al obtener los productos", error);
  }
};
//funcion para añadir a favoritos
const añadirFavorito = async (event) => {
  const idProducto = event.target.dataset.id;
  console.log(idProducto);
  try {
    const cargarFavoritos = await fetch(`http://localhost:3400/favoritos/6692cf802772b70d57574598`, {
      method: "POST",
      body: JSON.stringify({
        idProducto,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (cargarFavoritos.ok) {
      alert("Se ha añadido el producto a favoritos");
    }
  } catch (error) {
    console.log(error);
  }
};
document.addEventListener("DOMContentLoaded", () => {
  obtenerProductos();
});