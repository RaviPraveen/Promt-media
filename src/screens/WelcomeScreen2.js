import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Platform,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GradientButton from '../components/GradientButton';
import PageIndicator from '../components/PageIndicator';
import { useResponsiveLayout } from '../constants/responsive';

export default function WelcomeScreen2({ onStart, onBack }) {
  const insets = useSafeAreaInsets();
  const { isMobile, isTablet, isDesktop, width, height } = useResponsiveLayout();

  // Desktop & Laptop Split Layout (Screen width >= 900 and landscape)
  const isLandscapeWide = width >= 900 && width > height;

  if (isLandscapeWide) {
    const desktopHeight = height > 0 ? height : '100vh';

    return (
      <View style={[styles.desktopContainer, { height: desktopHeight, minHeight: desktopHeight }]}>
        {/* Left 50% Panel: Floral Artwork using welcomepagedestop.png */}
        <View style={[styles.desktopLeftPanel, { height: desktopHeight, minHeight: desktopHeight }]}>
          <Image
            source={require('../../welcomepagedestop.png')}
            style={styles.desktopHeroImage}
            resizeMode="cover"
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
          {/* Desktop Back Navigation Button */}
          {onBack && (
            <Pressable
              onPress={onBack}
              accessibilityRole="button"
              accessibilityLabel="Back"
              style={({ pressed }) => [
                styles.desktopBackButton,
                pressed && styles.pressedState,
              ]}
            >
              <Ionicons name="arrow-back" size={18} color="#FFFFFF" />
              <Text style={styles.desktopBackText}>Back</Text>
            </Pressable>
          )}

          <View style={styles.desktopContentWrapper}>
            {/* Top Display Title */}
            <View style={styles.displayTitleWrapper}>
              <Text style={styles.displayTitleTop}>Welcome to</Text>
              <Text style={styles.displayTitleBrand}>Promt Media</Text>
            </View>

            {/* Description Body */}
            <View style={styles.desktopTextBody}>
              <Text style={styles.desktopBodyHeading}>
                Share Your Creativity
              </Text>
              <Text style={styles.desktopBodyLine}>
                Post your AI-generated images with the prompts
              </Text>
              <Text style={styles.desktopBodyLine}>
                behind them.
              </Text>
              <Text style={styles.desktopBodyLine}>
                Get likes, gain followers, connect with other
              </Text>
              <Text style={styles.desktopBodyLine}>
                creators and inspire the community.
              </Text>
            </View>

            {/* Interactive Primary Button */}
            <View style={styles.desktopButtonWrapper}>
              <GradientButton
                title="Next"
                onPress={onStart}
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
      {/* Top Hero Section: Sky Gradient + 2ndwelcomepage.png artwork + Back button */}
      <View style={[styles.heroSection, { paddingTop: topInset + 8 }]}>
        <LinearGradient
          colors={['#3A8EF6', '#2575DC', '#1248A8', '#07080E']}
          locations={[0, 0.4, 0.75, 1]}
          style={StyleSheet.absoluteFillObject}
        />

        {/* Back navigation button */}
        {onBack && (
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Back"
            style={({ pressed }) => [
              styles.backButton,
              { top: topInset + 8 },
              pressed && styles.pressedState,
            ]}
          >
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          </Pressable>
        )}

        {/* Artwork Image Component: 2ndwelcomepage.png */}
        <View style={styles.mobileArtworkWrapper}>
          <Image
            source={require('../../2ndwelcomepage.png')}
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

      {/* Bottom Content Section: Real Text + PageIndicator + Action Button */}
      <View style={[styles.bottomSection, { paddingBottom: bottomInset + 12 }]}>
        <View style={styles.textContainer}>
          <Text style={[styles.headingText, isTablet && styles.headingTextLarge]}>
            Share Your Creativity
          </Text>
          <Text style={[styles.bodyText, isTablet && styles.bodyTextLarge]}>
            Post your AI-generated images with the prompts
          </Text>
          <Text style={[styles.bodyText, isTablet && styles.bodyTextLarge]}>
            behind them.
          </Text>
          <Text style={[styles.bodyText, isTablet && styles.bodyTextLarge]}>
            Get likes, gain followers, connect with other creators
          </Text>
          <Text style={[styles.bodyText, isTablet && styles.bodyTextLarge]}>
            and inspire the community.
          </Text>
        </View>

        {/* Real Coded Page Indicator */}
        <PageIndicator totalPages={2} activeIndex={1} onDotPress={onBack} />

        {/* Real Coded Pressable Action Button */}
        <View style={styles.buttonContainer}>
          <GradientButton
            title="Let's Start"
            onPress={onStart}
            minWidth={isTablet ? 230 : 200}
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
    justifyContent: 'center',
    overflow: 'hidden',
  },
  desktopHeroImage: {
    width: '100%',
    height: '100%',
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
    position: 'relative',
  },
  desktopBackButton: {
    position: 'absolute',
    top: 36,
    left: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    zIndex: 10,
  },
  desktopBackText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
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
    fontSize: 24,
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
  mobileArtworkWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileArtworkImage: {
    width: '92%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(10, 15, 25, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  pressedState: {
    opacity: 0.75,
    transform: [{ scale: 0.96 }],
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
  buttonContainer: {
    alignItems: 'center',
  },
});
