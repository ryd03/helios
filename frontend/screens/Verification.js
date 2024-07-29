import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import React, { useState } from "react";
import { FONTS, SIZES, COLORS, images } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import AppTextInput from "../components/AppTextInput";
import Button from "../components/Button";
import Icon from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import OTPInputView from '@twotalltotems/react-native-otp-input'


const Verification = ({ navigation }) => {
  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1, marginLeft: 3 }}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
        <Icon name="arrow-back" size={35}
        style={{marginLeft:10}}></Icon>

        </TouchableOpacity>
      <View style={{ alignSelf: "center" }}>
        <LottieView
          source={require("../assets/animations/verification.json")}
          autoPlay
          loop
          style={{
            width: 120,
            height: 120,
            alignSelf: "center",
            marginVertical: 20,
          }}
        />
        <Text
          style={{
            ...FONTS.body1,
            fontFamily: "medium",
            letterSpacing: -1.25,
            alignSelf: "center",
          }}
        >
          Verify your Account
        </Text>

        <Text
          style={{
            ...FONTS.body4,
            color: "silver",
            paddingVertical: 20,
            paddingHorizontal: 20,
          }}
        >
          We have sent a verification code to your registered email. Enter the
          code below to complete the verification process.
        </Text>

       
        <OTPInputView pinCount={4} style={{width: '70%', height: 200 , alignSelf:'center'}}
 autoFocusOnLoad
 codeInputFieldStyle={styles.underlineStyleBase}
 codeInputHighlightStyle={styles.underlineStyleHighLighted}
 />


      </View>
      <Button title="Verify" onPress={()=>navigation.navigate('Register2')}
         style={{ width: "80%", alignSelf: "center" , height:'20',
           fontFamily:'poppins-thin'
        }} />
    </ScrollView>
  );
};

export default Verification;
const styles = StyleSheet.create({
    borderStyleBase: {
      width: 30,
      height: 45
    },
  
    borderStyleHighLighted: {
      borderColor: 'pink',
    },
  
    underlineStyleBase: {
      width: 60,
      height: 45,
      borderWidth: 0,
      borderBottomWidth: 3,
      color: COLORS.darkGray,
      fontSize:38,
      fontFamily:'poppins-semibold'
    },
  
    underlineStyleHighLighted: {
      borderColor: 'pink'
    },
  });