# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start                          # dev server (CRA, port 3000)
PORT=3003 npm start                # if 3000/3001 occupied
CI=false npm run build             # production build (suppress warnings as errors)
npx tsc --noEmit                   # type-check without building
npm test -- --testPathPattern=<file>  # single test file
```

## Architecture

Standalone mini-games platform extracted from `truco-venezolano-react-ts`. No react-router — string-based navigation only.

### Screen routing

`src/App.tsx` owns all routing. `navigateTo(screen)` casts the string to the `Screen` union type. Five screens: `main-screen`, `siete-medio-screen`, `brisca-screen`, `chinchon-screen`, `veintiuno-screen`.

### File map

| File | Role |
|------|------|
| `src/types/index.ts` | All shared types: `Card`, `AICharacter`, `BaseScreenProps`, `DECKS`, `BOARDS`, `AVATARS`, `suitFileMap` |
| `src/utils/cards.ts` | 40-card Spanish deck definitions + `shuffleDeck()`. Also contains Truco helpers (Perico/Perica, envido, flor) — these are unused here but kept for parity |
| `src/utils/sieteMedioLogic.ts` | Siete y Medio engine: card value (figures = 0.5), hand total, bust/win checks, AI decision |
| `src/utils/briscaLogic.ts` | Brisca engine: trump suit, trick evaluation, score |
| `src/utils/chinchonLogic.ts` | Chinchón engine: meld detection (runs/sets), closing hand, scoring |
| `src/utils/veintiunoLogic.ts` | Veintiuno (Blackjack-style) engine: Ace 1/11, dealer-at-17 rule, 3:2 blackjack payout |
| `src/utils/avatarMoods.ts` | Avatar mood transitions; no GameState dependency |
| `src/data/aiCharacters.ts` | 7 AI opponents (`AI_CHARACTERS` record keyed by display name) |
| `src/styles/App.css` | Global reset + layout; imports `variables.css` |
| `src/styles/components.css` | All component styles. Base classes use `.sm-*` prefix (from Siete y Medio, reused across games). Game-specific: `.chinchon-*`, `.brisca-*`, `.veintiuno-*`. Platform main menu: `.cv-*` |

### Card image paths

Image file name: `{value}-{suitFileMap[suit]}.jpg`

```typescript
suitFileMap = { espadas: 'espadas', bastos: 'treboles', oros: 'diamantes', copas: 'corazones' }
```

Values 8 and 9 do not exist. Figures: 10 = Sota, 11 = Caballo, 12 = Rey.

Other asset paths:
- Card back: `/images/card-back.jpg`
- Deck previews: `/images/decks/{deckName}/deck-preview.jpg` — deckName from `DECKS` = `['default', 'europea', 'moderna', 'especial']`
- Board backgrounds: `/images/backgrounds/{boardName}.jpg` — boardName from `BOARDS` = `['tablero-cama.jpg', ...]`
- Avatars: `/images/avatars/{avatarName}-{mood}.jpg` — moods: `default | happy | sad | smug`
- Player avatar: `/images/avatars/player-{mood}.jpg` (special path, not keyed by name)
- Only `avatar1` has all 4 moods; others fall back to `avatar1-{mood}.jpg` via `getSmartFallbackPath`

### Mobile layout

Setup screens use a tab system (mobile-only, CSS-toggled):
- `.sm-setup-tabs` / `.sm-tab-btn` / `.sm-tab-btn.active` — tab bar, hidden on desktop
- `.sm-setup-panel` — tab content, hidden on desktop
- `.sm-setup-top-row` — flat desktop layout, `display: none !important` on mobile via `@media (max-width: 768px)`
- `.sm-setup-desktop-opponents` — desktop opponent list, same hide rule

Cards on mobile: 80×112px at ≤480px, 88×123px at ≤768px (roughly 2× desktop).

Chinchón hand: `flex-wrap: nowrap; overflow-x: auto` to handle 7 cards at large size.

### AI characters

`src/data/aiCharacters.ts` exports `AI_CHARACTERS` (Record keyed by name). Each game screen calls `getActiveAICharacters()` (filters `activo: true`). Traits: `agresividad`, `riesgo`, `blufeo`, `consistencia` (1–10 scale).
