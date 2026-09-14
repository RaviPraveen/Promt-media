import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GradientButton from '../components/GradientButton';
import { useResponsiveLayout } from '../constants/responsive';

export default function WelcomeScreen1({ onNext }) {
  const { isMobile, isTablet, isDesktop, height } = useResponsiveLayout();
  // Hero section takes 62% of screen height; bottom section takes 38%
  const heroHeight = Math.round(height * 0.62);
  const bottomHeight = height - heroHeight;

  return (
    <View style={styles.container}>
      {/* Top Hero Section */}
      <View style={[styles.heroSection, { height: heroHeight }]}>
        <LinearGradient
          colors={['#4287F5', '#235CC4', '#0E285C', '#08090F']}
          locations={[0, 0.35, 0.7, 1]}
          style={StyleSheet.absoluteFillObject}
        />
        <Image
          source={require('../../welcome_hero.png')}
          style={styles.heroImage}
          resizeMode={isMobile ? 'cover' : 'contain'}
        />
        <LinearGradient
          colors={['transparent', 'rgba(8, 9, 15, 0.45)', '#08090F']}
          locations={[0, 0.75, 1]}
          style={styles.bottomBlend}
        />
      </View>

      {/* Bottom Content Section */}
      <View style={[styles.bottomSection, { height: bottomHeight }]}>
        <View style={styles.textContainer}>
          <Text style={[styles.headingText, (isTablet || isDesktop) && styles.headingTextLarge]}>
            Welcome to Prompt Media
          </Text>
          <Text style={[styles.bodyText, (isTablet || isDesktop) && styles.bodyTextLarge]}>
            Where AI creativity comes to life.
          </Text>
          <Text style={[styles.bodyText, (isTablet || isDesktop) && styles.bodyTextLarge]}>
            Discover amazing creations, explore the prompts
          </Text>
          <Text style={[styles.bodyText, (isTablet || isDesktop) && styles.bodyTextLarge]}>
            behind them, and find inspiration for your next idea.
          </Text>
          <Text style={[styles.taglineText, (isTablet || isDesktop) && styles.taglineTextLarge]}>
            Create. Share. Copy. Inspire.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <GradientButton
            title="Next"
            onPress={onNext}
            minWidth={isTablet || isDesktop ? 200 : 165}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#08090F',
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
    backgroundColor: '#08090F',
  },
  textContainer: {
    alignItems: 'center',
    maxWidth: 520,
  },
  headingText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 21,
    letterSpacing: 0.2,
  },
  headingTextLarge: {
    fontSize: 18,
    lineHeight: 25,
    marginBottom: 2,
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
