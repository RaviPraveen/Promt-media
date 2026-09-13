import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import WelcomeScreen1 from './src/screens/WelcomeScreen1';
import WelcomeScreen2 from './src/screens/WelcomeScreen2';
import { COLORS } from './src/constants/theme';

const { width } = Dimensions.get('window');

export default function App() {
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
    const index = Math.round(offsetX / width);
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
    <View style={styles.container}>
      <ExpoStatusBar style="light" translucent backgroundColor="transparent" />
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <FlatList
        ref={flatListRef}
        data={screens}
        renderItem={({ item }) => (
          <View style={{ width, flex: 1 }}>{item.component}</View>
        )}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        initialNumToRender={2}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
