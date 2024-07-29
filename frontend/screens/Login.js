import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import React, { useState } from "react";
import { FONTS, SIZES, COLORS, images } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import AppTextInput from "../components/AppTextInput";
import Button from "../components/Button";
import Icon from "react-native-vector-icons/FontAwesome";
import IonIcon from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";

const Login = ({ navigation }) => {
 
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
    <View style={{ backgroundColor: "white", padding: 20, paddingTop: 60 }}>
      <Text
        style={{
          ...FONTS.largeTitle,
          color: COLORS.darkGray,
          letterSpacing: -2,
        }}
      >
        Welcome
      </Text>

      <Text
        style={{
          ...FONTS.largeTitle,
          color: COLORS.green,
          letterSpacing: -2,
        }}
      >
        back!
      </Text>
      <Text
        style={{ ...FONTS.body4, color: "silver", paddingVertical: 20, zIndex:1 }}
      >
        Sign in to access personalized insights and optimize your solar energy usage.
      </Text>
    </View>
    <Image source={images.wave} style={{ width: 100, height: 100 , position:'absolute' , marginLeft:SIZES.width/1.5,
          marginTop:40, zIndex:0 
    }}/>

   

  <View style={{ width: "90%", alignSelf: "center" }}>
    <View>
      <Icon
        name="envelope"
        size={20}
        color="lightgray"
        style={{
          position: "absolute",
          zIndex: 1,
          paddingTop: 27,
          paddingLeft: 17,
        }}
      ></Icon>
      <AppTextInput placeholder="Enter your email"></AppTextInput>
    </View>

    <View>
      <Icon
        name="lock"
        size={25}
        color="lightgray"
        style={{
          position: "absolute",
          zIndex: 1,
          paddingTop: 25,
          paddingLeft: 20,
        }}
      ></Icon>
      <AppTextInput
        secureTextEntry="true"
        placeholder="Enter your password"
      ></AppTextInput>
    </View>
  </View>

  <View style={{ flexDirection: "row", padding: 10 }}>
        <TouchableOpacity onPress={toggleCheckbox}>
          <IonIcon
            name={isChecked ? "checkbox" : "square-outline"}
            size={20}
            style={{
              paddingRight: 10,
              paddingTop: 3,
              color: isChecked ? COLORS.green : "silver",
            }}
          />
        </TouchableOpacity>
        <Text style={{ ...FONTS.body4, color: "silver" }}>Remember me</Text>
      </View>


  <Button
    title="Sign in"
    onPress={()=>navigation.navigate('Main')}
    style={{ width: "90%", height:60, alignSelf: "center" , margin:0}}
  ></Button>
<View style={{ flexDirection: "row", paddingTop: 15 }}>
        <View
          style={{
            height: 1.5,
            backgroundColor: COLORS.gray,
            flex: 1,
            marginTop: 10,
          }}
        />
        <Text
          style={{ color: "lightgray", fontSize: 15, fontFamily: "medium" }}
        >
          {" "}
          OR{" "}
        </Text>
        <View
          style={{
            height: 1.5,
            backgroundColor: COLORS.gray,
            flex: 1,
            marginTop: 10,
          }}
        />
      </View>

      <TouchableOpacity
        style={{
          height: "7%",
          width: "70%",
          borderColor: "lightgray",
          borderWidth: 1.5,
          borderRadius: 32,
          marginTop: 20,
          alignSelf: "center",
          flexDirection: "row",
        }}
      >
        <Icon
          name="google"
          size={40}
          style={{ color: "silver", margin: 11, marginLeft: 30 }}
        ></Icon>
        <Text
          style={{
            ...FONTS.body3,
            fontFamily: "poppins-semibold",
            fontSize: 16,
            color: COLORS.darkGray,
            marginTop: 20,
            marginLeft: 5,
          }}
        >
          Sign up using google
        </Text>
      </TouchableOpacity>
  <View
    style={{
      flexDirection: "row",
      alignSelf: "center",
      marginVertical: 18,
    }}
  >
    <Text style={{ ...FONTS.body4, fontFamily: "poppins-semibold" }}>
      Don't have an account ?{" "}
    </Text>
    <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
      <Text
        style={{
          ...FONTS.body4,
          fontFamily: "poppins-semibold",
          color: COLORS.green,
        }}
      >
        Sign Up
      </Text>
    </TouchableOpacity>
    
    
  </View>

<View style={{flexDirection:'row' ,marginLeft:-38,
  marginTop:0
}}>
<LottieView
          source={require("../assets/animations/wind tur.json")}
          autoPlay
          loop
          style={{ width: 250, height: 250 }}
        />
        <LottieView
          source={require("../assets/animations/wind tur 2.json")}
          autoPlay
          loop
          style={{ width: 250, height: 250 , transform: [{ scaleX: -1 }]}}
        />
</View>


</ScrollView>
  );
};

export default Login;
