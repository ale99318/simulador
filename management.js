// management.js
import { state } from './core.js';
import { renderUI } from './ui.js';

/**
 * Mejora el estadio
 */
export function upgradeStadium() {
    const cost = 50000; 
    if (!state.stadium.isOwned) {
        alert("No puedes mejorar un estadio que no es tuyo.");
        return;
    }
    if (state.money < cost) {
        alert("¡No tienes suficiente dinero! Necesitas $" + cost);
        return;
    }
    state.money -= cost;
    state.stadium.level++;
    state.stadium.capacity += 5000; 
    state.stadium.costPerWeek += 1000; 
    
    alert(`¡Felicidades! Has mejorado tu estadio a Nivel ${state.stadium.level}.
    Nueva Capacidad: ${state.stadium.capacity}
    Nuevo Mantenimiento: $${state.stadium.costPerWeek}/semana`);
    renderUI();
}

/**
 * Cambia el precio de la entrada
 */
export function setTicketPrice(event) {
    let newPrice = parseInt(event.target.value);
    if (newPrice < 1 || isNaN(newPrice)) {
        newPrice = 1;
    }
    
    state.ticketPrice = newPrice;
    console.log("Nuevo precio de entrada fijado en:", state.ticketPrice);
    renderUI(); 
}
