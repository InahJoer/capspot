  const form = document.getElementById("comment-form");
  const comentarios = document.getElementById("comentarios-lista");
  const ratingInput = document.getElementById("rating");
  const starContainer = document.getElementById("star-container");

  const modal = document.getElementById("modal-comentario");
  const openModalBtn = document.querySelector(".open-modal");
  const closeModalBtn = document.querySelector(".close");

  // Mostrar/ocultar modal
  openModalBtn.addEventListener("click", () => modal.classList.remove("hidden"));
  closeModalBtn.addEventListener("click", () => modal.classList.add("hidden"));
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  // Crear estrellas
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.textContent = "★";
    star.classList.add("star");
    star.dataset.value = i;
    star.addEventListener("click", () => {
      ratingInput.value = i;
      updateStars(i);
    });
    starContainer.appendChild(star);
  }

  function updateStars(valor) {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star) => {
      const val = parseInt(star.dataset.value);
      star.classList.toggle("selected", val <= valor);
    });
  }

  // Guardar en localStorage
  function guardarComentario(nombre, comentario, rating) {
    const comentariosGuardados = JSON.parse(localStorage.getItem("comentarios")) || [];
    comentariosGuardados.push({ nombre, comentario, rating });
    localStorage.setItem("comentarios", JSON.stringify(comentariosGuardados));
  }

  // Cargar al iniciar
  function cargarComentarios() {
    const comentariosGuardados = JSON.parse(localStorage.getItem("comentarios")) || [];
    comentariosGuardados.reverse().forEach(({ nombre, comentario, rating }) => {
      agregarComentarioAlDOM(nombre, comentario, rating);
    });
  }

  function agregarComentarioAlDOM(nombre, comentario, rating) {
    const div = document.createElement("div");
    div.classList.add("comment-item");
    div.innerHTML = `
      <p>"${comentario}"</p>
      <div class="comment-author">- ${nombre}</div>
      <div style="color: gold; font-size: 1.5rem;">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</div>
    `;
    comentarios.prepend(div);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const comentario = document.getElementById("comentario").value;
    const rating = ratingInput.value;

    guardarComentario(nombre, comentario, rating);
    agregarComentarioAlDOM(nombre, comentario, rating);

    form.reset();
    updateStars(0);
    modal.classList.add("hidden");
  });

  cargarComentarios();