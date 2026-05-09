Create a complete interactive mobile prototype for an ATTT vehicle 
technical inspection appointment booking app in Tunisia. 
The app has 7 screens connected in a linear 6-step flow.

=== DESIGN SYSTEM ===

Colors:
- Primary: #1A4A8A (Navy Blue) — buttons, headers, nav
- Secondary: #2D68C4 (Medium Blue) — hover states, active icons
- Accent: #D4841A (Amber) — alerts, badges, limited availability
- Success: #1A7A4A (Green) — confirmation, availability, checkmarks
- Error: #C03030 (Red) — form errors, invalid fields
- Surface: #F5F7FB (Light Gray) — card backgrounds
- Text Primary: #12233A (Night Blue) — titles, main content
- Text Secondary: #5A6A82 (Bluish Gray) — labels, descriptions

Typography:
- Titles/Headers: Sora Bold, 20–28px
- Subtitles: Sora SemiBold, 14–18px
- Labels/Buttons: Plus Jakarta Sans Medium, 13–15px
- Body/Descriptions: Plus Jakarta Sans Regular, 9–12px
- Plate numbers/codes: Monospace Regular, 14px

Components:
- Primary Button: #1A4A8A fill, white text, radius 10px, full width
- Secondary Button: transparent fill, 1.5px #1A4A8A border, radius 10px
- Input Field: 1.5px #D8E0EE border, radius 6px, padding 10px
- Card: white fill, 0.5px border, light shadow, radius 10px, selectable state = 1.5px primary border
- Progress Bar: 6 circular steps (22px diameter) connected by lines
  → Done: #1A7A4A fill + white checkmark
  → Active: #1A4A8A fill + white number
  → Upcoming: #D8E0EE fill + gray number
- Availability Badge: small pill, 10px bold
  → "Disponibilités élevées" = #1A7A4A green text
  → "Disponibilités moyennes" = #D4841A amber text
  → "Disponibilités limitées" = #C03030 red text

=== SCREEN 1 — ACCUEIL (Home) ===

Layout: centered card on #F5F7FB background
- Top: ATTT logo square, #1A4A8A background, white text "ATTT", radius 16px
- Title: "Réserver votre visite technique" — Sora Bold 24px, #12233A
- Description: "Planifiez facilement votre visite technique en quelques clics. 
  Choisissez la date et l'heure qui vous conviennent le mieux, 
  et nous nous occupons du reste." — Plus Jakarta Sans Regular 14px, #5A6A82, centered
- Primary Button: calendar icon + "COMMENCER" — #1A4A8A, white text, full width
- Link below button: "Consulter mes rendez-vous" — #2D68C4 underlined, 13px

Interaction: 
- Tap "COMMENCER" → navigate to Screen 2 with slide-left transition

=== SCREEN 2 — CHOIX DU SERVICE (Step 1/6) ===

