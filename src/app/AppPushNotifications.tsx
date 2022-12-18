import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';

export function AppPushNotifications() {

  useEffect(() => {
    messaging().getToken().then((token)=>{
      console.log('getToken',token)
    })



    //app aberto
    messaging().onMessage(async message => {
      if (message?.data?.json) {
        const data = JSON.parse(message.data.json);
      }
    });

    //app fechado
    messaging()
      .getInitialNotification()
      .then(message => {
        if (message?.data?.json) {
          const data = JSON.parse(message.data.json);
          
        }
      });



  }, []);

  return null;
}