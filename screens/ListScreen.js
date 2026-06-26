import * as React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { List } from '../components/List';
import { SearchBar, TypeFilterModal } from '../components/SearchBar';
import { BottomNav } from '../components/BottomNav';
import { fetchAllPokemonWithDetails, fetchPokemonTypes } from '../services/pokeApi';
import { colors, spacing } from '../theme';

export function ListScreen({ navigation }) {
  const [pokemon, setPokemon] = React.useState([]);
  const [types, setTypes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedType, setSelectedType] = React.useState(null);
  const [filterModalVisible, setFilterModalVisible] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        setLoading(true);
        setLoadingMore(false);
        setError(null);

        const typesData = await fetchPokemonTypes();
        if (cancelled) return;
        setTypes(typesData);

        await fetchAllPokemonWithDetails(151, (batch, isComplete) => {
          if (cancelled) return;
          setPokemon(batch);
          setLoading(false);
          setLoadingMore(!isComplete);
        });
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
          setLoadingMore(false);
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredPokemon = React.useMemo(() => {
    return pokemon.filter((item) => {
      const matchesName = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());
      const matchesType =
        !selectedType ||
        item.types.some((type) => type.toLowerCase() === selectedType.toLowerCase());
      return matchesName && matchesType;
    });
  }, [pokemon, searchQuery, selectedType]);

  const handleItemPress = React.useCallback(
    (item) => {
      navigation.navigate('Details', { pokemonId: item.id, pokemon: item });
    },
    [navigation]
  );

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setFilterModalVisible(false);
  };

  const listHeader = (
    <>
      <TopBar>
        <MenuButton>
          <Ionicons name="menu" size={24} color={colors.textPrimary} />
        </MenuButton>
        <Avatar>
          <Ionicons name="person" size={18} color={colors.textSecondary} />
        </Avatar>
      </TopBar>
      <HeaderTitle>What Are You{'\n'}Looking For?</HeaderTitle>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onFilterPress={() => setFilterModalVisible(true)}
        selectedType={selectedType}
        onClearType={() => setSelectedType(null)}
      />
      {!loading && (
        <ResultCount>
          {loadingMore
            ? `${pokemon.length} of 151 loaded`
            : `${filteredPokemon.length} Pokémon`}
        </ResultCount>
      )}
    </>
  );

  if (error) {
    return (
      <Screen edges={['top']}>
        <ErrorContainer>
          <Ionicons name="cloud-offline-outline" size={48} color={colors.error} />
          <ErrorText>{error}</ErrorText>
          <RetryButton
            onPress={() => {
              setLoading(true);
              setError(null);
              fetchAllPokemonWithDetails(151, (batch, isComplete) => {
                setPokemon(batch);
                setLoading(false);
                setLoadingMore(!isComplete);
              }).catch((err) => setError(err.message));
            }}
          >
            <RetryText>Try again</RetryText>
          </RetryButton>
        </ErrorContainer>
      </Screen>
    );
  }

  return (
    <Screen edges={['top']}>
      <List
        data={filteredPokemon}
        loading={loading}
        loadingMore={loadingMore}
        onItemPress={handleItemPress}
        ListHeaderComponent={listHeader}
      />
      <BottomNav active="home" />
      <TypeFilterModal
        visible={filterModalVisible}
        types={types}
        selectedType={selectedType}
        onSelect={handleTypeSelect}
        onClose={() => setFilterModalVisible(false)}
      />
    </Screen>
  );
}

const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
  padding-horizontal: ${spacing.md}px;
`;

const TopBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.lg}px;
  margin-top: ${spacing.sm}px;
`;

const MenuButton = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${colors.surfaceElevated};
  align-items: center;
  justify-content: center;
`;

const Avatar = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${colors.surfaceElevated};
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-color: ${colors.border};
`;

const HeaderTitle = styled.Text`
  font-size: 28px;
  font-weight: 800;
  color: ${colors.textPrimary};
  letter-spacing: -0.5px;
  line-height: 34px;
  margin-bottom: ${spacing.lg}px;
`;

const ResultCount = styled.Text`
  font-size: 13px;
  color: ${colors.textMuted};
  font-weight: 500;
  margin-bottom: ${spacing.sm}px;
  margin-top: -${spacing.sm}px;
`;

const ErrorContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${spacing.xl}px;
`;

const ErrorText = styled.Text`
  font-size: 16px;
  color: ${colors.textSecondary};
  text-align: center;
  margin-top: ${spacing.md}px;
  margin-bottom: ${spacing.lg}px;
`;

const RetryButton = styled.TouchableOpacity`
  background-color: ${colors.primaryDark};
  padding: ${spacing.sm}px ${spacing.lg}px;
  border-radius: ${spacing.md}px;
`;

const RetryText = styled.Text`
  color: ${colors.white};
  font-weight: 700;
  font-size: 15px;
`;
