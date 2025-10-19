// main.js
import { state } from './core.js';
import { renderUI } from './ui.js';
import { advanceWeek } from './calendar.js';
// ¡NUEVO! Importamos nuestras nuevas funciones
import { upgradeStadium, setTicketPrice } from './management.js';

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    initGame();
});

function initGame() {
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
    const btnUpgradeStadium = document.getElementById('btn-upgrade-stadium');
    const inputTicketPrice = document.getElementById('input-ticket-price');

    // --- Variable local para guardar la elección ---
    let selectedStadiumChoice = null;

    // --- Lógica del Flujo ---

    /**
     * PASO 1: Validar el nombre y pasar a la pantalla de estadio
     */
    function goToStadiumScreen() {
        const clubName = clubNameInput.value;

        if (clubName.trim() === "") {
            alert("Por favor, escribe un nombre para tu club.");
            return;
        }

        state.club = clubName;
        screen1.style.display = "none";
        screen2.style.display = "block";
    }

    /**
     * PASO 2: Manejar el clic en una opción de estadio
     */
    function handleStadiumSelect(event) {
        selectedStadiumChoice = event.currentTarget.dataset.choice;
        stadiumOptions.forEach(option => {
            option.classList.remove('selected');
        });
        event.currentTarget.classList.add('selected');
    }

    /**
     * PASO 3: Validar el estadio y comenzar el juego
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
            state.stadium.isOwned = true; 
            state.stadium.level = 1;
        } else {
            state.stadium.name = "Estadio Nacional (Alquilado)";
            state.stadium.capacity = 35000;
            state.stadium.costPerWeek = 10000;
            state.stadium.isOwned = false;
            state.stadium.level = 1; 
        }
        
        state.ticketPrice = 15; 

        screen2.style.display = "none";
        screen3.style.display = "block";

        renderUI();

        // --- ACTIVAR TODOS LOS BOTONES DEL JUEGO ---
        // ¡MIRA QUÉ LIMPIO QUEDÓ ESTO!
        // main.js solo "conecta" el botón con la función importada.
        nextWeekButton.addEventListener('click', handleNextWeek);
        btnUpgradeStadium.addEventListener('click', upgradeStadium); // <-- CAMBIADO
        inputTicketPrice.addEventListener('change', setTicketPrice); // <-- CAMBIADO
    }

    // --- Funciones del Juego ---

    /**
     * PASO 4: Loop principal del juego
     */
    function handleNextWeek() {
        advanceWeek();
        renderUI();
    }

    // --- ¡YA NO ESTÁN LAS FUNCIONES GRANDES AQUÍ! ---
    // La lógica de 'handleUpgradeStadium' y 'handleTicketPriceChange'
    // fue movida a management.js

    // --- Conexión de Botones Iniciales ---
    try {
        btnToStadium.addEventListener('click', goToStadiumScreen);
        stadiumOptions.forEach(option => {
            option.addEventListener('click', handleStadiumSelect);
        });
        btnToGame.addEventListener('click', startGame);
    } catch (e) {
        console.error("¡ERROR FATAL al conectar botones de flujo!");
        console.error(e);
    }
}
