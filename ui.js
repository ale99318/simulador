// ui.js
import { state } from './core.js'; 
import { getAvailableCoaches } from './staff.js';
import { resolveEventEffect } from './events.js';

// --- IDs de los KPIs (COMPLETO, SIN ABREVIAR) ---
const elClubName = document.getElementById('display-club-name');
const elWeek = document.getElementById('display-week');
const elSeason = document.getElementById('display-season'); // <-- ESTA LÍNEA FALTABA
const elMoney = document.getElementById('display-money');
const elMorale = document.getElementById('display-morale');

// --- IDs del Estadio ---
const elStadiumName = document.getElementById('display-stadium-name');
const elStadiumLevel = document.getElementById('display-stadium-level');
const elStadiumCapacity = document.getElementById('display-stadium-capacity');
const elStadiumControls = document.getElementById('stadium-management-controls');
const elTicketPriceInput = document.getElementById('input-ticket-price');

// --- IDs de Gestión Deportiva ---
const elCoachName = document.getElementById('display-coach-name');
const elCoachSalary = document.getElementById('display-coach-salary');
const coachModal = document.getElementById('screen-5-coach');
const coachListContainer = document.getElementById('coach-list-container');

// --- IDs del Modal de Eventos ---
const eventModal = document.getElementById('screen-6-event');
const eventTitle = document.getElementById('event-title');
const eventQuestion = document.getElementById('event-question');
const eventOptionsContainer = document.getElementById('event-options-container');


/**
 * Función que actualiza TODOS los valores en pantalla (KPIs)
 */
export function renderUI() {
  // KPIs
  elClubName.textContent = state.club; 
  elWeek.textContent = state.week;
  elSeason.textContent = state.season; // <-- Esta es la línea 42 que daba el error
  elMoney.textContent = state.money;
  elMorale.textContent = state.morale;
  
  // Estadio
  elStadiumName.textContent = state.stadium.name;
  elStadiumLevel.textContent = state.stadium.level;
  elStadiumCapacity.textContent = state.stadium.capacity;

  // Gestión
  elTicketPriceInput.value = state.ticketPrice;
  
  // Gestión Deportiva
  elCoachName.textContent = state.coach.name;
  elCoachSalary.textContent = state.coach.salary;

  // Lógica condicional del Estadio
  if (state.stadium.isOwned) {
    elStadiumControls.style.display = 'block';
  } else {
    elStadiumControls.style.display = 'none';
  }
}

/**
 * Muestra la pantalla de Game Over (Sin cambios)
 */
export function showGameOverScreen() {
    const screen3 = document.getElementById('screen-3-game');
    const screen4 = document.getElementById('screen-4-gameover');

    if (screen3 && screen4) {
        screen3.style.display = 'none';
        screen4.style.display = 'block';
    } else {
        console.error("No se encontraron las pantallas 'screen-3-game' o 'screen-4-gameover'");
    }
}


// --- Funciones del Modal de Entrenadores (Sin cambios) ---

export function openCoachModal() {
    if (coachModal) {
        renderCoachList(); 
        coachModal.style.display = 'flex';
    }
}

export function closeCoachModal() {
    if (coachModal) {
        coachModal.style.display = 'none';
        coachListContainer.innerHTML = "";
    }
}

function renderCoachList() {
    const coaches = getAvailableCoaches();
    coachListContainer.innerHTML = ""; 

    coaches.forEach(coach => {
        const coachDiv = document.createElement('div');
        coachDiv.className = 'coach-option';
        coachDiv.dataset.id = coach.id; 
        
        coachDiv.innerHTML = `
            <strong>${coach.name}</strong>
            <ul>
                <li>Formación: ${coach.formation}</li>
                <li>Salario: $${coach.salary} / semana</li>
            </ul>
        `;
        
        coachListContainer.appendChild(coachDiv);
    });
}


// --- (NUEVAS FUNCIONES) Para el Modal de Eventos ---

/**
 * Muestra el modal de eventos y "pinta" la pregunta/respuestas.
 * Recibe un objeto de evento (de events.js)
 */
export function showEventModal(event) {
    if (!eventModal) return;

    // 1. "Pintar" el título y la pregunta
    eventTitle.textContent = event.title;
    eventQuestion.textContent = event.question;
    eventOptionsContainer.innerHTML = ""; // Limpiar opciones anteriores

    // 2. "Pintar" las opciones de respuesta
    event.options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'event-option';
        optionDiv.textContent = option.text;
        
        // 3. Añadir el listener
        optionDiv.addEventListener('click', () => {
            // Aplicar el efecto de la respuesta (subir moral, etc.)
            resolveEventEffect(option.effect);
            // Cerrar este modal
            closeEventModal();
        });
        
        eventOptionsContainer.appendChild(optionDiv);
    });

    // 4. Mostrar el modal de evento
    eventModal.style.display = 'flex';
}

/**
 * Oculta el modal de eventos
 */
export function closeEventModal() {
    if (eventModal) {
        eventModal.style.display = 'none';
        eventOptionsContainer.innerHTML = ""; // Limpiar
    }
}
