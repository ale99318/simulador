// core.js
export const state = {  // <--- 1. ABRE la caja grande "state"

  week: 1,             // (Contenido de state)
  money: 10000,        // (Contenido de state)
  
  stadium: {           // <--- 2. ABRE la caja pequeña "stadium"
     name: "",
     capacity: 0
  },                   // <--- 2. CIERRA la caja pequeña "stadium"
  
  coach: {             // <--- 3. ABRE la caja pequeña "coach"
    name: "Ninguno",
    style: "N/A",
    salary: 0
  }                    // <--- 3. CIERRA la caja pequeña "coach"

}; // <--- 1. CIERRA la caja grande "state"
   // (El ; que te daba error iba después de esto)
