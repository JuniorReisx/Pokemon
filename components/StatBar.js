import styled from 'styled-components/native';
import { colors, formatName, radius, spacing } from '../theme';

const STAT_LABELS = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

export function StatBar({ stat, maxValue = 255 }) {
  const label = STAT_LABELS[stat.name] || formatName(stat.name);
  const percentage = Math.min((stat.value / maxValue) * 100, 100);

  return (
    <Container>
      <LabelRow>
        <StatLabel>{label}</StatLabel>
        <StatValue>{stat.value}</StatValue>
      </LabelRow>
      <BarTrack>
        <BarFill percentage={percentage} />
      </BarTrack>
    </Container>
  );
}

const Container = styled.View`
  margin-bottom: ${spacing.md}px;
`;

const LabelRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${spacing.xs}px;
`;

const StatLabel = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.textSecondary};
`;

const StatValue = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.textPrimary};
`;

const BarTrack = styled.View`
  height: 8px;
  background-color: ${colors.border};
  border-radius: ${radius.full}px;
  overflow: hidden;
`;

const BarFill = styled.View`
  height: 100%;
  width: ${({ percentage }) => percentage}%;
  background-color: ${colors.primary};
  border-radius: ${radius.full}px;
`;
