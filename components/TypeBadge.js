import styled from 'styled-components/native';
import { TYPE_COLORS, colors, formatName, radius, spacing } from '../theme';

export function TypeBadge({ type, small = false }) {
  const typeColor = TYPE_COLORS[type?.toLowerCase()] || colors.primary;

  return (
    <Badge color={typeColor} small={small}>
      <BadgeText small={small}>{formatName(type)}</BadgeText>
    </Badge>
  );
}

const Badge = styled.View`
  background-color: ${({ color }) => color};
  padding: ${({ small }) => (small ? '3px 8px' : '5px 12px')};
  border-radius: ${radius.full}px;
  margin-right: ${spacing.xs}px;
  margin-bottom: ${spacing.xs}px;
`;

const BadgeText = styled.Text`
  color: ${colors.white};
  font-size: ${({ small }) => (small ? 10 : 11)}px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;
