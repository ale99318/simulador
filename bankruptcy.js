// bankruptcy.js
import { state } from './core.js';

// Límite de deuda. Si debes más que esto, estás fuera.
const BANKRUPTCY_LIMIT = -20000;

/**
 * Revisa el estado financiero del club.
 * Devuelve 'true' si el club está en quiebra.
 * Devuelve 'false' si todo está bien.
 */
export function checkBankruptcy() {
  if (state.money < BANKRUPTCY_LIMIT) {
    console.error(`¡BANCARROTA! Has caído por debajo de $${BANKRUPTCY_LIMIT}.`);
    return true; // ¡Quiebra!
  }
  return false; // Todavía no
}
