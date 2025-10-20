// ui.js
import { state } from './core.js'; 
import { getAvailableCoaches } from './staff.js';
import { resolveEventEffect } from './events.js';

/**
 * Función que actualiza TODOS los valores en pantalla (KPIs)
 */
export function renderUI() {
  // Obtener elementos cada vez que se llama (para evitar problemas de timing)
  const elClubName = document.getElementById('display-club-name');
  const elWeek = document.getElementById('display-week');
  const elSeason = document.getElementById('display-season');
  const elMoney = document.getElementById('display-money');
  const elMorale = document.getElementById('display-morale');
  const elStadiumName = document.getElementById('display-stadium-name');
  const elStadiumLevel = document.getElementById('display-stadium-level');
  const elStadiumCapacity = document.getElementById('display-stadium-capacity');
  const elStadiumControls = document.getElementById('stadium-management-controls');
  const elTicketPriceInput = document.getElementById('input-ticket-price');
  const elCoachName = document.getElementById('display-coach-name');
  const elCoachSalary = document.getElementById('display-coach-salary');

  // KPIs
  if (elClubName) elClubName.textContent = state.club;
  if (elWeek) elWeek.textContent = state.week;
  if (elSeason) elSeason.textContent = state.season;
  if (elMoney) elMoney.textContent = state.money;
  if (elMorale) elMorale.textContent = state.morale;
  
  // Estadio
  if (elStadiumName) elStadiumName.textContent = state.stadium.name;
  if (elStadiumLevel) elStadiumLevel.textContent = state.stadium.level;
  if (elStadiumCapacity) elStadiumCapacity.textContent = state.stadium.capacity;

  // Gestión
  if (elTicketPriceInput) elTicketPriceInput.value = state.ticketPrice;
  
  // Gestión Deportiva
  if (elCoachName) elCoachName.textContent = state.coach.name;
  if (elCoachSalary) elCoachSalary.textContent = state.coach.salary;

  // Lógica condicional del Estadio
  if (elStadiumControls) {
    if (state.stadium.isOwned) {
      elStadiumControls.style.display = 'block';
    } else {
      elStadiumControls.style.display = 'none';
    }
  }
}

/**
 * Muestra la pantalla de Game Over
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

// --- Funciones del Modal de Entrenadores ---

export function openCoachModal() {
    const coachModal = document.getElementById('screen-5-coach');
    if (coachModal) {
        renderCoachList(); 
        coachModal.style.display = 'flex';
    }
}

export function closeCoachModal() {
    const coachModal = document.getElementById('screen-5-coach');
    if (coachModal) {
        coachModal.style.display = 'none';
        const coachListContainer = document.getElementById('coach-list-container');
        if (coachListContainer) coachListContainer.innerHTML = "";
    }
}

function renderCoachList() {
    const coaches = getAvailableCoaches();
    const coachListContainer = document.getElementById('coach-list-container');
    if (!coachListContainer) return;
    
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

// --- Funciones del Modal de Eventos ---

/**
 * Muestra el modal de eventos y "pinta" la pregunta/respuestas.
 * Recibe un objeto de evento (de events.js)
 */
export function showEventModal(event) {
    const eventModal = document.getElementById('screen-6-event');
    if (!eventModal) return;

    const eventTitle = document.getElementById('event-title');
    const eventQuestion = document.getElementById('event-question');
    const eventOptionsContainer = document.getElementById('event-options-container');

    // 1. "Pintar" el título y la pregunta
    if (eventTitle) eventTitle.textContent = event.title;
    if (eventQuestion) eventQuestion.textContent = event.question;
    if (eventOptionsContainer) eventOptionsContainer.innerHTML = "";

    // 2. "Pintar" las opciones de respuesta
    if (eventOptionsContainer) {
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
    }

    // 4. Mostrar el modal de evento
    eventModal.style.display = 'flex';
}

/**
 * Oculta el modal de eventos
 */
export function closeEventModal() {
    const eventModal = document.getElementById('screen-6-event');
    const eventOptionsContainer = document.getElementById('event-options-container');
    
    if (eventModal) {
        eventModal.style.display = 'none';
    }
    if (eventOptionsContainer) {
        eventOptionsContainer.innerHTML = "";
    }
}
