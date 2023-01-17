import { Button, StyleSheet, Text, View } from "react-native";
import { io } from "socket.io-client";

const connectionConfig = {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 100000,
  transports: ["websocket"],
};

export default function App() {
  const socket = io("http://localhost:3000", connectionConfig);
  socket.on("connect", () => {
    console.log("connected");
  });

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button
        title="Send Dummy Message"
        onPress={() => {
          socket.emit("CHAT_MESSAGE_REQ", "example message");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
