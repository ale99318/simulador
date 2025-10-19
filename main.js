// main.js
import { renderUI } from './ui.js';
import { advanceWeek } from './calendar.js';

// 1. Elementos de Interacción
const nextWeekButton = document.getElementById('btn-next-week');

// 2. "Game Loop" principal (basado en eventos)
function handleNextWeek() {
  // Llama a la lógica del juego
  advanceWeek();
  
  // Llama a la lógica de la interfaz
  renderUI();
}

// 3. Conectar el botón
nextWeekButton.addEventListener('click', handleNextWeek);

// 4. Estado Inicial
// Asegurarse de que la UI muestre los valores por defecto al cargar la página
renderUI();
