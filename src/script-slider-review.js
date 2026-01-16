const cards = document.querySelectorAll('.card-review');
const dots = document.querySelectorAll('.dots-btn');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

let index = 0;

function showSlide(i) {
  cards.forEach(card => card.classList.remove('active'));
  dots.forEach(dot => dot.checked = false);

  cards[i].classList.add('active');
  dots[i].checked = true;
}

next.addEventListener('click', () => {
  index = (index + 1) % cards.length;
  showSlide(index);
});

prev.addEventListener('click', () => {
  index = (index - 1 + cards.length) % cards.length;
  showSlide(index);
});

dots.forEach((dot, i) => {
  dot.addEventListener('change', () => {
    index = i;
    showSlide(index);
  });
});

// Eventos do carrossel com Touch Event
const carrossel = document.querySelector(".carrossel-track");

let startX = 0;
let endX = 0;

function handSwipe(){
  const distance = endX - startX;
  const minSwipe = 20;

  if (distance > minSwipe){
    prevSlide();
  } else if (distance < -minSwipe) {
    nextSlide();
  }
}

carrossel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});
carrossel.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handSwipe();
});


  
function nextSlide() {
  index = (index + 1) % cards.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + cards.length) % cards.length;
  showSlide(index);
}



showSlide(0);