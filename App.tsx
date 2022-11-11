/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NativeBaseProvider, useToast } from 'native-base';
import React, { useEffect, useState } from 'react';
import { requestPermission } from './src/permissions/requestGeoLocation';
import { Home } from './src/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddMarker } from './src/screens/AddMarker';


const Stack = createNativeStackNavigator();

async function init():Promise<void>{
  const isPermissionGranted = await requestPermission();

}

const App = () => {
  const toast = useToast();

  useEffect(()=>{
    init()
  },[])

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddMarker" component={AddMarker} options={{ headerShown: true, headerTitle: 'Adicionar Ponto' }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
