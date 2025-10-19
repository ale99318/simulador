// ui.js
import { state } from './core.js'; 

// IDs del HTML
const elClubName = document.getElementById('display-club-name');
const elWeek = document.getElementById('display-week');
// ... (los otros IDs de KPIs) ...
const elMoney = document.getElementById('display-money');
const elMorale = document.getElementById('display-morale');

// IDs del Estadio
const elStadiumName = document.getElementById('display-stadium-name');
const elStadiumLevel = document.getElementById('display-stadium-level'); // (NUEVO)
const elStadiumCapacity = document.getElementById('display-stadium-capacity');

// IDs de Gestión (NUEVOS)
const elStadiumControls = document.getElementById('stadium-management-controls');
const elTicketPriceInput = document.getElementById('input-ticket-price');


export function renderUI() {
  // KPIs
  elClubName.textContent = state.club; 
  elWeek.textContent = state.week;
  elMoney.textContent = state.money;
  elMorale.textContent = state.morale;
  
  // Estadio
  elStadiumName.textContent = state.stadium.name;
  elStadiumLevel.textContent = state.stadium.level; // (NUEVO)
  elStadiumCapacity.textContent = state.stadium.capacity;

  // Gestión (NUEVA LÓGICA)
  elTicketPriceInput.value = state.ticketPrice;

  // Lógica condicional: Muestra los controles del estadio SOLO si es propio
  if (state.stadium.isOwned) {
    elStadiumControls.style.display = 'block';
  } else {
    elStadiumControls.style.display = 'none';
  }
}
