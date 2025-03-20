import React from 'react';
import { View, Image, StatusBar } from 'react-native';

export const CustomSplashScreen = () => {
  return (
    <View className="flex-1 bg-white relative overflow-hidden">
      <StatusBar hidden={true} />
      <Image
        className="absolute w-[150px] h-[350px] top-0 right-0"
        source={require('../assets/images/top-curve.png')}
        resizeMode="stretch"
      />
      <Image
        className="absolute w-[215px] h-[215px] top-0 right-0"
        source={require('../assets/images/top-circle.png')}
        resizeMode="stretch"
      />
      <Image
        className="absolute w-[215px] h-[215px] bottom-0 left-0"
        source={require('../assets/images/bottom-circle.png')}
        resizeMode="stretch"
      />
      <Image
        className="absolute w-[125px] h-[125px] top-1/2 left-1/2 -translate-x-[62.5px] -translate-y-[62.5px]"
        source={require('../assets/images/logo.png')}
        resizeMode="contain"
      />
    </View>
  );
};
