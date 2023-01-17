import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { IMessage, ISocketContext } from "../types";
import ChatInput from "./ChatInput";
import NoMessage from "./NoMessage";

const ChatScreen = ({ messages, socket, setmessages }: ISocketContext) => {
  const flatlistRef = useRef<FlatList<IMessage>>(null);
  useEffect(() => {}, [messages]);

  if (socket) {
    return (
      <View style={styles.container}>
        <Text>Socket ID: {socket.id}</Text>
        <FlatList
          ref={flatlistRef}
          onContentSizeChange={() => flatlistRef.current?.scrollToEnd()}
          data={messages}
          //   contentContainerStyle={{ flex: 1 }}
          ListEmptyComponent={<NoMessage />}
          renderItem={({ item: message, index }) => {
            return (
              <View>
                <Text
                  style={{
                    alignSelf:
                      message.from === socket.id ? "flex-end" : "flex-start",
                  }}
                >
                  {message.data.userName}
                </Text>
                <View
                  style={
                    message.from === socket.id
                      ? styles.myMessage
                      : styles.othersMessage
                  }
                  key={index}
                >
                  <Text style={styles.messageText}>{message.data.message}</Text>
                </View>
              </View>
            );
          }}
        />

        <ChatInput
          messages={messages}
          setmessages={setmessages}
          socket={socket}
        />
      </View>
    );
  }
  return null;
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: 8,
    marginRight: 8,
  },

  myMessage: {
    borderRadius: 6,
    padding: 8,
    alignSelf: "flex-end",
    maxWidth: "75%",
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: "#60b571",
  },
  othersMessage: {
    borderRadius: 6,
    padding: 8,
    color: "white",
    alignSelf: "flex-start",
    backgroundColor: "#312f33",
    maxWidth: "75%",
    marginTop: 16,
    marginBottom: 16,
  },
  messageText: {
    color: "white",
  },
});
