import { FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { PokemonListItem } from './PokemonListItem';
import { colors, spacing } from '../theme';

export function List({ data, onItemPress, loading, ListHeaderComponent }) {
  if (loading && data.length === 0) {
    return (
      <LoadingWrapper>
        {ListHeaderComponent}
        <LoadingContainer>
          <ActivityIndicator size="large" color={colors.primary} />
          <LoadingText>Carregando Pokémon...</LoadingText>
        </LoadingContainer>
      </LoadingWrapper>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <PokemonListItem pokemon={item} onPress={onItemPress} />
      )}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={
        <EmptyContainer>
          <EmptyText>Nenhum Pokémon encontrado</EmptyText>
          <EmptySubtext>Tente outro nome ou tipo</EmptySubtext>
        </EmptyContainer>
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: spacing.xl, flexGrow: 1 }}
    />
  );
}

const LoadingWrapper = styled.View`
  flex: 1;
`;

const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${spacing.xl}px;
`;

const LoadingText = styled.Text`
  margin-top: ${spacing.md}px;
  font-size: 15px;
  color: ${colors.textSecondary};
  font-weight: 500;
`;

const EmptyContainer = styled.View`
  align-items: center;
  padding: ${spacing.xl}px;
  margin-top: ${spacing.xl}px;
`;

const EmptyText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.textPrimary};
`;

const EmptySubtext = styled.Text`
  font-size: 14px;
  color: ${colors.textSecondary};
  margin-top: ${spacing.xs}px;
`;
