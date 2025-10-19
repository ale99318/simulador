// calendar.js
import { state } from './core.js'; 

export function advanceWeek() {
  state.week++;

  // --- LÓGICA MODIFICADA ---
  const stadiumCost = state.stadium.costPerWeek;
  const coachCost = state.coach.salary; // ¡NUEVO!
  const totalCosts = stadiumCost + coachCost;

  state.money -= totalCosts; 
  state.morale--;     

  if (state.week > 52) {
    state.week = 1;
    state.season++;
  }

  console.log(`Semana ${state.week}. Costos: ${totalCosts}. Dinero: ${state.money}`);
}
