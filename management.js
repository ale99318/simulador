// management.js
import { state } from './core.js';
import { renderUI, closeCoachModal } from './ui.js';
import { getAvailableCoaches } from './staff.js'; // ¡Importante!

/**
 * Mejora el estadio
 */
export function upgradeStadium() {
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
export function setTicketPrice(event) {
    let newPrice = parseInt(event.target.value);
    if (newPrice < 1 || isNaN(newPrice)) {
        newPrice = 1;
    }
    
    state.ticketPrice = newPrice;
    console.log("Nuevo precio de entrada fijado en:", state.ticketPrice);
    renderUI(); 
}


// --- (NUEVAS FUNCIONES) ---

/**
 * Inicializa los listeners para la lista de entrenadores.
 * ui.js "pinta" la lista, esta función les da "vida".
 */
export function initializeCoachListeners() {
    // Busca los botones que "pintó" ui.js
    const coachOptions = document.querySelectorAll('.coach-option');
    
    coachOptions.forEach(option => {
        option.addEventListener('click', () => {
            const coachId = option.dataset.id;
            hireCoach(coachId);
        });
    });
}

/**
 * Contrata un nuevo entrenador basado en su ID.
 */
function hireCoach(coachId) {
    // 1. Encontrar al entrenador en la lista
    const coaches = getAvailableCoaches();
    const newCoach = coaches.find(coach => coach.id === coachId);

    if (!newCoach) {
        console.error("No se encontró el entrenador con ID:", coachId);
        return;
    }
    
    // 2. Despedir al anterior (si hay) y contratar al nuevo
    console.log(`Despidiendo a ${state.coach.name}.`);
    console.log(`Contratando a ${newCoach.name}.`);
    
    // 3. Actualizar el estado (core.js)
    state.coach.name = newCoach.name;
    // 'style' no está en la data de staff.js, usaremos 'name' o 'formation'
    state.coach.style = newCoach.formation; // Guardamos la formación
    state.coach.salary = newCoach.salary;
    
    // 4. Actualizar la UI principal
    renderUI();
    
    // 5. Cerrar el modal
    closeCoachModal();
}
