const fondo = document.getElementById('fondo');
const logo = document.getElementById('Logo');
const descripcion = document.getElementById('descripcion-promocion');
const gorra = document.getElementById('Gorra-Mostrador');
const podio = document.getElementById('Podio');
const circulo = document.querySelector('.Circulo');
const gorraCaja = document.getElementById('Gorra-Caja');
const podioCaja = document.getElementById('Podio-Caja');

const promociones = [
  {
    equipo: "Knicks",
    fondo: "/CapSpotNuevo/Imagenes/imagenes/CanchaFo.jpeg",
    logo: "/CapSpotNuevo/Imagenes/imagenes/Catalogo/new-york-knicks-logo-transparent.png",
    descripcion: "New York Knicks con esta gorra en color negro, perfecta para los verdaderos fanáticos del equipo. Su diseño sobrio y elegante resalta con el logo bordado en azul y naranja.",
    gorra: "/CapSpotNuevo/Imagenes/imagenes/Catalogo/gorraKnicks.webp",
    podio: "/CapSpotNuevo/Imagenes/imagenes/Catalogo/podio.webp",
    estilos: {
      logo: { width: "480px", height: "auto", position:"relative", top:"0px", display:"block" },
      gorra: { width: "470px", height: "420px", position:"relative", bottom:"340px", left:"39.3%"},
      podio: { width: "auto", height: "auto", position:"absolute", left:"43%"}
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
      logo: { width: "480px", height: "480px", position:"relative", top:"0px",  left:"40px", display:"block", filter:"invert(100%)"},
      gorra: { width: "450px", height: "420px", position:"relative", left:"40%", bottom:"380px" },
      podio: { width: "auto", height: "auto" }
    }
  },
  {
    equipo: "Lakers",
    fondo: "/CapSpotNuevo/Imagenes/imagenes/Gorras/LakersEstadio.jpg",
    logo: "/CapSpotNuevo/Imagenes/imagenes/Gorras/lakers.png",
    descripcion: "Luce el brillo de la realeza del baloncesto con esta gorra blanca edición especial de los Lakers. Esta pieza única combina la pureza del blanco con el legendario escudo dorado y púrpura de Los Angeles Lakers, creando un contraste impecable.",
    gorra: "/CapSpotNuevo/Imagenes/imagenes/Gorras/Lakers.webp",
    podio: "/CapSpotNuevo/Imagenes/imagenes/Gorras/PodioNegri.png",
    estilos: {
      logo: { width: "480px", height: "auto", position:"relative", top:"150px", display:"block"},
      gorra: { width: "400px", height: "390px",position:"relative", left:"41.4%", bottom:"100px" },
      podio: { width: "350px", height: "400px", position:"absolute",top:"0%"}
    }
  }
];

function aplicarEstilos(elemento, estilos) {
  for (const propiedad in estilos) {
    elemento.style[propiedad] = estilos[propiedad];
  }
}


let indiceActual = 0;

function aplicarFadeOut() {
  [fondo, logo, descripcion, gorra, podio].forEach(el => {
    el.classList.remove('show');
  });
}

function aplicarFadeIn() {
  [fondo, logo, descripcion, gorra, podio].forEach(el => {
    void el.offsetWidth; 
    el.classList.add('show');
  });
}

/*circulo.addEventListener('click', () => {
  aplicarFadeOut();

  setTimeout(() => {
    indiceActual = (indiceActual + 1) % promociones.length;
    const promo = promociones[indiceActual];

    fondo.src = promo.fondo;
    logo.src = promo.logo;
    descripcion.innerHTML = `<span>${promo.descripcion}</span>`;
    gorra.src = promo.gorra;
    podio.src = promo.podio;

    logo.style.top = "";
    logo.style.position = "";
    logo.style.display = "";
    logo.style.filter ="";
    logo.style.left = "";
    gorra.style.buttom = "";
    podio.style.left = "";
    podio.style.top = "";
    aplicarEstilos(logo, promo.estilos.logo);
    aplicarEstilos(gorra, promo.estilos.gorra);
    aplicarEstilos(podio, promo.estilos.podio);
    aplicarFadeIn();
  }, 500);
});*/
    
circulo.addEventListener('click', () => {
  aplicarFadeOut();

  setTimeout(() => {
    indiceActual = (indiceActual + 1) % promociones.length;
    const promo = promociones[indiceActual];

    // 🟢 Calculamos el índice siguiente para la vista previa (Caja-gorra)
    const siguienteIndice = (indiceActual + 1) % promociones.length;
    const siguientePromo = promociones[siguienteIndice];

    // Actualizamos la promoción principal
    fondo.src = promo.fondo;
    logo.src = promo.logo;
    descripcion.innerHTML = `<span>${promo.descripcion}</span>`;
    gorra.src = promo.gorra;
    podio.src = promo.podio;

    logo.style.top = "";
    logo.style.position = "";
    logo.style.display = "";
    logo.style.filter ="";
    logo.style.left = "";
    gorra.style.buttom = "";
    podio.style.left = "";
    podio.style.top = "";

    // Aplicar estilos específicos
    aplicarEstilos(logo, promo.estilos.logo);
    aplicarEstilos(gorra, promo.estilos.gorra);
    aplicarEstilos(podio, promo.estilos.podio);

    // 🟢 Actualizamos la Caja-gorra con el siguiente
    gorraCaja.src = siguientePromo.gorra;
    podioCaja.src = siguientePromo.podio;
    if (siguientePromo.equipo === "Knicks") {
    gorraCaja.style.width = "170px";
    gorraCaja.style.height = "auto";
    gorraCaja.style.objectFit = "contain";
    gorraCaja.style.position = "relative";}  
    else if (siguientePromo.equipo === "Lakers") {
    gorraCaja.style.width = "170px";
    gorraCaja.style.height = "150px";
    gorraCaja.style.objectFit = "contain";
    gorraCaja.style.marginTop = "0px"; 
    gorraCaja.style.position ="relative"}
   
    podioCaja.classList.remove('show');
    gorraCaja.classList.remove('show');
    void podioCaja.offsetWidth;
    void gorraCaja.offsetWidth;
    podioCaja.classList.add('show');
    setTimeout(() => {
      gorraCaja.classList.add('show');
    }, 200);
    aplicarFadeIn();
  }, 500);  
});