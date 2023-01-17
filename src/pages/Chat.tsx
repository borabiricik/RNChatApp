import React, { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
} from "react-native";
import { io, Socket } from "socket.io-client";
import { UserContext } from "../../App";
import ChatScreen from "../components/ChatScreen";
import { SocketURL } from "../constants/socketURL";
import { IMessage } from "../types";

const connectionConfig = {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 100000,
  transports: ["websocket"],
};

const Chat = () => {
  const [messages, setmessages] = useState<IMessage[]>([]);
  const [socketState, setsocketState] = useState<Socket | null>(null);
  const { userName } = useContext(UserContext);
  useEffect(() => {
    const socket = io(SocketURL, connectionConfig);
    socket.on("connect", () => {
      if (!socketState) setsocketState(socket);
      setmessages((prev) => [
        ...prev,
        {
          id: messages.length,
          data: { message: `${userName} joined`, userName },
          from: socket.id,
        },
      ]);
      socket.emit("CHAT_MESSAGE_REQ", {
        from: socket.id,
        data: { message: `${userName} joined`, userName },
      });
      socket.on("CHAT_MESSAGE_RES", (payload: IMessage) => {
        setmessages((prev) => [...prev, payload]);
      });
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  if (socketState) {
    return (
      <SafeAreaView style={styles.container}>
        <ChatScreen
          messages={messages}
          setmessages={setmessages}
          socket={socketState}
        />
      </SafeAreaView>
    );
  }
  return null;
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingBottom: Platform.OS === "android" ? 20 : 0,
  },
});
