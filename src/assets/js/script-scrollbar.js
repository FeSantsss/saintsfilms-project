const thumb = document.querySelector(".thumb");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = scrollTop / docHeight;

  thumb.style.transform = `scaleY(${progress})`;
}, {passive: true});
