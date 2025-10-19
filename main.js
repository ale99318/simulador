// main.js

// 1. Importar los módulos que necesitamos
import { state } from './core.js';
import { renderUI } from './ui.js';
import { advanceWeek } from './calendar.js'; // Asumimos que calendar.js ya existe

// --- Elementos de la Pantalla 1 (Configuración) ---
const setupScreen = document.getElementById('setup-screen');
const clubNameInput = document.getElementById('club-name-input');
const startGameButton = document.getElementById('start-game-btn');

// --- Elementos de la Pantalla 2 (Juego) ---
const gameScreen = document.getElementById('game-screen');
const nextWeekButton = document.getElementById('btn-next-week');


// --- Lógica del Juego ---

/**
 * Función para iniciar el juego
 */
function startGame() {
    const clubName = clubNameInput.value;

    // Validación simple
    if (clubName.trim() === "") {
        alert("Por favor, escribe un nombre para tu club.");
        return;
    }

    // 1. Actualizar el estado (core.js)
    state.club = clubName;

    // 2. Ocultar la pantalla de setup
    setupScreen.style.display = "none";
    
    // 3. Mostrar la pantalla de juego
    gameScreen.style.display = "block";

    // 4. "Pintar" la interfaz por primera vez
    renderUI();

    // 5. ¡Importante! Activar el botón de "Avanzar Semana" AHORA
    nextWeekButton.addEventListener('click', handleNextWeek);
}

/**
 * Función para el "Game Loop" principal
 */
function handleNextWeek() {
  // 1. Llama a la lógica del juego
  advanceWeek();
  
  // 2. Llama a la lógica de la interfaz
  renderUI();
}

// --- Conexión de Botones ---

// Conectar el botón de "Comenzar Carrera"
startGameButton.addEventListener('click', startGame);

// NOTA: El botón 'nextWeekButton' se conecta DENTRO de la función startGame()
