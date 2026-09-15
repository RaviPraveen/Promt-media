import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GradientButton from '../components/GradientButton';
import { useResponsiveLayout } from '../constants/responsive';

export default function WelcomeScreen1({ onNext }) {
  const insets = useSafeAreaInsets();
  const { isMobile, isTablet, isDesktop, width, height } = useResponsiveLayout();

  // Desktop & Laptop Split Layout (Screen width >= 900 and landscape)
  const isLandscapeWide = width >= 900 && width > height;

  if (isLandscapeWide) {
    return (
      <View style={styles.desktopContainer}>
        {/* Left 50% Panel: Sky Artwork using Welcomepage.png */}
        <View style={styles.desktopLeftPanel}>
          <LinearGradient
            colors={['#0A83F3', '#1962D6', '#143C88', '#07080E']}
            locations={[0, 0.35, 0.75, 1]}
            style={StyleSheet.absoluteFillObject}
          />
          <Image
            source={require('../../Welcomepage.png')}
            style={styles.desktopHeroImage}
            resizeMode="contain"
          />
          {/* Subtle right gradient blend into the dark right panel */}
          <LinearGradient
            colors={['transparent', 'rgba(7, 8, 14, 0.4)', '#07080E']}
            start={{ x: 0.65, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.desktopRightBlend}
          />
        </View>

        {/* Right 50% Panel: Real Text & Interactive Button */}
        <View style={styles.desktopRightPanel}>
          <View style={styles.desktopContentWrapper}>
            {/* Top Display Title */}
            <View style={styles.displayTitleWrapper}>
              <Text style={styles.displayTitleTop}>Welcome to</Text>
              <Text style={styles.displayTitleBrand}>Promt Media</Text>
            </View>

            {/* Description Body */}
            <View style={styles.desktopTextBody}>
              <Text style={styles.desktopBodyHeading}>
                Welcome to Prompt Media
              </Text>
              <Text style={styles.desktopBodyLine}>
                Where AI creativity comes to life.
              </Text>
              <Text style={styles.desktopBodyLine}>
                Discover amazing creations, explore the prompts
              </Text>
              <Text style={styles.desktopBodyLine}>
                behind them, and find inspiration for your next idea.
              </Text>
              <Text style={styles.desktopBodyTagline}>
                Create. Share. Copy. Inspire.
              </Text>
            </View>

            {/* Interactive Primary Button */}
            <View style={styles.desktopButtonWrapper}>
              <GradientButton
                title="Next"
                onPress={onNext}
                minWidth={280}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  // Mobile & Portrait Tablet Layout
  return (
    <View style={styles.container}>
      {/* Top Hero Section */}
      <View
        style={[
          styles.heroSection,
          {
            paddingTop: insets.top > 0 ? insets.top : (Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 36),
          },
        ]}
      >
        <LinearGradient
          colors={['#0A83F3', '#1A67D9', '#0E285C', '#07080E']}
          locations={[0, 0.4, 0.75, 1]}
          style={StyleSheet.absoluteFillObject}
        />
        <Image
          source={require('../../welcome_hero.png')}
          style={styles.heroImage}
          resizeMode="contain"
        />
        <LinearGradient
          colors={['transparent', 'rgba(7, 8, 14, 0.7)', '#07080E']}
          locations={[0, 0.7, 1]}
          style={styles.bottomBlend}
        />
      </View>

      {/* Bottom Content Section */}
      <View
        style={[
          styles.bottomSection,
          {
            paddingBottom: (insets.bottom > 0 ? insets.bottom : 16) + 12,
          },
        ]}
      >
        <View style={styles.textContainer}>
          <Text style={[styles.headingText, isTablet && styles.headingTextLarge]}>
            Welcome to Prompt Media
          </Text>
          <Text style={[styles.bodyText, isTablet && styles.bodyTextLarge]}>
            Where AI creativity comes to life.
          </Text>
          <Text style={[styles.bodyText, isTablet && styles.bodyTextLarge]}>
            Discover amazing creations, explore the prompts
          </Text>
          <Text style={[styles.bodyText, isTablet && styles.bodyTextLarge]}>
            behind them, and find inspiration for your next idea.
          </Text>
          <Text style={[styles.taglineText, isTablet && styles.taglineTextLarge]}>
            Create. Share. Copy. Inspire.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <GradientButton
            title="Next"
            onPress={onNext}
            minWidth={isTablet ? 220 : 180}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Desktop & Laptop Layout Styles
  desktopContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    backgroundColor: '#07080E',
    overflow: 'hidden',
  },
  desktopLeftPanel: {
    width: '50%',
    height: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  desktopHeroImage: {
    width: '88%',
    height: '88%',
    position: 'absolute',
    bottom: 0,
  },
  desktopRightBlend: {
    position: 'absolute',
    right: -1,
    top: 0,
    bottom: 0,
    width: 140,
  },
  desktopRightPanel: {
    width: '50%',
    height: '100%',
    backgroundColor: '#07080E',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 48,
  },
  desktopContentWrapper: {
    width: '100%',
    maxWidth: 580,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40,
    height: '82%',
  },
  displayTitleWrapper: {
    alignItems: 'center',
  },
  displayTitleTop: {
    color: '#FFFFFF',
    fontSize: 44,
    fontWeight: '800',
    letterSpacing: 1.5,
    textAlign: 'center',
    fontFamily: Platform.OS === 'web' ? "'Cinzel Decorative', 'Playfair Display', Georgia, serif" : undefined,
  },
  displayTitleBrand: {
    color: '#FFFFFF',
    fontSize: 52,
    fontWeight: '900',
    letterSpacing: 2,
    marginTop: 4,
    textAlign: 'center',
    fontFamily: Platform.OS === 'web' ? "'Cinzel Decorative', 'Playfair Display', Georgia, serif" : undefined,
  },
  desktopTextBody: {
    alignItems: 'center',
    marginVertical: 24,
  },
  desktopBodyHeading: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  desktopBodyLine: {
    color: '#D1D5DB',
    fontSize: 16.5,
    lineHeight: 26,
    textAlign: 'center',
    fontWeight: '400',
  },
  desktopBodyTagline: {
    color: '#FFFFFF',
    fontSize: 17.5,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 10,
    letterSpacing: 0.5,
  },
  desktopButtonWrapper: {
    alignItems: 'center',
    width: '100%',
  },

  // Mobile & Tablet Layout Styles
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#07080E',
  },
  heroSection: {
    flex: 1,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  bottomBlend: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -1,
    height: 70,
  },
  bottomSection: {
    width: '100%',
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 6,
    backgroundColor: '#07080E',
  },
  textContainer: {
    alignItems: 'center',
    maxWidth: 520,
  },
  headingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  headingTextLarge: {
    fontSize: 19,
    lineHeight: 26,
    marginBottom: 6,
  },
  bodyText: {
    color: '#D1D5DB',
    fontSize: 13.5,
    lineHeight: 19,
    textAlign: 'center',
    fontWeight: '400',
  },
  bodyTextLarge: {
    fontSize: 15.5,
    lineHeight: 23,
  },
  taglineText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 21,
    letterSpacing: 0.2,
    marginTop: 4,
  },
  taglineTextLarge: {
    fontSize: 16.5,
    lineHeight: 25,
    marginTop: 6,
  },
  buttonContainer: {
    alignItems: 'center',
  },
});
