
const toggle = document.querySelector('#special');
const list = document.querySelector('.ul-global');

let isOpen = false;


try {
  toggle.addEventListener('click', () => {
    isOpen = !isOpen;
  
    toggle.setAttribute('aria-expanded', isOpen);
  
    if (isOpen) {
      list.hidden = false;
      const height = list.scrollHeight + 'px';
      list.style.height = '0px';
  
      requestAnimationFrame(() => {
        list.classList.add('is-open');
        list.style.height = height;
      });
  
      list.addEventListener('transitionend', () => {
        list.style.height = 'auto';
      }, { once: true });
  
    } else {
      const height = list.scrollHeight + 'px';
      list.style.height = height;
  
      requestAnimationFrame(() => {
        list.classList.remove('is-open');
        list.style.height = '0px';
      });
  
      list.addEventListener('transitionend', () => {
        list.hidden = true;
      }, { once: true });
    }
  });
} catch (error) {
  alert("Ocorreu um erro ao realizar a ação - ", error);
}





