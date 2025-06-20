document.addEventListener("DOMContentLoaded", () => {
    const carrito = document.getElementById("carrito");
    const abrir = document.getElementById("abrir");
    const cerrar = document.getElementById("cerrar");
    const limpear = document.getElementById("limpear");
    const items = document.getElementById("items");
    const totalElem = document.getElementById("total");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function actualizar() {
        items.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${item.name} - C$${item.price} x ${item.quantity}
                <button data-index="${index}">Eliminar</button>
            `;
            items.appendChild(li);
            total += item.price * item.quantity;
        });

        totalElem.textContent = `Total: C$${total.toFixed(2)}`;
        saveCart();

        const cartCount = document.getElementById("cart-count");
        if (cartCount) {
            cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        }
    }


    document.querySelectorAll(".btn-comprar").forEach(button => {
        button.addEventListener("click", (e) => {
            const card = e.target.closest(".card-gorra, .topsale-card, .offer-card");
            const name = card.querySelector("h3")?.textContent || "Producto";
            let priceText = card.querySelector(".precio, .price .discounted")?.textContent || "0";
            const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));

            agregarAlCarrito(name, price);
        });
    });

 
    document.querySelectorAll(".buy-button").forEach(button => {
        button.addEventListener("click", () => {
            const name = document.querySelector(".right h2")?.textContent || "Producto";
            let priceText = document.querySelector(".right .price")?.textContent || "0";
            const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));

            agregarAlCarrito(name, price);
        });
    });

    function agregarAlCarrito(name, price) {
        const existentes = cart.find(item => item.name === name);
        if (existentes) {
            existentes.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        actualizar();
        alert("Producto añadido al carrito");
    }


    items.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const index = parseInt(e.target.dataset.index);
            cart.splice(index, 1);
            actualizar();
        }
    });

    limpear.addEventListener("click", () => {
        cart = [];
        actualizar();
    });

    
    abrir.addEventListener("click", () => {
        carrito.style.display = "block";
    });


    cerrar.addEventListener("click", () => {
        carrito.style.display = "none";
    });

    actualizar();
});