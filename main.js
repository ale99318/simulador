// main.js
import { state } from './core.js';
// MODIFICADO: Importamos las nuevas funciones del modal
import { renderUI, showGameOverScreen, openCoachModal, closeCoachModal } from './ui.js'; 
import { advanceWeek } from './calendar.js';
// MODIFICADO: Importamos las nuevas funciones de management
import { upgradeStadium, setTicketPrice, initializeCoachListeners } from './management.js'; 
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

    // --- Inputs y Botones de Flujo ---
    const clubNameInput = document.getElementById('club-name-input');
    const btnToStadium = document.getElementById('btn-to-stadium');
    const stadiumOptions = document.querySelectorAll('.stadium-option');
    const btnToGame = document.getElementById('btn-to-game');

    // --- Botones del Juego ---
    const nextWeekButton = document.getElementById('btn-next-week');
    const btnUpgradeStadium = document.getElementById('btn-upgrade-stadium');
    const inputTicketPrice = document.getElementById('input-ticket-price');
    
    // --- Botón de Game Over ---
    const btnRestart = document.getElementById('btn-restart');
    
    // --- (NUEVO) Botones del Modal de Entrenadores ---
    const btnOpenCoachModal = document.getElementById('btn-open-coach-modal');
    const btnCloseCoachModal = document.getElementById('btn-close-coach-modal');

    // --- Variable local ---
    let selectedStadiumChoice = null;
    isGameOver = false;

    // --- Lógica de Flujo (sin cambios) ---
    const goToStadiumScreen = () => {
        const clubName = clubNameInput.value;
        if (clubName.trim() === "") {
            alert("Por favor, escribe un nombre para tu club."); 
            return;
        }
        state.club = clubName;
        screen1.style.display = "none";
        screen2.style.display = "block";
    };

    const handleStadiumSelect = (event) => {
        selectedStadiumChoice = event.currentTarget.dataset.choice;
        stadiumOptions.forEach(option => option.classList.remove('selected'));
        event.currentTarget.classList.add('selected');
    };

    const startGame = () => {
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
        
        // Conectar botones del juego
        nextWeekButton.addEventListener('click', handleNextWeek);
        btnUpgradeStadium.addEventListener('click', upgradeStadium);
        inputTicketPrice.addEventListener('change', setTicketPrice);
    };

    // --- Funciones del Juego (sin cambios) ---
    const handleNextWeek = () => {
        if (isGameOver) return; 
        advanceWeek();
        renderUI();
        
        if (checkBankruptcy()) {
            isGameOver = true;
            showGameOverScreen();
        }
    };

    const handleRestart = () => {
        location.reload();
    };
    
    // --- (NUEVA FUNCIÓN) Lógica para abrir el modal ---
    const handleOpenCoachModal = () => {
        // 1. Llama a ui.js para mostrar el modal y pintar la lista
        openCoachModal();
        // 2. Llama a management.js para dar "vida" a los botones de esa lista
        initializeCoachListeners(); 
    };

    // --- Conexión de Botones (MODIFICADO) ---
    try {
        // Flujo inicial
        btnToStadium.addEventListener('click', goToStadiumScreen);
        stadiumOptions.forEach(option => {
            option.addEventListener('click', handleStadiumSelect);
        });
        btnToGame.addEventListener('click', startGame);
        
        // Game Over
        btnRestart.addEventListener('click', handleRestart);
        
        // (NUEVO) Conexiones del Modal de Entrenadores
        btnOpenCoachModal.addEventListener('click', handleOpenCoachModal);
        btnCloseCoachModal.addEventListener('click', closeCoachModal);
        
    } catch (e) {
        console.error("¡ERROR FATAL al conectar botones!");
        console.error(e);
    }
}
