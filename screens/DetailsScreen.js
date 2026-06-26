import * as React from 'react';
import { ActivityIndicator, Image, ScrollView, Share } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TypeBadge } from '../components/TypeBadge';
import { StatBar } from '../components/StatBar';
import { fetchPokemonDetails, normalizePokemon } from '../services/pokeApi';
import {
  colors,
  formatHeight,
  formatName,
  formatWeight,
  getPrimaryTypeColor,
  radius,
  spacing,
} from '../theme';

const STAT_LABELS = {
  hp: 'Hp',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

export function DetailsScreen({ route, navigation }) {
  const { pokemonId } = route.params;
  const [pokemon, setPokemon] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function loadPokemon() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPokemonDetails(pokemonId);
        setPokemon(normalizePokemon(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPokemon();
  }, [pokemonId]);

  React.useEffect(() => {
    if (pokemon) {
      navigation.setOptions({ title: formatName(pokemon.name) });
    }
  }, [pokemon, navigation]);

  const handleShare = async () => {
    if (!pokemon) return;

    const statsText = pokemon.stats
      .map((stat) => {
        const label = STAT_LABELS[stat.name] || formatName(stat.name);
        return `${label}: ${stat.value}`;
      })
      .join('\n');

    const typesText = pokemon.types.map((t) => formatName(t)).join(' / ');

    const message = [
      `🎮 ${formatName(pokemon.name)} (#${pokemon.id})`,
      `Type: ${typesText}`,
      `Height: ${formatHeight(pokemon.height)} | Weight: ${formatWeight(pokemon.weight)}`,
      '',
      'Base Stats:',
      statsText,
      '',
      'Shared from Pokédex - Taqtile Challenge',
    ].join('\n');

    try {
      await Share.share({ message });
    } catch (err) {
      // User cancelled share
    }
  };

  if (loading) {
    return (
      <LoadingScreen>
        <ActivityIndicator size="large" color={colors.primary} />
      </LoadingScreen>
    );
  }

  if (error || !pokemon) {
    return (
      <LoadingScreen>
        <ErrorText>{error || 'Pokémon não encontrado'}</ErrorText>
      </LoadingScreen>
    );
  }

  const accentColor = getPrimaryTypeColor(pokemon.types);
  const mainStats = pokemon.stats.filter((stat) =>
    ['hp', 'attack', 'defense'].includes(stat.name)
  );

  return (
    <Screen edges={['bottom']}>
      <HeroSection accentColor={accentColor}>
        <HeroPattern />
        <TypesRow>
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </TypesRow>
        <PokemonImage source={{ uri: pokemon.image }} resizeMode="contain" />
        <PokemonId>#{String(pokemon.id).padStart(3, '0')}</PokemonId>
      </HeroSection>

      <DetailsCard>
        <CardHandle />
        <ScrollView showsVerticalScrollIndicator={false}>
          <TraitsRow>
            <TraitItem>
              <TraitValue>{formatHeight(pokemon.height)}</TraitValue>
              <TraitLabel>Height</TraitLabel>
            </TraitItem>
            <TraitDivider />
            <TraitItem>
              <TraitValue>{formatWeight(pokemon.weight)}</TraitValue>
              <TraitLabel>Weight</TraitLabel>
            </TraitItem>
          </TraitsRow>

          <SectionTitle>Base Stats</SectionTitle>
          {mainStats.map((stat) => (
            <StatBar key={stat.name} stat={stat} />
          ))}

          <ShareButton onPress={handleShare} accentColor={accentColor}>
            <Ionicons name="share-social-outline" size={20} color={colors.white} />
            <ShareButtonText>Share</ShareButtonText>
          </ShareButton>
        </ScrollView>
      </DetailsCard>
    </Screen>
  );
}

const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const LoadingScreen = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${colors.background};
`;

const ErrorText = styled.Text`
  font-size: 16px;
  color: ${colors.textSecondary};
`;

const HeroSection = styled.View`
  height: 320px;
  background-color: ${({ accentColor }) => accentColor}33;
  align-items: center;
  justify-content: center;
  padding-top: ${spacing.md}px;
  overflow: hidden;
`;

const HeroPattern = styled.View`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: rgba(255, 255, 255, 0.3);
  top: -40px;
  right: -40px;
`;

const TypesRow = styled.View`
  flex-direction: row;
  position: absolute;
  top: ${spacing.md}px;
  left: ${spacing.lg}px;
  z-index: 1;
`;

const PokemonImage = styled(Image)`
  width: 240px;
  height: 240px;
`;

const PokemonId = styled.Text`
  position: absolute;
  bottom: ${spacing.lg}px;
  right: ${spacing.lg}px;
  font-size: 48px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.06);
  letter-spacing: -2px;
`;

const DetailsCard = styled.View`
  flex: 1;
  background-color: ${colors.surface};
  border-top-left-radius: ${radius.xl}px;
  border-top-right-radius: ${radius.xl}px;
  margin-top: -${spacing.xl}px;
  padding: ${spacing.lg}px;
  shadow-color: ${colors.black};
  shadow-offset: 0px -4px;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  elevation: 8;
`;

const CardHandle = styled.View`
  width: 40px;
  height: 4px;
  background-color: ${colors.border};
  border-radius: ${radius.full}px;
  align-self: center;
  margin-bottom: ${spacing.lg}px;
`;

const TraitsRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: ${spacing.lg}px;
  padding-bottom: ${spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
`;

const TraitItem = styled.View`
  flex: 1;
  align-items: center;
`;

const TraitValue = styled.Text`
  font-size: 22px;
  font-weight: 800;
  color: ${colors.textPrimary};
`;

const TraitLabel = styled.Text`
  font-size: 13px;
  color: ${colors.textSecondary};
  margin-top: ${spacing.xs}px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TraitDivider = styled.View`
  width: 1px;
  height: 40px;
  background-color: ${colors.border};
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin-bottom: ${spacing.md}px;
`;

const ShareButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ accentColor }) => accentColor || colors.primary};
  padding: ${spacing.md}px;
  border-radius: ${radius.lg}px;
  margin-top: ${spacing.md}px;
  shadow-color: ${({ accentColor }) => accentColor || colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 4;
`;

const ShareButtonText = styled.Text`
  color: ${colors.white};
  font-size: 17px;
  font-weight: 700;
  margin-left: ${spacing.sm}px;
`;