Layout: white background
- Top bar: "← Retour à l'accueil" link, #2D68C4
- Progress bar: step 1 active (#1A4A8A), steps 2-6 upcoming (gray)
- Label: "Étape 1/6 – Choix du service" — Plus Jakarta Sans Medium 13px, #5A6A82, centered
- 3 selectable cards (radius 10px, 1px border #D8E0EE):
  Card 1: "Visite périodique" bold + "Contrôle technique obligatoire annuel" gray
  Card 2: "Contre-visite" bold + "Suite à un contrôle avec défaillances" gray
  Card 3: "Mutation véhicule" bold + "Lors d'un changement de propriétaire" gray
  → Selected state: 1.5px #1A4A8A border, light blue background tint #E8F0FA
- Bottom row: 
  Left: Secondary button "← Retour"
  Right: Primary button "Suivant →" (disabled until a card is selected)

Interactions:
- Tap any card → card gets selected border state, "Suivant" becomes enabled
- Tap "Suivant" → navigate to Screen 3
- Tap "Retour" → navigate to Screen 1

=== SCREEN 3 — CHOIX DU CENTRE (Step 2/6) ===

Layout: white background
- Progress bar: steps 1 done (green checkmark), step 2 active, 3-6 upcoming
- Label: "Étape 2/6 – Choix du centre"
- Search/filter field at top: placeholder "Rechercher un centre..." with search icon
- 3 selectable center cards:

  Card 1 — "Centre Tunis Lac"
  📍 Route de la Marsa, Les Berges du Lac, Tunis 1053
  Badge: "Disponibilités élevées" — #1A7A4A green

  Card 2 — "Centre Ariana"
  📍 Avenue Habib Bourguiba, Ariana Ville, Ariana 2080
  Badge: "Disponibilités moyennes" — #D4841A amber

  Card 3 — "Centre Ben Arous"
  📍 Route de Tunis, Ben Arous 2013
  Badge: "Disponibilités limitées" — #C03030 red

- Bottom row: Secondary "← Retour" | Primary "Suivant →"

Interactions:
- Tap a card → selected state (blue border)
- Tap "Suivant" → Screen 4
- Tap "Retour" → Screen 2

=== SCREEN 4 — DATE & HORAIRE (Step 3/6) ===

Layout: white background, two-column above fold
- Progress bar: steps 1-2 done (green), step 3 active, 4-6 upcoming
- Label: "Étape 3/6 – Sélection du créneau"

Left column — Calendar:
- Header: "Choisissez une date" — Sora SemiBold 16px
- Month navigator: "‹  avril 2026  ›"
- Calendar grid: lu ma me je ve sa di
  → Days: Plus Jakarta Sans Regular 14px, #12233A
  → Selected day: #1A4A8A circle fill, white text
  → Today: underlined or subtle indicator
  → Past days: #5A6A82 lighter, not selectable
- Selected date label below: "samedi 28 février 2026" — #2D68C4, 13px

Right column — Time slots:
- Header: "Heures disponibles" — Sora SemiBold 16px
- Grid of time pill buttons (3 per row):
  08:00  08:30  09:00
  09:30  10:00  10:30
  11:00  11:30  14:00
  14:30  15:00  15:30
  16:00  16:30  17:00
  17:30
  → Default: white fill, 1px #D8E0EE border, #12233A text
  → Selected: #1A4A8A fill, white text
  → Unavailable: strikethrough text, #F5F7FB fill (do not hide them)

- Bottom: Secondary "← Retour" | Primary "Suivant →"

Interactions:
- Tap a day → day circle becomes #1A4A8A, date label updates
- Tap a time → time pill becomes #1A4A8A filled, "Suivant" enables
- Tap "Suivant" → Screen 5
- Tap "Retour" → Screen 3

=== SCREEN 5 — INFORMATIONS PERSONNELLES (Step 4/6) ===

Layout: white background, scrollable form
- Progress bar: steps 1-3 done (green), step 4 active, 5-6 upcoming
- Label: "Étape 4/6 – Vos informations"

Form fields (all required, marked with *):
Row 1 (two columns):
  - "Nom *" → input, placeholder "Ben Ali"
  - "Prénom *" → input, placeholder "Ahmed"
Row 2:
  - "CIN (Carte d'Identité Nationale) *" → input, placeholder "12345678", numeric
Row 3:
  - "Immatriculation du véhicule *" → input, placeholder "123 TU 1234", monospace font
Row 4 (two columns):
  - "Téléphone *" → input, placeholder "+216 20 123 456"
  - "Email *" → input, placeholder "ahmed@email.com"

Error state (show on invalid submit):
  - Field background: #FDEAEA
  - Border: 1.5px #C03030
  - Error message below: red text, 11px, e.g. "Format invalide : 8 chiffres requis"

- Bottom: Secondary "← Retour" | Primary "Continuer →"

Interactions:
- Tap a field → border becomes #1A4A8A (focus state)
- Tap "Continuer" with all valid → Screen 6
- Tap "Continuer" with empty required field → show error state on that field
- Tap "Retour" → Screen 4

=== SCREEN 6 — RÉCAPITULATIF (Step 5/6) ===

Layout: white background
- Progress bar: steps 1-4 done (green), step 5 active, step 6 upcoming
- Label: "Étape 5/6 – Récapitulatif"

Summary cards (each card has edit icon ✏️ top right, tappable):
Card 1 — "Service"
  Value: "Visite périodique"
  
Card 2 — "Centre"
  Value: "Centre Ben Arous"

Card 3 — "Date et heure"
  Value: "01/03/2026 – 09:30"

Card 4 — "Vos informations"
  Nom : Ben Ali <Ahmed>
  CIN : 12345678
  Immatriculation : 123 TU 1234
  Téléphone : +216 20 123 456
  Email : ahmed@email.com

- Bottom: Secondary "← Retour" | Primary "✓ Confirmer"

Interactions:
- Tap ✏️ on Service card → navigate back to Screen 2
- Tap ✏️ on Centre card → navigate back to Screen 3
- Tap ✏️ on Date card → navigate back to Screen 4
- Tap ✏️ on Infos card → navigate back to Screen 5
- Tap "Confirmer" → Screen 7
- Tap "Retour" → Screen 5

=== SCREEN 7 — CONFIRMATION (Step 6/6) ===

Layout: white background, centered
- Progress bar: all 6 steps done (green checkmarks)

- Large success icon: circle #E8F5EE fill, #1A7A4A checkmark, 64px
- Title: "Rendez-vous confirmé !" — Sora Bold 24px, #12233A
- Confirmation card (white, shadow, radius 10px):
  "Numéro de réservation"
  #ATTT39257 — Sora Bold 20px, #1A4A8A

  Service: Visite périodique
  Date et heure: dimanche 1 mars 2026 – 09:30
  Centre: Centre Ben Arous
  Véhicule: 123 TU 1234

- Alert banner: #FFF8EC fill, #D4841A left border 3px
  "Important : Veuillez arriver 10 minutes avant l'heure de votre 
  rendez-vous avec votre carte grise et votre carte d'identité."

- Action buttons (full width, stacked):
  1. Secondary button: "↓ Télécharger PDF"
  2. Secondary button: "📅 Ajouter au calendrier"
  3. Primary button: "🏠 Retour à l'accueil" — #1A4A8A

Interactions:
- Tap "Retour à l'accueil" → navigate back to Screen 1 (reset flow)
- Tap "Télécharger PDF" → show a toast/snackbar: "PDF téléchargé ✓" — #1A7A4A
- Tap "Ajouter au calendrier" → show a toast/snackbar: "Ajouté au calendrier ✓"

=== PROTOTYPE CONNECTIONS SUMMARY ===

Screen 1 (Accueil) 
  → [COMMENCER button] → Screen 2

Screen 2 (Choix Service)
  → [Suivant] → Screen 3
  → [Retour] → Screen 1

Screen 3 (Choix Centre)
  → [Suivant] → Screen 4
  → [Retour] → Screen 2

Screen 4 (Date & Heure)
  → [Suivant] → Screen 5
  → [Retour] → Screen 3

Screen 5 (Informations)
  → [Continuer] → Screen 6
  → [Retour] → Screen 4

Screen 6 (Récapitulatif)
  → [Confirmer] → Screen 7
  → [Retour] → Screen 5
  → [Edit Service] → Screen 2
  → [Edit Centre] → Screen 3
  → [Edit Date] → Screen 4
  → [Edit Infos] → Screen 5

Screen 7 (Confirmation)
  → [Retour à l'accueil] → Screen 1

=== TRANSITION STYLE ===
All screen transitions: slide left (forward) / slide right (backward)
Duration: 300ms, ease-in-out
Toast notifications: fade in bottom, auto-dismiss after 2 seconds

=== MOBILE FRAME ===
Device: iPhone 14 (390×844px)
All touch targets minimum 44px height
Scrollable screens: 3, 4, 5, 6