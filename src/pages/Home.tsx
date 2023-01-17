import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const { userName, setuserName } = useContext(UserContext);
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <Text>Please Type Your Username to join the chat</Text>
      <TextInput
        style={styles.input}
        value={userName}
        onChangeText={(value) => setuserName && setuserName(value)}
      />
      <Button title="Join" onPress={() => navigation.navigate("Chat")} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#858585",
    padding: 8,
    borderRadius: 6,
    marginRight: 10,
    width: "50%",
    marginTop: 8,
    marginBottom: 8,
  },
});
