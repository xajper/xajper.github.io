function blokujMysz(event) {
    if (event.button === 2 || event.which === 3) {
        event.preventDefault();
    }
}
  
function blokujKlawisze(event) {
    if (event.key === 'F12') {
        event.preventDefault();
    }
  
    if (event.ctrlKey && event.key === 'u') {
        event.preventDefault();
    }
}
  
document.addEventListener('mousedown', blokujMysz);
  
document.addEventListener('keydown', blokujKlawisze);