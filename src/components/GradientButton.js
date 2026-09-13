import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

export default function GradientButton({ title, onPress, style, textStyle, minWidth = 190 }) {
  return (
    <TouchableOpacity
      activeOpacity={0.82}
      onPress={onPress}
      style={[styles.wrapper, { minWidth }, style]}
    >
      <LinearGradient
        colors={['#2997FF', '#9333EA', '#FF2A85']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradient}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
        <Ionicons name="chevron-forward" size={20} color="#000000" style={styles.icon} />
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 30,
    shadowColor: '#C026D3',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.2,
  },
  icon: {
    marginLeft: 6,
    strokeWidth: 3,
  },
});
