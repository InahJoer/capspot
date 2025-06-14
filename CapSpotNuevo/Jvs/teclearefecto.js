document.addEventListener("DOMContentLoaded", function () {
    const text = "Inspirada en el corazón de New York, esta gorra de edición especial combina elegancia y pasión deportiva. Perfecta tanto para los estadios como para el uso diario.";
    const typingElement = document.getElementById("typing-text");

    let i = 0;
    function type() {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(type, 20);
        } else {
            typingElement.style.borderRight = "none";
        }
    }

    type();
});