import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { User } from "../../types";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

export type ContactListItemProps = {
  user: User; //name : types;
};

const ContactListItem = (props: ContactListItemProps) => {
  const { user } = props;
  const navigation = useNavigation();
  const onClick = () => {
    //Navigate to chat room with this user
  }

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
      <View style={styles.leftContainer} >
        <Image source={{ uri: user.imageUri }} style={styles.avatar} />

        <View style={styles.midContainer} >
          <Text style={styles.username} >{user.name}</Text>
          <Text style={styles.status} numberOfLines={2} >{user.status}</Text>
        </View>
      </View>

    </View>
    </TouchableWithoutFeedback>
  );
};

export default ContactListItem;
