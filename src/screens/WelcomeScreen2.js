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
  const { isMobile, isTablet, isDesktop, height } = useResponsiveLayout();
  // Hero section takes 62% of screen height; bottom section takes 38%
  const heroHeight = Math.round(height * 0.62);
  const bottomHeight = height - heroHeight;

  return (
    <View style={styles.container}>
      {/* Top Hero Section */}
      <View style={[styles.heroSection, { height: heroHeight }]}>
        <LinearGradient
          colors={['#5A98DF', '#3A70B8', '#08090F']}
          locations={[0, 0.5, 1]}
          style={StyleSheet.absoluteFillObject}
        />
        <Image
          source={require('../../2ndwelcomepage.png')}
          style={styles.heroImage}
          resizeMode={isMobile ? 'cover' : 'contain'}
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
          colors={['transparent', 'rgba(8, 9, 15, 0.45)', '#08090F']}
          locations={[0, 0.75, 1]}
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
            minWidth={isTablet || isDesktop ? 230 : 200}
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
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 24 : 44,
    right: 20,
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
    backgroundColor: '#08090F',
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
    fontSize: 20,
    lineHeight: 28,
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
