
# Gil Maik - Taqtile Case

A Pokedex application built with React Native (Expo) as part of the technical challenge for Taqtile's internship program. The app consumes the [PokeAPI](https://pokeapi.co/) to list the first 151 Pokémon, display details and stats for each one, allow search and filtering by type, and share information about the selected Pokémon.

## 🚀 Live Demo

[**Open on Expo Snack**](https://snack.expo.dev/@juniorreisx/gil-maik---taqtile-case?platform=web)

## 🎯 Features

- **Pokémon listing**: list with image, name, and type(s) for each Pokémon, rendered with `FlatList`.
- **Search and filter**: search bar by name, with an additional filter by type.
- **Details page**: displays image, types, and stats (HP, Attack, Defense, etc.) for the selected Pokémon, with navigation via `react-navigation`.
- **Sharing**: button on the details screen to share the Pokémon's stats via the native share API.
- **Dark theme** consistent across the whole navigation flow.
- **Styling** done entirely with `styled-components`, no `StyleSheet` usage.

## 🛠️ Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/) (Snack)
- [React Navigation](https://reactnavigation.org/) (Stack Navigator)
- [styled-components](https://styled-components.com/)
- [PokeAPI](https://pokeapi.co/) (REST)
- `expo-status-bar`, `react-native-safe-area-context`

## 📂 Project Structure

```
.
├── App.js                          # Navigation and theme setup
├── screens/
│   ├── ListScreen.js                # List screen (FlatList + search/filter)
│   └── DetailsScreen.js             # Details and stats screen
├── components/
│   ├── List.js                      # FlatList wrapper with skeleton/empty states
│   ├── PokemonListItem.js           # List item (image, name, type)
│   ├── PokemonListItemSkeleton.js   # Loading skeleton
│   ├── SearchBar.js                 # Search/filter bar
│   ├── StatBar.js                   # Stat bar (HP, ATK, DEF...)
│   ├── TypeBadge.js                 # Pokémon type badge
│   └── BottomNav.js                 # Bottom navigation bar
├── services/                        # PokeAPI integration
├── theme/                           # Colors and theme (light/dark)
└── references.txt                   # References used during development
```

## ▶️ How to Run

### Via Snack (recommended)
1. Open the project: [snack.expo.dev/@juniorreisx/gil-maik---taqtile-case](https://snack.expo.dev/@juniorreisx/gil-maik---taqtile-case?platform=web)
2. Choose **Web**, **iOS**, or **Android** in the preview panel, or scan the QR Code with the Expo Go app on your phone.

### Locally
```bash
git clone https://github.com/JuniorReisx/Pokemon.git
cd Pokemon
npm install
npm start
```
Then open it in an emulator, a physical device (via Expo Go), or the browser.

## 🔌 API Integration

- Pokémon list: `GET https://pokeapi.co/api/v2/pokemon`
- Pokémon details: `GET https://pokeapi.co/api/v2/pokemon/{name or id}`
- High-resolution artwork:
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png`

## Technical Decisions

Notes on choices made during development:

- **Treated this as onboarding into an existing project**, not a greenfield build. I kept the folder structure and styling patterns from the starter template instead of reorganizing everything to match personal preference.

- **`styled-components` across the entire app** — the project already used this approach; staying consistent avoids mixing `StyleSheet` with styled components and makes it easier to reuse tokens from `theme/`.

- **Skeleton loader on the list** — the PokeAPI can be slow when fetching details for many Pokémon. A skeleton communicates loading state better than a blank screen or a centered spinner.

- **Batch loading (30 at a time)** — each Pokémon requires an individual request. Data is fetched in batches and the list updates progressively, with an "X of 151 loaded" indicator.

- **Search and filter in one component, local filtering** — name search and type filter live in the same bar to keep the UI clean. Once all 151 Pokémon are in memory, filtering runs locally via `useMemo` with no extra API calls.

- **Did not follow the Figma pixel-perfect** — the challenge states the design does not need to be identical; I prioritized consistency with the dark theme already set up in `App.js`.

- **With more time** — unit tests for `services/pokeApi.js`, local cache/persistence, real API pagination instead of loading all 151 at once, and debounced search if the list grew significantly.

## 📚 References

The references used during development are listed in [`references.txt`](./references.txt).

## 👤 Author

Gil Maik
