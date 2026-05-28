# Cartas Venezolanas

Plataforma de mini-juegos de cartas con baraja española de 40 cartas. React 18 + TypeScript, sin router, navegación por strings.

## Juegos incluidos

| Juego | Descripción |
|-------|-------------|
| **Siete y Medio** | Acércate a 7½ sin pasarte. Figuras valen ½ punto. |
| **Brisca** | Captura cartas de valor con el palo de triunfo. |
| **Chinchón** | Forma escaleras o grupos con 7 cartas. Cierra cuando ganes. |
| **Veintiuno** | Llega a 21 sin pasarte. Blackjack 2 cartas paga 3:2. |

Cada juego incluye 7 oponentes con IA de personalidad, apuestas, avatares con moods y selección de baraja/mesa.

## Comandos

```bash
npm start                   # dev server (CRA, port 3000)
PORT=3003 npm start         # puerto alternativo
CI=false npm run build      # build producción
npx tsc --noEmit            # type-check
```

## Stack

- React 18 / TypeScript / CRA (react-scripts)
- Sin react-router — navegación string-based en `App.tsx`
- Baraja española 40 cartas (sin 8 y 9; figuras: 10=Sota, 11=Caballo, 12=Rey)
- 4 mazos visuales: default, europea, moderna, especial
- 4 tableros: cama, mesa, grama, salon

## Arquitectura

```
src/
  App.tsx                    # routing, screen state
  components/
    MainScreen.tsx            # menú principal
    SieteMedioScreen.tsx
    BriscaScreen.tsx
    ChinchonScreen.tsx
    VeintiunoScreen.tsx
  utils/
    sieteMedioLogic.ts        # engine 7½
    briscaLogic.ts            # engine brisca
    chinchonLogic.ts          # engine chinchón (melds, cierre)
    veintiunoLogic.ts         # engine 21 (As 1/11, dealer@17, BJ 3:2)
    avatarMoods.ts            # mood transitions + fallback paths
    cards.ts                  # definición baraja + shuffle
  data/
    aiCharacters.ts           # 7 oponentes IA (activo: true/false)
  types/index.ts              # tipos compartidos, DECKS, BOARDS, AVATARS
  styles/
    App.css                   # reset global + game-canvas
    components.css            # todos los estilos (.sm-*, .brisca-*, .chinchon-*, .cv-*)
```

## Mobile

- Responsive: 375px (iPhone SE) → 768px (tablet) → 1024px+ (desktop)
- Cartas: 62×87px (≤480px) · 80×112px (≤768px) · 100×140px (≥1024px) — mismo tamaño en todos los juegos
- Mano del jugador: máximo 4 cartas por fila, overflow en segunda fila
- Setup: tabs BARAJA / MESA / OPONENTE en móvil; layout plano en desktop
- Canvas fullscreen en móvil (`position: fixed; 100vw × 100vh`)

## Rutas de imágenes

```
public/images/
  card-back.jpg
  cover.mp4 / cover-mobile.mp4
  cover.jpg / cover-mobile.jpg
  decks/{default,europea,moderna,especial}/deck-preview.jpg
  backgrounds/{tablero-cama,mesa,grama,salon}.jpg
  avatars/avatar{1-7}-{default,happy,sad,smug}.jpg
          player-{default,happy,sad,smug}.jpg
```

Solo `avatar1` tiene los 4 moods; los demás hacen fallback a `avatar1-{mood}.jpg` vía `getSmartFallbackPath`.
