// Header scroll state handler
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        header.style.backgroundColor = '#0b0f19';
        header.style.padding = '15px 8%';
    } else {
        header.style.backgroundColor = '#111827';
        header.style.padding = '20px 8%';
    }
});