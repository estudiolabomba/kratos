const header = document.getElementById('header');
const sticky = header.offsetTop;

window.onscroll = () => {
  if (window.pageYOffset > sticky) {
    header.classList.add('fixed');
  } else {
    header.classList.remove('fixed');
  }
};
