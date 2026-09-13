import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GradientButton from '../components/GradientButton';
import { COLORS } from '../constants/theme';

export default function WelcomeScreen1({ onNext, activeIndex = 0 }) {
  return (
    <View style={styles.container}>
      {/* Dynamic Sky Gradient in Top Background */}
      <LinearGradient
        colors={['#4287F5', '#235CC4', '#0E285C', '#07080D']}
        locations={[0, 0.35, 0.65, 0.95]}
        style={styles.topGradient}
      />

      <SafeAreaView style={styles.safeArea}>
        {/* Top Header with App Logo */}
        <View style={styles.header}>
          <Image
            source={require('../../logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Fantasy/Expressive Main Heading */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Welcome to</Text>
          <Text style={styles.titleText}>Promt Media</Text>
        </View>

        {/* Hero Illustration Container */}
        <View style={styles.heroWrapper}>
          <Image
            source={require('../../Welcomepage.png')}
            style={styles.heroImage}
            resizeMode="contain"
          />
          {/* Bottom blend gradient so image melts into pure dark background */}
          <LinearGradient
            colors={['rgba(7, 8, 13, 0)', 'rgba(7, 8, 13, 0.85)', '#07080D']}
            locations={[0, 0.65, 1]}
            style={styles.bottomBlendGradient}
          />
        </View>

        {/* Bottom Content Area */}
        <View style={styles.bottomSection}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descHeading}>Welcome to Prompt Media</Text>
            <Text style={styles.descText}>Where AI creativity comes to life.</Text>
            <Text style={styles.descText}>
              Discover amazing creations, explore the prompts
            </Text>
            <Text style={styles.descText}>
              behind them, and find inspiration for your next idea.
            </Text>
            <Text style={styles.tagline}>Create. Share. Copy. Inspire.</Text>
          </View>

          {/* Action Button */}
          <View style={styles.buttonWrapper}>
            <GradientButton
              title="Next"
              onPress={onNext}
              minWidth={170}
            />
          </View>

          {/* Pagination Indicators */}
          <View style={styles.pagination}>
            <View style={[styles.dot, activeIndex === 0 && styles.activeDot]} />
            <TouchableOpacity onPress={onNext} activeOpacity={0.7}>
              <View style={[styles.dot, activeIndex === 1 && styles.activeDot]} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: COLORS.background,
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '70%',
  },
  safeArea: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
  },
  header: {
    paddingHorizontal: 22,
    paddingTop: Platform.OS === 'android' ? 16 : 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 4,
    zIndex: 10,
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    fontFamily: Platform.select({
      ios: 'Georgia',
      android: 'serif',
      default: 'serif',
    }),
    letterSpacing: 0.8,
    textShadowColor: 'rgba(0, 0, 0, 0.45)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  heroWrapper: {
    flex: 1,
    minHeight: 300,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: 12,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    minHeight: 280,
    maxWidth: 380,
    maxHeight: 400,
  },
  bottomBlendGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -1,
    height: 75,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 24 : 28,
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  descriptionContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  descHeading: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  descText: {
    color: '#D1D5DB',
    fontSize: 13.5,
    lineHeight: 19,
    textAlign: 'center',
    fontWeight: '400',
  },
  tagline: {
    color: '#FFFFFF',
    fontSize: 14.5,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 4,
    letterSpacing: 0.3,
  },
  buttonWrapper: {
    alignItems: 'center',
    marginBottom: 14,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 2,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#334155',
  },
  activeDot: {
    width: 22,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#38BDF8',
  },
});
