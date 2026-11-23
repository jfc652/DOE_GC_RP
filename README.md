# Générateur de DOE GC RP

Application web 100 % statique (HTML / CSS / JavaScript, sans dépendance ni serveur) qui reproduit le format du dossier **DOE GC RP – BTS** :

- en-tête avec logo à gauche, titre au centre, logo à droite ;
- pied de page avec version, code projet, auteur, date et numéro de page `Page X/N` ;
- page de couverture, caractéristiques de la liaison, légende, coupe type de tranchée ;
- pages de reportage photos, en nombre illimité, avec numérotation automatique `Photo N :` sous chaque cadre.

## Utilisation

1. Ouvrir `index.html` dans un navigateur (Chrome, Edge, Firefox, Safari), ou publier le dépôt avec GitHub Pages.
2. Remplir le formulaire à gauche : tous les champs du dossier sont modifiables, y compris les logos, le plan de couverture, la légende et la coupe type.
3. Ajouter des photos (sélection multiple possible), les légender, les réordonner (↑ ↓) ou les supprimer. Le nombre de photos par page se règle (1, 2, 4 ou 6).
4. Cliquer sur **Imprimer / PDF** puis choisir « Enregistrer au format PDF » (format A4, marges : aucune, activer les graphiques d'arrière-plan).

### Tracés sur les photos

Sur chaque photo de la liste, le bouton **✎ Tracer** ouvre un éditeur plein écran pour dessiner des polylignes de couleur (par exemple le passage sous les tranchées recouvertes).

- **Tracer** : un clic pose un point ; double-clic, Entrée, clic droit ou « Terminer le tracé » finit la polyligne. Retour arrière annule le dernier point, Échap abandonne le tracé en cours.
- **Modifier** : cliquer sur un tracé le sélectionne ; on glisse ses points pour le corriger, on change sa couleur, son épaisseur ou ses pointillés, Suppr le supprime.
- 9 couleurs prédéfinies + couleur libre, 4 épaisseurs, pointillés, contour blanc pour la lisibilité.
- Les tracés sont stockés en vectoriel (ils restent modifiables), enregistrés avec la photo (sauvegarde automatique et export `.json`) et imprimés dans le PDF. L'image d'origine n'est jamais modifiée.

### Listes de choix (CSV)

Les menus déroulants (mode de pose, fourreaux, chambres, type d'accès, type de clés, typologie du site, oui/non/s.o, etc.) sont alimentés par `assets/listes.csv`, au format `liste;valeur` (une ligne par choix). Chaque menu propose aussi « Autre (saisie libre)… » pour les cas hors liste.

- Modifier le fichier `assets/listes.csv` dans le dépôt pour changer les listes pour tous les utilisateurs.
- Ou, dans l'application, section « Listes de choix » : télécharger le CSV actuel, le modifier dans Excel, puis l'importer. Il est conservé dans le navigateur.
- Ouvert directement en `file://`, le navigateur interdit la lecture du fichier : une copie intégrée à `app.js` (variable `EMBEDDED_CSV`) est alors utilisée. Après modification du CSV, la régénérer ou passer par l'import.

### Modèles en mémoire

En haut du formulaire, « Modèles en mémoire » enregistre le formulaire sous un nom (mode de pose, fourreaux, chambres, accès, impact GC, etc.). La recherche filtre par nom ou par contenu, sans tenir compte des accents. Un clic applique le modèle ; ↻ le met à jour ; ✕ le supprime. Le code projet, l'adresse, la date, le plan et les photos ne sont jamais écrasés. Les modèles s'exportent et s'importent en `.json` pour être partagés.

Les données sont sauvegardées automatiquement dans le navigateur (IndexedDB). Les boutons **Exporter (.json)** et **Importer** permettent de sauvegarder ou de transmettre un dossier complet, photos comprises.

## Publier sur GitHub Pages

```bash
git init
git add .
git commit -m "Générateur de DOE GC RP"
git branch -M main
git remote add origin https://github.com/<utilisateur>/<depot>.git
git push -u origin main
```

Puis, dans le dépôt : **Settings → Pages → Branch : main / (root)**. L'application sera disponible sur `https://<utilisateur>.github.io/<depot>/`.

## Structure

```
index.html      formulaire et zone d'aperçu
style.css       mise en page écran et impression A4
app.js          logique (état, formulaire, aperçu, photos, export/import)
assets/         logos, légende et coupe type d'origine
```

## Personnalisation

- Logos d'origine : remplacer `assets/logo-free.png` et `assets/logo-topsat.png`.
- Valeurs par défaut du formulaire : fonctions `blankState()` et `sampleState()` en haut de `app.js`.
