const BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemonList(limit = 151) {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon list');
  }
  return response.json();
}

export async function fetchPokemonDetails(nameOrId) {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon: ${nameOrId}`);
  }
  return response.json();
}

export async function fetchPokemonTypes() {
  const response = await fetch(`${BASE_URL}/type?limit=30`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon types');
  }
  const data = await response.json();
  const excluded = ['unknown', 'shadow', 'stellar'];
  return data.results
    .map((type) => type.name)
    .filter((name) => !excluded.includes(name));
}

export function normalizePokemon(pokemon) {
  const artwork =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return {
    id: pokemon.id,
    name: pokemon.name,
    image: artwork,
    types: pokemon.types.map((entry) => entry.type.name),
    height: pokemon.height,
    weight: pokemon.weight,
    stats: pokemon.stats.map((entry) => ({
      name: entry.stat.name,
      value: entry.base_stat,
    })),
  };
}

export async function fetchAllPokemonWithDetails(limit = 151) {
  const listData = await fetchPokemonList(limit);
  const batchSize = 30;
  const results = [];

  for (let i = 0; i < listData.results.length; i += batchSize) {
    const batch = listData.results.slice(i, i + batchSize);
    const batchDetails = await Promise.all(
      batch.map((item) => fetchPokemonDetails(item.name))
    );
    results.push(...batchDetails.map(normalizePokemon));
  }

  return results.sort((a, b) => a.id - b.id);
}
