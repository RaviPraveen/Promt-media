import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  Platform,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WelcomeScreen1 from './src/screens/WelcomeScreen1';
import WelcomeScreen2 from './src/screens/WelcomeScreen2';
import AuthScreen from './src/screens/AuthScreen';
import { useResponsiveLayout } from './src/constants/responsive';

export default function App() {
  const { width, height, isDesktop } = useResponsiveLayout();
  const [currentScreen, setCurrentScreen] = useState('welcome'); // 'welcome' | 'auth'
  const flatListRef = useRef(null);

  // Full 100% width on all devices (mobile, tablet, desktop)
  const activeWidth = width;

  const goToNextPage = () => {
    flatListRef.current?.scrollToIndex({ index: 1, animated: true });
  };

  const goToPrevPage = () => {
    flatListRef.current?.scrollToIndex({ index: 0, animated: true });
  };

  const handleStart = () => {
    setCurrentScreen('auth');
  };

  // Inject Google Fonts for web
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const fontId = 'prompt-media-google-fonts';
      if (!document.getElementById(fontId)) {
        const link = document.createElement('link');
        link.id = fontId;
        link.rel = 'stylesheet';
        link.href =
          'https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
        document.head.appendChild(link);
      }
    }
  }, []);

  // Keyboard navigation on desktop web
  useEffect(() => {
    if (Platform.OS === 'web' && currentScreen === 'welcome') {
      const handleKeyDown = (e) => {
        if (e.key === 'ArrowRight') {
          goToNextPage();
        } else if (e.key === 'ArrowLeft') {
          goToPrevPage();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [currentScreen]);

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
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#07080E' }}>
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
          <View style={styles.authWrapper}>
            <AuthScreen
              onBack={() => setCurrentScreen('welcome')}
              onAuthSuccess={() => setCurrentScreen('welcome')}
            />
          </View>
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#07080E',
  },
  responsiveWrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#07080E',
    overflow: 'hidden',
  },
  authWrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#07080E',
  },
});
