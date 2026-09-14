import React, { useState } from 'react';
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
  const [isHovered, setIsHovered] = useState(false);

  // Desktop / Laptop layout (MacBook Pro 16_ - 2.png)
  if (isDesktop) {
    const targetAspect = 1728 / 1117; // ~1.547
    const currentAspect = width / height;

    let frameWidth, frameHeight;
    if (currentAspect > targetAspect) {
      frameHeight = height;
      frameWidth = height * targetAspect;
    } else {
      frameWidth = width;
      frameHeight = width / targetAspect;
    }

    // Proportional coordinates matching Figma 1728x1117 button (x: 1130, y: 886, w: 378, h: 71)
    const btnLeft = frameWidth * (1130 / 1728);
    const btnTop = frameHeight * (886 / 1117);
    const btnWidth = frameWidth * (378 / 1728);
    const btnHeight = frameHeight * (71 / 1117);

    return (
      <View style={styles.desktopOuter}>
        <View style={[styles.desktopFrame, { width: frameWidth, height: frameHeight }]}>
          <Image
            source={require('../../assets/macbook_2.png')}
            style={styles.desktopImage}
            resizeMode="contain"
          />

          {/* Desktop Back button */}
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

          {/* Interactive button overlay over 'Next >' */}
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={onStart}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            accessibilityRole="button"
            accessibilityLabel="Next"
            style={[
              styles.desktopButtonOverlay,
              {
                left: btnLeft,
                top: btnTop,
                width: btnWidth,
                height: btnHeight,
                borderRadius: btnHeight / 2,
              },
              isHovered && styles.desktopButtonHovered,
            ]}
          />
        </View>
      </View>
    );
  }

  // Mobile / Portrait Tablet layout
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
  // Desktop layout styles
  desktopOuter: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#0D111B',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  desktopFrame: {
    position: 'relative',
    backgroundColor: '#0D111B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  desktopImage: {
    width: '100%',
    height: '100%',
  },
  desktopBackButton: {
    position: 'absolute',
    top: 24,
    left: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: 'rgba(20, 24, 38, 0.75)',
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
  desktopButtonOverlay: {
    position: 'absolute',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  desktopButtonHovered: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderColor: 'rgba(255, 255, 255, 0.35)',
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },

  // Mobile layout styles
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
