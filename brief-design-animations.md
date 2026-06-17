# Brief Design — Animations & Vie du site Lucidus Studio

## Contexte
Site one-page HTML/CSS/JS vanilla pour Lucidus Studio (agence personal branding vidéo).
Fichier unique : `/Users/andrealevaillant/Desktop/Site web creation/index.html`
Site en ligne : https://lucidus.agency

Stack actuelle :
- **GSAP 3.12.5** + **ScrollTrigger** (CDN) — déjà chargés, sous-utilisés
- **Lenis 1.1.13** (smooth scroll) — actif
- **CSS custom properties** avec `--ease-expo: cubic-bezier(0.16, 1, 0.3, 1)`
- Palette : `--bg: #FAFAF8`, `--text: #0E0E0E`, `--gold: #FF6B2B`
- Police : Helvetica Neue Bold partout

---

## Ce qui existe déjà (ne pas casser)

| Élément | Animation existante |
|---------|---------------------|
| Hero | GSAP timeline : ligne par ligne `translateY(110% → 0%)`, puis sub, CTAs, proof en cascade |
| Hero background | 2 glows orange en parallax scrub GSAP (`.hero-glow-1`, `.hero-glow-2`) |
| Scroll reveals | IntersectionObserver sur `.reveal` → `opacity 0 + translateY(40px)` → `visible` avec stagger auto 0.12s entre frères |
| Marquee | CSS `animation: marqueeAnim 25s linear infinite`, pause au hover |
| Stats | GSAP counter `textContent 0 → target` avec ScrollTrigger |
| Nav | Devient `.scrolled` (background blur) au scroll > 60px |
| Lenis | Smooth scroll actif, lié à ScrollTrigger |

---

## Ce qui manque / ce qui est fade

### 1. Curseur custom
Ajouter un **curseur circulaire** qui suit la souris avec un léger lag (lerp 0.12).
- État normal : cercle 12px, border `2px solid var(--gold)`, fond transparent
- Sur les CTA buttons / cards : le curseur grossit (40px), se remplit orange à 15% d'opacité, texte "Voir" ou "Cliquer" apparaît au centre en 9px
- Sur les textes : réduit à 6px, fond orange plein
- Masqué sur mobile (`@media (hover: none)`)

### 2. Hero — améliorer l'impact visuel
- Ajouter un **troisième glow** : blanc pur, centré, 600px de diamètre, `blur(100px)`, `opacity: 0.06`, parallax lent (`y: -30px` scrub)
- Le `.hero-proof-dot` pulse orange : déjà présent mais ajouter un **second anneau** qui s'étend et s'efface (`@keyframes ripple`)
- Le scroll indicator animé vers le bas existe, le garder

### 3. Section titles — reveal avec clip-path
Actuellement : simple `opacity + translateY`. Remplacer sur tous les `.section-header` par :
```css
clip-path: inset(0 0 100% 0)  →  clip-path: inset(0 0 0% 0)
```
avec `transition: clip-path 0.85s cubic-bezier(0.16, 1, 0.3, 1)` au lieu du simple fade. Combiner avec le translateY existant pour un effet "rideau qui monte".

### 4. La Méthode — timeline animée
Section `#methode` : 6 étapes dans une grille. Actuellement `.reveal` générique.
- Ajouter une **ligne verticale** (1px, `--gold`) entre les steps qui se **dessine** au scroll (height 0 → 100% en `scaleY`) via ScrollTrigger `scrub`.
- Chaque step : au moment où il devient visible, son **numéro** fait un flip vertical (`rotateX(90deg → 0deg)`) avant que la carte entre.
- L'effet doit être staggeré sur les 6 cards (délai 0.1s entre chaque).

