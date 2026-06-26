export const colors = {
  white: '#FFFFFF',
  black: '#1A1A2E',
  background: '#F0F4F8',
  surface: '#FFFFFF',
  border: '#E2E8F0',
  textPrimary: '#1A1A2E',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  primary: '#2D6A4F',
  primaryDark: '#1B4332',
  primaryLight: '#40916C',
  accent: '#52B788',
  headerBg: '#D8F3DC',
  error: '#EF4444',
  shadow: 'rgba(45, 106, 79, 0.15)',
};

export const TYPE_COLORS = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export function getPokemonImageUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function formatName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function formatHeight(decimeters) {
  return `${(decimeters / 10).toFixed(1)} m`;
}

export function formatWeight(hectograms) {
  return `${(hectograms / 10).toFixed(1)} kg`;
}

export function getPrimaryTypeColor(types = []) {
  const primaryType = types[0]?.toLowerCase();
  return TYPE_COLORS[primaryType] || colors.primary;
}
