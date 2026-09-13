import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import GradientButton from '../components/GradientButton';
import { COLORS } from '../constants/theme';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen2({ onStart, onBack, activeIndex = 1 }) {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Top Header with App Logo and Optional Back Icon */}
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            style={styles.logoWrapper}
          >
            <Image
              source={require('../../logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {onBack && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onBack}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>

        {/* Hero Image Container */}
        <View style={styles.heroWrapper}>
          <Image
            source={require('../../2ndwelcomepage.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
          {/* Subtle bottom fade to blend into the pure dark background */}
          <LinearGradient
            colors={['rgba(7, 8, 13, 0)', 'rgba(7, 8, 13, 0.7)', '#07080D']}
            locations={[0, 0.6, 1]}
            style={styles.bottomBlendGradient}
          />
        </View>

        {/* Bottom Content Area */}
        <View style={styles.bottomSection}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.title}>Share Your Creativity</Text>
            <Text style={styles.bodyText}>
              Post your AI-generated images with the prompts
            </Text>
            <Text style={styles.bodyText}>behind them.</Text>
            <Text style={styles.bodyText}>
              Get likes, gain followers, connect with other creators
            </Text>
            <Text style={styles.bodyText}>and inspire the community.</Text>
          </View>

          {/* Action Button */}
          <View style={styles.buttonWrapper}>
            <GradientButton
              title="Let's Start"
              onPress={onStart}
              minWidth={210}
            />
          </View>

          {/* Pagination Indicators */}
          <View style={styles.pagination}>
            <TouchableOpacity onPress={onBack} activeOpacity={0.7}>
              <View style={[styles.dot, activeIndex === 0 && styles.activeDot]} />
            </TouchableOpacity>
            <View style={[styles.dot, activeIndex === 1 && styles.activeDot]} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 16 : 8,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 20,
  },
  logoWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(20, 22, 32, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroWrapper: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  heroImage: {
    width: width,
    height: '100%',
    maxHeight: height * 0.62,
  },
  bottomBlendGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -2,
    height: 85,
  },
  bottomSection: {
    paddingHorizontal: 26,
    paddingBottom: Platform.OS === 'ios' ? 24 : 32,
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  descriptionContainer: {
    alignItems: 'center',
    marginBottom: 26,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  bodyText: {
    color: '#D1D5DB',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    fontWeight: '400',
  },
  buttonWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
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
    backgroundColor: '#EC4899',
  },
});
