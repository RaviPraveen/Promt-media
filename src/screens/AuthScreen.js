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
import SocialButton from '../components/SocialButton';
import GradientButton from '../components/GradientButton';
import { useResponsiveLayout } from '../constants/responsive';

export default function AuthScreen({ onBack, onAuthSuccess }) {
  const { isMobile, isTablet, isDesktop, width } = useResponsiveLayout();
  const [isSignUp, setIsSignUp] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email is required';
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
      if (!username.trim()) errs.username = 'Username is required';
      if (password !== confirmPassword) {
        errs.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const action = isSignUp ? 'Account Created' : 'Signed In';
      Alert.alert(
        'Success',
        `🎉 Successfully ${action} as ${email}! Welcome to Prompt Media.`,
        [{ text: 'Continue', onPress: () => onAuthSuccess && onAuthSuccess() }]
      );
    }
  };

  const handleSocialAuth = (provider) => {
    Alert.alert(
      `${provider} Sign In`,
      `Connecting to ${provider} authentication...`,
      [{ text: 'OK' }]
    );
  };

  const cardWidth = isDesktop ? 480 : isTablet ? 520 : '100%';

  return (
    <View style={styles.container}>
      {/* Background ambient lighting glows */}
      <LinearGradient
        colors={['rgba(41, 151, 255, 0.15)', 'transparent']}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.8, y: 0.5 }}
        style={styles.ambientGlowLeft}
      />
      <LinearGradient
        colors={['rgba(224, 64, 251, 0.12)', 'transparent']}
        start={{ x: 0.9, y: 0.3 }}
        end={{ x: 0.2, y: 0.8 }}
        style={styles.ambientGlowRight}
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
          <View style={[styles.card, { width: cardWidth }]}>
            {/* Top Navigation Bar */}
            <View style={styles.headerBar}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onBack}
                style={styles.backButton}
              >
                <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
              </TouchableOpacity>

              <View style={styles.brandRow}>
                <Image
                  source={require('../../logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
                <Text style={styles.brandTitle}>Prompt Media</Text>
              </View>

              <View style={{ width: 38 }} />
            </View>

            {/* Title & Subtitle */}
            <View style={styles.titleSection}>
              <Text style={styles.title}>
                {isSignUp ? 'Create an Account' : 'Welcome Back'}
              </Text>
              <Text style={styles.subtitle}>
                {isSignUp
                  ? 'Join thousands of creators sharing and copying AI prompt recipes.'
                  : 'Sign in to explore amazing AI creations and copy prompts.'}
              </Text>
            </View>

            {/* Tab Switcher (Sign In vs Create Account) */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setIsSignUp(false);
                  setErrors({});
                }}
                style={[styles.tabButton, !isSignUp && styles.tabButtonActive]}
              >
                <Text
                  style={[styles.tabText, !isSignUp && styles.tabTextActive]}
                >
                  Sign In
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setIsSignUp(true);
                  setErrors({});
                }}
                style={[styles.tabButton, isSignUp && styles.tabButtonActive]}
              >
                <Text
                  style={[styles.tabText, isSignUp && styles.tabTextActive]}
                >
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>

            {/* Social Authentication */}
            <View style={styles.socialSection}>
              <SocialButton
                provider="google"
                title={isSignUp ? 'Sign up with Google' : 'Continue with Google'}
                onPress={() => handleSocialAuth('Google')}
              />
              <SocialButton
                provider="apple"
                title={isSignUp ? 'Sign up with Apple' : 'Continue with Apple'}
                onPress={() => handleSocialAuth('Apple')}
              />
            </View>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR WITH EMAIL</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Form Fields */}
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
                    label="Username"
                    placeholder="e.g. alex_ai"
                    value={username}
                    onChangeText={setUsername}
                    iconName="at-outline"
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
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                iconName="lock-closed-outline"
                error={errors.password}
              />

              {isSignUp && (
                <GlassInput
                  label="Confirm Password"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  iconName="shield-checkmark-outline"
                  error={errors.confirmPassword}
                />
              )}

              {!isSignUp && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    Alert.alert(
                      'Reset Password',
                      'A password reset link will be sent to your email.'
                    )
                  }
                  style={styles.forgotPasswordContainer}
                >
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              )}

              {/* Submit CTA */}
              <View style={styles.submitWrapper}>
                <GradientButton
                  title={isSignUp ? 'Create Account' : 'Sign In'}
                  onPress={handleSubmit}
                  style={{ width: '100%' }}
                />
              </View>
            </View>

            {/* Switch Mode Prompt */}
            <View style={styles.footerPrompt}>
              <Text style={styles.footerText}>
                {isSignUp
                  ? 'Already have an account?'
                  : "Don't have an account?"}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setIsSignUp(!isSignUp);
                  setErrors({});
                }}
              >
                <Text style={styles.footerActionText}>
                  {isSignUp ? ' Sign In' : ' Create Account'}
                </Text>
              </TouchableOpacity>
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
    backgroundColor: '#08090F',
    position: 'relative',
  },
  ambientGlowLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 350,
    height: 350,
    borderRadius: 175,
  },
  ambientGlowRight: {
    position: 'absolute',
    bottom: 40,
    right: 0,
    width: 320,
    height: 320,
    borderRadius: 160,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: Platform.OS === 'ios' ? 54 : 32,
    paddingBottom: 40,
  },
  scrollContentCentered: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  card: {
    backgroundColor: 'rgba(14, 16, 26, 0.8)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 22,
    paddingVertical: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 28,
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
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 28,
    height: 28,
    borderRadius: 7,
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  titleSection: {
    marginBottom: 22,
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
    fontSize: 13.5,
    lineHeight: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 11,
  },
  tabButtonActive: {
    backgroundColor: 'rgba(56, 189, 248, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.35)',
  },
  tabText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  socialSection: {
    marginBottom: 16,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dividerText: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  formSection: {
    marginBottom: 16,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 18,
    marginTop: -4,
  },
  forgotPasswordText: {
    color: '#38BDF8',
    fontSize: 12.5,
    fontWeight: '600',
  },
  submitWrapper: {
    marginTop: 6,
  },
  footerPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  footerText: {
    color: '#94A3B8',
    fontSize: 13.5,
  },
  footerActionText: {
    color: '#EC4899',
    fontSize: 13.5,
    fontWeight: '700',
  },
});
