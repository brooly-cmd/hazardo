/* Hazardo — les effets choisis dans DESIGN.md (tous coupés si « Réduire les animations » est activé) */
const souris = matchMedia('(hover: hover) and (pointer: fine)').matches;
const tourneEnCours = () => document.body.classList.contains('ca-tourne');
const couleur = nom => getComputedStyle(document.documentElement).getPropertyValue(nom).trim();

/* ---------- 81 Toile élastique (fond de l'accueil) ---------- */
const toile = (() => {
  const cv = $('toile'), ctx = cv.getContext('2d'), PAS = 22, p = { x: -999, y: -999 };
  let W = 0, H = 0, cols = 0, rows = 0, G = [], trait = '', raf = 0;
  function taille(){ const d = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight;
    cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    cols = Math.ceil(W / PAS) + 1; rows = Math.ceil(H / PAS) + 1; G = [];
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) G.push({ ox: i * PAS, oy: j * PAS, x: i * PAS, y: j * PAS, vx: 0, vy: 0 });
    dessin(); }
  function couleurs(){ const hex = couleur('--texte'), n = parseInt(hex.slice(1), 16);
    trait = `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},.22)`; dessin(); }
  function physique(){ let agite = false;
    for (const q of G){ const dx = q.x - p.x, dy = q.y - p.y, d = Math.hypot(dx, dy);
      if (d < 80 && d > 0){ const f = (80 - d) / 80; q.vx += dx / d * f * 3; q.vy += dy / d * f * 3; }
      q.vx += (q.ox - q.x) * .08; q.vy += (q.oy - q.y) * .08; q.vx *= .82; q.vy *= .82; q.x += q.vx; q.y += q.vy;
      if (Math.abs(q.vx) + Math.abs(q.vy) > .02) agite = true; }
    return agite; }
  function dessin(){ ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = trait; ctx.lineWidth = 1; ctx.beginPath();
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++){ const q = G[j * cols + i]; i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y); }
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++){ const q = G[j * cols + i]; j ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y); }
    ctx.stroke();
    G.forEach((q, k) => { const m = Math.hypot(q.x - q.ox, q.y - q.oy);
      if (m > 2){ ctx.fillStyle = PARTS[k % 6][0]; ctx.beginPath(); ctx.arc(q.x, q.y, Math.min(4, 1 + m / 6), 0, 7); ctx.fill(); } }); }
  // La boucle s'arrête d'elle-même quand la toile est au repos ou la page cachée (économise la batterie).
  function boucle(){ const agite = physique(); dessin(); raf = (agite || p.x > -999) && !document.hidden ? requestAnimationFrame(boucle) : 0; }
  function reveille(){ if (!raf && !reduit) raf = requestAnimationFrame(boucle); }
  addEventListener('pointermove', e => { p.x = e.clientX; p.y = e.clientY; reveille(); }, { passive: true });
  addEventListener('pointerdown', e => { p.x = e.clientX; p.y = e.clientY; reveille(); }, { passive: true });
  const lache = () => { p.x = p.y = -999; };
  addEventListener('pointerup', e => { if (e.pointerType !== 'mouse') lache(); });
  addEventListener('pointercancel', lache);
  document.documentElement.addEventListener('mouseleave', lache);
  addEventListener('resize', () => { clearTimeout(taille._t); taille._t = setTimeout(taille, 150); });
  taille();
  return { couleurs };
})();

/* ---------- 27 Jour / nuit ---------- */
const sombreIphone = matchMedia('(prefers-color-scheme: dark)');
function estNuit(){ const t = document.documentElement.dataset.theme; return t ? t === 'dark' : sombreIphone.matches; }
function majTheme(){ const n = estNuit(); document.body.classList.toggle('nuit', n); $('jn').setAttribute('aria-pressed', n); toile.couleurs(); }
$('jn').addEventListener('click', () => { document.documentElement.dataset.theme = estNuit() ? 'light' : 'dark'; majTheme(); });
sombreIphone.addEventListener('change', majTheme);
majTheme();

