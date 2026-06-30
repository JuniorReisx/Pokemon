
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
│   ├── PokemonListItem.js           # List item (image, name, type)
│   ├── PokemonListItemSqueleton.js  # Loading skeleton
│   ├── PesquisaBar.js               # Search/filter bar
│   ├── StatBar.js                   # Stat bar (HP, ATK, DEF...)
│   └── TipoBadge.js                 # Pokémon type badge
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

## 📌 Technical Decisions

> Space for you to describe specific choices, for example:
- Why `styled-components` was chosen over `StyleSheet`.
- How loading/error states are handled for API calls (e.g., skeleton while loading).
- How search by name + filter by type was implemented (debounce, local filtering vs. new API calls, etc.).
- Theme structure (colors, dark mode).

## 📚 References

The references used during development are listed in [`references.txt`](./references.txt).

## 👤 Author

Gil Maik
