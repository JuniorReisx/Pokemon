import * as React from 'react';
import { ActivityIndicator, Animated, Image, ScrollView, Share } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TypeBadge } from '../components/TypeBadge';
import { StatBar } from '../components/StatBar';
import { BottomNav } from '../components/BottomNav';
import { fetchPokemonDetails, normalizePokemon } from '../services/pokeApi';
import {
  colors,
  formatHeight,
  formatName,
  formatWeight,
  getPrimaryTypeColor,
  getTotalStats,
  radius,
  spacing,
} from '../theme';

const STAT_LABELS = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

const STAT_ORDER = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
const TABS = ['ABOUT', 'STATS'];

export function DetailsScreen({ route, navigation }) {
  const { pokemonId, pokemon: cachedPokemon } = route.params;
  const [pokemon, setPokemon] = React.useState(cachedPokemon || null);
  const [loading, setLoading] = React.useState(!cachedPokemon);
  const [error, setError] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState('STATS');
  const imageScale = React.useRef(new Animated.Value(0.85)).current;
  const imageOpacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    let cancelled = false;

    async function loadPokemon() {
      try {
        if (!cachedPokemon) {
          setLoading(true);
        }
        setError(null);
        const data = await fetchPokemonDetails(pokemonId);
        if (!cancelled) {
          setPokemon(normalizePokemon(data));
        }
      } catch (err) {
        if (!cancelled && !cachedPokemon) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPokemon();

    return () => {
      cancelled = true;
    };
  }, [pokemonId, cachedPokemon]);

  React.useEffect(() => {
    if (pokemon) {
      navigation.setOptions({ headerShown: false });
      imageScale.setValue(0.85);
      imageOpacity.setValue(0);
      Animated.parallel([
        Animated.spring(imageScale, {
          toValue: 1,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.timing(imageOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [pokemon, navigation, imageScale, imageOpacity]);

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

  if (loading && !pokemon) {
    return (
      <LoadingScreen>
        <ActivityIndicator size="large" color={colors.primary} />
      </LoadingScreen>
    );
  }

  if (error || !pokemon) {
    return (
      <LoadingScreen>
        <ErrorText>{error || 'Pokémon not found'}</ErrorText>
      </LoadingScreen>
    );
  }

  const accentColor = getPrimaryTypeColor(pokemon.types);
  const orderedStats = STAT_ORDER.map((name) =>
    pokemon.stats.find((stat) => stat.name === name)
  ).filter(Boolean);
  const totalStats = getTotalStats(pokemon.stats);

  return (
    <Screen edges={['top']}>
      <HeroSection accentColor={accentColor}>
        <Petals />
        <PetalsSecondary />
        <TopBar>
          <BackButton onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={colors.white} />
          </BackButton>
          <HeroTitle>{formatName(pokemon.name)}</HeroTitle>
          <ShareIconButton onPress={handleShare}>
            <Ionicons name="share-social-outline" size={22} color={colors.white} />
          </ShareIconButton>
        </TopBar>
        <AnimatedImageWrapper
          style={{
            opacity: imageOpacity,
            transform: [{ scale: imageScale }],
          }}
        >
          <PokemonImage source={{ uri: pokemon.image }} resizeMode="contain" />
        </AnimatedImageWrapper>
      </HeroSection>

      <DetailsSheet>
        <SheetHandle />
        <TabsRow>
          {TABS.map((tab) => (
            <TabButton key={tab} onPress={() => setActiveTab(tab)}>
              <TabText active={activeTab === tab}>{tab}</TabText>
              {activeTab === tab && <TabDot accentColor={accentColor} />}
            </TabButton>
          ))}
        </TabsRow>

        <ScrollView showsVerticalScrollIndicator={false}>
          {activeTab === 'ABOUT' ? (
            <AboutContent>
              <AboutRow>
                <AboutLabel>Types</AboutLabel>
                <TypesRow>
                  {pokemon.types.map((type) => (
                    <TypeBadge key={type} type={type} />
                  ))}
                </TypesRow>
              </AboutRow>
              <AboutRow>
                <AboutLabel>Height</AboutLabel>
                <AboutValue>{formatHeight(pokemon.height)}</AboutValue>
              </AboutRow>
              <AboutRow>
                <AboutLabel>Weight</AboutLabel>
                <AboutValue>{formatWeight(pokemon.weight)}</AboutValue>
              </AboutRow>
              <AboutRow>
                <AboutLabel>Number</AboutLabel>
                <AboutValue>#{String(pokemon.id).padStart(3, '0')}</AboutValue>
              </AboutRow>
              <AboutRow>
                <AboutLabel>Total Stats</AboutLabel>
                <AboutValue highlight>{totalStats}</AboutValue>
              </AboutRow>
              <ShareButton onPress={handleShare} accentColor={accentColor} activeOpacity={0.9}>
                <Ionicons name="share-social-outline" size={20} color={colors.white} />
                <ShareButtonText>Share</ShareButtonText>
              </ShareButton>
            </AboutContent>
          ) : (
            <StatsContent>
              {orderedStats.map((stat, index) => (
                <StatBar key={stat.name} stat={stat} delay={index * 80} />
              ))}
              <ShareButton onPress={handleShare} accentColor={accentColor} activeOpacity={0.9}>
                <Ionicons name="share-social-outline" size={20} color={colors.white} />
                <ShareButtonText>Share</ShareButtonText>
              </ShareButton>
            </StatsContent>
          )}
        </ScrollView>
      </DetailsSheet>

      <BottomNav active="home" />
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
  height: 340px;
  background-color: ${({ accentColor }) => accentColor};
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Petals = styled.View`
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  top: 80px;
  left: 30px;
`;

const PetalsSecondary = styled.View`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.15);
  top: 120px;
  right: 50px;
`;

const TopBar = styled.View`
  position: absolute;
  top: ${spacing.md}px;
  left: ${spacing.md}px;
  right: ${spacing.md}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
`;

const BackButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  align-items: center;
  justify-content: center;
`;

const HeroTitle = styled.Text`
  font-size: 20px;
  font-weight: 800;
  color: ${colors.white};
  flex: 1;
  text-align: center;
`;

const ShareIconButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  align-items: center;
  justify-content: center;
`;

const AnimatedImageWrapper = styled(Animated.View)`
  align-items: center;
  justify-content: center;
  margin-top: ${spacing.xl}px;
`;

const PokemonImage = styled(Image)`
  width: 260px;
  height: 260px;
`;

const DetailsSheet = styled.View`
  flex: 1;
  background-color: ${colors.surface};
  border-top-left-radius: ${radius.xxl}px;
  border-top-right-radius: ${radius.xxl}px;
  margin-top: -${spacing.xl}px;
  padding: ${spacing.md}px ${spacing.lg}px 0;
`;

const SheetHandle = styled.View`
  width: 40px;
  height: 4px;
  background-color: ${colors.border};
  border-radius: ${radius.full}px;
  align-self: center;
  margin-bottom: ${spacing.lg}px;
`;

const TabsRow = styled.View`
  flex-direction: row;
  margin-bottom: ${spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
`;

const TabButton = styled.TouchableOpacity`
  margin-right: ${spacing.lg}px;
  padding-bottom: ${spacing.sm}px;
  align-items: center;
`;

const TabText = styled.Text`
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
  color: ${({ active }) => (active ? colors.textPrimary : colors.textMuted)};
`;

const TabDot = styled.View`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${({ accentColor }) => accentColor};
  margin-top: ${spacing.xs}px;
`;

const AboutContent = styled.View`
  padding-bottom: ${spacing.xl}px;
`;

const AboutRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: ${spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
`;

const AboutLabel = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const AboutValue = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${({ highlight }) => (highlight ? colors.primary : colors.textPrimary)};
`;

const TypesRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  flex: 1;
  margin-left: ${spacing.md}px;
`;

const StatsContent = styled.View`
  padding-bottom: ${spacing.xl}px;
`;

const ShareButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ accentColor }) => accentColor || colors.primaryDark};
  padding: ${spacing.md}px;
  border-radius: ${radius.xl}px;
  margin-top: ${spacing.lg}px;
`;

const ShareButtonText = styled.Text`
  color: ${colors.white};
  font-size: 16px;
  font-weight: 700;
  margin-left: ${spacing.sm}px;
`;
