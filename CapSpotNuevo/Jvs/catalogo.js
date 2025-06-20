document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const priceFilter = document.getElementById('priceFilter');
  const track = document.querySelector('.carousel-track');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');
  const noResultsMsg = document.getElementById('noResultsMsg');

  const allItems = Array.from(track.children); 

  let currentIndex = 0;

  function itemsPerPage() {
const container = track.parentElement;
const containerWidth = container.offsetWidth;
    if (allItems.length === 0) return 1;
    const itemStyle = window.getComputedStyle(allItems[0]);
    const itemWidth = allItems[0].getBoundingClientRect().width
                      + parseFloat(itemStyle.marginLeft)
                      + parseFloat(itemStyle.marginRight);
    return Math.max(1, Math.floor(containerWidth / itemWidth));
  }

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

function moveToIndex(index, filteredCount) {
  const item = track.children[0];
  if (!item) return;

  const container = track.closest('.carousel-track-container');
  const containerWidth = container.getBoundingClientRect().width;

  const itemRect = item.getBoundingClientRect();
  const style = window.getComputedStyle(item);
  const marginLeft = parseFloat(style.marginLeft) || 0;
  const marginRight = parseFloat(style.marginRight) || 0;

  const itemWidth = itemRect.width + marginLeft + marginRight;

  const perPage = Math.max(1, Math.floor(containerWidth / itemWidth));
  const maxIndex = Math.max(0, Math.ceil(filteredCount / perPage) - 1);

  if (index < 0) index = 0;
  if (index > maxIndex) index = maxIndex;

  const shiftPx = index * perPage * itemWidth;

  track.style.transform = `translateX(-${shiftPx}px)`;

  currentIndex = index;

  prevButton.classList.toggle('hidden', index <= 0);
  nextButton.classList.toggle('hidden', index >= maxIndex);
}

  function rebuildCarousel() {
    const searchText = searchInput.value.trim().toLowerCase();
    const priceValue = priceFilter.value;


    const filtered = allItems.filter(li => {
      const article = li.querySelector('.card-gorra');
      if (!article) return false;
      const name = (article.dataset.name || '').toLowerCase();
      const price = parseFloat(article.dataset.price || '0');
      let matchesSearch = true, matchesPrice = true;
      if (searchText !== '') {
        matchesSearch = name.includes(searchText);
      }
      if (priceValue === 'lt30') {
        matchesPrice = price < 500;
      } else if (priceValue === '30-33') {
        matchesPrice = price >= 300 && price <= 600;
      } else if (priceValue === 'gt33') {
        matchesPrice = price > 500;
      }
      return matchesSearch && matchesPrice;
    });

    track.innerHTML = '';
    if (filtered.length === 0) {
      noResultsMsg.style.display = 'block';
      prevButton.classList.add('hidden');
      nextButton.classList.add('hidden');
      return;
    } else {
      noResultsMsg.style.display = 'none';
    }

    filtered.forEach(li => {
      track.appendChild(li);
    });

    currentIndex = 0;

    track.style.transform = 'translateX(0)';
   
    moveToIndex(0, filtered.length);
  }


  searchInput.addEventListener('input', rebuildCarousel);
  priceFilter.addEventListener('change', rebuildCarousel);



  nextButton.addEventListener('click', () => {
    const filteredCount = track.children.length;
    moveToIndex(currentIndex + 1, filteredCount);
  });
  prevButton.addEventListener('click', () => {
    const filteredCount = track.children.length;
    moveToIndex(currentIndex - 1, filteredCount);
  });

  window.addEventListener('resize', () => {
    const filteredCount = track.children.length;
    moveToIndex(currentIndex, filteredCount);
  });


  track.innerHTML = '';
  allItems.forEach(li => track.appendChild(li));
  moveToIndex(0, allItems.length);
});