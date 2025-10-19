// ui.js
import { state } from './core.js'; 

// IDs del HTML
const elClubName = document.getElementById('display-club-name');
const elWeek = document.getElementById('display-week');
const elSeason = document.getElementById('display-season');
const elMoney = document.getElementById('display-money');
const elMorale = document.getElementById('display-morale');

// --- NUEVOS IDs ---
const elStadiumName = document.getElementById('display-stadium-name');
const elStadiumCapacity = document.getElementById('display-stadium-capacity');

// Función que actualiza TODOS los valores en pantalla
export function renderUI() {
  elClubName.textContent = state.club; 
  elWeek.textContent = state.week;
  elSeason.textContent = state.season;
  elMoney.textContent = state.money;
  elMorale.textContent = state.morale;
  
  // --- NUEVAS LÍNEAS ---
  // Actualizamos la info del estadio
  elStadiumName.textContent = state.stadium.name;
  elStadiumCapacity.textContent = state.stadium.capacity;
}
