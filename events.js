// events.js
import { state } from './core.js';
import { renderUI } from './ui.js';

// Esta función se encarga de aplicar el efecto de la respuesta elegida
export function resolveEventEffect(effect) {
  if (!effect) return;

  if (effect.morale) {
    state.morale += effect.morale;
    console.log(`Efecto de evento: Moral cambia en ${effect.morale}`);
  }
  if (effect.reputation) {
    state.reputation += effect.reputation;
    console.log(`Efecto de evento: Reputación cambia en ${effect.reputation}`);
  }
  
  // Actualizamos la UI para ver los cambios
  renderUI();
}


// --- Definiciones de Eventos ---

// Devuelve el objeto del evento "Presentación de Entrenador"
export function getCoachPresentationEvent() {
  const coachName = state.coach.name; // Leemos el nombre del DT ya contratado

  return {
    id: 'EVT_COACH_HIRE',
    title: 'Rueda de Prensa',
    // Usamos el nombre del DT en la pregunta
    question: `Un periodista te pregunta: "Acabas de contratar a ${coachName}. ¿Qué esperas de él esta temporada?"`,
    
    // Las 3 opciones de respuesta
    options: [
      {
        text: '"Confiamos en su proceso. No hay presión, vamos partido a partido."',
        // Efecto: Sube la moral (el DT se siente apoyado)
        effect: { morale: 10, reputation: -2 } 
      },
      {
        text: '"El objetivo es claro: queremos pelear el campeonato este año."',
        // Efecto: Sube la reputación (suenas ambicioso), pero baja la moral (presión)
        effect: { morale: -5, reputation: 10 }
      },
      {
        text: '"Es una apuesta arriesgada, pero esperamos que funcione. Veremos..."',
        // Efecto: Te ves mal y presionas al DT
        effect: { morale: -10, reputation: -5 }
      }
    ]
  };
}
