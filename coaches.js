// coaches.js
import { state } from './core.js';
import { getAvailableCoaches } from './staff.js';
import { getCoachPresentationEvent } from './events.js';

export function hireCoach(coachId) {
    console.log("🎯 Intentando contratar entrenador con ID:", coachId);
    
    const coaches = getAvailableCoaches();
    const newCoach = coaches.find(coach => coach.id === coachId);
    
    if (!newCoach) {
        console.error("❌ No se encontró el entrenador con ID:", coachId);
        return;
    }
    
    console.log("✅ Entrenador encontrado:", newCoach.name);
    
    state.coach.name = newCoach.name;
    state.coach.style = newCoach.formation;
    state.coach.salary = newCoach.salary;
    
    console.log("📝 Estado actualizado:", state.coach);
    
    // Retornar datos para que ui.js los maneje
    return {
        coach: newCoach,
        presentationEvent: getCoachPresentationEvent()
    };
}
