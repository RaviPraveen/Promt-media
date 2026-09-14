import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import WelcomeScreen1 from './src/screens/WelcomeScreen1';
import WelcomeScreen2 from './src/screens/WelcomeScreen2';
import AuthScreen from './src/screens/AuthScreen';
import { useResponsiveLayout } from './src/constants/responsive';

export default function App() {
  const { width, height, isDesktop } = useResponsiveLayout();
  const [currentScreen, setCurrentScreen] = useState('welcome'); // 'welcome' | 'auth'
  const flatListRef = useRef(null);

  // Full 100% width on Mobile and Tablet (iPhone 16 Pro Max, iPad Air, etc.)
  // On large desktop displays (>1024px), center within an elegant mobile/tablet frame
  const activeWidth = isDesktop ? Math.min(width * 0.42, 500) : width;

  const goToNextPage = () => {
    flatListRef.current?.scrollToIndex({ index: 1, animated: true });
  };

  const goToPrevPage = () => {
    flatListRef.current?.scrollToIndex({ index: 0, animated: true });
  };

  const handleStart = () => {
    setCurrentScreen('auth');
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

      {currentScreen === 'welcome' ? (
        <View style={[styles.responsiveWrapper, { width: activeWidth }]}>
          <FlatList
            ref={flatListRef}
            data={screens}
            renderItem={({ item }) => (
              <View style={{ width: activeWidth, height: '100%' }}>
                {item.component}
              </View>
            )}
            style={{ width: activeWidth, height: '100%' }}
            contentContainerStyle={{ height: '100%' }}
            keyExtractor={(item) => item.key}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            bounces={false}
            initialNumToRender={2}
            getItemLayout={(data, index) => ({
              length: activeWidth,
              offset: activeWidth * index,
              index,
            })}
          />
        </View>
      ) : (
        <View style={[styles.responsiveWrapper, { width: isDesktop ? Math.min(width * 0.45, 520) : width }]}>
          <AuthScreen
            onBack={() => setCurrentScreen('welcome')}
            onAuthSuccess={() => setCurrentScreen('welcome')}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#020305',
    alignItems: 'center',
    justifyContent: 'center',
  },
  responsiveWrapper: {
    flex: 1,
    height: '100%',
    backgroundColor: '#08090F',
    overflow: 'hidden',
  },
});
