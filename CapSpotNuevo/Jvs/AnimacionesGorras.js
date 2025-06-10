function animarAlEntrar() {
  // Seleccionamos todos los elementos que necesitan animación
  const elementos = document.querySelectorAll('.img-ani, .podio, .gorra');

  const observer = new IntersectionObserver(entradas => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        observer.unobserve(entrada.target);
      }
    });
  }, {
    threshold: 0.1
  });

  elementos.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', animarAlEntrar);