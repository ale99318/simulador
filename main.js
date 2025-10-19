// main.js
import { state } from './core.js';
import { renderUI } from './ui.js';
import { advanceWeek } from './calendar.js';

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM cargado. Inicializando juego...");
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
        console.log("Botón 'Siguiente' presionado");
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
        console.log("Mostrando Pantalla 2 (Estadio)");
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
        console.log("Botón 'Comenzar Carrera' presionado");
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

        // Cambiar de pantalla
        screen2.style.display = "none";
        screen3.style.display = "block";
        console.log("Mostrando Pantalla 3 (Juego)");

        // "Pintar" la interfaz del juego por primera vez
        renderUI();

        // --- ACTIVAR TODOS LOS BOTONES DEL JUEGO ---
        nextWeekButton.addEventListener('click', handleNextWeek);
        btnUpgradeStadium.addEventListener('click', handleUpgradeStadium);
        inputTicketPrice.addEventListener('change', handleTicketPriceChange);
    }

    // --- Funciones del Juego ---

    /**
     * PASO 4: Loop principal del juego
     */
    function handleNextWeek() {
        console.log("Avanzando semana...");
        advanceWeek();
        renderUI();
    }

    /**
     * Mejora el estadio
     */
    function handleUpgradeStadium() {
        const cost = 50000; 

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
        state.stadium.capacity += 5000; 
        state.stadium.costPerWeek += 1000; 
        
        alert(`¡Felicidades! Has mejorado tu estadio a Nivel ${state.stadium.level}.
        Nueva Capacidad: ${state.stadium.capacity}
        Nuevo Mantenimiento: $${state.stadium.costPerWeek}/semana`);

        // 3. Actualizar la pantalla
        renderUI();
    }

    /**
     * Cambia el precio de la entrada
     */
    function handleTicketPriceChange(event) {
        let newPrice = parseInt(event.target.value);
        if (newPrice < 1 || isNaN(newPrice)) {
            newPrice = 1;
        }
        
        state.ticketPrice = newPrice;
        console.log("Nuevo precio de entrada fijado en:", state.ticketPrice);
        renderUI(); 
    }

    // --- Conexión de Botones Iniciales ---
    console.log("Conectando botones...");
    try {
        if (btnToStadium) {
            btnToStadium.addEventListener('click', goToStadiumScreen);
            console.log("✅ Botón 'Siguiente' conectado.");
        } else {
            console.error("❌ No se encontró el botón 'btn-to-stadium'");
        }
        
        if (stadiumOptions.length > 0) {
            stadiumOptions.forEach(option => {
                option.addEventListener('click', handleStadiumSelect);
            });
            console.log("✅ Opciones de estadio conectadas.");
        } else {
            console.error("❌ No se encontraron opciones de estadio");
        }
        
        if (btnToGame) {
            btnToGame.addEventListener('click', startGame);
            console.log("✅ Botón 'Comenzar Carrera' conectado.");
        } else {
            console.error("❌ No se encontró el botón 'btn-to-game'");
        }
        
        console.log("🎮 Todos los botones de flujo conectados correctamente.");
    } catch (e) {
        console.error("¡ERROR FATAL al conectar botones de flujo!");
        console.error(e);
    }
}
