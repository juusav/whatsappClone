import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Auth, graphqlOperation, API } from "aws-amplify";

import { View } from "../components/Themed";
import ChatListItem from "../components/ChatListItem";
import NewMessageButton from "../components/NewMessageButton";
import { getUser } from "../src/graphql/queries";

export default function chatsScreen() {

  const [chatRooms, setChatRooms] = React.useState([]);

  React.useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser();
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: userInfo.attributes.sub })
        );
        setChatRooms(userData.data.getUser.chatRoomUser.items);
        console.log(userData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchChatRooms();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item.chatRoom} />}
        keyExtractor={(item) => item.id}
      />
      <NewMessageButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
