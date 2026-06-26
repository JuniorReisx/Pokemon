import * as React from 'react';
import { Animated, Easing } from 'react-native';
import styled from 'styled-components/native';
import { colors, formatName, getStatBarColor, radius, spacing } from '../theme';

const STAT_LABELS = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

export function StatBar({ stat, maxValue = 255, accentColor, delay = 0 }) {
  const label = STAT_LABELS[stat.name] || formatName(stat.name);
  const percentage = Math.min((stat.value / maxValue) * 100, 100);
  const barColor = accentColor || getStatBarColor(stat.name);
  const animatedWidth = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    animatedWidth.setValue(0);
    Animated.timing(animatedWidth, {
      toValue: percentage,
      duration: 700,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [animatedWidth, percentage, delay]);

  const width = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <Container>
      <LabelRow>
        <StatLabel>{label}</StatLabel>
        <StatValue>{stat.value}</StatValue>
      </LabelRow>
      <BarTrack>
        <AnimatedFill style={{ width }} color={barColor} />
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
  margin-bottom: ${spacing.sm}px;
`;

const StatLabel = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatValue = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.textPrimary};
`;

const BarTrack = styled.View`
  height: 6px;
  background-color: ${colors.border};
  border-radius: ${radius.full}px;
  overflow: hidden;
`;

const AnimatedFill = styled(Animated.View)`
  height: 100%;
  background-color: ${({ color }) => color};
  border-radius: ${radius.full}px;
`;
