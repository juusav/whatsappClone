import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Auth from "@aws-amplify/auth";
import moment from "moment";

import { ChatRoom } from "../../types";
import styles from "./styles";

export type ChatListItemProps = {
  chatRoom: ChatRoom; //name : types;
};

const ChatListItem = (props: ChatListItemProps) => {
  const { chatRoom } = props;
  const navigation = useNavigation();
  const [otherUser, setOtherUser] = useState(null);

  useEffect(() => {
    const getOtherUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();

      if(chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub){
        setOtherUser(chatRoom.chatRoomUsers.items[1].user);
      }else{
        setOtherUser(chatRoom.chatRoomUsers.items[0].user);
      }
    }
    getOtherUser();
  }, [])

  const onClick = () => {
    navigation.navigate('ChatRoom', { id: chatRoom.id, name: otherUser.name });
  };
  
  if(!otherUser){
    return null;
  }
  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: otherUser.imageUri }} style={styles.avatar} />

          <View style={styles.midContainer}>
            <Text style={styles.username}>{otherUser.name}</Text>
            <Text style={styles.lastMessage}>
              {chatRoom.lastMessage ? chatRoom.lastMessage.content : ""}
            </Text>
          </View>
        </View>

        <Text style={styles.time}>
          {chatRoom.lastMessage && moment(chatRoom.lastMessage.createdAt).format("DD/MM/YYYY")}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChatListItem;
