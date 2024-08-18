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
  Alert
} from "react-native";
import React, { useState } from "react";
import { FONTS, SIZES, COLORS, images } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import AppTextInput from "../components/AppTextInput";
import Button from "../components/Button";
import Icon from "react-native-vector-icons/FontAwesome";
import IonIcon from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import { Auth } from 'aws-amplify';
import { useAuth } from '../context/AuthContext';


const Login = ({ navigation }) => {
  const { signedIn } = useAuth();

  const [emailInput, setEmail] = useState('');
  const [passwordInput, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  

async function signIn({ email, password }) {
  if(loading){
    return;
  }

  setLoading(true);
  try {
    const { isSignedIn, nextStep } = await Auth.signIn( email, password );
  
    await signedIn(await Auth.currentAuthenticatedUser());
    navigation.navigate('Main');
  } catch (error) {
    Alert.alert('Oops' , error.message)
    setErrorMessage('Invalid email or password. Please try again.');
    console.log('error signing in', error);
  }
  setLoading(false);

}

  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
    <View style={{ backgroundColor: "white", padding: 20, paddingTop: 50 }}>
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
          marginTop:30, zIndex:0 
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
      <AppTextInput placeholder="Enter your email"
      value={emailInput}
      onChangeText={text => {
        setEmail(text);
        setErrorMessage(''); // Clear the error message when the user starts typing
      }} ></AppTextInput>
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
        value={passwordInput}
        onChangeText={text => {
          setPassword(text);
          setErrorMessage(''); // Clear the error message when the user starts typing
        }}      ></AppTextInput>
    </View>
  </View>

  {/* Display the error message if it exists */}
  {errorMessage ? (
        <Text style={{ ...FONTS.body4,color: 'tomato', marginBottom: 3, textAlign: 'center' }}>
          {errorMessage}
        </Text>
      ) : null}

 


  <Button
    title={loading? "Signing you in..." : "Sign in"}
    onPress={()=>signIn({email:emailInput , password:passwordInput})}
    style={{ width: "90%", height:60, alignSelf: "center" , marginTop:30}}
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
