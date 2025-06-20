document.addEventListener('DOMContentLoaded', () => {
  const carrito = document.getElementById('carrito');
  const itemsContainer = document.getElementById('items');
  const totalElement = document.getElementById('total');
  const vaciarBtn = document.getElementById('limpear');
  const cerrarBtn = document.getElementById('cerrar');
  const abrirCarritoBtn = document.getElementById('abrir');
  const contador = document.getElementById('cart-count');

  let carritoItems = JSON.parse(localStorage.getItem('carrito')) || [];

  function actualizarCarrito() {
    itemsContainer.innerHTML = '';
    let total = 0;

    carritoItems.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `${item.nombre} - C$${item.precio}`;
      itemsContainer.appendChild(li);
      total += item.precio;
    });

    totalElement.textContent = `Total: C$${total.toFixed(2)}`;
    contador.textContent = carritoItems.length;
    localStorage.setItem('carrito', JSON.stringify(carritoItems));
  }

  document.querySelectorAll('.buy-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const nombre = document.querySelector('.right h2').textContent;
      const precioTexto = document.querySelector('.price').textContent;
      const precio = parseFloat(precioTexto.replace('C$', '').trim());

      carritoItems.push({ nombre, precio });
      actualizarCarrito();
      carrito.style.display = 'block';
    });
  });

  vaciarBtn.addEventListener('click', () => {
    carritoItems = [];
    actualizarCarrito();
  });

  cerrarBtn.addEventListener('click', () => {
    carrito.style.display = 'none';
  });

  abrirCarritoBtn.addEventListener('click', () => {
    carrito.style.display = 'block';
  });


  actualizarCarrito();
});