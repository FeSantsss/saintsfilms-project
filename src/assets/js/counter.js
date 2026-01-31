const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
  let animationFrame = null;
  let isAnimating = false;

  const animate = () => {
    const target = +counter.dataset.target;
    const startValue = Math.floor(target * 0.90); // começa em 75%
    const duration = 1200;
    const startTime = performance.now();

    isAnimating = true;

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const value = Math.floor(
        startValue + (progress * (target - startValue))
      );

      counter.textContent = value.toLocaleString("pt-BR");

      if (progress < 1) {
        animationFrame = requestAnimationFrame(update);
      } else {
        isAnimating = false;
      }
    };

    animationFrame = requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {
        if (!isAnimating) {
          animate();
        }
      } else {
        // Cancela animação se sair da tela
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
          animationFrame = null;
        }

        // Reseta para 75% ao sair
        const target = +counter.dataset.target;
        const startValue = Math.floor(target * 0.90);
        counter.textContent = startValue.toLocaleString("pt-BR");

        isAnimating = false;
      }

    });
  }, { threshold: 0.6 });

  observer.observe(counter);
});
