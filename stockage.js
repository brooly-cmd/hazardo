/* Hazardo — le carnet : les roues gardées dans le navigateur (localStorage), sur cet appareil seulement */
const CLE = 'hazardo';
// Au tout premier lancement : une roue « Repas » avec 6 choix.
const DEPART = { roues: [{ nom: 'Repas', choix: ['Pizza','Sushi','Burger','Pâtes','Salade','Tacos'] }], active: 0 };

const carnet = (() => {
  let etat;
  try { etat = JSON.parse(localStorage.getItem(CLE)); } catch (e) { etat = null; }
  // Carnet absent ou abîmé : on repart de la roue de départ.
  if (!etat || !Array.isArray(etat.roues) || !etat.roues[etat.active]) etat = structuredClone(DEPART);
  // Si le navigateur refuse d'écrire (navigation privée, mémoire pleine), l'app marche quand même jusqu'à la fermeture.
  const sauver = () => { try { localStorage.setItem(CLE, JSON.stringify(etat)); } catch (e) {} };
  return {
    sauver,
    roue: () => etat.roues[etat.active],
    roues: () => etat.roues,
    active: () => etat.active,
    choisir(i){ etat.active = i; sauver(); },
    // Une nouvelle roue est créée vide et devient la roue active.
    creer(nom){ etat.active = etat.roues.push({ nom, choix: [] }) - 1; sauver(); },
    renommer(i, nom){ etat.roues[i].nom = nom; sauver(); },
    // Il reste toujours au moins une roue.
    supprimer(i){
      if (etat.roues.length < 2) return;
      etat.roues.splice(i, 1);
      if (etat.active >= i && etat.active > 0) etat.active--;
      sauver();
    }
  };
})();
