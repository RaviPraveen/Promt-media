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
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlassInput from '../components/GlassInput';
import GradientButton from '../components/GradientButton';
import { useResponsiveLayout } from '../constants/responsive';

export default function AuthScreen({ onBack, onAuthSuccess }) {
  const insets = useSafeAreaInsets();
  const { isMobile, isTablet, isDesktop, width } = useResponsiveLayout();
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

  // Spacious, professional card sizing
  const cardWidth = isDesktop ? 520 : isTablet ? 480 : '100%';

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: (insets.top > 0 ? insets.top : 20) + 16,
              paddingBottom: (insets.bottom > 0 ? insets.bottom : 20) + 24,
            },
          ]}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Centered Professional Auth Card (No side cards, no background circles) */}
          <View style={[styles.card, { width: cardWidth }]}>
            
            {/* Top Navigation Bar */}
            <View style={styles.headerBar}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onBack}
                style={styles.backButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
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
                {isSignUp ? 'Create an Account' : 'Welcome Back'}
              </Text>
              <Text style={styles.subtitle}>
                {isSignUp
                  ? 'Join a thriving network of AI creators to copy & share prompt recipes.'
                  : 'Sign in to access your saved prompts, collections, and feed.'}
              </Text>
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
                {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#07080E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboardView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  card: {
    backgroundColor: 'rgba(15, 18, 30, 0.92)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 32,
    paddingVertical: 36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.65,
    shadowRadius: 36,
    elevation: 12,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 26,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: 9,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logo: {
    width: 30,
    height: 30,
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  brandSubtitle: {
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  placeholderSpacer: {
    width: 42,
  },
  titleSection: {
    marginBottom: 26,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 0.3,
    marginBottom: 8,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 21,
  },
  formSection: {
    marginBottom: 10,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
    marginTop: 4,
  },
  rememberMeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    cursor: 'pointer',
  },
  checkbox: {
    width: 18,
    height: 18,
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
    fontSize: 13,
    fontWeight: '500',
  },
  forgotPasswordText: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '600',
    cursor: 'pointer',
  },
  termsNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 2,
  },
  termsText: {
    color: '#64748B',
    fontSize: 12.5,
    flex: 1,
  },
  termsLink: {
    color: '#EC4899',
    fontWeight: '600',
  },
  submitWrapper: {
    marginTop: 6,
  },
  footerPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },
  footerText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  footerActionText: {
    color: '#EC4899',
    fontSize: 14,
    fontWeight: '700',
    cursor: 'pointer',
  },
  bottomVersionRow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  bottomVersionText: {
    color: '#475569',
    fontSize: 11.5,
    fontWeight: '500',
  },
});
