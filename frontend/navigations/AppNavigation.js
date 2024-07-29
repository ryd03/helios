import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  Register,
  Login,
  Intro,
  Verification,
  Register2,
  EditPanel,
} from "../screens";
import BottomTabNavigation from "./BottomTabNavigation";
import { COLORS } from "../constants";

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  return (
    <Stack.Navigator
    initialRouteName={"Intro"}
    screenOptions={{ headerShown: false }}
style={{color:COLORS.green}}
  >
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Intro" component={Intro} />
    <Stack.Screen name="Verify" component={Verification} />
    <Stack.Screen name="Register2" component={Register2} />
    <Stack.Screen name="EditPanel" component={EditPanel}/>
    <Stack.Screen name="Main" component={BottomTabNavigation}
        screenOptions={{ headerShown: false }}
/>





  </Stack.Navigator>
  );
};

export default AppNavigation;
