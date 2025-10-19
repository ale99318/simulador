// main.js
import { state } from './core.js';
import { renderUI } from './ui.js';
import { advanceWeek } from './calendar.js';

// --- Pantallas ---
const screen1 = document.getElementById('screen-1-name');
const screen2 = document.getElementById('screen-2-stadium');
const screen3 = document.getElementById('screen-3-game');

// --- Botones de Flujo ---
const btnToStadium = document.getElementById('btn-to-stadium');
const stadiumOptions = document.querySelectorAll('.stadium-option');
const btnToGame = document.getElementById('btn-to-game');

// --- Botones del Juego (NUEVOS) ---
const nextWeekButton = document.getElementById('btn-next-week');
const btnUpgradeStadium = document.getElementById('btn-upgrade-stadium');
const inputTicketPrice = document.getElementById('input-ticket-price');


// --- Variable local ---
let selectedStadiumChoice = null;

// --- Funciones de Flujo (No cambian) ---
function goToStadiumScreen() {
    // ... (código igual)
    const clubName = clubNameInput.value;
    if (clubName.trim() === "") {
        alert("Por favor, escribe un nombre para tu club.");
        return;
    }
    state.club = clubName;
    screen1.style.display = "none";
    screen2.style.display = "block";
}

function handleStadiumSelect(event) {
    // ... (código igual)
    selectedStadiumChoice = event.currentTarget.dataset.choice; 
    stadiumOptions.forEach(option => option.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
}

/**
 * PASO 3: Validar el estadio y comenzar el juego (MODIFICADO)
 */
function startGame() {
    if (selectedStadiumChoice === null) {
        alert("Por favor, elige un estadio.");
        return;
    }

    if (selectedStadiumChoice === "propio") {
        state.stadium.name = "El Fortín";
        state.stadium.capacity = 8000;
        state.stadium.costPerWeek = 1500;
        state.stadium.isOwned = true; // <-- ¡NUEVO!
        state.stadium.level = 1;      // <-- ¡NUEVO!
    } else {
        state.stadium.name = "Estadio Nacional (Alquilado)";
        state.stadium.capacity = 35000;
        state.stadium.costPerWeek = 10000;
        state.stadium.isOwned = false; // <-- ¡NUEVO!
        state.stadium.level = 1;       // (No importa, pero lo ponemos)
    }
    
    state.ticketPrice = 15; // Reseteamos por si acaso

    // Cambiar de pantalla
    screen2.style.display = "none";
    screen3.style.display = "block";

    // Pintar la UI
    renderUI();

    // --- ACTIVAR TODOS LOS BOTONES DEL JUEGO ---
    nextWeekButton.addEventListener('click', handleNextWeek);
    btnUpgradeStadium.addEventListener('click', handleUpgradeStadium); // <-- ¡NUEVO!
    inputTicketPrice.addEventListener('change', handleTicketPriceChange); // <-- ¡NUEVO!
}

// --- Funciones del Juego (NUEVAS) ---

/**
 * PASO 4: Loop principal del juego
 */
function handleNextWeek() {
  advanceWeek();
  renderUI();
}

/**
 * (NUEVA) Mejora el estadio
 */
function handleUpgradeStadium() {
    const cost = 50000; // Costo de la mejora (podría ser dinámico)

    // 1. Validaciones
    if (!state.stadium.isOwned) {
        alert("No puedes mejorar un estadio que no es tuyo.");
        return;
    }
    if (state.money < cost) {
        alert("¡No tienes suficiente dinero! Necesitas $" + cost);
        return;
    }

    // 2. Aplicar cambios
    state.money -= cost;
    state.stadium.level++;
    state.stadium.capacity += 5000; // Aumenta la capacidad
    state.stadium.costPerWeek += 1000; // Aumenta el mantenimiento
    
    alert(`¡Felicidades! Has mejorado tu estadio a Nivel ${state.stadium.level}.
    Nueva Capacidad: ${state.stadium.capacity}
    Nuevo Mantenimiento: $${state.stadium.costPerWeek}/semana`);

    // 3. Actualizar la pantalla
    renderUI();
}

/**
 * (NUEVA) Cambia el precio de la entrada
 */
function handleTicketPriceChange(event) {
    const newPrice = parseInt(event.target.value);
    if (newPrice < 1) {
        newPrice = 1;
    }
    
    state.ticketPrice = newPrice;
    console.log("Nuevo precio de entrada fijado en:", state.ticketPrice);
    // No necesitamos llamar a renderUI() porque el input ya cambió,
    // pero lo llamamos por si queremos actualizar otros elementos a futuro.
    renderUI(); 
}


// --- Conexión de Botones Iniciales ---
btnToStadium.addEventListener('click', goToStadiumScreen);
stadiumOptions.forEach(option => {
    option.addEventListener('click', handleStadiumSelect);
});
btnToGame.addEventListener('click', startGame);
