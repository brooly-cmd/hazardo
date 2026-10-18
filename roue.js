/* Hazardo — la roue : dessin, vrai tirage au sort, rotation et annonce du gagnant */
const $ = id => document.getElementById(id);
const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;
// Couleur de chaque part et de son texte (DESIGN.md), puis on recommence au début.
const PARTS = [['#D7263D','#FFFFFF'],['#FFB400','#2A1838'],['#1F6FD1','#FFFFFF'],
               ['#FF8A00','#2A1838'],['#7B3FC4','#FFFFFF'],['#3CC47C','#2A1838']];

/* ---------- Dessin ---------- */
// Les parts, leurs noms et les clous tournent ensemble dans « disque » ; le moyeu, lui, reste immobile.
// Moins de 2 choix : la roue est grise et ne peut pas tourner.
function dessinerRoue(){
  const { nom: NOM_ROUE, choix: CHOIX } = carnet.roue(), n = CHOIX.length, grise = n < 2;
  const svg = $('roue'), R = 100, ns = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs) => { const e = document.createElementNS(ns, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; };
  const pt = (deg, r) => [Math.cos(deg * Math.PI / 180) * r, Math.sin(deg * Math.PI / 180) * r];
  svg.textContent = '';
  svg.setAttribute('aria-label', n ? `La roue ${NOM_ROUE} : ${CHOIX.join(', ')}` : `La roue ${NOM_ROUE} est vide`);
  const disque = el('g', { id: 'disque', transform: `rotate(${angle})` });
  if (n < 2) disque.append(el('circle', { r: R, fill: '#CFC6BE' }));
  CHOIX.forEach((nom, i) => {
    const debut = -90 + i * 360 / n, fin = debut + 360 / n, milieu = debut + 180 / n, [fond, ecrit] = grise ? ['#CFC6BE','#2A1838'] : PARTS[i % 6];
    const [x1, y1] = pt(debut, R), [x2, y2] = pt(fin, R);
    if (!grise) disque.append(el('path', { d: `M0 0L${x1} ${y1}A${R} ${R} 0 0 1 ${x2} ${y2}Z`, fill: fond, stroke: 'var(--texte)', 'stroke-width': 2, 'data-part': i }));
    // Au repos, le texte se lit de gauche à droite : à gauche de la roue, on le retourne.
    const gauche = milieu > 90 && milieu < 270;
    const t = el('text', { transform: `rotate(${gauche ? milieu + 180 : milieu})`, x: gauche ? -90 : 90,
      'text-anchor': gauche ? 'start' : 'end', 'dominant-baseline': 'central', fill: ecrit });
    t.textContent = nom; disque.append(t);
  });
  for (let i = 0; i < 12; i++){ const [x, y] = pt(i * 30 - 90, R);
    disque.append(el('circle', { cx: x, cy: y, r: 4.2, fill: 'var(--accent)', stroke: 'var(--texte)', 'stroke-width': 1.6 })); }
  svg.append(el('circle', { r: R, fill: 'none', stroke: 'var(--texte)', 'stroke-width': 3.5 }), disque);
  svg.append(el('circle', { r: 17, fill: 'var(--fond)', stroke: 'var(--texte)', 'stroke-width': 3.5 }));
  svg.append(el('path', { d: 'M0-9l2.6 5.6 6.1.7-4.5 4.2 1.2 6L0 4.5l-5.4 3 1.2-6-4.5-4.2 6.1-.7z', fill: 'var(--accent)', stroke: 'var(--texte)', 'stroke-width': 1.3, 'stroke-linejoin': 'round' }));
  // Un nom trop long pour sa part est coupé avec « … » (il reste en entier dans le résultat).
  svg.querySelectorAll('text').forEach(t => { const full = t.textContent; let k = full.length;
    while (k > 1 && t.getComputedTextLength() > 64){ t.textContent = full.slice(0, --k) + '…'; } });
  $('nom-roue').textContent = NOM_ROUE;
  tourne.disabled = grise; $('aimant').hidden = grise; $('trop-peu').hidden = !grise; $('modifier').hidden = grise;
}

/* ---------- Le tirage et la rotation ---------- */
let angle = 0; // où en est la roue, en degrés (elle ne revient jamais en arrière)
const tourne = $('tourne');

function tourner(){
  const CHOIX = carnet.roue().choix, n = CHOIX.length, part = 360 / n;
  if (document.body.classList.contains('ca-tourne') || n < 2) return;
  // 1. Le vrai tirage au sort : chaque choix a exactement la même chance.
  const gagnant = Math.floor(Math.random() * n);
  // 2. L'angle où le milieu de la part gagnante arrive pile sous la flèche (en haut).
  const cible = (360 - (gagnant + .5) * part) % 360;
  const depart = angle, tours = reduit ? 2 : 5;
  const arrivee = depart - depart % 360 + tours * 360 + cible;
  const duree = reduit ? 1000 : 4000, t0 = performance.now();
  let partSousFleche = Math.floor(depart / part);
  verrouiller(true);
  // 3. On fait tourner image par image : vite au début, puis ça ralentit jusqu'à l'arrêt.
  function image(t){
    const p = Math.min((t - t0) / duree, 1);
    angle = depart + (arrivee - depart) * (1 - Math.pow(1 - p, 4));
    $('disque').setAttribute('transform', `rotate(${angle})`);
    const k = Math.floor(angle / part);
    if (k !== partSousFleche){ partSousFleche = k; pop(); }
    if (p < 1) requestAnimationFrame(image);
    else { angle = arrivee % 360; verrouiller(false); montrerResultat(CHOIX[gagnant]); }
  }
  requestAnimationFrame(image);
}

// Pendant que ça tourne, on ne peut rien toucher d'autre.
function verrouiller(on){
  document.body.classList.toggle('ca-tourne', on);
  tourne.disabled = on; $('jn').disabled = on; $('modifier').disabled = on;
  tourne.textContent = on ? 'Ça tourne…' : 'Tourne !';
}

/* ---------- Écran Résultat ---------- */
const resultat = $('ecran-resultat');
function montrerResultat(nom){
  const g = $('gagnant'); g.textContent = '';
  [...(nom + ' !')].forEach(c => { const s = document.createElement('span'); s.textContent = c; g.append(s); });
  resultat.hidden = false;
  annonce(); confettis();
  $('encore').focus();
}
function fermerResultat(){ resultat.hidden = true; tourne.focus(); }

tourne.addEventListener('click', tourner);
$('encore').addEventListener('click', () => { fermerResultat(); tourner(); });
$('merci').addEventListener('click', fermerResultat);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !resultat.hidden) fermerResultat(); });

dessinerRoue();
document.fonts && document.fonts.ready.then(dessinerRoue);
