import React, {useEffect, useState} from "react";
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { extendTheme, NativeBaseProvider } from "native-base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import screens from './../screens.json'
import { Home } from "../screens/Home";
import { AddMarker } from "../screens/AddMarker";
import { ViewMarker } from "../screens/ViewMarker";
import { Profile } from "../screens/Profile";
import { useAppSelector } from "../app/appStore";
import { AddMarkerComment } from "../screens/AddMarkerComment";

const Stack = createNativeStackNavigator();

export function Routes() {


  const isDarkTheme = useAppSelector(state => state.app.isDarkTheme);
  const baseNavigationTheme = isDarkTheme ? DarkTheme : DefaultTheme;

  
  const nativeBaseTheme = extendTheme({
    config: {
      initialColorMode: isDarkTheme ? 'dark' : 'light',
    },
  });

  const navigationTheme = {
    ...baseNavigationTheme,
    colors: {
      ...baseNavigationTheme.colors,
      primary: nativeBaseTheme.colors.primary[800],
    },
  };


  return (

    <NativeBaseProvider theme={nativeBaseTheme}>
        <NavigationContainer theme={navigationTheme}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name={screens.home} component={Home} />
              <Stack.Screen name={screens.addMarker} component={AddMarker} options={{ headerShown: true, headerTitle: 'Adicionar Ponto' }}/>
              <Stack.Screen name={screens.viewMarker} component={ViewMarker} options={{ headerShown: true, headerTitle: 'Visualizar Ponto' }}/>
              <Stack.Screen name={screens.profile} component={Profile} options={{ headerShown: true, headerTitle: 'Perfil' }}/>
              <Stack.Screen name={screens.addMarkerComment} component={AddMarkerComment} options={{ headerShown: true, headerTitle: 'Adicionar Comentário' }}/>
            </Stack.Navigator>
          </NavigationContainer>
      </NativeBaseProvider>
  );
}
