import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  useWindowDimensions,
  Alert,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import WelcomeScreen1 from './src/screens/WelcomeScreen1';
import WelcomeScreen2 from './src/screens/WelcomeScreen2';

export default function App() {
  const { width: windowWidth } = useWindowDimensions();
  const screenWidth = Math.min(windowWidth, 414);
  const flatListRef = useRef(null);

  const goToNextPage = () => {
    flatListRef.current?.scrollToIndex({ index: 1, animated: true });
  };

  const goToPrevPage = () => {
    flatListRef.current?.scrollToIndex({ index: 0, animated: true });
  };

  const handleStart = () => {
    Alert.alert(
      'Prompt Media',
      "Welcome to Prompt Media! You're all set to create, share, and discover AI prompts.",
      [{ text: "Let's Go!", style: 'default' }]
    );
  };

  const screens = [
    {
      key: 'welcome-1',
      component: <WelcomeScreen1 onNext={goToNextPage} />,
    },
    {
      key: 'welcome-2',
      component: <WelcomeScreen2 onStart={handleStart} onBack={goToPrevPage} />,
    },
  ];

  return (
    <View style={styles.outerContainer}>
      <ExpoStatusBar style="light" translucent backgroundColor="transparent" />
      <StatusBar barStyle="light-content" backgroundColor="#08090F" />

      <View style={[styles.mobileWrapper, { width: screenWidth }]}>
        <FlatList
          ref={flatListRef}
          data={screens}
          renderItem={({ item }) => (
            <View style={{ width: screenWidth, height: '100%' }}>
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
    backgroundColor: '#020305',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileWrapper: {
    flex: 1,
    height: '100%',
    backgroundColor: '#08090F',
    overflow: 'hidden',
  },
});
