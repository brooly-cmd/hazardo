# KIT HAZARDO

Idée : une roue colorée qui choisit pour moi. Ambiance : « fête foraine, couleurs vives et joyeuses ».
Créé par l'Atelier le 2026-10-18.

## 1. FICHE PROJET (= CLAUDE.md)

<persona>
Tu es un développeur web spécialisé dans les petites apps ludiques et animées pour iPhone,
qui accompagne un débutant et explique avec des analogies.
</persona>

<situation>
- Hazardo : une roue colorée qui choisit pour moi quand je n'arrive pas à me décider.
  J'écris mes choix, je touche « Tourne ! », la roue s'arrête sur le gagnant avec une petite fête.
- Ambiance : fête foraine, couleurs vives et joyeuses (détails dans DESIGN.md après la mission 1).
- Technique : HTML, CSS et JavaScript simples, sans framework ni installation.
- Données : mes roues sont gardées dans le navigateur (localStorage), sur l'appareil seulement.
  Pas de compte, pas de serveur, pas de base de données.
- Écrans et textes : tout est dans ECRANS.md (à relire à chaque mission).
- Mise en ligne : GitHub Pages, compte brooly-cmd, dépôt « hazardo »
  → https://brooly-cmd.github.io/hazardo/
- Moi : débutant, PC Windows + iPhone, une mission à la fois, je vérifie moi-même.
</situation>

<exclusions>
- Pas plusieurs missions à la fois. À la place : finis, vérifie, coche, puis arrête-toi.
- Pas de fonction non demandée. À la place : note-la dans une liste « Plus tard » et demande-moi.
- Pas de service payant. À la place : l'option gratuite.
- Pas de mot technique sans explication. À la place : une phrase + une analogie.
- Pas de code en double ni de code qui ne sert plus. À la place : réutilise ce qui existe, écris court
  et simple, un fichier par sujet. Ne réorganise pas le code existant sans me demander.
- Pas de faux hasard (roue truquée, gagnant choisi d'avance par une règle). À la place : un vrai tirage
  au sort, et la roue s'arrête exactement sur la part tirée.
- Pas d'animation qui bloque l'écran ou fatigue les yeux. À la place : respecte « Réduire les animations »
  de l'iPhone (la roue s'arrête plus vite, sans confettis).
</exclusions>

