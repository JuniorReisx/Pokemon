import * as React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { List } from '../components/List';
import { SearchBar, TypeFilterModal } from '../components/SearchBar';
import { fetchAllPokemonWithDetails, fetchPokemonTypes } from '../services/pokeApi';
import { colors, spacing } from '../theme';

export function ListScreen({ navigation }) {
  const [pokemon, setPokemon] = React.useState([]);
  const [types, setTypes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedType, setSelectedType] = React.useState(null);
  const [filterModalVisible, setFilterModalVisible] = React.useState(false);

  React.useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const [pokemonData, typesData] = await Promise.all([
          fetchAllPokemonWithDetails(151),
          fetchPokemonTypes(),
        ]);
        setPokemon(pokemonData);
        setTypes(typesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
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

  const handleItemPress = (item) => {
    navigation.navigate('Details', { pokemonId: item.id });
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setFilterModalVisible(false);
  };

  const listHeader = (
    <>
      <Header>
        <HeaderIcon>
          <Ionicons name="disc" size={28} color={colors.primaryDark} />
        </HeaderIcon>
        <HeaderTextContainer>
          <HeaderTitle>Pokémon Characters</HeaderTitle>
          <HeaderSubtitle>{filteredPokemon.length} Pokémon encontrados</HeaderSubtitle>
        </HeaderTextContainer>
      </Header>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onFilterPress={() => setFilterModalVisible(true)}
        selectedType={selectedType}
        onClearType={() => setSelectedType(null)}
      />
    </>
  );

  if (error) {
    return (
      <Screen>
        <ErrorContainer>
          <Ionicons name="cloud-offline-outline" size={48} color={colors.error} />
          <ErrorText>{error}</ErrorText>
          <RetryButton
            onPress={() => {
              setLoading(true);
              setError(null);
              fetchAllPokemonWithDetails(151)
                .then(setPokemon)
                .catch((err) => setError(err.message))
                .finally(() => setLoading(false));
            }}
          >
            <RetryText>Tentar novamente</RetryText>
          </RetryButton>
        </ErrorContainer>
      </Screen>
    );
  }

  return (
    <Screen>
      <List
        data={filteredPokemon}
        loading={loading}
        onItemPress={handleItemPress}
        ListHeaderComponent={listHeader}
      />
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
  padding: ${spacing.md}px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${spacing.lg}px;
  margin-top: ${spacing.sm}px;
`;

const HeaderIcon = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${colors.headerBg};
  align-items: center;
  justify-content: center;
  margin-right: ${spacing.md}px;
`;

const HeaderTextContainer = styled.View`
  flex: 1;
`;

const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: 800;
  color: ${colors.textPrimary};
  letter-spacing: -0.5px;
`;

const HeaderSubtitle = styled.Text`
  font-size: 13px;
  color: ${colors.textSecondary};
  margin-top: 2px;
  font-weight: 500;
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
  background-color: ${colors.primary};
  padding: ${spacing.sm}px ${spacing.lg}px;
  border-radius: 12px;
`;

const RetryText = styled.Text`
  color: ${colors.white};
  font-weight: 700;
  font-size: 15px;
`;
