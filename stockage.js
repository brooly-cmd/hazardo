/* Hazardo — le carnet : les roues gardées dans le navigateur (localStorage), sur cet appareil seulement */
const CLE = 'hazardo';
// Au tout premier lancement : une roue « Repas » avec 6 choix.
const DEPART = { roues: [{ nom: 'Repas', choix: ['Pizza','Sushi','Burger','Pâtes','Salade','Tacos'] }], active: 0 };

const carnet = (() => {
  let etat;
  try { etat = JSON.parse(localStorage.getItem(CLE)); } catch (e) { etat = null; }
  // Carnet absent ou abîmé : on repart de la roue de départ.
  if (!etat || !Array.isArray(etat.roues) || !etat.roues[etat.active]) etat = structuredClone(DEPART);
  return {
    roue: () => etat.roues[etat.active],
    // Si le navigateur refuse d'écrire (navigation privée, mémoire pleine), l'app marche quand même jusqu'à la fermeture.
    sauver(){ try { localStorage.setItem(CLE, JSON.stringify(etat)); } catch (e) {} }
  };
})();
