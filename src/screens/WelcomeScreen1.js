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
import GradientButton from '../components/GradientButton';
import { useResponsiveLayout } from '../constants/responsive';

export default function WelcomeScreen1({ onNext }) {
  const { isMobile, isTablet, isDesktop, width, height } = useResponsiveLayout();
  const [isHovered, setIsHovered] = useState(false);

  // Desktop / Laptop layout (MacBook Pro 16_ - 1.png)
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
            source={require('../../assets/macbook_1.png')}
            style={styles.desktopImage}
            resizeMode="contain"
          />

          {/* Interactive button overlay over 'Next >' */}
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={onNext}
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
