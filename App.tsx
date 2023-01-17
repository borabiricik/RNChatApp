import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createContext, useState } from "react";
import Chat from "./src/pages/Chat";
import Home from "./src/pages/Home";

const Stack = createNativeStackNavigator();

export const UserContext = createContext<{
  userName: string;
  setuserName?: Function;
}>({ userName: "" });

export default function App() {
  const [userName, setuserName] = useState("");
  return (
    <UserContext.Provider value={{ userName, setuserName }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
