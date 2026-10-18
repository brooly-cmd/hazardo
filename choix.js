/* Hazardo — l'écran « Modifier les choix » : ajouter, retirer, et tout est noté dans le carnet */
const MAX_CHOIX = 12, MAX_LETTRES = 30;
const liste = $('choix'), champ = $('nouveau'), erreur = $('erreur');
const guillemets = t => `« ${t} »`;
// « pizza » et « Pizza » comptent comme le même choix.
const pareil = (a, b) => a.toLocaleLowerCase('fr') === b.toLocaleLowerCase('fr');

/* ---------- Dessin de la liste ---------- */
// apparition : 'tout' à l'ouverture (9 Apparition, une ligne après l'autre), ou le numéro du choix qui vient d'arriver.
function afficherListe(apparition){
  const { nom, choix } = carnet.roue(), n = choix.length;
  $('titre-liste').textContent = `Les choix de ${guillemets(nom)}`;
  $('compteur').textContent = `${n} choix sur ${MAX_CHOIX}`;
  // Les 12 ampoules du compteur : une allumée par choix, de la couleur de sa part.
  $('ampoules').innerHTML = Array.from({ length: MAX_CHOIX }, (_, i) =>
    i < n ? `<i style="background:${PARTS[i % 6][0]}"></i>` : '<i></i>').join('');
  $('vide').hidden = n > 0;
  liste.classList.toggle('apparait', apparition === 'tout' && !reduit);
  liste.textContent = '';
  choix.forEach((c, i) => {
    const li = document.createElement('li'), pt = document.createElement('span'),
          texte = document.createElement('span'), x = document.createElement('button');
    li.style.setProperty('--i', i);
    if (apparition === i && !reduit) li.className = 'arrive';
    pt.className = 'pt'; pt.style.background = PARTS[i % 6][0];
    texte.className = 'nom'; texte.textContent = c; // textContent : le texte tapé reste du texte, jamais du code
    x.type = 'button'; x.textContent = '✕'; x.title = 'Retirer'; x.setAttribute('aria-label', `Retirer ${c}`); x.dataset.i = i;
    li.append(pt, texte, x); liste.append(li);
  });
}

function direErreur(message){ erreur.textContent = message; champ.setAttribute('aria-invalid', !!message); }

/* ---------- Ajouter (bouton ou touche Entrée) ---------- */
$('ajout').addEventListener('submit', e => {
  e.preventDefault();
  const choix = carnet.roue().choix, texte = champ.value.trim().replace(/\s+/g, ' ');
  const deja = choix.find(c => pareil(c, texte));
  if (!texte) direErreur('Écris quelque chose avant d\'ajouter.');
  else if (choix.length >= MAX_CHOIX) direErreur('12 choix maximum : retire-en un pour en ajouter un autre.');
  else if ([...texte].length > MAX_LETTRES) direErreur('30 caractères maximum.');
  else if (deja) direErreur(`${guillemets(deja)} est déjà sur la roue.`);
  else {
    choix.push(texte); carnet.sauver();
    champ.value = ''; direErreur('');
    afficherListe(choix.length - 1);
  }
  champ.focus(); // le clavier de l'iPhone reste ouvert pour enchaîner
});
champ.addEventListener('input', () => direErreur(''));

/* ---------- Retirer (le bouton ✕ de chaque ligne) ---------- */
liste.addEventListener('click', e => {
  const x = e.target.closest('button[data-i]'); if (!x) return;
  const choix = carnet.roue().choix, i = +x.dataset.i;
  choix.splice(i, 1); carnet.sauver(); direErreur('');
  afficherListe();
  // Le doigt (ou le clavier) retombe sur le ✕ suivant, sinon sur le champ.
  const suivant = liste.querySelectorAll('button[data-i]')[Math.min(i, choix.length - 1)];
  (suivant || champ).focus();
});

/* ---------- Aller et revenir entre les écrans ---------- */
// Un seul écran visible à la fois ; la toile élastique n'est le fond que de l'accueil.
function montrer(id){
  document.querySelectorAll('.ecran').forEach(e => e.hidden = e.id !== id);
  toile.active(id === 'ecran-accueil'); scrollTo(0, 0);
}
function ouvrirListe(){
  montrer('ecran-liste');
  direErreur(''); afficherListe('tout');
  $('titre-liste').focus();
}
function fermerListe(){
  montrer('ecran-accueil');
  dessinerRoue();
  (tourne.disabled ? document.querySelector('#trop-peu button') : tourne).focus();
}
document.querySelectorAll('[data-ouvre-liste]').forEach(b => b.addEventListener('click', ouvrirListe));
$('retour').addEventListener('click', fermerListe);
