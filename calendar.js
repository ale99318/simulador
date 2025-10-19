// calendar.js
import { state } from './core.js'; // Importa el estado

export function advanceWeek() {
  state.week++;
  
  // Lógica de prueba simple
  state.money -= 500; // Gastos semanales
  state.morale--;     // La moral baja si no pasa nada
  
  if (state.week > 52) {
    state.week = 1;
    state.season++;
  }
  
  console.log(`Avanzando a la semana ${state.week}. Dinero: ${state.money}`);
}
