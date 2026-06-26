import * as React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { TypeBadge } from './TypeBadge';
import { colors, formatName, getPrimaryTypeColor, radius, spacing } from '../theme';

function PokemonListItemComponent({ pokemon, onPress }) {
  const accentColor = getPrimaryTypeColor(pokemon.types);

  return (
    <CardWrapper>
      <Card onPress={() => onPress(pokemon)} accentColor={accentColor} activeOpacity={0.9}>
        <CardGlow accentColor={accentColor} />
        <ImageContainer>
          <Image
            source={{ uri: pokemon.image }}
            style={{ width: 110, height: 110 }}
            resizeMode="contain"
          />
        </ImageContainer>
        <CardFooter>
          <FooterLeft>
            <PokemonName>{formatName(pokemon.name)}</PokemonName>
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
  flex: 1;
  padding: ${spacing.xs}px;
  max-width: 50%;
`;

const Card = styled.TouchableOpacity`
  background-color: ${({ accentColor }) => accentColor};
  border-radius: ${radius.xl}px;
  padding: ${spacing.md}px;
  min-height: 180px;
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
  flex: 1;
  padding-vertical: ${spacing.sm}px;
`;

const CardFooter = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
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
