document.addEventListener("DOMContentLoaded", () => {
  const gorraActual = document.querySelector(".right h2").textContent.trim();

  const gorras = [
    {
      nombre: "Gorra Golden State Warriors",
      imagen: "/CapSpotNuevo/Imagenes/imagenes/Gorras-Catalogo/GoldenState.png",
      enlace: "/CapSpotNuevo/HTML/Productos/Producto1.html"
    },
    {
      nombre: "Gorra Los Angeles Lakers",
      imagen: "/CapSpotNuevo/Imagenes/imagenes/Gorras/Lakers.webp",
      enlace: "/CapSpotNuevo/HTML/Productos/Producto2.html"
    },
    {
      nombre: "Gorra Chicago Bulls",
      imagen: "/CapSpotNuevo/Imagenes/imagenes/Catalogo/bullsGora.png",
      enlace: "/CapSpotNuevo/HTML/Productos/Producto3.html"
    },
    {
      nombre: "Gorra Miami Heat",
      imagen: "/CapSpotNuevo/Imagenes/imagenes/Gorras-Catalogo/miamiheat.png",
      enlace: "/CapSpotNuevo/HTML/Productos/Producto4.html"
    },
    {
      nombre: "Gorra Brooklyn Nets",
      imagen: "/CapSpotNuevo/Imagenes/imagenes/Gorras-Catalogo/nets.png",
      enlace: "/CapSpotNuevo/HTML/Productos/Producto5.html"
    },
    {
      nombre: "Gorra Boston Celtics",
      imagen: "/CapSpotNuevo/Imagenes/imagenes/Gorras-Catalogo/boston.png",
      enlace: "/CapSpotNuevo/HTML/Productos/Producto6.html"
    },
    {
      nombre: "Gorra Dallas Mavericks",
      imagen: "/CapSpotNuevo/Imagenes/imagenes/Gorras-Catalogo/dallas.png",
      enlace: "/CapSpotNuevo/HTML/Productos/Producto7.html"
    },
    {
      nombre: "Gorra Philadelphia 76ers Edición Limitada",
      imagen: "/CapSpotNuevo/Imagenes/imagenes/Gorras-Catalogo/philadelphia.png",
      enlace: "/CapSpotNuevo/HTML/Productos/Producto8.html"
    },
    {
      nombre: "Gorra Toronto Raptors Premium",
      imagen: "/CapSpotNuevo/Imagenes/imagenes/Gorras-Catalogo/raptops.png",
      enlace: "/CapSpotNuevo/HTML/Productos/Producto9.html"
    },
    {
      nombre: "Gorra Milwaukee Bucks",
      imagen: "/CapSpotNuevo/Imagenes/imagenes/Gorras-Catalogo/bucks.png",
      enlace: "/CapSpotNuevo/HTML/Productos/Producto10.html"
    },
    {
      nombre: "Gorra San Antonio Spurs",
      imagen: "/CapSpotNuevo/Imagenes/imagenes/Gorras-Catalogo/spurs.png",
      enlace: "/CapSpotNuevo/HTML/Productos/Producto11.html"
    },
    {
      nombre: "Gorra Utah Jazz",
      imagen: "/CapSpotNuevo/Imagenes/imagenes/Gorras-Catalogo/jazz.png",
      enlace: "/CapSpotNuevo/HTML/Productos/Producto12.html"
    },
    {
      nombre: "Gorra Denver Nuggets",
      imagen: "/CapSpotNuevo/Imagenes/imagenes/Gorras-Catalogo/denver.png",
      enlace: "/CapSpotNuevo/HTML/Productos/Producto13.html"
    },
    {
      nombre: "Gorra Indiana Pacers",
      imagen: "/CapSpotNuevo/Imagenes/imagenes/Gorras-Catalogo/Pacers.webp",
      enlace: "/CapSpotNuevo/HTML/Productos/Producto14.html"
    },
    {
      nombre: "Gorra Miami Heat Retro",
      imagen: "/CapSpotNuevo/Imagenes/imagenes/Gorras-Catalogo/miamiretro.png",
      enlace: "/CapSpotNuevo/HTML/Productos/Producto15.html"
    }
  ];

  const filtradas = gorras.filter(g => g.nombre !== gorraActual);

  const seleccionadas = filtradas.sort(() => 0.5 - Math.random()).slice(0, 3);

  const contenedor = document.querySelector(".products");
  contenedor.innerHTML = ""; 

  seleccionadas.forEach(gorra => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <a href="${gorra.enlace}">
        <img src="${gorra.imagen}" alt="${gorra.nombre}">
        <p>${gorra.nombre}</p>
      </a>
    `;
    contenedor.appendChild(card);
  });
});
