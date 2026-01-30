const counters = document.querySelectorAll(".counter");

const animateCounter = (el) => {
  const target = +el.dataset.target;
  const startValue = Math.floor(target * 0.9); 
  const duration = 1500; // ms
  const startTime = performance.now();

  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(startValue + (progress * (target - startValue)));


    el.textContent = value.toLocaleString("pt-BR");

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target); // anima só uma vez
    }
  });
}, {
  threshold: 0.6
}, {passive: true});

counters.forEach(counter => observer.observe(counter));
