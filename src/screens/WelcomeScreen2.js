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

export default function WelcomeScreen2({ onStart, onBack }) {
  return (
    <View style={styles.container}>
      {/* Top Hero Section (Full-Width Edge-to-Edge matching Group 17 mockup) */}
      <View style={styles.heroSection}>
        <Image
          source={require('../../2ndwelcomepage.png')}
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
          <Text style={styles.headingText}>Share Your Creativity</Text>
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
        <View style={styles.buttonContainer}>
          <GradientButton
            title="Let's Start"
            onPress={onStart}
            minWidth={200}
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
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 24 : 44,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
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
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  bodyText: {
    color: '#D1D5DB',
    fontSize: 13.5,
    lineHeight: 19,
    textAlign: 'center',
    fontWeight: '400',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
});
