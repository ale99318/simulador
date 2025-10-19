// main.js
import { state } from './core.js';
import { renderUI } from './ui.js';
import { advanceWeek } from './calendar.js';

// --- Elementos de la Pantalla 1 (Configuración) ---
const setupScreen = document.getElementById('setup-screen');
const clubNameInput = document.getElementById('club-name-input');
const startGameButton = document.getElementById('start-game-btn');
const stadiumOptions = document.querySelectorAll('.stadium-option'); // (NUEVO)

// --- Elementos de la Pantalla 2 (Juego) ---
const gameScreen = document.getElementById('game-screen');
const nextWeekButton = document.getElementById('btn-next-week');

// --- Variable local para guardar la elección ---
let selectedStadiumChoice = null; // (NUEVO)

// --- Lógica del Juego ---

/**
 * (NUEVO) Manejar el clic en una opción de estadio
 */
function handleStadiumSelect(event) {
    // 'event.currentTarget' es el div en el que hicimos clic
    const choice = event.currentTarget.dataset.choice; 
    selectedStadiumChoice = choice;

    // Quitar 'selected' de todas las opciones
    stadiumOptions.forEach(option => {
        option.classList.remove('selected');
    });
    
    // Añadir 'selected' solo a la que hicimos clic
    event.currentTarget.classList.add('selected');

    console.log("Estadio elegido:", choice);
}

/**
 * Función para iniciar el juego (MODIFICADA)
 */
function startGame() {
    const clubName = clubNameInput.value;

    // Validación 1: Nombre del club
    if (clubName.trim() === "") {
        alert("Por favor, escribe un nombre para tu club.");
        return;
    }
    
    // Validación 2: Elección de estadio (NUEVO)
    if (selectedStadiumChoice === null) {
        alert("Por favor, elige un estadio.");
        return;
    }

    // 1. Actualizar el estado (core.js)
    state.club = clubName;
    
    // 2. (NUEVO) Actualizar el estado del estadio
    if (selectedStadiumChoice === "propio") {
        state.stadium.name = "El Fortín";
        state.stadium.capacity = 8000;
        state.stadium.costPerWeek = 1500;
    } else {
        state.stadium.name = "Estadio Nacional (Alquilado)";
        state.stadium.capacity = 35000;
        state.stadium.costPerWeek = 10000;
    }

    // 3. Ocultar la pantalla de setup
    setupScreen.style.display = "none";
    
    // 4. Mostrar la pantalla de juego
    gameScreen.style.display = "block";

    // 5. "Pintar" la interfaz por primera vez
    renderUI();

    // 6. Activar el botón de "Avanzar Semana"
    nextWeekButton.addEventListener('click', handleNextWeek);
}

/**
 * Función para el "Game Loop" principal
 */
function handleNextWeek() {
  advanceWeek();
  renderUI();
}

// --- Conexión de Botones ---

// Conectar el botón de "Comenzar Carrera"
startGameButton.addEventListener('click', startGame);

// (NUEVO) Conectar los botones de elección de estadio
stadiumOptions.forEach(option => {
    option.addEventListener('click', handleStadiumSelect);
});
