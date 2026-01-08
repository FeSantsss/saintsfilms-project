const menu = document.querySelector('.nav-header-menu');
const burguer = document.querySelector('.burguer-menu');

function openMenu() {
  const isOpen = menu.classList.toggle('is-open');

  burguer.src = isOpen
    ? burguer.dataset.open
    : burguer.dataset.close;
}
