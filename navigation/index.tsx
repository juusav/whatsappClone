import { Octicons, MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Fontisto } from "@expo/vector-icons";
import { ColorSchemeName} from "react-native";
import { View } from "../components/Themed";
import { useRoute } from '@react-navigation/native';

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ChatsScreen from "../screens/ChatsScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import { RootStackParamList, MainTabParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import ContactsScreen from "../screens/ContactsScreen";

export default function Navigation({colorScheme,}: {colorScheme: ColorSchemeName;}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: Colors.light.tint },
        headerTitleStyle: { color: "#ffffff" },
        headerTitleAlign: "left",
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen name="Root" component={BottomTabNavigator}
        options={{
          title: "WhatsApp",
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                width: 60,
                justifyContent: "space-between",
                marginRight: 10,
              }}
            >
              <Octicons name="search" size={22} color={"white"} />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={22}
                color={"white"}
              />
              
            </View>
          ),
        }}
      />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} 
        options={({ route }) => ({ 
          title: route.params.name,
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                width: 100,
                justifyContent: "space-between",
              }}
            >
              <FontAwesome5 name="video" size={21} color={'white'} />
              <MaterialIcons name="call" size={22} color={'white'} />
              <MaterialCommunityIcons name="dots-vertical" size={22} color={'white'} />
            </View>
          )
        }) } 
      />
      <Stack.Screen name="Contacts" component={ContactsScreen} />
    </Stack.Navigator>
  );
}

const BottomTab = createMaterialTopTabNavigator<MainTabParamList>();
function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Chats"
      screenOptions={{
        tabBarLabelStyle: { fontSize: 15, fontWeight: "bold", color: "white" },
        tabBarStyle: {backgroundColor: Colors[colorScheme].tint},
        tabBarIndicatorStyle: {backgroundColor: "white"},
      }}
    >
      <BottomTab.Screen
        name="Camera"
        component={TabTwoScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: () => (
            <Fontisto name="camera" color="white" size={18} />
          ),
        }}
      />
      <BottomTab.Screen name="Chats" component={ChatsScreen} />
      <BottomTab.Screen name="Status" component={TabTwoScreen} />
      <BottomTab.Screen name="Calls" component={TabTwoScreen} />
    </BottomTab.Navigator>
  );
}