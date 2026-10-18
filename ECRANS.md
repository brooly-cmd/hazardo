# Hazardo — écrans et textes

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
