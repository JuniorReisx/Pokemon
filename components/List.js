import * as React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { PokemonListItem } from './PokemonListItem';
import { PokemonListItemSkeleton } from './PokemonListItemSkeleton';
import { colors, spacing } from '../theme';

const SKELETON_COUNT = 6;

export function List({
  data,
  onItemPress,
  loading,
  loadingMore,
  ListHeaderComponent,
}) {
  const renderItem = React.useCallback(
    ({ item }) => <PokemonListItem pokemon={item} onPress={onItemPress} />,
    [onItemPress]
  );

  const keyExtractor = React.useCallback((item) => String(item.id), []);

  const listFooter = loadingMore ? (
    <FooterLoader>
      <ActivityIndicator size="small" color={colors.primary} />
      <FooterText>Loading more Pokémon...</FooterText>
    </FooterLoader>
  ) : null;

  if (loading && data.length === 0) {
    return (
      <LoadingWrapper>
        {ListHeaderComponent}
        <SkeletonGrid>
          {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <PokemonListItemSkeleton key={index} />
          ))}
        </SkeletonGrid>
      </LoadingWrapper>
    );
  }

  return (
    <FlatList
      data={data}
      numColumns={2}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={listFooter}
      ListEmptyComponent={
        <EmptyContainer>
          <EmptyText>No Pokémon found</EmptyText>
          <EmptySubtext>Try another name or type</EmptySubtext>
        </EmptyContainer>
      }
      showsVerticalScrollIndicator={false}
      initialNumToRender={10}
      maxToRenderPerBatch={8}
      windowSize={7}
      removeClippedSubviews
      contentContainerStyle={{ paddingBottom: spacing.md, flexGrow: 1 }}
    />
  );
}

const LoadingWrapper = styled.View`
  flex: 1;
`;

const SkeletonGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const FooterLoader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${spacing.lg}px;
  width: 100%;
`;

const FooterText = styled.Text`
  margin-left: ${spacing.sm}px;
  font-size: 14px;
  color: ${colors.textSecondary};
  font-weight: 500;
`;

const EmptyContainer = styled.View`
  align-items: center;
  padding: ${spacing.xl}px;
  margin-top: ${spacing.xl}px;
  width: 100%;
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
