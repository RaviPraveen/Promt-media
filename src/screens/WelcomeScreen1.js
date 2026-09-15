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
import PageIndicator from '../components/PageIndicator';
import { useResponsiveLayout } from '../constants/responsive';

export default function WelcomeScreen1({ onNext }) {
  const insets = useSafeAreaInsets();
  const { isMobile, isTablet, isDesktop, width, height } = useResponsiveLayout();

  // Desktop & Laptop Split Layout (Screen width >= 900 and landscape)
  const isLandscapeWide = width >= 900 && width > height;

  if (isLandscapeWide) {
    const desktopHeight = height > 0 ? height : '100vh';

    return (
      <View style={[styles.desktopContainer, { height: desktopHeight, minHeight: desktopHeight }]}>
        {/* Left 50% Panel: Sky Artwork using Welcomepage.png */}
        <View style={[styles.desktopLeftPanel, { height: desktopHeight, minHeight: desktopHeight }]}>
          <LinearGradient
            colors={['#0A83F3', '#1662D6', '#0E285C', '#07080E']}
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
            colors={['transparent', 'rgba(7, 8, 14, 0.5)', '#07080E']}
            start={{ x: 0.6, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.desktopRightBlend}
          />
        </View>

        {/* Right 50% Panel: Real Text & Interactive Button */}
        <View style={[styles.desktopRightPanel, { height: desktopHeight, minHeight: desktopHeight }]}>
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
                minWidth={360}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  // Mobile & Portrait Tablet Layout
  const topInset = insets.top > 0 ? insets.top : (Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 36);
  const bottomInset = insets.bottom > 0 ? insets.bottom : 16;

  return (
    <View style={styles.container}>
      {/* Top Hero Section: Sky Gradient + Logo + Display Title + Artwork */}
      <View style={[styles.heroSection, { paddingTop: topInset + 8 }]}>
        <LinearGradient
          colors={['#0A83F3', '#1662D6', '#0E285C', '#07080E']}
          locations={[0, 0.4, 0.75, 1]}
          style={StyleSheet.absoluteFillObject}
        />

        {/* Top Header Bar: Logo + Real Display Title */}
        <View style={styles.mobileTopHeader}>
          <Image
            source={require('../../logo.png')}
            style={styles.mobileLogo}
            resizeMode="contain"
          />
          <View style={styles.mobileTitleBlock}>
            <Text style={styles.mobileTitleTop}>Welcome to</Text>
            <Text style={styles.mobileTitleBrand}>Promt Media</Text>
          </View>
        </View>

        {/* Center Artwork: Welcomepage.png */}
        <View style={styles.mobileArtworkWrapper}>
          <Image
            source={require('../../Welcomepage.png')}
            style={styles.mobileArtworkImage}
            resizeMode="contain"
          />
        </View>

        {/* Smooth gradient blend into the dark bottom */}
        <LinearGradient
          colors={['transparent', 'rgba(7, 8, 14, 0.8)', '#07080E']}
          locations={[0, 0.7, 1]}
          style={styles.bottomBlend}
        />
      </View>

      {/* Bottom Content Section: Real Text + PageIndicator + Next Button */}
      <View style={[styles.bottomSection, { paddingBottom: bottomInset + 12 }]}>
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

        {/* Real Coded Page Indicator */}
        <PageIndicator totalPages={2} activeIndex={0} onDotPress={onNext} />

        {/* Real Coded Pressable Next Button */}
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
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#07080E',
    overflow: 'hidden',
  },
  desktopLeftPanel: {
    width: '50%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  desktopHeroImage: {
    width: '92%',
    height: '88%',
    position: 'absolute',
    bottom: 0,
  },
  desktopRightBlend: {
    position: 'absolute',
    right: -1,
    top: 0,
    bottom: 0,
    width: 160,
  },
  desktopRightPanel: {
    width: '50%',
    backgroundColor: '#07080E',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 48,
  },
  desktopContentWrapper: {
    width: '100%',
    maxWidth: 680,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  displayTitleWrapper: {
    alignItems: 'center',
    marginBottom: 8,
  },
  displayTitleTop: {
    color: '#FFFFFF',
    fontSize: 54,
    fontWeight: '700',
    letterSpacing: 2,
    textAlign: 'center',
    fontFamily: Platform.select({
      ios: 'Georgia',
      android: 'serif',
      web: "'Cinzel Decorative', 'Playfair Display', Georgia, serif",
    }),
  },
  displayTitleBrand: {
    color: '#FFFFFF',
    fontSize: 66,
    fontWeight: '900',
    letterSpacing: 2.5,
    marginTop: 6,
    textAlign: 'center',
    fontFamily: Platform.select({
      ios: 'Georgia',
      android: 'serif',
      web: "'Cinzel Decorative', 'Playfair Display', Georgia, serif",
    }),
  },
  desktopTextBody: {
    alignItems: 'center',
    marginVertical: 36,
  },
  desktopBodyHeading: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  desktopBodyLine: {
    color: '#D1D5DB',
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    fontWeight: '400',
  },
  desktopBodyTagline: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 14,
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
    justifyContent: 'space-between',
  },
  mobileTopHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  mobileLogo: {
    width: 38,
    height: 38,
    borderRadius: 10,
  },
  mobileTitleBlock: {
    flex: 1,
    alignItems: 'center',
    marginRight: 38, // Balance logo on left so text is centered
  },
  mobileTitleTop: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1.2,
    textAlign: 'center',
    fontFamily: Platform.select({
      ios: 'Georgia',
      android: 'serif',
      web: "'Cinzel Decorative', 'Playfair Display', Georgia, serif",
    }),
    textShadowColor: 'rgba(0, 0, 0, 0.45)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  mobileTitleBrand: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 1.6,
    marginTop: 1,
    textAlign: 'center',
    fontFamily: Platform.select({
      ios: 'Georgia',
      android: 'serif',
      web: "'Cinzel Decorative', 'Playfair Display', Georgia, serif",
    }),
    textShadowColor: 'rgba(0, 0, 0, 0.45)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  mobileArtworkWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  mobileArtworkImage: {
    width: '92%',
    height: '100%',
  },
  bottomBlend: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -1,
    height: 60,
  },
  bottomSection: {
    width: '100%',
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 4,
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
