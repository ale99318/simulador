// ui.js
import { state } from './core.js'; 
// ¡NUEVO! Importamos la lista de entrenadores
import { getAvailableCoaches } from './staff.js';

// --- IDs de los KPIs ---
const elClubName = document.getElementById('display-club-name');
const elWeek = document.getElementById('display-week');
const elSeason = document.getElementById('display-season');
const elMoney = document.getElementById('display-money');
const elMorale = document.getElementById('display-morale');

// --- IDs del Estadio ---
const elStadiumName = document.getElementById('display-stadium-name');
const elStadiumLevel = document.getElementById('display-stadium-level');
const elStadiumCapacity = document.getElementById('display-stadium-capacity');

// --- IDs de Gestión ---
const elStadiumControls = document.getElementById('stadium-management-controls');
const elTicketPriceInput = document.getElementById('input-ticket-price');

// --- (NUEVO) IDs de Gestión Deportiva ---
const elCoachName = document.getElementById('display-coach-name');
const elCoachSalary = document.getElementById('display-coach-salary');
const coachModal = document.getElementById('screen-5-coach');
const coachListContainer = document.getElementById('coach-list-container');


/**
 * Función que actualiza TODOS los valores en pantalla (KPIs)
 */
export function renderUI() {
  // KPIs
  elClubName.textContent = state.club; 
  elWeek.textContent = state.week;
  elSeason.textContent = state.season;
  elMoney.textContent = state.money;
  elMorale.textContent = state.morale;
  
  // Estadio
  elStadiumName.textContent = state.stadium.name;
  elStadiumLevel.textContent = state.stadium.level;
  elStadiumCapacity.textContent = state.stadium.capacity;

  // Gestión
  elTicketPriceInput.value = state.ticketPrice;
  
  // (NUEVO) Gestión Deportiva
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
 * Muestra la pantalla de Game Over y oculta el juego.
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


// --- (NUEVAS FUNCIONES) Para el Modal de Entrenadores ---

/**
 * Muestra el modal de entrenadores y genera la lista
 */
export function openCoachModal() {
    if (coachModal) {
        renderCoachList(); // Crea la lista de entrenadores
        coachModal.style.display = 'flex'; // Muestra el modal
    }
}

/**
 * Oculta el modal de entrenadores
 */
export function closeCoachModal() {
    if (coachModal) {
        coachModal.style.display = 'none'; // Oculta el modal
        coachListContainer.innerHTML = ""; // Limpia la lista para la próxima vez
    }
}

/**
 * Lee los entrenadores de staff.js y los "pinta" en el HTML
 */
function renderCoachList() {
    const coaches = getAvailableCoaches();
    coachListContainer.innerHTML = ""; // Limpia la lista

    coaches.forEach(coach => {
        // Creamos un nuevo div por cada entrenador
        const coachDiv = document.createElement('div');
        coachDiv.className = 'coach-option';
        // Añadimos un 'data-id' para saber en quién se hizo clic
        coachDiv.dataset.id = coach.id; 
        
        coachDiv.innerHTML = `
            <strong>${coach.name}</strong>
            <ul>
                <li>Formación: ${coach.formation}</li>
                <li>Salario: $${coach.salary} / semana</li>
            </ul>
        `;
        
        // ¡Importante! Esto es temporal.
        // Hacemos que el clic en el entrenador llame a una función
        // que AÚN NO HEMOS CREADO en management.js
        // Por ahora, solo mostrará un alert.
        coachDiv.addEventListener('click', () => {
            alert(`¡Contratar a ${coach.name}! (Lógica pendiente en management.js)`);
            // Aquí es donde llamaremos a 'hireCoach(coach.id)'
        });

        coachListContainer.appendChild(coachDiv);
    });
}
