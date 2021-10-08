import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation, Auth } from "aws-amplify";

import { User } from "../../types";
import styles from "./styles";
import { createChatRoomUser, createChatRoom } from "../../src/graphql/mutations";

export type ContactListItemProps = {
  user: User; //name : types;
};

const ContactListItem = (props: ContactListItemProps) => {
  const { user } = props;
  const navigation = useNavigation();
  const onClick = async () => {
    try {
      //Create a new chat room
      const newChatRoomData = await API.graphql(
        graphqlOperation(createChatRoom, { input: {} })
      );
      if (!newChatRoomData.data) {
        console.log("failed to create a chat room");
        return;
      }

      const newChatRoom = newChatRoomData.data.createChatRoom;
      //Add user to chat room
      await API.graphql(
        graphqlOperation(createChatRoomUser, {
          input: {
            userID: user.id,
            chatRoomID: newChatRoom.id
          }
        })
      );
      
      //Add authentication user to the chat room
      const userInfo = await Auth.currentAuthenticatedUser();
      await API.graphql(
        graphqlOperation(createChatRoomUser, {
          input:{
            userID: userInfo.attributes.sub,
            chatRoomID: newChatRoom.id
          }
        })
      );
      navigation.navigate('ChatRoom', { id: newChatRoom, name: "Harcoded name"})
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: user.imageUri }} style={styles.avatar} />

          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text style={styles.status} numberOfLines={2}>
              {user.status}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ContactListItem;
