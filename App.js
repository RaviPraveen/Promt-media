import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  useWindowDimensions,
  Platform,
  Alert,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import WelcomeScreen1 from './src/screens/WelcomeScreen1';
import WelcomeScreen2 from './src/screens/WelcomeScreen2';
import { COLORS } from './src/constants/theme';

export default function App() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const screenWidth = Math.min(windowWidth, 440);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const goToNextPage = () => {
    flatListRef.current?.scrollToIndex({ index: 1, animated: true });
    setActiveIndex(1);
  };

  const goToPrevPage = () => {
    flatListRef.current?.scrollToIndex({ index: 0, animated: true });
    setActiveIndex(0);
  };

  const handleStart = () => {
    Alert.alert(
      'Prompt Media',
      "Welcome to Prompt Media! You're all set to create, share, and discover AI prompts.",
      [{ text: "Let's Go!", style: 'default' }]
    );
  };

  const handleMomentumScrollEnd = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / screenWidth);
    setActiveIndex(index);
  };

  const screens = [
    {
      key: 'welcome-1',
      component: (
        <WelcomeScreen1
          onNext={goToNextPage}
          activeIndex={activeIndex}
        />
      ),
    },
    {
      key: 'welcome-2',
      component: (
        <WelcomeScreen2
          onStart={handleStart}
          onBack={goToPrevPage}
          activeIndex={activeIndex}
        />
      ),
    },
  ];

  return (
    <View style={styles.outerContainer}>
      <ExpoStatusBar style="light" translucent backgroundColor="transparent" />
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <View style={[styles.mobileWrapper, { width: screenWidth }]}>
        <FlatList
          ref={flatListRef}
          data={screens}
          renderItem={({ item }) => (
            <View style={{ width: screenWidth, height: '100%', flex: 1 }}>
              {item.component}
            </View>
          )}
          style={{ width: screenWidth, height: '100%' }}
          contentContainerStyle={{ height: '100%' }}
          keyExtractor={(item) => item.key}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          initialNumToRender={2}
          getItemLayout={(data, index) => ({
            length: screenWidth,
            offset: screenWidth * index,
            index,
          })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#05060A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileWrapper: {
    flex: 1,
    height: '100%',
    backgroundColor: COLORS.background,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
  },
});
