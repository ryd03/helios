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
  Platform,
  Alert
} from "react-native";
import React, { useState } from "react";
import { FONTS, SIZES, COLORS, images } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import AppTextInput from "../components/AppTextInput";
import Button from "../components/Button";
import Icon from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { Auth } from 'aws-amplify';
import { useRoute } from "@react-navigation/native";
import { useAuth } from '../context/AuthContext';


const Verification = ({ navigation }) => {
  const { signedIn } = useAuth();

  const route = useRoute();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);


  const handleOTPChange = (code) => {
    setOtp(code);
  };

  async function requestNewCode ({email}){
    try {
      await Auth.resendSignUp(email);
    
      Alert.alert('New code was Requested')

    } catch (error) {
      Alert.alert('Oops' , error.message)
      console.log('error resending code', error);
    }
  };

  async function confirmSignUp({email, code}) {
    if(loading){
      return;
    } 
    setLoading(true);

    try {
      await Auth.confirmSignUp(email, code);
      await Auth.signIn( email, ""+route?.params?.password );
      navigation.navigate('Register2');

    } catch (error) {
      Alert.alert('Oops' , error.message)
      console.log('error confirming sign up', error);
    }

    setLoading(false);

  }

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

       
        <OTPInputView pinCount={6} style={{width: '90%', height: 200 , alignSelf:'center'}}
 autoFocusOnLoad
 codeInputFieldStyle={styles.underlineStyleBase}
 codeInputHighlightStyle={styles.underlineStyleHighLighted}
 onCodeChanged={handleOTPChange}
 />


      </View>
      <Button title={loading? "Verifying..." : "Verify"} onPress={()=>confirmSignUp({email:""+route?.params?.email , code:otp})}
         style={{ width: "80%", alignSelf: "center" , height:'20',
           fontFamily:'poppins-thin'
        }} />

<View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          marginVertical: 18,
          marginLeft:25
        }}
      >
        <Text style={{ ...FONTS.body4, fontFamily: "poppins-semibold" }}>
        Didn't receive the code?{" "}
        </Text>
        <TouchableOpacity onPress={()=>requestNewCode({email:""+route?.params?.email})}>
          <Text
            style={{
              ...FONTS.body4,
              fontFamily: "poppins-semibold",
              color: COLORS.green,
            }}
          >
Request a new one.          </Text>
        </TouchableOpacity>
      </View>

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