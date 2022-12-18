/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { Text, useToast } from 'native-base';
import React, { useEffect } from 'react';
import { requestPermission } from './src/permissions/requestGeoLocation';
import { AppPushNotifications } from './src/app/AppPushNotifications';
import { Routes } from './src/routes';
import { appStore, AppStoreProvider } from './src/app/appStore';
import {apolloClient, ApolloProvider} from './src/utils/apolloClient';
import codePush from 'react-native-code-push';




async function init():Promise<void>{
  const isPermissionGranted = await requestPermission();

}

function App() {
  // const toast = useToast();

  useEffect(()=>{
    init();
  },[])
  

  return (

    <AppStoreProvider store={appStore}>
      <ApolloProvider client={apolloClient}>
        <AppPushNotifications/>
        <Routes/>
      </ApolloProvider>
    </AppStoreProvider>
  );
};


export default codePush(App);