/* ---------- 4 Reflet brillant (+ penche légère, 8° max), au repos pendant que la roue tourne ---------- */
const penche = $('penche');
function repos(){ penche.classList.remove('vise'); penche.style.transition = ''; penche.style.transform = '';
  penche.style.removeProperty('--gx'); penche.style.removeProperty('--gy'); }
if (!reduit){
  const bouge = e => { if (tourneEnCours()) return repos();
    const r = penche.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    penche.classList.add('vise'); penche.style.transition = 'transform .1s linear';
    penche.style.transform = `perspective(800px) rotateX(${((.5 - y) * 16).toFixed(1)}deg) rotateY(${((x - .5) * 16).toFixed(1)}deg)`;
    penche.style.setProperty('--gx', x * 100 + '%'); penche.style.setProperty('--gy', y * 100 + '%'); };
  penche.addEventListener('pointermove', bouge);
  penche.addEventListener('pointerdown', bouge);
  penche.addEventListener('pointerleave', repos);
  penche.addEventListener('pointercancel', repos);
  penche.addEventListener('pointerup', e => { if (e.pointerType !== 'mouse') repos(); });
}

/* ---------- 6 Bouton aimanté (PC seulement, ralenti, coupé pendant que la roue tourne) ---------- */
const aimant = $('aimant');
function lacheAimant(){ aimant.classList.remove('suit'); aimant.style.transform = ''; }
if (souris && !reduit){
  aimant.addEventListener('pointermove', e => { if (tourneEnCours()) return lacheAimant();
    const r = tourne.getBoundingClientRect();
    aimant.classList.add('suit');
    aimant.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * .14).toFixed(1)}px,${((e.clientY - r.top - r.height / 2) * .2).toFixed(1)}px)`; });
  aimant.addEventListener('pointerleave', lacheAimant);
}
tourne.addEventListener('click', () => { repos(); lacheAimant(); });

/* ---------- 16 Onde au toucher (boutons principaux) ---------- */
function onde(e){ const b = e.currentTarget, r = b.getBoundingClientRect(), s = Math.max(r.width, r.height), w = document.createElement('span');
  w.className = 'onde'; w.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
  b.append(w); setTimeout(() => w.remove(), 650); }
document.querySelectorAll('.btn-principal').forEach(b => b.addEventListener('pointerdown', onde));

/* ---------- 13 Petit pop de la flèche (appelé par roue.js à chaque part qui passe) ---------- */
const fleche = $('fleche');
let dernierPop = 0;
function pop(){ const t = performance.now();
  if (reduit || t - dernierPop < 70) return; // au tout début, les parts passent trop vite pour l'œil
  dernierPop = t; fleche.classList.remove('pop'); void fleche.offsetWidth; fleche.classList.add('pop'); }

/* ---------- 26 Lettres qui sautent (annonce du gagnant) ---------- */
const gagnant = $('gagnant');
function saute(s, delai){ s.classList.remove('saute'); void s.offsetWidth; s.style.animationDelay = delai + 'ms'; s.classList.add('saute'); }
function annonce(){ if (!reduit) [...gagnant.children].forEach((s, i) => saute(s, i * 70)); }
if (!reduit){
  gagnant.addEventListener('pointermove', e => { const s = document.elementFromPoint(e.clientX, e.clientY);
    if (s && s.parentNode === gagnant && s !== gagnant._derniere){ gagnant._derniere = s; saute(s, 0); } });
  gagnant.addEventListener('pointerleave', () => gagnant._derniere = null);
}

/* ---------- Confettis (pas de confettis si « Réduire les animations ») ---------- */
function confettis(){
  if (reduit) return;
  const voile = $('ecran-resultat');
  for (let i = 0; i < 30; i++){
    const c = document.createElement('span'), a = Math.random() * Math.PI * 2, d = 90 + Math.random() * 150;
    c.className = 'confetti'; c.style.background = PARTS[i % 6][0];
    c.style.setProperty('--dx', Math.cos(a) * d + 'px'); c.style.setProperty('--dy', Math.sin(a) * d - 60 + 'px');
    c.style.setProperty('--rot', Math.random() * 720 - 360 + 'deg');
    voile.append(c); setTimeout(() => c.remove(), 1500);
  }
}
