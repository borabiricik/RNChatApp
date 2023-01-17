import React, { useContext, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { UserContext } from "../../App";
import { ISocketContext } from "../types";

const ChatInput = ({ socket, messages, setmessages }: ISocketContext) => {
  const [message, setmessage] = useState("");
  const { userName } = useContext(UserContext);
  if (socket) {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={(value) => setmessage(value)}
          style={styles.input}
          placeholder="Type..."
        />
        <Button
          title="Send"
          onPress={() => {
            setmessages((prev) => [
              ...prev,
              {
                id: messages.length,
                data: { message, userName },
                from: socket.id,
              },
            ]);
            socket.emit("CHAT_MESSAGE_REQ", {
              from: socket.id,
              data: { message, userName },
            });
            setmessage("");
          }}
        />
      </View>
    );
  }
  return null;
};

export default ChatInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    marginLeft: 16,
    marginRight: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#858585",
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 6,
    marginRight: 10,
  },
});
