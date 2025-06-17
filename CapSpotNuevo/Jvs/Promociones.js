const fondo = document.getElementById('fondo');
const logo = document.getElementById('Logo');
const descripcion = document.getElementById('descripcion-promocion');
const gorra = document.getElementById('Gorra-Mostrador');
const podio = document.getElementById('Podio');
const circulo = document.querySelector('.Circulo');

const promociones = [
  {
    equipo: "Knicks",
    fondo: "/CapSpotNuevo/Imagenes/imagenes/CanchaFo.jpeg",
    logo: "/CapSpotNuevo/Imagenes/imagenes/Catalogo/new-york-knicks-logo-transparent.png",
    descripcion: "New York Knicks con esta gorra en color negro, perfecta para los verdaderos fanáticos del equipo. Su diseño sobrio y elegante resalta con el logo bordado en azul y naranja.",
    gorra: "/CapSpotNuevo/Imagenes/imagenes/Catalogo/gorraKnicks.webp",
    podio: "/CapSpotNuevo/Imagenes/imagenes/Catalogo/podio.webp",
    estilos: {
      logo: { width: "180px", height: "auto" },
      gorra: { width: "440px", height: "420px" },
      podio: { width: "300px", height: "150px" }
    }
  },
  {
    equipo: "Bulls",
    fondo: "/CapSpotNuevo/Imagenes/imagenes/Gorras/BullsEstadio.jpg",
    logo: "/CapSpotNuevo/Imagenes/imagenes/Gorras/Bulls_Logo.png",
    descripcion: "Demuestra tu pasión por los Chicago Bulls con estilo y actitud. Esta gorra curva combina un ajuste estructurado moderno con la esencia clásica del equipo. Su elegante acabado en rojo vibrante destaca el icónico logo de los Bulls bordado al frente.",
    gorra: "/CapSpotNuevo/Imagenes/imagenes/Catalogo/bullsGora.png",
    podio: "/CapSpotNuevo/Imagenes/imagenes/Catalogo/podio.webp",
    estilos: {
      logo: { width: "160px", height: "auto" },
      gorra: { width: "420px", height: "400px" },
      podio: { width: "280px", height: "140px" }
    }
  },
  {
    equipo: "Lakers",
    fondo: "/CapSpotNuevo/Imagenes/imagenes/Gorras/LakersEstadio.jpg",
    logo: "/CapSpotNuevo/Imagenes/imagenes/Gorras/lakers.png",
    descripcion: "Luce el brillo de la realeza del baloncesto con esta gorra blanca edición especial de los Lakers. Esta pieza única combina la pureza del blanco con el legendario escudo dorado y púrpura de Los Angeles Lakers, creando un contraste impecable.",
    gorra: "/CapSpotNuevo/Imagenes/imagenes/Gorras/Lakers.webp",
    podio: "/CapSpotNuevo/Imagenes/imagenes/Catalogo/podio.webp",
    estilos: {
      logo: { width: "190px", height: "auto" },
      gorra: { width: "430px", height: "410px" },
      podio: { width: "290px", height: "145px" }
    }
  }
];

let indiceActual = 0;

function aplicarFadeOut() {
  [fondo, logo, descripcion, gorra, podio].forEach(el => {
    el.classList.remove('show');
  });
}

function aplicarFadeIn() {
  [fondo, logo, descripcion, gorra, podio].forEach(el => {
    void el.offsetWidth; // fuerza el reinicio de la animación
    el.classList.add('show');
  });
}

circulo.addEventListener('click', () => {
  aplicarFadeOut();

  setTimeout(() => {
    indiceActual = (indiceActual + 1) % promociones.length;
    const promo = promociones[indiceActual];

    fondo.src = promo.fondo;
    logo.src = promo.logo;
    descripcion.innerHTML = `<span>${promo.descripcion}</span>`;
    gorra.src = promo.gorra;
    podio.src = promo.podio;

    // Estilos específicos
    logo.style.width = promo.estilos.logo.width;
    logo.style.height = promo.estilos.logo.height;

    gorra.style.width = promo.estilos.gorra.width;
    gorra.style.height = promo.estilos.gorra.height;

    podio.style.width = promo.estilos.podio.width;
    podio.style.height = promo.estilos.podio.height;

    aplicarFadeIn();
  }, 500);
});
    