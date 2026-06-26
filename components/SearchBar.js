import { Modal, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { TypeBadge } from './TypeBadge';
import { colors, formatName, radius, spacing } from '../theme';

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
            placeholder="Search by name"
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
            color={selectedType ? colors.white : colors.primary}
          />
        </FilterButton>
      </SearchRow>
      {selectedType && (
        <ActiveFilterRow>
          <TypeBadge type={selectedType} small />
          <ClearTypeButton onPress={onClearType}>
            <ClearTypeText>Limpar filtro</ClearTypeText>
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
            <SheetTitle>Filtrar por tipo</SheetTitle>
            <CloseButton onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.textPrimary} />
            </CloseButton>
          </SheetHeader>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TypesGrid>
              <TypeOption
                selected={!selectedType}
                onPress={() => onSelect(null)}
              >
                <TypeOptionText selected={!selectedType}>Todos</TypeOptionText>
              </TypeOption>
              {types.map((type) => (
                <TypeOption
                  key={type}
                  selected={selectedType === type}
                  onPress={() => onSelect(type)}
                >
                  <TypeOptionText selected={selectedType === type}>
                    {formatName(type)}
                  </TypeOptionText>
                </TypeOption>
              ))}
            </TypesGrid>
          </ScrollView>
        </Sheet>
      </Overlay>
    </Modal>
  );
}

const Container = styled.View`
  margin-bottom: ${spacing.md}px;
`;

const SearchRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SearchInputWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  background-color: ${colors.surface};
  border-radius: ${radius.lg}px;
  padding: ${spacing.sm}px ${spacing.md}px;
  border-width: 1.5px;
  border-color: ${colors.border};
  margin-right: ${spacing.sm}px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  margin-left: ${spacing.sm}px;
  font-size: 16px;
  color: ${colors.textPrimary};
  padding: ${spacing.xs}px 0;
`;

const ClearButton = styled.TouchableOpacity`
  padding: ${spacing.xs}px;
`;

const FilterButton = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background-color: ${({ active }) => (active ? colors.primary : colors.headerBg)};
  border-radius: ${radius.lg}px;
  border-width: 1.5px;
  border-color: ${({ active }) => (active ? colors.primary : colors.border)};
`;

const ActiveFilterRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${spacing.xs}px;
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
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

const Sheet = styled.View`
  background-color: ${colors.surface};
  border-top-left-radius: ${radius.xl}px;
  border-top-right-radius: ${radius.xl}px;
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
  background-color: ${({ selected }) => (selected ? colors.primary : colors.background)};
  padding: ${spacing.sm}px ${spacing.md}px;
  border-radius: ${radius.full}px;
  margin-right: ${spacing.sm}px;
  margin-bottom: ${spacing.sm}px;
  border-width: 1.5px;
  border-color: ${({ selected }) => (selected ? colors.primary : colors.border)};
`;

const TypeOptionText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({ selected }) => (selected ? colors.white : colors.textPrimary)};
  text-transform: capitalize;
`;
