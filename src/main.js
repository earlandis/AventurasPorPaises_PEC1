// ======== DEPENDECIA: AOS =========
import AOS from 'aos';
import 'aos/dist/aos.css';

document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 1000,
    once: true
  });
});

// ======== MENU BURGER ========
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  nav.classList.toggle('nav-active');
  burger.classList.toggle('toggle');
});

// ======== SLIDER ACTIVIDADES ========
const container = document.querySelector('.cards-container');
const cards = document.querySelectorAll('.cards-container .card');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;

function showCard(i) {
  if(cards.length === 0) return; // evita errores si no hay cards
  const cardWidth = cards[0].clientWidth;
  container.style.transform = `translateX(${-i * cardWidth}px)`;
}

prevBtn?.addEventListener('click', () => {
  index = index > 0 ? index - 1 : cards.length - 1;
  showCard(index);
});

nextBtn?.addEventListener('click', () => {
  index = index < cards.length - 1 ? index + 1 : 0;
  showCard(index);
});

function positionPins() {
  const container = document.querySelector('.map-container');
  const pins = document.querySelectorAll('.map-container .pin');

  const containerRect = container.getBoundingClientRect();

  pins.forEach(pin => {
    const topPct = parseFloat(pin.dataset.top);
    const leftPct = parseFloat(pin.dataset.left);

    // Posición relativa al contenedor, no a la imagen
    pin.style.top = `${(topPct / 100) * containerRect.height}px`;
    pin.style.left = `${(leftPct / 100) * containerRect.width}px`;
  });
}

// Inicializar slider
showCard(index);

//Eventos
window.addEventListener('resize', () => showCard(index));
window.addEventListener('load', positionPins);
window.addEventListener('resize', positionPins);