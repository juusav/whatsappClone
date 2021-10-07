import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { withAuthenticator } from 'aws-amplify-react-native';
import Amplify from 'aws-amplify';
import config from './src/aws-exports';
import { Auth, API } from 'aws-amplify';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

Amplify.configure(config)

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  //Run this snippet only when  App is first mounted
  useEffect(() => {
    const fetchUSer = async () =>{
      //Get authenticated user from Auth
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});
      
      if(userInfo){
        //Get the user from backend with user SUB from Auth
        
        //if there is no  user in DB with the id, then create one
      }
    }
    fetchUSer();
  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar style="light" />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App)