const revealItems = document.querySelectorAll(".reveal");
const counterItems = document.querySelectorAll("[data-count]");
const cursorGlow = document.querySelector(".cursor-glow");
const rotatorWords = document.querySelectorAll(".rotator-word");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.2,
  },
);

revealItems.forEach((item) => revealObserver.observe(item));

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const target = entry.target;
      const finalValue = Number(target.dataset.count);
      let current = 0;
      const step = Math.max(1, Math.ceil(finalValue / 24));

      const timer = window.setInterval(() => {
        current += step;
        if (current >= finalValue) {
          target.textContent = String(finalValue);
          window.clearInterval(timer);
          return;
        }

        target.textContent = String(current);
      }, 50);

      counterObserver.unobserve(target);
    });
  },
  { threshold: 0.6 },
);

counterItems.forEach((item) => counterObserver.observe(item));

window.addEventListener("pointermove", (event) => {
  if (!cursorGlow) {
    return;
  }

  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

if (rotatorWords.length > 1) {
  let activeIndex = 0;

  window.setInterval(() => {
    rotatorWords[activeIndex].classList.remove("is-active");
    activeIndex = (activeIndex + 1) % rotatorWords.length;
    rotatorWords[activeIndex].classList.add("is-active");
  }, 1800);
}
