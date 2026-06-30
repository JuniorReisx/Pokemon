import * as React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { TypeBadge } from './TypeBadge';
import { colors, formatName, getPrimaryTypeColor, radius, spacing } from '../theme';

const CARD_HEIGHT = 215;
const IMAGE_SIZE = 100;

function PokemonListItemComponent({ pokemon, onPress }) {
  const accentColor = getPrimaryTypeColor(pokemon.types);

  return (
    <CardWrapper>
      <Card onPress={() => onPress(pokemon)} accentColor={accentColor} activeOpacity={0.9}>
        <CardGlow accentColor={accentColor} />
        <ImageContainer>
          <PokemonImage
            source={{ uri: pokemon.image }}
            resizeMode="contain"
          />
        </ImageContainer>
        <CardFooter>
          <FooterLeft>
            <PokemonName numberOfLines={1}>{formatName(pokemon.name)}</PokemonName>
            <TypesRow>
              {pokemon.types.map((type) => (
                <TypeBadge key={type} type={type} small dark />
              ))}
            </TypesRow>
          </FooterLeft>
          <ArrowButton>
            <Ionicons name="arrow-forward" size={16} color={accentColor} />
          </ArrowButton>
        </CardFooter>
      </Card>
    </CardWrapper>
  );
}

export const PokemonListItem = React.memo(PokemonListItemComponent);

const CardWrapper = styled.View`
  width: 50%;
  padding: ${spacing.xs}px;
`;

const Card = styled.TouchableOpacity`
  background-color: ${({ accentColor }) => accentColor};
  border-radius: ${radius.xl}px;
  padding: ${spacing.md}px;
  height: ${CARD_HEIGHT}px;
  overflow: hidden;
  shadow-color: ${({ accentColor }) => accentColor};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.35;
  shadow-radius: 12px;
  elevation: 6;
`;

const CardGlow = styled.View`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.15);
  top: -20px;
  right: -20px;
`;

const ImageContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: ${IMAGE_SIZE}px;
  margin-bottom: ${spacing.sm}px;
`;

const PokemonImage = styled.Image`
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
`;

const CardFooter = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  flex: 1;
`;

const FooterLeft = styled.View`
  flex: 1;
`;

const PokemonName = styled.Text`
  font-size: 16px;
  font-weight: 800;
  color: ${colors.white};
  letter-spacing: -0.3px;
`;

const TypesRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${spacing.xs}px;
`;

const ArrowButton = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${colors.white};
  align-items: center;
  justify-content: center;
`;
