
document.addEventListener('DOMContentLoaded', () => {

  const offerCards = document.querySelectorAll('.offer-card[data-deadline]');
  offerCards.forEach(card => {
    const deadlineStr = card.dataset.deadline;
    let deadline;
    try {
      deadline = new Date(deadlineStr);
      if (isNaN(deadline)) throw 'Invalid Date';
    } catch (e) {
      console.warn('Fecha inválida en oferta:', deadlineStr);
      return;
    }
    const timerEl = card.querySelector('.timer');
    function updateCountdown() {
      const now = new Date();
      const diff = deadline - now;
      if (diff <= 0) {

        timerEl.textContent = '00:00:00';

        const btn = card.querySelector('.btn-comprar');
        if (btn) {
          btn.disabled = true;
          btn.textContent = 'Expirada';
          btn.style.backgroundColor = '#888';
          btn.style.cursor = 'default';
        }
        clearInterval(intervalId);
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      const hh = String(hours).padStart(2, '0');
      const mm = String(mins).padStart(2, '0');
      const ss = String(secs).padStart(2, '0');
      timerEl.textContent = `${hh}:${mm}:${ss}`;
    }
    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);
  });
});

