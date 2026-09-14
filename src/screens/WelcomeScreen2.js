import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import GradientButton from '../components/GradientButton';
import { useResponsiveLayout } from '../constants/responsive';

export default function WelcomeScreen2({ onStart, onBack }) {
  const { isMobile, isTablet, isDesktop, width, height } = useResponsiveLayout();

  // Desktop & Laptop Split Layout (Screen width >= 900 and landscape)
  const isLandscapeWide = width >= 900 && width > height;

  if (isLandscapeWide) {
    return (
      <View style={styles.desktopContainer}>
        {/* Left 50% Panel: Floral Artwork using welcomepagedestop.png */}
        <View style={styles.desktopLeftPanel}>
          <Image
            source={require('../../welcomepagedestop.png')}
            style={styles.desktopHeroImage}
            resizeMode="cover"
          />
          {/* Subtle right gradient blend into the dark right panel */}
          <LinearGradient
            colors={['transparent', 'rgba(7, 8, 14, 0.45)', '#07080E']}
            start={{ x: 0.65, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.desktopRightBlend}
          />
        </View>

        {/* Right 50% Panel: Real Text & Interactive Button */}
        <View style={styles.desktopRightPanel}>
          {/* Desktop Back Navigation Button */}
          {onBack && (
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={onBack}
              style={styles.desktopBackButton}
            >
              <Ionicons name="arrow-back" size={18} color="#FFFFFF" />
              <Text style={styles.desktopBackText}>Back</Text>
            </TouchableOpacity>
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
                Get likes, gain followers, connect with other creators
              </Text>
              <Text style={styles.desktopBodyLine}>
                and inspire the community.
              </Text>
            </View>

            {/* Interactive Primary Button */}
            <View style={styles.desktopButtonWrapper}>
              <GradientButton
                title="Next"
                onPress={onStart}
                minWidth={280}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  // Mobile & Portrait Tablet Layout
  const heroHeight = Math.round(height * 0.58);
  const bottomHeight = height - heroHeight;

  return (
    <View style={styles.container}>
      {/* Top Hero Section */}
      <View style={[styles.heroSection, { height: heroHeight }]}>
        <Image
          source={require('../../welcomepagedestop.png')}
          style={styles.heroImage}
          resizeMode="cover"
        />

        {/* Back navigation button overlay */}
        {onBack && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}

        <LinearGradient
          colors={['transparent', 'rgba(7, 8, 14, 0.6)', '#07080E']}
          locations={[0, 0.7, 1]}
          style={styles.bottomBlend}
        />
      </View>

      {/* Bottom Content Section */}
      <View style={[styles.bottomSection, { height: bottomHeight }]}>
        <View style={styles.textContainer}>
          <Text style={[styles.headingText, (isTablet || isDesktop) && styles.headingTextLarge]}>
            Share Your Creativity
          </Text>
          <Text style={[styles.bodyText, (isTablet || isDesktop) && styles.bodyTextLarge]}>
            Post your AI-generated images with the prompts
          </Text>
          <Text style={[styles.bodyText, (isTablet || isDesktop) && styles.bodyTextLarge]}>
            behind them.
          </Text>
          <Text style={[styles.bodyText, (isTablet || isDesktop) && styles.bodyTextLarge]}>
            Get likes, gain followers, connect with other creators
          </Text>
          <Text style={[styles.bodyText, (isTablet || isDesktop) && styles.bodyTextLarge]}>
            and inspire the community.
          </Text>
        </View>

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
    width: '100%',
    height: '100%',
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
    position: 'relative',
  },
  desktopBackButton: {
    position: 'absolute',
    top: 32,
    left: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    cursor: 'pointer',
    zIndex: 10,
  },
  desktopBackText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '600',
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
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 24 : 44,
    left: 20,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(20, 22, 32, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
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
