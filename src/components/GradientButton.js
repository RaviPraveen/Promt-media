import React from 'react';
import { StyleSheet, Text, Pressable, View, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function GradientButton({
  title,
  onPress,
  style,
  textStyle,
  minWidth = 190,
  iconName = 'chevron-forward',
  showIcon = true,
  loading = false,
  disabled = false,
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={({ pressed }) => [
        styles.wrapper,
        { minWidth },
        pressed && !disabled && !loading && styles.pressed,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      <LinearGradient
        colors={['#2997FF', '#9333EA', '#FF2A85']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradient}
      >
        {loading ? (
          <ActivityIndicator color="#000000" size="small" />
        ) : (
          <>
            <Text style={[styles.text, textStyle]}>{title}</Text>
            {showIcon && (
              <Ionicons
                name={iconName}
                size={19}
                color="#000000"
                style={styles.icon}
              />
            )}
          </>
        )}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 30,
    shadowColor: '#C026D3',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 18,
    elevation: 8,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
    height: 52,
  },
  disabled: {
    opacity: 0.65,
  },
  text: {
    fontSize: 16.5,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: 0.3,
  },
  icon: {
    marginLeft: 6,
  },
});
