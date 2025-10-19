// calendar.js
import { state } from './core.js'; 

export function advanceWeek() {
  state.week++;
  
  // --- LÓGICA MODIFICADA ---
  // Ahora el costo semanal es dinámico
  state.money -= state.stadium.costPerWeek; 
  state.morale--;     
  
  if (state.week > 52) {
    state.week = 1;
    state.season++;
  }
  
  console.log(`Semana ${state.week}. Costo Estadio: ${state.stadium.costPerWeek}. Dinero: ${state.money}`);
}
