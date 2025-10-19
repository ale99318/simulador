// ui.js
import { state } from './core.js'; // Importa el estado

// IDs del HTML
const elWeek = document.getElementById('display-week');
const elSeason = document.getElementById('display-season');
const elMoney = document.getElementById('display-money');
const elMorale = document.getElementById('display-morale');

// Función que actualiza TODOS los valores en pantalla
export function renderUI() {
  elWeek.textContent = state.week;
  elSeason.textContent = state.season;
  elMoney.textContent = state.money;
  elMorale.textContent = state.morale;
}
