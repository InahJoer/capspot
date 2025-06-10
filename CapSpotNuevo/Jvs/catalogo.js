document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const priceFilter = document.getElementById('priceFilter');
  const colorFilter = document.getElementById('colorFilter');
  const track = document.querySelector('.carousel-track');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');
  const noResultsMsg = document.getElementById('noResultsMsg');

  // Guardamos todos los items originales en un array
  const allItems = Array.from(track.children); // cada <li class="carousel-item">

  let currentIndex = 0;

  // Calcula cuántos items caben en la vista actual: usa ancho del contenedor y ancho de un item
  function itemsPerPage() {
    const containerWidth = track.parentElement.offsetWidth;
    // Tomamos el primer elemento de allItems para medir ancho (incluyendo padding)
    if (allItems.length === 0) return 1;
    const itemStyle = window.getComputedStyle(allItems[0]);
    const itemWidth = allItems[0].getBoundingClientRect().width
                      + parseFloat(itemStyle.marginLeft)
                      + parseFloat(itemStyle.marginRight);
    // floor para asegurarnos que quepan completos
    return Math.max(1, Math.floor(containerWidth / itemWidth));
  }

  // Actualiza visibilidad de botones Prev/Next
  function updateButtons(filteredCount) {
    const perPage = itemsPerPage();
    const maxIndex = Math.ceil(filteredCount / perPage) - 1;
    if (currentIndex <= 0) {
      prevButton.classList.add('hidden');
    } else {
      prevButton.classList.remove('hidden');
    }
    if (currentIndex >= maxIndex) {
      nextButton.classList.add('hidden');
    } else {
      nextButton.classList.remove('hidden');
    }
  }

  // Mueve carrusel a la página dada (0-based)
  function moveToIndex(index, filteredCount) {
    const perPage = itemsPerPage();
    const maxIndex = Math.ceil(filteredCount / perPage) - 1;
    if (index < 0) index = 0;
    if (index > maxIndex) index = maxIndex;
    const shiftPercent = index * 100; 
    // Como cada “página” equivale al ancho completo de la vista, desplazamos en porcentajes:
    track.style.transform = `translateX(-${shiftPercent}%)`;
    currentIndex = index;
    updateButtons(filteredCount);
  }

  // Reconstruye el track con los items filtrados y reajusta carrusel
  function rebuildCarousel() {
    const searchText = searchInput.value.trim().toLowerCase();
    const priceValue = priceFilter.value;
    const colorValue = colorFilter.value;
    // Filtramos todos los items según data-atributos del <article class="card-gorra">
    const filtered = allItems.filter(li => {
      const article = li.querySelector('.card-gorra');
      if (!article) return false;
      const name = (article.dataset.name || '').toLowerCase();
      const price = parseFloat(article.dataset.price || '0');
      const color = article.dataset.color || '';
      let matchesSearch = true, matchesPrice = true, matchesColor = true;
      if (searchText !== '') {
        matchesSearch = name.includes(searchText);
      }
      if (priceValue === 'lt30') {
        matchesPrice = price < 30;
      } else if (priceValue === '30-33') {
        matchesPrice = price >= 30 && price <= 33;
      } else if (priceValue === 'gt33') {
        matchesPrice = price > 33;
      }
      if (colorValue !== 'all') {
        matchesColor = (color === colorValue);
      }
      return matchesSearch && matchesPrice && matchesColor;
    });

    // Vaciar track
    track.innerHTML = '';
    if (filtered.length === 0) {
      noResultsMsg.style.display = 'block';
      prevButton.classList.add('hidden');
      nextButton.classList.add('hidden');
      return;
    } else {
      noResultsMsg.style.display = 'none';
    }
    // Insertar solo los elementos filtrados
    filtered.forEach(li => {
      track.appendChild(li);
    });
    // Resetear la posición a la primera página
    currentIndex = 0;
    // Forzamos quitar transform antes de mover
    track.style.transform = 'translateX(0)';
    // Ajustar botones según nuevo count
    moveToIndex(0, filtered.length);
  }

  // Eventos de filtros
  searchInput.addEventListener('input', rebuildCarousel);
  priceFilter.addEventListener('change', rebuildCarousel);
  colorFilter.addEventListener('change', rebuildCarousel);

  // Eventos de navegación
  nextButton.addEventListener('click', () => {
    const filteredCount = track.children.length;
    moveToIndex(currentIndex + 1, filteredCount);
  });
  prevButton.addEventListener('click', () => {
    const filteredCount = track.children.length;
    moveToIndex(currentIndex - 1, filteredCount);
  });

  // Resize: reajusta si cambia itemsPerPage
  window.addEventListener('resize', () => {
    const filteredCount = track.children.length;
    moveToIndex(currentIndex, filteredCount);
  });

  // Inicial: coloca todos los items originales en el track y oculta Prev
  // Aseguramos que track inicialmente contenga todos:
  track.innerHTML = '';
  allItems.forEach(li => track.appendChild(li));
  moveToIndex(0, allItems.length);
});