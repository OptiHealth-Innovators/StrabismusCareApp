import { Stack } from 'expo-router';
import { Text } from 'react-native';


import React from 'react';

export default function NotFoundScreen() {
  return (
    <>
     <Stack.Screen options={{
              headerTitle: "",
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: 'white', 
              },
              headerTintColor: '#4338ca',
              headerBackTitle: "Back",
            }} />
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Text className='text-red-400 text-center mt-40 text-4xl' >404 - Page Not Found</Text>
    </>
  );
}