### 5. Configurateur de prix — micro-interactions
Section `#offres` :
- Quand l'utilisateur sélectionne un volume (pill), le total doit faire un **petit bounce** (`transform: scale(1.06) → scale(1)`, durée 250ms, ease spring).
- Quand une option toggle s'active, son label fait un `translateX(0 → 4px → 0)` avec la couleur qui transite en 200ms.
- Le prix en bas (`#totalPrice`) : quand il change de valeur, faire un **flip number** (l'ancien remonte, le nouveau descend) — utiliser GSAP `fromTo` sur `y` et `opacity`.

### 6. Cards — tilt 3D au hover
Sur `.card`, `.step-card`, `.ig-card`, `.faq-item` :
Ajouter un **tilt 3D léger** au hover via `mousemove` :
```js
el.addEventListener('mousemove', e => {
  const rect = el.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 → 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  el.style.transform = `perspective(600px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateZ(4px)`;
});
el.addEventListener('mouseleave', () => {
  el.style.transform = '';
});
```
Amplitude max ±6° sur les grandes cards, ±4° sur les petites.

### 7. Qualité Argument (bloc noir) — texte dramatique
Section `.quality-argument` : le pull quote *"Avant de parler, ton contenu parle pour toi."*
- Splitter le texte mot par mot en `<span>` (ou utiliser GSAP SplitText si dispo, sinon manuellement)
- Chaque mot entre avec un léger décalage (`stagger: 0.04s`), en `opacity: 0 + translateY(20px) → visible`
- Déclenché au ScrollTrigger `start: "top 75%"`
- L'ensemble prend 1.2s total

### 8. Boutons CTA — effet magnétique
Sur `.btn-primary` et `.btn-outline` :
Effet magnétique léger : le bouton se déplace légèrement vers le curseur à l'approche (dans un rayon de 80px), retour fluide au `mouseleave`.
```js
btn.addEventListener('mousemove', e => {
  const rect = btn.getBoundingClientRect();
  const dx = e.clientX - (rect.left + rect.width / 2);
  const dy = e.clientY - (rect.top + rect.height / 2);
  btn.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px)`;
});
btn.addEventListener('mouseleave', () => {
  gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
});
```

### 9. Section Stats (`#resultats`) — chiffres plus dramatiques
Les counters existent mais sont sobres.
- Ajouter un **cercle SVG** (`stroke-dasharray` / `stroke-dashoffset`) autour de chaque chiffre qui se remplit au scroll (progress 0 → 100% quand le counter tourne)
- Chaque stat card : entrée en `scale(0.9) + opacity(0) → scale(1) + opacity(1)` avec stagger 0.15s

### 10. FAQ — accordéon plus fluide
Actuellement les réponses apparaissent/disparaissent brutalement.
- Animer la **hauteur** via `max-height: 0 → max-height: [contenu]px` avec `overflow: hidden` et `transition: max-height 0.45s var(--ease-expo)`
- Le `+` fait une rotation `0deg → 45deg` (devient un ×) quand l'item est ouvert
- Ajouter une légère `border-color` transition sur l'item actif vers `var(--gold)`

### 11. Footer — ligne qui se dessine
Un séparateur `<hr>` ou pseudo-élément `::before` qui se **dessine de gauche à droite** (`scaleX: 0 → 1`, `transform-origin: left`) quand le footer entre dans le viewport.

---

## Ce qu'il ne faut PAS faire

- Ne pas supprimer GSAP ou Lenis — ils sont déjà là et utilisés
- Ne pas toucher au configurateur de prix JS (objet `PRICES`, fonctions `updateConfig`, `renderConfig`) — seulement ajouter les micro-animations par-dessus
- Ne pas ajouter de nouvelles dépendances CDN si GSAP suffit — GSAP peut tout faire
- Ne pas casser le responsive mobile — toutes les animations doivent être désactivées ou réduites sur `@media (max-width: 768px)` (sauf les transitions CSS simples)
- Ne pas toucher à la section `#igPage` (profil Instagram plein écran) ni aux fonctions `openIgProfile`, `closeIgProfile`
- Ne pas modifier les variables de prix ni la logique du configurateur

---

## Priorités (ordre décroissant d'impact visuel)

1. **Curseur custom** — change immédiatement la perception premium du site
2. **Tilt 3D sur les cards** — effet concret dès le scroll
3. **Flip number sur le total prix** — micro-interaction la plus visible
4. **Boutons magnétiques** — mémorable
5. **Section titles clip-path** — plus de caractère que le simple fade
6. **Méthode — ligne qui se dessine** — storytelling
7. **FAQ accordéon fluide** — confort d'usage
8. **Qualité Argument — mots en stagger** — dramatise le message
9. **Stats — cercle SVG progress** — visuel fort
10. **Hero — ripple sur le dot** + glow supplémentaire

---

## Contraintes techniques

- Tout reste dans le **fichier HTML unique** (CSS inline dans `<style>`, JS inline avant `</body>`)
- Le curseur custom doit être un `<div id="cursor">` ajouté au `<body>` par JS, pas en HTML statique
- Les animations `mousemove` doivent utiliser `requestAnimationFrame` ou GSAP `ticker` pour éviter les jank
- Sur iOS/touch : `@media (hover: none) { #cursor { display: none; } }` et désactiver les listeners `mousemove`
- Tester que le score Lighthouse Performance ne descend pas sous 85 sur mobile
