// ui.js
import { state } from './core.js'; 

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

  // Lógica condicional: Muestra los controles del estadio SOLO si es propio
  if (state.stadium.isOwned) {
    elStadiumControls.style.display = 'block';
  } else {
    elStadiumControls.style.display = 'none';
  }
}

/**
 * (NUEVA FUNCIÓN)
 * Muestra la pantalla de Game Over y oculta el juego.
 */
export function showGameOverScreen() {
    // Busca las pantallas 3 (juego) y 4 (game over)
    const screen3 = document.getElementById('screen-3-game');
    const screen4 = document.getElementById('screen-4-gameover');

    if (screen3 && screen4) {
        // Oculta el juego
        screen3.style.display = 'none';
        // Muestra la pantalla de Game Over
        screen4.style.display = 'block';
    } else {
        console.error("No se encontraron las pantallas 'screen-3-game' o 'screen-4-gameover'");
    }
}
