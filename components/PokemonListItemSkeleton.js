import styled from 'styled-components/native';
import { colors, radius, spacing } from '../theme';

export function PokemonListItemSkeleton() {
  return (
    <CardWrapper>
      <Card>
        <ImagePlaceholder />
        <Line />
        <Line short />
      </Card>
    </CardWrapper>
  );
}

const CardWrapper = styled.View`
  flex: 1;
  padding: ${spacing.xs}px;
  max-width: 50%;
`;

const Card = styled.View`
  background-color: ${colors.surfaceElevated};
  border-radius: ${radius.xl}px;
  padding: ${spacing.md}px;
  min-height: 180px;
  overflow: hidden;
`;

const ImagePlaceholder = styled.View`
  width: 100%;
  height: 100px;
  border-radius: ${radius.md}px;
  background-color: ${colors.border};
  margin-bottom: ${spacing.md}px;
`;

const Line = styled.View`
  height: 14px;
  border-radius: ${radius.sm}px;
  background-color: ${colors.border};
  margin-bottom: ${spacing.sm}px;
  width: ${({ short }) => (short ? '50%' : '70%')};
`;
