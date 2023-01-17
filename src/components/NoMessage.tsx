import { StyleSheet, Text, View } from "react-native";
import React from "react";

const NoMessage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.noMessageText}>No Message Yet</Text>
    </View>
  );
};

export default NoMessage;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  noMessageText: {
    fontSize: 24,
  },
});
