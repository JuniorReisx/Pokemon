export const colors = {
  white: '#FFFFFF',
  black: '#000000',
  background: '#0C0C0C',
  surface: '#161616',
  surfaceElevated: '#1F1F1F',
  card: '#1A1A1A',
  border: '#2A2A2A',
  textPrimary: '#FFFFFF',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  primary: '#4ADE80',
  primaryDark: '#22C55E',
  accent: '#FACC15',
  headerBg: '#1F1F1F',
  error: '#EF4444',
  hp: '#FF5959',
  statGreen: '#4ADE80',
  shadow: 'rgba(0, 0, 0, 0.4)',
  overlay: 'rgba(0, 0, 0, 0.6)',
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
  xxl: 32,
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

export function getTotalStats(stats = []) {
  return stats.reduce((sum, stat) => sum + stat.value, 0);
}

export function getStatBarColor(statName) {
  return statName === 'hp' ? colors.hp : colors.statGreen;
}
