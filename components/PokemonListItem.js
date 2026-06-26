import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { TypeBadge } from './TypeBadge';
import { colors, formatName, getPrimaryTypeColor, radius, spacing } from '../theme';

export function PokemonListItem({ pokemon, onPress }) {
  const accentColor = getPrimaryTypeColor(pokemon.types);

  return (
    <Card onPress={() => onPress(pokemon)} accentColor={accentColor}>
      <AccentBar accentColor={accentColor} />
      <ImageContainer>
        <Image source={{ uri: pokemon.image }} style={{ width: 64, height: 64 }} resizeMode="contain" />
      </ImageContainer>
      <InfoContainer>
        <PokemonNumber>#{String(pokemon.id).padStart(3, '0')}</PokemonNumber>
        <PokemonName>{formatName(pokemon.name)}</PokemonName>
        <TypesRow>
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} small />
          ))}
        </TypesRow>
      </InfoContainer>
      <ChevronContainer>
        <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
      </ChevronContainer>
    </Card>
  );
}

const Card = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.surface};
  border-radius: ${radius.lg}px;
  margin-bottom: ${spacing.sm}px;
  padding: ${spacing.md}px;
  shadow-color: ${({ accentColor }) => accentColor};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.12;
  shadow-radius: 8px;
  elevation: 4;
  overflow: hidden;
`;

const AccentBar = styled.View`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: ${({ accentColor }) => accentColor};
`;

const ImageContainer = styled.View`
  width: 64px;
  height: 64px;
  margin-left: ${spacing.sm}px;
  margin-right: ${spacing.md}px;
`;

const InfoContainer = styled.View`
  flex: 1;
`;

const PokemonNumber = styled.Text`
  font-size: 11px;
  font-weight: 600;
  color: ${colors.textMuted};
  letter-spacing: 1px;
`;

const PokemonName = styled.Text`
  font-size: 17px;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin-top: 2px;
  margin-bottom: ${spacing.xs}px;
`;

const TypesRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const ChevronContainer = styled.View`
  padding-left: ${spacing.sm}px;
`;
