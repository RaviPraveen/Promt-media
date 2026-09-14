import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import GlassInput from '../components/GlassInput';
import GradientButton from '../components/GradientButton';
import { useResponsiveLayout } from '../constants/responsive';

export default function AuthScreen({ onBack, onAuthSuccess }) {
  const { isMobile, isTablet, isDesktop } = useResponsiveLayout();
  const [isSignUp, setIsSignUp] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    if (isSignUp) {
      if (!name.trim()) errs.name = 'Full name is required';
      if (!username.trim()) {
        errs.username = 'Username is required';
      } else if (username.length < 3) {
        errs.username = 'Username must be at least 3 characters';
      }
      if (password !== confirmPassword) {
        errs.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        const action = isSignUp ? 'Account Created' : 'Signed In';
        Alert.alert(
          'Success',
          `🎉 Successfully ${action} as ${email}! Welcome to Prompt Media.`,
          [{ text: 'Continue to Feed', onPress: () => onAuthSuccess && onAuthSuccess() }]
        );
      }, 700);
    }
  };

  const showDesktopSplit = isDesktop;

  return (
    <View style={styles.container}>
      {/* Radiant atmospheric background glow orbs */}
      <LinearGradient
        colors={['rgba(41, 151, 255, 0.16)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 0.6 }}
        style={styles.ambientGlowTopLeft}
      />
      <LinearGradient
        colors={['rgba(147, 51, 234, 0.14)', 'transparent']}
        start={{ x: 1, y: 0.2 }}
        end={{ x: 0.2, y: 0.8 }}
        style={styles.ambientGlowRight}
      />
      <LinearGradient
        colors={['rgba(255, 42, 133, 0.10)', 'transparent']}
        start={{ x: 0.2, y: 1 }}
        end={{ x: 0.8, y: 0.3 }}
        style={styles.ambientGlowBottomLeft}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            (isTablet || isDesktop) && styles.scrollContentCentered,
          ]}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Main Layout Container */}
          <View style={[styles.mainLayout, showDesktopSplit && styles.desktopSplitLayout]}>
            
            {/* Desktop Left Showcase Panel */}
            {showDesktopSplit && (
              <View style={styles.desktopShowcasePanel}>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.07)', 'rgba(255, 255, 255, 0.02)']}
                  style={styles.showcaseCard}
                >
                  <View style={styles.showcaseHeader}>
                    <View style={styles.showcaseBadge}>
                      <Ionicons name="sparkles" size={13} color="#38BDF8" />
                      <Text style={styles.showcaseBadgeText}>COMMUNITY SPOTLIGHT</Text>
                    </View>
                  </View>

                  <View style={styles.showcaseImageContainer}>
                    <Image
                      source={require('../../welcome_hero.png')}
                      style={styles.showcaseImage}
                      resizeMode="cover"
                    />
                    <LinearGradient
                      colors={['transparent', 'rgba(7, 8, 14, 0.95)']}
                      style={styles.showcaseImageOverlay}
                    />
                    <View style={styles.promptCardFloat}>
                      <View style={styles.promptTagRow}>
                        <Text style={styles.promptTagName}>Midjourney v6.1</Text>
                        <Text style={styles.promptTagRatio}>--ar 16:9</Text>
                      </View>
                      <Text style={styles.promptSnippet} numberOfLines={2}>
                        "Cyberpunk samurai heroine under holographic rain, neon reflections, ultra-detailed 8k..."
                      </Text>
                    </View>
                  </View>

                  <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>250k+</Text>
                      <Text style={styles.statLabel}>Prompts</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>50k+</Text>
                      <Text style={styles.statLabel}>Creators</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>100%</Text>
                      <Text style={styles.statLabel}>Free to Copy</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            )}

            {/* Native Mobile / Tablet Auth Card */}
            <View
              style={[
                styles.card,
                isMobile && styles.mobileCard,
                isTablet && styles.tabletCard,
                isDesktop && styles.desktopCard,
              ]}
            >
              {/* Top Navigation Bar */}
              <View style={styles.headerBar}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={onBack}
                  style={styles.backButton}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Ionicons name="arrow-back" size={19} color="#FFFFFF" />
                </TouchableOpacity>

                <View style={styles.brandRow}>
                  <View style={styles.logoBadge}>
                    <Image
                      source={require('../../logo.png')}
                      style={styles.logo}
                      resizeMode="contain"
                    />
                  </View>
                  <View>
                    <Text style={styles.brandTitle}>Prompt Media</Text>
                    <Text style={styles.brandSubtitle}>AI CREATIVE HUB</Text>
                  </View>
                </View>

                {/* Symmetrical placeholder */}
                <View style={styles.placeholderSpacer} />
              </View>

              {/* Title & Subtitle */}
              <View style={styles.titleSection}>
                <Text style={styles.title}>
                  {isSignUp ? 'Create Account' : 'Welcome Back'}
                </Text>
                <Text style={styles.subtitle}>
                  {isSignUp
                    ? 'Join a thriving network of AI creators to copy & share prompt recipes.'
                    : 'Sign in to access your saved prompts, collections, and feed.'}
                </Text>
              </View>

              {/* Form Fields (Primary Focus at the Top) */}
              <View style={styles.formSection}>
                {isSignUp && (
                  <>
                    <GlassInput
                      label="Full Name"
                      placeholder="e.g. Alex Rivera"
                      value={name}
                      onChangeText={setName}
                      iconName="person-outline"
                      autoCapitalize="words"
                      error={errors.name}
                    />
                    <GlassInput
                      label="Creator Username"
                      placeholder="e.g. alex_ai"
                      value={username}
                      onChangeText={setUsername}
                      iconName="at-outline"
                      hint="Unique handle"
                      error={errors.username}
                    />
                  </>
                )}

                <GlassInput
                  label="Email Address"
                  placeholder="name@example.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  iconName="mail-outline"
                  error={errors.email}
                />

                <GlassInput
                  label="Password"
                  placeholder={isSignUp ? 'Create a password (6+ chars)' : 'Enter your password'}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  iconName="lock-closed-outline"
                  error={errors.password}
                />

                {isSignUp && (
                  <GlassInput
                    label="Confirm Password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    iconName="shield-checkmark-outline"
                    error={errors.confirmPassword}
                  />
                )}

                {/* Extra Options Row: Remember Me & Forgot Password */}
                {!isSignUp ? (
                  <View style={styles.optionsRow}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => setRememberMe(!rememberMe)}
                      style={styles.rememberMeRow}
                    >
                      <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                        {rememberMe && <Ionicons name="checkmark" size={12} color="#000000" />}
                      </View>
                      <Text style={styles.rememberMeText}>Remember me</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() =>
                        Alert.alert(
                          'Reset Password',
                          'Please enter your email to receive password reset instructions.'
                        )
                      }
                    >
                      <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.termsNotice}>
                    <Ionicons name="shield-outline" size={14} color="#64748B" style={{ marginRight: 6 }} />
                    <Text style={styles.termsText}>
                      By joining, you agree to our{' '}
                      <Text style={styles.termsLink}>Terms</Text> and{' '}
                      <Text style={styles.termsLink}>Privacy Policy</Text>.
                    </Text>
                  </View>
                )}

                {/* Primary Action Button */}
                <View style={styles.submitWrapper}>
                  <GradientButton
                    title={isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'}
                    onPress={handleSubmit}
                    loading={loading}
                    style={{ width: '100%' }}
                  />
                </View>
              </View>

              {/* Switch Mode Footer */}
              <View style={styles.footerPrompt}>
                <Text style={styles.footerText}>
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setIsSignUp(!isSignUp);
                    setErrors({});
                  }}
                >
                  <Text style={styles.footerActionText}>
                    {isSignUp ? ' Sign In' : ' Sign Up'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Subtle App Version at the very bottom */}
              <View style={styles.bottomVersionRow}>
                <Text style={styles.bottomVersionText}>Prompt Media • v1.0.0</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#06070C',
    position: 'relative',
    overflow: 'hidden',
  },
  ambientGlowTopLeft: {
    position: 'absolute',
    top: -50,
    left: -50,
    width: 420,
    height: 420,
    borderRadius: 210,
  },
  ambientGlowRight: {
    position: 'absolute',
    top: 200,
    right: -80,
    width: 380,
    height: 380,
    borderRadius: 190,
  },
  ambientGlowBottomLeft: {
    position: 'absolute',
    bottom: -60,
    left: 20,
    width: 360,
    height: 360,
    borderRadius: 180,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 26,
    paddingBottom: 32,
    flexGrow: 1,
  },
  scrollContentCentered: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  mainLayout: {
    width: '100%',
    alignItems: 'center',
  },
  desktopSplitLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
    maxWidth: 1040,
  },
  desktopShowcasePanel: {
    flex: 1,
    maxWidth: 450,
  },
  showcaseCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 24,
    overflow: 'hidden',
    backgroundColor: 'rgba(15, 18, 28, 0.65)',
  },
  showcaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  showcaseBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
  },
  showcaseBadgeText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  showcaseImageContainer: {
    width: '100%',
    height: 240,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 18,
  },
  showcaseImage: {
    width: '100%',
    height: '100%',
  },
  showcaseImageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  promptCardFloat: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: 'rgba(10, 12, 20, 0.85)',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  promptTagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  promptTagName: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '700',
  },
  promptTagRatio: {
    color: '#94A3B8',
    fontSize: 10,
  },
  promptSnippet: {
    color: '#E2E8F0',
    fontSize: 12,
    lineHeight: 16,
    fontStyle: 'italic',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
  },
  statLabel: {
    color: '#94A3B8',
    fontSize: 11.5,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  card: {
    backgroundColor: 'rgba(14, 17, 28, 0.82)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 22,
    paddingVertical: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.6,
    shadowRadius: 32,
    elevation: 10,
  },
  mobileCard: {
    width: '100%',
  },
  tabletCard: {
    width: 480,
  },
  desktopCard: {
    width: 480,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  logoBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logo: {
    width: 26,
    height: 26,
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  brandSubtitle: {
    color: '#38BDF8',
    fontSize: 9.5,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  placeholderSpacer: {
    width: 38,
  },
  titleSection: {
    marginBottom: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 19,
  },
  formSection: {
    marginBottom: 10,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
    marginTop: 2,
  },
  rememberMeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  checkbox: {
    width: 17,
    height: 17,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#475569',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  checkboxActive: {
    backgroundColor: '#38BDF8',
    borderColor: '#38BDF8',
  },
  rememberMeText: {
    color: '#94A3B8',
    fontSize: 12.5,
    fontWeight: '500',
  },
  forgotPasswordText: {
    color: '#38BDF8',
    fontSize: 12.5,
    fontWeight: '600',
  },
  termsNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    paddingHorizontal: 2,
  },
  termsText: {
    color: '#64748B',
    fontSize: 12,
    flex: 1,
  },
  termsLink: {
    color: '#EC4899',
    fontWeight: '600',
  },
  submitWrapper: {
    marginTop: 4,
  },
  footerPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  footerText: {
    color: '#94A3B8',
    fontSize: 13,
  },
  footerActionText: {
    color: '#EC4899',
    fontSize: 13,
    fontWeight: '700',
  },
  bottomVersionRow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  bottomVersionText: {
    color: '#475569',
    fontSize: 11,
    fontWeight: '500',
  },
});
