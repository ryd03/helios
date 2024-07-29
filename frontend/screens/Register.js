import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { FONTS, SIZES, COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import AppTextInput from "../components/AppTextInput";
import Button from "../components/Button";
import Icon from "react-native-vector-icons/FontAwesome";
import IonIcon from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";

const Register = ({ navigation }) => {
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
              letterSpacing: -1.5,
            }}
          >
            Hello
          </Text>

          <Text
            style={{
              ...FONTS.largeTitle,
              color: COLORS.green,
              letterSpacing: -2,
            }}
          >
            there!
          </Text>
          <Text
            style={{ ...FONTS.body4, color: "silver", paddingVertical: 20, zIndex:1 }}
          >
            Create an account to unlock the full potential of your solar energy
            system.
          </Text>
        </View>
        <LottieView
          source={require("../assets/animations/pink yellow sun.json")}
          autoPlay
          loop
          style={{ width: 200, height: 200 , position:'absolute' , marginLeft:250,
          marginTop:-32, zIndex:0 }}
        />

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
            placeholder="Create your password"
          ></AppTextInput>
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
            placeholder="Re-type your password"
          ></AppTextInput>
        </View>
      </View>

      <View style={{ flexDirection: "row", padding: 20, paddingBottom: 40 }}>
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
        <Text style={{ ...FONTS.body4, color: "silver" }}>
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>

      <Button
        title="Sign up"
        onPress={()=>navigation.navigate('Verify')}
        style={{ width: "90%", alignSelf: "center" }}
      ></Button>

      <View style={{ flexDirection: "row", paddingTop: 30 }}>
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
          height: "8%",
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
          Already have an account ?{" "}
        </Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
          <Text
            style={{
              ...FONTS.body4,
              fontFamily: "poppins-semibold",
              color: COLORS.green,
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Register;
