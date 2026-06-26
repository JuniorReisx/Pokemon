import { Modal, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { TypeBadge } from './TypeBadge';
import { TYPE_COLORS, colors, formatName, radius, spacing } from '../theme';

export function SearchBar({
  value,
  onChangeText,
  onFilterPress,
  selectedType,
  onClearType,
}) {
  return (
    <Container>
      <SearchRow>
        <SearchInputWrapper>
          <Ionicons name="search" size={20} color={colors.textMuted} />
          <SearchInput
            placeholder="Search"
            placeholderTextColor={colors.textMuted}
            value={value}
            onChangeText={onChangeText}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {value.length > 0 && (
            <ClearButton onPress={() => onChangeText('')}>
              <Ionicons name="close-circle" size={18} color={colors.textMuted} />
            </ClearButton>
          )}
        </SearchInputWrapper>
        <FilterButton onPress={onFilterPress} active={!!selectedType}>
          <Ionicons
            name="options-outline"
            size={22}
            color={selectedType ? colors.white : colors.textSecondary}
          />
        </FilterButton>
      </SearchRow>
      {selectedType && (
        <ActiveFilterRow>
          <TypeBadge type={selectedType} small />
          <ClearTypeButton onPress={onClearType}>
            <ClearTypeText>Clear filter</ClearTypeText>
          </ClearTypeButton>
        </ActiveFilterRow>
      )}
    </Container>
  );
}

export function TypeFilterModal({ visible, types, selectedType, onSelect, onClose }) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Overlay>
        <Sheet>
          <SheetHeader>
            <SheetTitle>Filter by type</SheetTitle>
            <CloseButton onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.textPrimary} />
            </CloseButton>
          </SheetHeader>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TypesGrid>
              <TypeOption selected={!selectedType} onPress={() => onSelect(null)}>
                <TypeOptionText selected={!selectedType}>All</TypeOptionText>
              </TypeOption>
              {types.map((type) => {
                const typeColor = TYPE_COLORS[type] || colors.primary;
                return (
                  <TypeOption
                    key={type}
                    selected={selectedType === type}
                    color={typeColor}
                    onPress={() => onSelect(type)}
                  >
                    <TypeOptionText selected={selectedType === type}>
                      {formatName(type)}
                    </TypeOptionText>
                  </TypeOption>
                );
              })}
            </TypesGrid>
          </ScrollView>
        </Sheet>
      </Overlay>
    </Modal>
  );
}

const Container = styled.View`
  margin-bottom: ${spacing.lg}px;
`;

const SearchRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SearchInputWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  background-color: ${colors.surfaceElevated};
  border-radius: ${radius.xl}px;
  padding: ${spacing.md}px ${spacing.md}px;
  margin-right: ${spacing.sm}px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  margin-left: ${spacing.sm}px;
  font-size: 16px;
  color: ${colors.textPrimary};
  padding: 0;
`;

const ClearButton = styled.TouchableOpacity`
  padding: ${spacing.xs}px;
`;

const FilterButton = styled.TouchableOpacity`
  width: 52px;
  height: 52px;
  align-items: center;
  justify-content: center;
  background-color: ${({ active }) => (active ? colors.primaryDark : colors.surfaceElevated)};
  border-radius: ${radius.xl}px;
`;

const ActiveFilterRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${spacing.sm}px;
`;

const ClearTypeButton = styled.TouchableOpacity`
  margin-left: ${spacing.sm}px;
`;

const ClearTypeText = styled.Text`
  font-size: 13px;
  color: ${colors.primary};
  font-weight: 600;
`;

const Overlay = styled.View`
  flex: 1;
  background-color: ${colors.overlay};
  justify-content: flex-end;
`;

const Sheet = styled.View`
  background-color: ${colors.surface};
  border-top-left-radius: ${radius.xxl}px;
  border-top-right-radius: ${radius.xxl}px;
  max-height: 70%;
  padding: ${spacing.lg}px;
`;

const SheetHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.lg}px;
`;

const SheetTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${colors.textPrimary};
`;

const CloseButton = styled.TouchableOpacity`
  padding: ${spacing.xs}px;
`;

const TypesGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: ${spacing.xl}px;
`;

const TypeOption = styled.TouchableOpacity`
  background-color: ${({ selected, color }) =>
    selected ? color || colors.primaryDark : colors.surfaceElevated};
  padding: ${spacing.sm}px ${spacing.md}px;
  border-radius: ${radius.full}px;
  margin-right: ${spacing.sm}px;
  margin-bottom: ${spacing.sm}px;
`;

const TypeOptionText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({ selected }) => (selected ? colors.white : colors.textSecondary)};
  text-transform: capitalize;
`;