<fin_de_mission>
À la fin de CHAQUE mission, automatiquement, sans que je le demande :
1. Vérifie toi-même : ouvre la page dans ton navigateur, en taille PC puis en taille iPhone,
   et teste ce que la mission a changé. Corrige ce qui ne va pas avant de me la donner.
   Pour vérifier, lis le texte de la page (pas de capture d'écran) ; prends au maximum
   2 captures en tout, seulement pour vérifier le look. Teste l'essentiel, sans répéter.
2. Remets la page en ligne si elle l'est déjà.
3. Coche la mission dans MISSIONS.md.
4. Fais une sauvegarde git nommée "Mission N : <titre>" (une sauvegarde git = un point de
   retour, comme une sauvegarde de jeu vidéo : on peut toujours revenir à ce moment-là).
5. Dis-moi comment vérifier moi-même, en étapes numérotées (sur PC et sur iPhone).
6. Mini-leçon : explique-moi en 3 phrases simples la chose la plus importante que tu as faite.
</fin_de_mission>

## 2. MISSIONS (= MISSIONS.md)

Coche chaque case quand la mission est réussie.

- [ ] 1. Le look : couleurs, logo et effets — MONTRE
  - **Quoi :** une page choix-design.html où je choisis UNE palette, UN logo et mes effets « J'aime ».
    Ça crée DESIGN.md, logo.svg et l'icône iPhone. (Prompt dans kit-hazardo.md, partie 3.)
  - **Pourquoi :** comme un essayage chez le tailleur : je montre du doigt, Claude coud.
  - **C'est réussi quand :** j'ai collé mon choix et DESIGN.md existe dans le dossier.
  - **Produit pour la suite :** DESIGN.md, logo.svg, l'icône.

- [ ] 2. La maquette — MONTRE
  - **Quoi :** l'écran d'accueil (la roue + le bouton « Tourne ! ») dessiné dans maquette.html,
    avec mes couleurs, mon logo et mes effets déjà posés. La roue ne tourne pas encore pour de vrai.
  - **Pourquoi :** comme le plan d'une maison avant de poser les briques : on change facilement.
  - **C'est réussi quand :** j'ouvre maquette.html sur PC et en taille iPhone, et le look me plaît.
  - **Produit pour la suite :** maquette.html validée.

- [ ] 3. La roue qui tourne — CONSTRUIT
  - **Quoi :** index.html avec une roue de 6 choix (Pizza, Sushi, Burger, Pâtes, Salade, Tacos).
    Je touche « Tourne ! », la roue tourne, ralentit, s'arrête, et le gagnant s'affiche (écran Résultat).
  - **Pourquoi :** c'est le cœur de l'app, la plus petite version utile.
  - **C'est réussi quand :** je fais tourner 5 fois et la flèche montre bien, à chaque fois,
    le choix annoncé.
  - **Produit pour la suite :** index.html, style.css, roue.js.

- [ ] 4. Mise en ligne — EXÉCUTE
  - **Quoi :** mettre Hazardo sur GitHub Pages (dépôt « hazardo », compte brooly-cmd).
  - **Pourquoi :** c'est comme accrocher l'app en vitrine : elle a une adresse que tout le monde peut ouvrir.
  - **C'est réussi quand :** j'ouvre https://brooly-cmd.github.io/hazardo/ sur mon iPhone et la roue tourne.
  - **Produit pour la suite :** le lien en ligne (les missions suivantes le mettent à jour).

- [ ] 5. Mes propres choix — CONSTRUIT
  - **Quoi :** l'écran « Modifier les choix » : ajouter, supprimer, gardés dans le navigateur.
  - **Pourquoi :** le stockage du navigateur, c'est comme un carnet rangé dans l'iPhone :
    on le retrouve en revenant, même après avoir fermé Safari.
  - **C'est réussi quand :** j'ajoute « Kebab », je ferme Safari, je reviens : « Kebab » est toujours là.
  - **Produit pour la suite :** stockage.js (le carnet), réutilisé à la mission 6.

- [ ] 6. Plusieurs roues — CONSTRUIT
  - **Quoi :** l'écran « Mes roues » : créer, renommer, supprimer une roue, et passer de l'une à l'autre.
  - **Pourquoi :** une roue « Repas », une roue « Film », une roue « Sortie »… chacune ses choix.
  - **C'est réussi quand :** je crée « Film » avec 3 choix, je reviens sur « Repas » : chaque roue a gardé les siens.
  - **Produit pour la suite :** l'app complète.

- [ ] 7. Comme une vraie app — CONSTRUIT
  - **Quoi :** l'icône Hazardo sur l'écran d'accueil de l'iPhone, l'ouverture en plein écran (sans la barre Safari),
    et le nom « Hazardo » sous l'icône.
  - **Pourquoi :** c'est la « carte d'identité » de l'app (un petit fichier appelé manifest) :
    l'iPhone la lit pour savoir quel nom et quelle icône afficher.
  - **C'est réussi quand :** sur iPhone, Safari → Partager → « Sur l'écran d'accueil » : l'icône apparaît,
    et l'app s'ouvre en plein écran.
  - **Produit pour la suite :** l'app prête à partager.

- [ ] 8. Test avec un ami — EXÉCUTE
  - **Quoi :** j'envoie le lien à un ami, il l'essaie sans aide, je note ce qui l'a bloqué ou fait sourire.
  - **Pourquoi :** un regard neuf voit ce que je ne vois plus.
  - **C'est réussi quand :** mon ami a fait tourner une roue et créé ses propres choix tout seul.
    Ses remarques sont dans la liste « Plus tard ».
  - **Produit pour la suite :** la liste « Plus tard » mise à jour.

## Plus tard (seulement si je le demande)
- Un son ou une vibration quand la roue s'arrête.
- Partager une roue avec un ami.

## 3. PROMPTS DE PHASE

PENSE et Claude Design : inutiles ici. Les écrans et les textes sont déjà dans le kit (partie 5),
et la maquette se fait dans Claude Code.

### Mission 1 « Le look » (Claude Code)
```
Lis ..\00-Atelier\BANQUE-EFFETS.md (parties 5, 7 et 8), le CLAUDE.md de ce projet et ECRANS.md.
Thème de mon projet : « fête foraine, couleurs vives et joyeuses ».
Prépare une page choix-design.html où je choisis mon look. Elle a 3 parties :

1. COULEURS — 3 palettes inventées pour CE thème (pas des couleurs génériques).
   Chacune : un nom qui fait rêver, 5 couleurs (fond, texte, couleur principale, couleur d'accent, couleur douce)
   avec leur code, une version jour ET une version nuit (j'aime l'interrupteur jour / nuit).
   Les parts de la roue doivent rester bien distinctes entre elles, avec un texte lisible dessus.
   Vérifie que le texte reste bien lisible sur le fond (contraste suffisant).
   Montre chaque palette sur un vrai morceau de mon écran d'accueil (la roue, la flèche, le bouton « Tourne ! »).
2. LOGO — 3 logos dessinés en SVG (un dessin fait de formes, net à toutes les tailles), dans le thème,
   simples, lisibles en tout petit (icône iPhone). Montre-les en grand, en petit (32 px) et sur fond jour / nuit.
3. EFFETS — seulement mes effets « J'aime » de la partie 7 (JAMAIS un « Bof » ou « J'aime pas »).
   Garde les 8 à 12 qui collent le mieux à la personnalité du projet (partie 5a), rangés par élément de MA page
   (partie 5b) : « Fond de l'accueil », « La roue », « La flèche », « Bouton Tourne ! », « Annonce du gagnant »,
   « Liste des choix ».
   Chaque effet est une VRAIE démo qui marche (reprends son code dans la Salle, voir partie 8),
   déjà repeinte aux couleurs de la palette 1 et avec mes vrais textes (« Tourne ! », « Et c'est… Pizza ! »),
   version souris ET doigt.
   Une phrase sous chaque effet : pourquoi il va bien ici. Les effets marqués « J'adore » dans ma partie 7 passent en premier.

Sur la page : je coche UNE palette, UN logo et les effets que je veux (cases « Je veux »).
Quand je change de palette, les démos d'effets se repeignent avec elle.
Un compteur m'avertit si je dépasse les règles d'or (1 effet star par page, 3 types d'effets décoratifs maximum).
En bas, un bouton « Copier mon choix » qui copie un message du genre :
« Mon look : palette 2 (Barbe à papa), logo 3, effets : 3 sur l'annonce du gagnant, 39 sur le fond de l'accueil, 13 sur le bouton Tourne ! ».

Ouvre la page en taille PC puis iPhone pour vérifier que tout marche, puis donne-la-moi et ATTENDS mon message.

Quand je colle mon choix :
- Écris DESIGN.md : la palette choisie (jour et nuit, avec les codes), le logo, la police,
  et la liste « Effets choisis » : numéro, nom, sur quel élément, réglages (vitesse, couleurs).
- Range le logo choisi dans logo.svg, et fais l'icône de l'écran d'accueil iPhone (image PNG 180 × 180)
  et l'icône d'onglet. Si tu ne peux pas créer le PNG, explique-moi comment faire en étapes simples.
- Ne touche pas encore aux autres pages : les missions suivantes appliqueront DESIGN.md.
Pose-moi tes questions, fais un plan d'abord, puis montre-moi que ça marche.
Explique-moi simplement ce que tu fais, je suis débutant.
```

### CONSTRUIT (missions 2, 3, 5, 6 et 7 — remplace N par le numéro)
```
Lis CLAUDE.md, MISSIONS.md et ECRANS.md. Fais uniquement la mission N, rien d'autre,
puis fais la fin de mission prévue dans CLAUDE.md.
Utilise la skill frontend-design pour que ce soit beau et original.
Applique DESIGN.md : mes couleurs (jour et nuit), mon logo, et pose toi-même les effets
de la liste « Effets choisis » sur les éléments indiqués (code dans ..\00-Atelier\salle-des-effets.html,
règles dans ..\00-Atelier\BANQUE-EFFETS.md partie 3).
Pose-moi tes questions, fais un plan d'abord, puis montre-moi que ça marche.
Explique-moi simplement ce que tu fais, je suis débutant.
```

### EXÉCUTE (missions 4 et 8)
```
Lis CLAUDE.md, MISSIONS.md et ECRANS.md. Fais uniquement la mission N, rien d'autre,
puis fais la fin de mission prévue dans CLAUDE.md.
Quand c'est à moi d'agir (créer un compte, cliquer), donne-moi les étapes numérotées, une par ligne.
Pose-moi tes questions, fais un plan d'abord, puis montre-moi que ça marche.
Explique-moi simplement ce que tu fais, je suis débutant.
```

## 4. MODE D'EMPLOI
1. Toutes les missions se font dans Claude Code, dans le dossier `Hazardo`.
2. Dis « la suite Hazardo » à l'Atelier, puis clique « Lancer la mission »
   (ou ouvre une session dans le dossier du projet et colle le prompt Look / CONSTRUIT / EXÉCUTE).
3. Une mission par session : je vérifie, puis je reviens à l'Atelier.

## 5. ÉCRANS ET TEXTES (= ECRANS.md)

## Règles du projet
- Une roue a entre 2 et 12 choix. Chaque choix fait 30 caractères maximum, sans doublon
  (« pizza » et « Pizza » comptent comme le même choix).
- Toutes les parts ont la même taille : chaque choix a exactement la même chance.
- Vrai hasard : on tire le gagnant au sort, puis la roue s'arrête pile au milieu de sa part.
- Au tout premier lancement : une roue « Repas » avec Pizza, Sushi, Burger, Pâtes, Salade, Tacos.
- Il reste toujours au moins une roue.
- Tout est gardé sur l'appareil (stockage du navigateur). Rien n'est envoyé ailleurs.
- « Réduire les animations » activé sur l'iPhone : la roue tourne 1 seconde au lieu de 4, sans confettis.

## Écran 1 — Accueil (la roue)
Éléments visuels : fond de l'accueil, en-tête (logo + « Hazardo »), nom de la roue active,
la roue, la flèche, bouton principal « Tourne ! », bouton secondaire « Modifier les choix ».
- En-tête : logo + « Hazardo »
- Nom de la roue active, touchable (à partir de la mission 6) : « Repas ▾ » → ouvre « Mes roues »
- Bouton principal : « Tourne ! »
- Pendant que ça tourne : le bouton devient « Ça tourne… » (désactivé), on ne peut rien toucher d'autre.
- Bouton secondaire : « Modifier les choix » (à partir de la mission 5)
- Si la roue a moins de 2 choix : roue grise, bouton désactivé, message
  « Ajoute au moins 2 choix pour faire tourner la roue. » + bouton « Ajouter des choix »
- Un choix trop long pour sa part : coupé avec « … » sur la roue (en entier dans le résultat).

## Écran 2 — Résultat (par-dessus la roue)
Éléments visuels : voile sombre, annonce du gagnant, confettis.
- Titre : « Et c'est… »
- Le gagnant en très grand : « Pizza ! »
- Bouton principal : « Encore ! » (ferme et relance la roue)
- Bouton secondaire : « Super, merci » (ferme et revient à la roue)

## Écran 3 — Modifier les choix (mission 5)
Éléments visuels : en-tête, liste des choix, champ d'ajout, bouton Ajouter.
- Titre : « Les choix de « Repas » »
- Champ : « Ajoute un choix… » + bouton « Ajouter » (la touche Entrée marche aussi)
- Chaque choix : son texte + un bouton ✕ (« Retirer »)
- Compteur : « 6 choix sur 12 »
- Bouton retour : « ← Retour à la roue »
- Vide : « Ta roue est vide. Ajoute au moins 2 choix pour la faire tourner. »
- Erreurs :
  - champ vide : « Écris quelque chose avant d'ajouter. »
  - doublon : « « Pizza » est déjà sur la roue. »
  - trop long : « 30 caractères maximum. »
  - plein : « 12 choix maximum : retire-en un pour en ajouter un autre. »

## Écran 4 — Mes roues (mission 6)
Éléments visuels : en-tête, liste des roues, roue active mise en avant, bouton Nouvelle roue.
- Titre : « Mes roues »
- Chaque roue : son nom + le nombre de choix (« Repas · 6 choix »), touchable pour la choisir.
  La roue active a un ✓.
- Sur chaque roue : « Renommer » et « Supprimer »
- Bouton : « + Nouvelle roue » → demande « Nom de la nouvelle roue » (ex. « Film ») →
  la roue est créée vide et l'écran « Modifier les choix » s'ouvre.
- Confirmation de suppression : « Supprimer la roue « Film » ? Ses choix seront perdus. »
  Boutons : « Annuler » / « Supprimer »
- Dernière roue : le bouton Supprimer est caché, petit texte « Il te faut au moins une roue. »
- Erreurs du nom : vide → « Donne un nom à ta roue. » ; déjà pris → « Tu as déjà une roue « Film ». » ;
  20 caractères maximum.
- Note en bas : « Tes roues sont gardées sur cet appareil seulement. »

## Parcours
- Moi, la première fois : j'ouvre Hazardo → roue « Repas » → « Tourne ! » → « Et c'est… Sushi ! » →
  « Super, merci » → « Modifier les choix » → j'ajoute « Kebab », je retire « Salade » → « Retour à la roue » →
  « Tourne ! ».
- Moi, plus tard : « Repas ▾ » → « Mes roues » → « + Nouvelle roue » → « Film » → j'ajoute 3 films →
  retour à la roue « Film » → « Tourne ! ». Je reviens le lendemain : tout est encore là.
- Mon ami : il reçoit le lien → l'ouvre dans Safari → voit la roue « Repas » → la fait tourner →
  crée ses propres choix. Ses roues sont sur SON iPhone, pas sur le mien.
