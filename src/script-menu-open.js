const menu = document.querySelector('.nav-header-menu');
const burguer = document.querySelector('.burguer-menu');
const line1 = document.querySelector('.first-line');
const line2 = document.querySelector('.second-line');

function comingSoon() {
  alert("Em Produção!");
  event.preventDefault();
}

function openMenu() {
  if (menu.classList.contains('is-open')) {
    menu.classList.remove('is-open');
    document.body.style.overflow = "";
    line1.classList.remove('active');
    line2.classList.remove('active');
  } else {
    menu.classList.add('is-open');
    document.body.style.overflow = "hidden";
    line1.classList.add('active');
    line2.classList.add('active');
  }
}
