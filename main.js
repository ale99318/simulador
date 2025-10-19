// main.js
import { state } from './core.js';
import { renderUI, showGameOverScreen } from './ui.js';
import { advanceWeek } from './calendar.js';
import { upgradeStadium, setTicketPrice } from './management.js';
import { checkBankruptcy } from './bankruptcy.js';

// Variable para saber si el juego terminó
let isGameOver = false;

document.addEventListener('DOMContentLoaded', () => {
    initGame();
});

function initGame() {
    // --- Pantallas ---
    const screen1 = document.getElementById('screen-1-name');
    const screen2 = document.getElementById('screen-2-stadium');
    const screen3 = document.getElementById('screen-3-game');

    // --- Botones de Flujo ---
    const clubNameInput = document.getElementById('club-name-input'); // <-- ¡CORREGIDO!
    const btnToStadium = document.getElementById('btn-to-stadium');
    const stadiumOptions = document.querySelectorAll('.stadium-option');
    const btnToGame = document.getElementById('btn-to-game');

    // --- Botones del Juego ---
    const nextWeekButton = document.getElementById('btn-next-week');
    const btnUpgradeStadium = document.getElementById('btn-upgrade-stadium');
    const inputTicketPrice = document.getElementById('input-ticket-price');
    
    // --- Botón de Game Over ---
    const btnRestart = document.getElementById('btn-restart');

    // --- Variable local ---
    let selectedStadiumChoice = null;
    isGameOver = false; // Reseteamos el estado del juego

    // --- Lógica de Flujo ---
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

    function handleStadiumSelect(event) {
        selectedStadiumChoice = event.currentTarget.dataset.choice;
        stadiumOptions.forEach(option => option.classList.remove('selected'));
        event.currentTarget.classList.add('selected');
    }

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
        nextWeekButton.addEventListener('click', handleNextWeek);
        btnUpgradeStadium.addEventListener('click', upgradeStadium);
        inputTicketPrice.addEventListener('change', setTicketPrice);
    }

    // --- Funciones del Juego ---

    /**
     * Loop principal del juego
     */
    function handleNextWeek() {
        // Si el juego ya terminó, no hagas nada
        if (isGameOver) return; 

        // 1. Avanza la semana (se pagan costos)
        advanceWeek();
        // 2. Actualiza la pantalla (se muestra el dinero nuevo)
        renderUI();
        
        // 3. Revisa si estamos en quiebra
        if (checkBankruptcy()) {
            isGameOver = true;
            showGameOverScreen(); // Muestra la pantalla de Game Over
        }
    }

    /**
     * Lógica para el botón de reiniciar
     */
    function handleRestart() {
        // La forma más fácil de reiniciar: recargar la página.
        location.reload();
    }

    // --- Conexión de Botones Iniciales ---
    try {
        btnToStadium.addEventListener('click', goToStadiumScreen);
        stadiumOptions.forEach(option => {
            option.addEventListener('click', handleStadiumSelect);
        });
        btnToGame.addEventListener('click', startGame);
        
        // Conectar el botón de reinicio
        btnRestart.addEventListener('click', handleRestart); 
        
    } catch (e) {
        console.error("¡ERROR FATAL al conectar botones!");
        console.error(e);
    }
}
