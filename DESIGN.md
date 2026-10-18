# HAZARDO — le look (DESIGN.md)

Choisi le 2026-10-18 dans choix-design.html (mission 1).
Les missions suivantes appliquent ce fichier, sans rien me redemander.

## Palette : 1. Grande Roue
Le rouge et l'or des manèges d'antan, avec le bleu d'un ciel de fête.
Jour par défaut, nuit si l'iPhone est en mode sombre, avec l'interrupteur jour / nuit (effet 27).

| Rôle | Jour | Nuit | Sert à |
|---|---|---|---|
| Fond | `#FFF6E6` | `#1A0F2E` | fond des écrans |
| Texte | `#2A1838` | `#FFF2DF` | textes, contours de la roue et de la flèche |
| Principale | `#D7263D` | `#FF4D61` | bouton « Tourne ! », boutons principaux |
| Accent | `#FFB400` | `#FFC233` | flèche, étoiles, décor (**jamais** du texte sur le fond) |
| Douce | `#FFE3CC` | `#33204F` | pastille « Repas ▾ », cartes, lignes de la liste |
| Texte sur Principale | `#FFFFFF` | `#2A1838` | texte du bouton « Tourne ! » |

**Parts de la roue** (les mêmes de jour et de nuit, dans cet ordre, puis on recommence au début) :

| Part | Couleur | Texte dessus |
|---|---|---|
| 1 | `#D7263D` rouge | `#FFFFFF` |
| 2 | `#FFB400` or | `#2A1838` |
| 3 | `#1F6FD1` bleu | `#FFFFFF` |
| 4 | `#FF8A00` orange | `#2A1838` |
| 5 | `#7B3FC4` violet | `#FFFFFF` |
| 6 | `#3CC47C` vert | `#2A1838` |

Contrastes vérifiés (4,5 minimum) : texte sur fond 15,2 (jour) / 16,5 (nuit) ;
« Tourne ! » 5,0 / 5,0 ; noms sur les parts 4,9 au minimum.
Roue grise (moins de 2 choix) : part `#CFC6BE`, texte `#2A1838`.

## Logo : 2. Le ticket
Un ticket de manège rouge avec un grand H blanc, posé de travers, et une étoile dorée.
- `logo.svg` : le logo (couleurs de la palette jour).
- `apple-touch-icon.png` : icône de l'écran d'accueil iPhone (180 × 180, fond Douce `#FFE3CC`).
- `favicon-32.png` : icône d'onglet (32 × 32, fond transparent).
- Dans l'en-tête : logo à gauche de « Hazardo », hauteur 32 px environ.

## Polices (gratuites, Google Fonts)
- Titres, « Hazardo », bouton « Tourne ! », noms sur la roue, gagnant : **Lilita One**
  (ronde et joyeuse, comme une affiche de fête foraine).
- Textes, boutons secondaires, liste : **Nunito** (700 et 800 pour le gras).
- Si elles ne se chargent pas : `"Arial Rounded MT Bold", system-ui, sans-serif`.

## Formes
- Boutons principaux : en pilule (`border-radius: 999px`), avec une « marche » dessous
  (ombre `0 5px 0` de la couleur Principale foncée). À l'appui, ils s'enfoncent de 3 px.
- Cartes et lignes de liste : coins arrondis 12 à 20 px.
- Roue : contour Texte de 5 px, moyeu au centre (rond Fond avec contour Texte).
- Flèche : triangle Accent avec contour Texte, en haut de la roue, pointe vers le bas.

## Effets choisis

| N° | Nom | Élément | Type | Réglages |
|---|---|---|---|---|
| 81 | Toile élastique | Fond de l'accueil | ⭐ star | Grille d'environ 22 px, lignes couleur Texte à 22 % ; les points qui bougent prennent les couleurs des parts. Rayon d'action 80 px, ressort 0,08, freinage 0,82. Doigt ou souris. En pause hors de l'écran. |
| 4 | Reflet brillant | La roue | 🎨 décoratif | Reflet blanc (85 % → 0) qui suit le doigt ou la souris, penche légère (8° max). Au repos, reflet discret (35 %). Se calme pendant que la roue tourne. |
| 13 | Petit « pop » | La flèche | 👆 réaction | La flèche grossit à 135 % et penche de −8° en 0,3 s, à **chaque part qui passe** sous elle pendant que la roue tourne (comme la languette d'une roue de loterie). |
| 6 | Bouton aimanté (ralenti) | Bouton Tourne ! | 🎨 décoratif | Sur PC seulement : suit la souris (14 % en largeur, 20 % en hauteur), retour en 0,8 s avec léger rebond (plus lent que dans la Salle, comme demandé). Sur iPhone : s'enfonce à l'appui puis rebondit. Désactivé pendant que la roue tourne. |
| 16 | Onde au toucher | Bouton Tourne ! | 👆 réaction | Onde de la couleur du texte du bouton (40 % → 0), part de l'endroit touché, 0,6 s. |
| 26 | Lettres qui sautent | Annonce du gagnant | 🎨 décoratif | Le nom du gagnant (« Pizza ! ») : les lettres sautent l'une après l'autre (70 ms d'écart, 0,5 s, saut de 16 px, couleur Principale pendant le saut) quand l'annonce apparaît. Ensuite, elles sautent sous le doigt ou la souris. |
| 9 | Apparition | Liste des choix (écran « Modifier les choix ») | 🎨 décoratif | Les lignes arrivent une par une (montée de 18 px + fondu, 0,5 s, 80 ms d'écart, petit rebond) à l'ouverture de l'écran. Un choix ajouté arrive de la même façon. |

**Règles d'or :** 1 effet star (81) ✓. Types décoratifs : 4 (4, 6, 26, 9) + la star 81 = **5, au-delà
des 3 conseillés**. Je les garde parce que c'est ton choix ; ils sont répartis sur 3 écrans différents
(accueil, résultat, liste), donc jamais tous à l'écran en même temps.
À revoir pendant la maquette (mission 2) si la page paraît chargée.

**Réduire les animations (iPhone) :** pas de toile élastique (fond fixe), pas de reflet ni d'aimant,
pas de lettres qui sautent ni d'apparition (tout est affiché directement), pas de pop sur la flèche.
La roue tourne 1 seconde au lieu de 4, sans confettis.

**Toujours :** on n'anime que `transform` et `opacity`, le défilement de la page n'est jamais bloqué
(`touch-action: pan-y` sur les zones qu'on touche), les animations s'arrêtent quand elles sortent de l'écran.

## Plus tard (seulement si je le demande)
- Rien de nouveau pour l'instant.
