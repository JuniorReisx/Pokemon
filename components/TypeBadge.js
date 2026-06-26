import styled from 'styled-components/native';
import { TYPE_COLORS, colors, formatName, radius, spacing } from '../theme';

export function TypeBadge({ type, small = false, dark = false }) {
  const typeColor = TYPE_COLORS[type?.toLowerCase()] || colors.primary;

  return (
    <Badge color={typeColor} small={small} dark={dark}>
      <BadgeText small={small} dark={dark}>
        {formatName(type)}
      </BadgeText>
    </Badge>
  );
}

const Badge = styled.View`
  background-color: ${({ color, dark }) => (dark ? 'rgba(0,0,0,0.25)' : color)};
  padding: ${({ small }) => (small ? '2px 7px' : '5px 12px')};
  border-radius: ${radius.full}px;
  margin-right: ${spacing.xs}px;
  margin-bottom: ${spacing.xs}px;
  border-width: ${({ dark }) => (dark ? 0 : 0)}px;
`;

const BadgeText = styled.Text`
  color: ${colors.white};
  font-size: ${({ small }) => (small ? 9 : 11)}px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;
