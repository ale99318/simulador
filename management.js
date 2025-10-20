// management.js
import { state } from './core.js';
import { renderUI, closeCoachModal, showEventModal } from './ui.js';
import { getAvailableCoaches } from './staff.js';
import { getCoachPresentationEvent } from './events.js';

/**
 * Mejora el estadio
 */
// ¡FÍJATE EN EL 'EXPORT'!
export function upgradeStadium() {
    const cost = 50000; 

    if (!state.stadium.isOwned) {
        alert("No puedes mejorar un estadio que no es tuyo.");
        return;
    }
    if (state.money < cost) {
        alert("¡No tienes suficiente dinero! Necesitas $" + cost);
        return;
    }

    state.money -= cost;
    state.stadium.level++;
    state.stadium.capacity += 5000; 
    state.stadium.costPerWeek += 1000; 
    
    alert(`¡Felicidades! Has mejorado tu estadio a Nivel ${state.stadium.level}.
    Nueva Capacidad: ${state.stadium.capacity}
    Nuevo Mantenimiento: $${state.stadium.costPerWeek}/semana`);

    renderUI();
}

/**
 * Cambia el precio de la entrada
 */
// ¡FÍJATE EN EL 'EXPORT'!
export function setTicketPrice(event) {
    let newPrice = parseInt(event.target.value);
    if (newPrice < 1 || isNaN(newPrice)) {
        newPrice = 1;
    }
    
    state.ticketPrice = newPrice;
    console.log("Nuevo precio de entrada fijado en:", state.ticketPrice);
    renderUI(); 
}


// --- Lógica de Entrenadores ---

/**
 * Inicializa los listeners para la lista de entrenadores.
 */
// ¡¡ESTE ES EL 'EXPORT' QUE TE FALTA!!
export function initializeCoachListeners() {
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
 * (Esta función NO se exporta, es privada de este módulo)
 */
function hireCoach(coachId) {
    // 1. Encontrar al entrenador
    const coaches = getAvailableCoaches();
    const newCoach = coaches.find(coach => coach.id === coachId);

    if (!newCoach) {
        console.error("No se encontró el entrenador con ID:", coachId);
        return;
    }
    
    // 2. Actualizar el estado (core.js)
    state.coach.name = newCoach.name;
    state.coach.style = newCoach.formation;
    state.coach.salary = newCoach.salary;
    
    // 3. Actualizar la UI principal
    renderUI();
    
    // 4. Cerrar el modal de contratación
    closeCoachModal();

    // 5. Disparar el evento de la entrevista
    const presentationEvent = getCoachPresentationEvent();
    showEventModal(presentationEvent);
}
