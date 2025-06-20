const abrirZoom = document.getElementById('abrirZoom');
  const modalZoom = document.getElementById('modalZoom');
  const cerrarZoom = modalZoom.querySelector('.close');
  const imagenZoom = document.getElementById('imagenZoom');
  const imagenOriginal = document.getElementById('mainImage');

  abrirZoom.addEventListener('click', () => {
    imagenZoom.src = imagenOriginal.src;
    modalZoom.classList.remove('hidden');
  });

  cerrarZoom.addEventListener('click', () => {
    modalZoom.classList.add('hidden');
  });

  window.addEventListener('click', (e) => {
    if (e.target === modalZoom) {
      modalZoom.classList.add('hidden');
    }
  });

