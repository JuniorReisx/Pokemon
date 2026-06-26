import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';

export function BottomNav({ active = 'home' }) {
  return (
    <Container>
      <NavBar>
        <NavItem active={active === 'notifications'}>
          <Ionicons
            name="notifications-outline"
            size={22}
            color={active === 'notifications' ? colors.white : colors.textMuted}
          />
        </NavItem>
        <CenterButton active={active === 'home'}>
          <PokeballOuter>
            <Ionicons name="disc" size={28} color={colors.white} />
          </PokeballOuter>
        </CenterButton>
        <NavItem active={active === 'profile'}>
          <Ionicons
            name="person-outline"
            size={22}
            color={active === 'profile' ? colors.white : colors.textMuted}
          />
        </NavItem>
      </NavBar>
    </Container>
  );
}

const Container = styled.View`
  padding: 0 ${spacing.md}px ${spacing.sm}px;
`;

const NavBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-color: ${colors.surfaceElevated};
  border-radius: ${radius.xxl}px;
  padding: ${spacing.sm}px ${spacing.lg}px;
  border-width: 1px;
  border-color: ${colors.border};
`;

const NavItem = styled.View`
  padding: ${spacing.sm}px;
  opacity: ${({ active }) => (active ? 1 : 0.6)};
`;

const CenterButton = styled.View`
  margin-top: -${spacing.lg}px;
`;

const PokeballOuter = styled.View`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${colors.error};
  align-items: center;
  justify-content: center;
  border-width: 3px;
  border-color: ${colors.surfaceElevated};
  shadow-color: ${colors.error};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.4;
  shadow-radius: 8px;
  elevation: 6;
`;
