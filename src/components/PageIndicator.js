import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function PageIndicator({
  totalPages = 2,
  activeIndex = 0,
  onDotPress,
  style,
}) {
  return (
    <View
      style={[styles.container, style]}
      accessible={true}
      accessibilityRole="tablist"
      accessibilityLabel={`Page ${activeIndex + 1} of ${totalPages}`}
    >
      {Array.from({ length: totalPages }).map((_, index) => {
        const isActive = index === activeIndex;

        return (
          <Pressable
            key={`page-dot-${index}`}
            onPress={() => onDotPress && onDotPress(index)}
            disabled={!onDotPress}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`Go to page ${index + 1}`}
            style={({ pressed }) => [
              styles.dotBase,
              isActive ? styles.activeDotWrapper : styles.inactiveDot,
              pressed && onDotPress && styles.pressedDot,
            ]}
          >
            {isActive ? (
              <LinearGradient
                colors={['#2997FF', '#C026D3']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.activePill}
              />
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 14,
  },
  dotBase: {
    height: 6,
    borderRadius: 3,
  },
  inactiveDot: {
    width: 7,
    backgroundColor: 'rgba(255, 255, 255, 0.32)',
  },
  activeDotWrapper: {
    width: 24,
    overflow: 'hidden',
    shadowColor: '#C026D3',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  },
  activePill: {
    width: '100%',
    height: '100%',
    borderRadius: 3,
  },
  pressedDot: {
    opacity: 0.7,
  },
});
