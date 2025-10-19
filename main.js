// main.js
import { state } from './core.js';
import { renderUI } from './ui.js';
import { advanceWeek } from './calendar.js';

// --- Elementos de Pantalla 1 (Nombre) ---
const screen1 = document.getElementById('screen-1-name');
const clubNameInput = document.getElementById('club-name-input');
const btnToStadium = document.getElementById('btn-to-stadium');

// --- Elementos de Pantalla 2 (Estadio) ---
const screen2 = document.getElementById('screen-2-stadium');
const stadiumOptions = document.querySelectorAll('.stadium-option');
const btnToGame = document.getElementById('btn-to-game');

// --- Elementos de Pantalla 3 (Juego) ---
const screen3 = document.getElementById('screen-3-game');
const nextWeekButton = document.getElementById('btn-next-week');

// --- Variable local para guardar la elección ---
let selectedStadiumChoice = null;

// --- Lógica del Flujo ---

/**
 * PASO 1: Validar el nombre y pasar a la pantalla de estadio
 */
function goToStadiumScreen() {
    const clubName = clubNameInput.value;

    // Validación
    if (clubName.trim() === "") {
        alert("Por favor, escribe un nombre para tu club.");
        return;
    }

    // Guardar el nombre en el estado
    state.club = clubName;

    // Cambiar de pantalla
    screen1.style.display = "none";
    screen2.style.display = "block";
}

/**
 * PASO 2: Manejar el clic en una opción de estadio
 */
function handleStadiumSelect(event) {
    selectedStadiumChoice = event.currentTarget.dataset.choice; 

    // Quitar 'selected' de todas las opciones
    stadiumOptions.forEach(option => {
        option.classList.remove('selected');
    });
    
    // Añadir 'selected' solo a la que hicimos clic
    event.currentTarget.classList.add('selected');
    console.log("Estadio elegido:", selectedStadiumChoice);
}

/**
 * PASO 3: Validar el estadio y comenzar el juego
 */
function startGame() {
    // Validación
    if (selectedStadiumChoice === null) {
        alert("Por favor, elige un estadio.");
        return;
    }

    // Guardar los datos del estadio en el estado
    if (selectedStadiumChoice === "propio") {
        state.stadium.name = "El Fortín";
        state.stadium.capacity = 8000;
        state.stadium.costPerWeek = 1500;
    } else {
        state.stadium.name = "Estadio Nacional (Alquilado)";
        state.stadium.capacity = 35000;
        state.stadium.costPerWeek = 10000;
    }

    // Cambiar de pantalla
    screen2.style.display = "none";
    screen3.style.display = "block";

    // "Pintar" la interfaz del juego por primera vez
    renderUI();

    // Activar el botón de "Avanzar Semana" (el loop principal)
    nextWeekButton.addEventListener('click', handleNextWeek);
}

/**
 * PASO 4: Loop principal del juego
 */
function handleNextWeek() {
  advanceWeek();
  renderUI();
}

// --- Conexión de Botones ---

// 1. Botón de Pantalla 1 a 2
btnToStadium.addEventListener('click', goToStadiumScreen);

// 2. Opciones de Estadio
stadiumOptions.forEach(option => {
    option.addEventListener('click', handleStadiumSelect);
});

// 3. Botón de Pantalla 2 a 3
btnToGame.addEventListener('click', startGame);
