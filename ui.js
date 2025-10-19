// ui.js
import { state } from './core.js'; // Importa el estado

// IDs del HTML
const elClubName = document.getElementById('display-club-name');
const elWeek = document.getElementById('display-week');
const elSeason = document.getElementById('display-season');
const elMoney = document.getElementById('display-money');
const elMorale = document.getElementById('display-morale');

// Función que actualiza TODOS los valores en pantalla
export function renderUI() {
  // ¡Nueva línea! Actualiza el nombre del club
  elClubName.textContent = state.club; 
  
  elWeek.textContent = state.week;
  elSeason.textContent = state.season;
  elMoney.textContent = state.money;
  elMorale.textContent = state.morale;
}
