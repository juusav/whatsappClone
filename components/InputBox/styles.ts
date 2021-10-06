import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: { flexDirection: "row", margin: 10, alignItems: "flex-end", },
  mainContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 25,
    marginRight: 10,
    flex: 1,
    alignItems: "flex-end",
    paddingBottom: 15
  },
  textInput: {flex: 1, marginHorizontal: 10, fontSize: 17},
  icons: {marginHorizontal: 5},
  bottonContainer: {
    backgroundColor: Colors.light.tint,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
