document.addEventListener("DOMContentLoaded", function () {
    const typingElement = document.getElementById("typing-text");
    const text = typingElement?.dataset.text;

    if (!text) return;

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
