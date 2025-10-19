// core.js
export const state = {
  week: 1,
  season: 1,
  money: 10000,
  morale: 75,
  reputation: 40,
  club: "",
  
  // --- NUEVO ESTADO ---
  // Guardaremos la info del estadio aquí
  stadium: {
    name: "",
    capacity: 0,
    costPerWeek: 0,


    // ¡NUEVO!
  coach: {
    name: "Ninguno",
    style: "N/A",
    salary: 0
  
  }
  
};
