import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  Register,
  Login,
  Intro,
  Verification,
  Register2,
  EditPanel,
  Home,
  EditLocation
} from "../screens";
import BottomTabNavigation from "./BottomTabNavigation";
import { COLORS } from "../constants";
import { Auth } from "aws-amplify";
import { useAuth } from "../context/AuthContext";
const Stack = createNativeStackNavigator();

const AppNavigation = () => {

  const {user} = useAuth();
  return (
    <Stack.Navigator
      initialRouteName={user ? "Main" :"Intro"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Main"
        component={BottomTabNavigation}
        screenOptions={{ headerShown: false }}
      />
      <Stack.Screen name="EditPanel" component={EditPanel} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="Verify" component={Verification} />
      <Stack.Screen name="Register2" component={Register2} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="EditLocation" component={EditLocation} />



    </Stack.Navigator>
  );
};

export default AppNavigation;
