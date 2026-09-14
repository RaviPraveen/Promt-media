import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GradientButton from '../components/GradientButton';
import { COLORS } from '../constants/theme';

export default function WelcomeScreen1({ onNext }) {
  return (
    <View style={styles.container}>
      {/* Top Hero Section (Full-Width Edge-to-Edge matching iPhone mockup) */}
      <View style={styles.heroSection}>
        <Image
          source={require('../../welcome_hero.png')}
          style={styles.heroImage}
          resizeMode="cover"
        />
        {/* Soft bottom blend to seamlessly integrate with dark background */}
        <LinearGradient
          colors={['transparent', 'rgba(8, 9, 15, 0.6)', '#08090F']}
          locations={[0, 0.7, 1]}
          style={styles.bottomBlend}
        />
      </View>

      {/* Bottom Content Section */}
      <View style={styles.bottomSection}>
        <View style={styles.textContainer}>
          <Text style={styles.headingText}>Welcome to Prompt Media</Text>
          <Text style={styles.bodyText}>Where AI creativity comes to life.</Text>
          <Text style={styles.bodyText}>
            Discover amazing creations, explore the prompts
          </Text>
          <Text style={styles.bodyText}>
            behind them, and find inspiration for your next idea.
          </Text>
          <Text style={styles.taglineText}>Create. Share. Copy. Inspire.</Text>
        </View>

        {/* Action Button */}
        <View style={styles.buttonContainer}>
          <GradientButton
            title="Next"
            onPress={onNext}
            minWidth={165}
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
    backgroundColor: '#08090F',
  },
  heroSection: {
    width: '100%',
    aspectRatio: 402 / 592,
    position: 'relative',
    overflow: 'hidden',
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
    height: 60,
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 36 : 28,
    backgroundColor: '#08090F',
  },
  textContainer: {
    alignItems: 'center',
  },
  headingText: {
    color: '#FFFFFF',
    fontSize: 14.5,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  bodyText: {
    color: '#D1D5DB',
    fontSize: 13.5,
    lineHeight: 19,
    textAlign: 'center',
    fontWeight: '400',
  },
  taglineText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 21,
    letterSpacing: 0.2,
    marginTop: 2,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
});
