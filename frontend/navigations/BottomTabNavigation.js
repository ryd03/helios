import React from "react";
import { Image, Platform , View , StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Analytics, Settings } from "../screens";
import { COLORS, SIZES } from "../constants";
import IonIcon from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";


const Tab = createBottomTabNavigator();

const BottomTabNavigation = ({ navigation }) => {

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.darkGray,
          height: 65,
          width:'50%',
          position:'absolute',
          left:110,
        
          borderRadius:100,

        },
      }}
    >
     
     <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={[styles.iconContainer, focused && styles.focused]}>
                <AntDesign
                  name='home'
                  size={30}
                  color={focused ? COLORS.darkGray : COLORS.white}
                />
              </View>
            ),
          }}
        />

<Tab.Screen
          name="Analytics"
          component={Analytics}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={[styles.iconContainer, focused && styles.focused]}>
                <IonIcon
                  name='analytics-outline'
                  size={30}
                  color={focused ? COLORS.darkGray : COLORS.white}
                />
              </View>
            ),
          }}
        />
<Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={[styles.iconContainer, focused && styles.focused]}>
                <IonIcon
                  name='settings-outline'
                  size={30}
                  color={focused ? COLORS.darkGray : COLORS.white}
                />
              </View>
            ),
          }}
        />


     
      
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
const styles = StyleSheet.create({
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: COLORS.darkGray,
      borderColor: COLORS.white,
    },
    focused: {
      backgroundColor: COLORS.white,
    },
  });