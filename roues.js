/* Hazardo — l'écran « Mes roues » : choisir, créer, renommer, supprimer une roue */
const MAX_NOM = 20;
const listeRoues = $('roues'), formNouvelle = $('form-nouvelle'), champNouvelle = $('nom-nouvelle'), erreurRoue = $('erreur-roue');
let renomme = null; // le numéro de la roue en train d'être renommée (ou null)
let aSupprimer = null; // le numéro de la roue qu'on propose de supprimer

// Le nom tapé, nettoyé, ou un message d'erreur. « sauf » : la roue qu'on renomme (elle peut garder son nom).
function verifierNom(texte, sauf){
  const nom = texte.trim().replace(/\s+/g, ' ');
  const deja = carnet.roues().find((r, i) => i !== sauf && pareil(r.nom, nom));
  if (!nom) return { erreur: 'Donne un nom à ta roue.' };
  if ([...nom].length > MAX_NOM) return { erreur: '20 caractères maximum.' };
  if (deja) return { erreur: `Tu as déjà une roue ${guillemets(deja.nom)}.` };
  return { nom };
}

// La roue en miniature : un disque avec autant de parts que de choix, dans les couleurs de la grande roue.
function miniRoue(choix){
  const n = choix.length;
  if (n < 2) return '#CFC6BE';
  return `conic-gradient(${choix.map((_, i) => `${PARTS[i % 6][0]} ${i * 360 / n}deg ${(i + 1) * 360 / n}deg`).join(',')})`;
}

/* ---------- Dessin de la liste des roues ---------- */
// apparition : 'tout' à l'ouverture (9 Apparition, un ticket après l'autre), ou le numéro de la roue qui vient de changer.
function afficherRoues(apparition){
  const roues = carnet.roues(), seule = roues.length < 2;
  listeRoues.classList.toggle('apparait', apparition === 'tout' && !reduit);
  listeRoues.textContent = '';
  roues.forEach((r, i) => {
    const li = document.createElement('li'), active = i === carnet.active();
    li.style.setProperty('--i', i);
    li.classList.toggle('active', active);
    if (apparition === i && !reduit) li.classList.add('arrive');
    if (i === renomme){
      // Renommer : le nom devient un champ, directement sur le ticket.
      li.innerHTML = `<form class="ajout" novalidate>
          <input type="text" autocomplete="off" enterkeyhint="done" aria-describedby="erreur-renomme">
          <button class="btn-ajout" type="submit">OK</button></form>
        <p class="erreur" id="erreur-renomme" role="alert"></p>
        <div class="actions"><button type="button" data-annuler>Annuler</button></div>`;
      const champ = li.querySelector('input');
      champ.value = r.nom; champ.setAttribute('aria-label', `Nouveau nom de ${guillemets(r.nom)}`);
    } else {
      li.innerHTML = `<button class="choisir" type="button" data-choisir="${i}">
          <span class="mini"></span><span class="titre"><span class="nom"></span> · <span class="nb"></span></span>
          <span class="coche" aria-hidden="true">✓</span></button>
        <div class="actions"><button type="button" data-renommer="${i}">Renommer</button>
          ${seule ? '' : `<button type="button" data-supprimer="${i}">Supprimer</button>`}</div>`;
      li.querySelector('.mini').style.background = miniRoue(r.choix);
      li.querySelector('.nom').textContent = r.nom; // textContent : le nom tapé reste du texte, jamais du code
      li.querySelector('.nb').textContent = `${r.choix.length} choix`;
      if (active) li.querySelector('.choisir').setAttribute('aria-current', 'true');
    }
    listeRoues.append(li);
  });
  $('seule').hidden = !seule;
}

function direErreurRoue(message){ erreurRoue.textContent = message; champNouvelle.setAttribute('aria-invalid', !!message); }

/* ---------- Ouvrir l'écran ---------- */
function ouvrirRoues(){
  montrer('ecran-roues');
  renomme = null; fermerNouvelle();
  afficherRoues('tout');
  $('titre-roues').focus();
}
$('nom-roue').addEventListener('click', ouvrirRoues);
$('retour-roues').addEventListener('click', fermerListe);

/* ---------- Toucher un ticket : choisir, renommer, supprimer ---------- */
listeRoues.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.choisir){ carnet.choisir(+b.dataset.choisir); fermerListe(); }
  else if (b.dataset.renommer){
    renomme = +b.dataset.renommer; fermerNouvelle(); afficherRoues();
    const champ = listeRoues.querySelector('input'); champ.focus(); champ.select();
  }
  else if (b.dataset.supprimer) demanderSuppression(+b.dataset.supprimer);
  else if ('annuler' in b.dataset){ const i = renomme; renomme = null; afficherRoues(); focusTicket(i); }
});

// Valider le nouveau nom (bouton OK ou touche Entrée).
listeRoues.addEventListener('submit', e => {
  e.preventDefault();
  const champ = e.target.querySelector('input'), { nom, erreur } = verifierNom(champ.value, renomme);
  if (erreur){ $('erreur-renomme').textContent = erreur; champ.setAttribute('aria-invalid', true); champ.focus(); return; }
  const i = renomme; carnet.renommer(i, nom); renomme = null;
  afficherRoues(i); focusTicket(i);
  $('nom-roue-texte').textContent = carnet.roue().nom;
});
listeRoues.addEventListener('input', () => { const p = $('erreur-renomme'); if (p) p.textContent = ''; });

function focusTicket(i){ const b = listeRoues.querySelector(`[data-choisir="${i}"]`); b && b.focus(); }

/* ---------- + Nouvelle roue ---------- */
function fermerNouvelle(){ formNouvelle.hidden = true; $('nouvelle').hidden = false; champNouvelle.value = ''; direErreurRoue(''); }
$('nouvelle').addEventListener('click', () => {
  renomme = null; afficherRoues();
  $('nouvelle').hidden = true; formNouvelle.hidden = false; champNouvelle.focus();
});
formNouvelle.addEventListener('submit', e => {
  e.preventDefault();
  const { nom, erreur } = verifierNom(champNouvelle.value);
  if (erreur){ direErreurRoue(erreur); champNouvelle.focus(); return; }
  // La roue est créée vide, puis on ouvre « Modifier les choix » pour la remplir.
  carnet.creer(nom); fermerNouvelle(); dessinerRoue(); ouvrirListe();
});
champNouvelle.addEventListener('input', () => direErreurRoue(''));

/* ---------- Supprimer, avec confirmation ---------- */
const confirmation = $('ecran-supprimer');
function demanderSuppression(i){
  aSupprimer = i;
  $('question-supprimer').textContent = `Supprimer la roue ${guillemets(carnet.roues()[i].nom)} ? Ses choix seront perdus.`;
  confirmation.hidden = false;
  $('non-supprimer').focus(); // par prudence, le doigt (ou le clavier) tombe sur « Annuler »
}
function fermerConfirmation(){ confirmation.hidden = true; }
$('oui-supprimer').addEventListener('click', () => {
  carnet.supprimer(aSupprimer); fermerConfirmation();
  afficherRoues(); dessinerRoue();
  focusTicket(Math.min(aSupprimer, carnet.roues().length - 1));
});
$('non-supprimer').addEventListener('click', () => { fermerConfirmation(); focusTicket(aSupprimer); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !confirmation.hidden) $('non-supprimer').click(); });

// Sur iPhone, Safari n'affiche l'état « enfoncé » (:active) des boutons que si la page écoute le toucher.
document.addEventListener('touchstart', () => {}, { passive: true });
