import { menu } from "./menu.js";

menu();

const revealItems = document.querySelectorAll(".reveal-on-load");

if (revealItems.length) {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
}

const yearElement = document.querySelector("[data-current-year]");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Perguntas frequentes
const faqItems = Array.from(document.querySelectorAll(".faq-item"));

const setFaqState = (item, isOpen) => {
  const button = item.querySelector(".toggle-btn");
  const icon = button.querySelector("img");

  item.classList.toggle("open", isOpen);
  button.setAttribute("aria-expanded", String(isOpen));

  if (icon) {
    icon.src = isOpen
      ? "./assets/image/MinusCircle.svg"
      : "./assets/image/PlusCircle.svg";
    icon.alt = isOpen ? "Fechar resposta" : "Abrir resposta";
  }
};

faqItems.forEach((item) => {
  const button = item.querySelector(".toggle-btn");

  button.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    faqItems.forEach((faqItem) => setFaqState(faqItem, false));

    if (!isOpen) {
      setFaqState(item, true);
    }
  });
});

// Filtro de certificados
const filterButtons = document.querySelectorAll(".filter-btn");
const certificateCards = document.querySelectorAll(".cert-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("is-active"));
    button.classList.add("is-active");

    certificateCards.forEach((card) => {
      const category = card.dataset.category;
      const shouldShow = filter === "all" || category === filter;

      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

// Formulário de contato
const contactForm = document.getElementById("contact-form");
const whatsappPhone = "5562993297215";

if (contactForm) {
  const fields = {
    name: contactForm.querySelector('input[name="name"]'),
    email: contactForm.querySelector('input[name="email"]'),
    subject: contactForm.querySelector('input[name="subject"]'),
    message: contactForm.querySelector('textarea[name="message"]'),
  };

  const errorElements = {
    name: contactForm.querySelector('[data-error-for="name"]'),
    email: contactForm.querySelector('[data-error-for="email"]'),
    subject: contactForm.querySelector('[data-error-for="subject"]'),
    message: contactForm.querySelector('[data-error-for="message"]'),
  };

  const statusElement = contactForm.querySelector(".form-status");

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim().length >= 2 ? "" : "Informe seu nome completo.";
      case "email": {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value.trim())
          ? ""
          : "Informe um e-mail válido.";
      }
      case "subject":
        return value.trim().length >= 3 ? "" : "Descreva o assunto.";
      case "message":
        return value.trim().length >= 10
          ? ""
          : "Escreva uma mensagem com pelo menos 10 caracteres.";
      default:
        return "";
    }
  };

  const setFieldState = (fieldName, errorMessage) => {
    const field = fields[fieldName];
    const wrapper = field.closest(".form-field");
    const errorElement = errorElements[fieldName];

    wrapper.classList.remove("is-invalid", "is-valid");
    if (errorMessage) {
      wrapper.classList.add("is-invalid");
      errorElement.textContent = errorMessage;
    } else if (field.value.trim()) {
      wrapper.classList.add("is-valid");
      errorElement.textContent = "";
    } else {
      errorElement.textContent = "";
    }
  };

  Object.entries(fields).forEach(([name, input]) => {
    input.addEventListener("input", () => {
      setFieldState(name, validateField(name, input.value));
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let hasError = false;

    Object.entries(fields).forEach(([name, input]) => {
      const errorMessage = validateField(name, input.value);
      setFieldState(name, errorMessage);
      if (errorMessage) {
        hasError = true;
      }
    });

    if (hasError) {
      statusElement.textContent =
        "Revise os campos destacados antes de enviar.";
      statusElement.style.color = "#ff8f8f";
      return;
    }

    const message = `*📩 Novo contato*\n\n*👤 Nome:* ${fields.name.value.trim()}\n*📧 Email:* ${fields.email.value.trim()}\n*📝 Assunto:* ${fields.subject.value.trim()}\n\n*💬 Mensagem:*\n${fields.message.value.trim()}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${encodeURIComponent(
      message,
    )}`;

    contactForm.classList.add("is-success");
    statusElement.textContent =
      "Mensagem validada. Abrindo WhatsApp para enviar...";
    statusElement.style.color = "#7de0ad";

    window.open(whatsappUrl, "_blank", "noopener");

    contactForm.reset();
    Object.entries(fields).forEach(([name]) => {
      const wrapper = fields[name].closest(".form-field");
      wrapper.classList.remove("is-invalid", "is-valid");
      errorElements[name].textContent = "";
    });
  });
}

const canvas = document.getElementById("code-bg");
const ctx = canvas?.getContext("2d");

if (canvas && ctx) {
  const fontSize = 16;
  const letters =
    "日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let columns = Math.floor(window.innerWidth / fontSize);
  const drops = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops.length = 0;
    for (let x = 0; x < columns; x += 1) {
      drops[x] = canvas.height;
    }
  }

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i += 1) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i] += 1;
    }
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  setInterval(drawMatrix, 33);
}
