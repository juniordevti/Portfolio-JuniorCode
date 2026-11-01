const cursor = document.querySelector(".neon-cursor");
const colors = ["#00f0ff", "#ff00e5", "#8a2be2", "#ffffff"];

let lastX = 0,
  lastY = 0;

function createSpark(x, y) {
  const spark = document.createElement("span");
  spark.className = "spark";

  const size = Math.random() * 6 + 3;
  const color = colors[Math.floor(Math.random() * colors.length)];

  spark.style.width = size + "px";
  spark.style.height = size + "px";
  spark.style.background = color;
  spark.style.boxShadow = `0 0 8px ${color}, 0 0 16px ${color}`;
  document.body.appendChild(spark);

  // direção e distância aleatórias
  const angle = Math.random() * Math.PI * 2;
  const distance = Math.random() * 50 + 20;
  const dx = Math.cos(angle) * distance;
  const dy = Math.sin(angle) * distance;

  const animation = spark.animate(
    [
      { transform: `translate(${x}px, ${y}px) scale(1)`, opacity: 1 },
      { transform: `translate(${x + dx}px, ${y + dy}px) scale(0)`, opacity: 0 },
    ],
    { duration: 600 + Math.random() * 400, easing: "ease-out" },
  );

  animation.onfinish = () => spark.remove();
}

document.addEventListener("mousemove", (e) => {
  cursor.classList.add("visible");
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

  // só solta faíscas se o mouse andou o suficiente
  const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
  if (dist > 12) {
    const amount = Math.min(3, Math.ceil(dist / 25));
    for (let i = 0; i < amount; i++) createSpark(e.clientX, e.clientY);
    lastX = e.clientX;
    lastY = e.clientY;
  }
});

// efeito em links e botões
document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
  el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
});

// esconde ao sair da janela
document.addEventListener("mouseleave", () =>
  cursor.classList.remove("visible"),
);
document.addEventListener("mouseenter", () => cursor.classList.add("visible"));
