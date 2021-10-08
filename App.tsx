import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { withAuthenticator } from "aws-amplify-react-native";
import Amplify from "aws-amplify";
import config from "./src/aws-exports";
import { Auth, API, graphqlOperation } from "aws-amplify";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";

Amplify.configure(config);

const randomImages = [
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg",
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg",
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.jpg",
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.png",
];

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getRandomImage = () => {
    return randomImages[Math.floor(Math.random() * randomImages.length)];
  };

  //Run this snippet only when  App is first mounted
  useEffect(() => {
    const fetchUser = async () => {
      //Get authenticated user from Auth
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      if (userInfo) {
        //Get the user from backend with user SUB from Auth
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: userInfo.attributes.sub })
        );
        //if there is no  user in DB with the id, then create one
        if (userData.data.getUser) {
          console.log("user is alredy registered in DB");
          return;
        }
        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.username,
          imageUri: getRandomImage(),
          status: "Hey there! I am using whatsapp",
        };
        await API.graphql(graphqlOperation(createUser, { input: newUser }));
      }
    };
    fetchUser();
  }, []);

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

export default withAuthenticator(App);
