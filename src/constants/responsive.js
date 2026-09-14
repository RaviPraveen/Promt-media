import { useWindowDimensions } from 'react-native';

export const BREAKPOINTS = {
  mobile: 600,
  tablet: 1024,
};

export function useResponsiveLayout() {
  const { width, height } = useWindowDimensions();

  const isMobile = width < BREAKPOINTS.mobile;
  const isTablet = width >= BREAKPOINTS.mobile && width <= BREAKPOINTS.tablet;
  const isDesktop = width > BREAKPOINTS.tablet;

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
  };
}
