import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import React, { useState } from "react";
import { FONTS, SIZES, COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import AppTextInput from "../components/AppTextInput";
import Button from "../components/Button";
import Icon from "react-native-vector-icons/FontAwesome";
import IonIcon from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import { Auth } from 'aws-amplify';
import { useAuth } from '../context/AuthContext';



const Register = ({ navigation }) => {
  const {signedIn , signedOut , user} = useAuth();
  const [isChecked, setIsChecked] = useState(false);
  const [emailInput, setEmail] = useState('');
  const [passwordInput, setPassword] = useState('');
  const [nameInput, setName] = useState('');
  const [errorEmailMessage, setEmailErrorMessage] = useState('');
  const [errorPasswordMessage, setPasswordErrorMessage] = useState('');
  const [errorNameMessage, setNameErrorMessage] = useState('');
  const [errorTermsMessage, setTermsErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  const toggleCheckbox = () => {
    setIsChecked(!isChecked);

    if(errorTermsMessage){    setTermsErrorMessage('');
    }
  };

  const validateEmail = (eml) => {
    return emailRegex.test(eml);
  };

  const validateForm = () => {

    if (!nameInput) {
      setNameErrorMessage('Name is required');
      return false;
    }
    if (!emailInput) {
      setEmailErrorMessage('Email is required');
      return false;
    }

    if (!validateEmail(emailInput)) {
      setEmailErrorMessage('Please enter a valid email address');
      return false;
    }

    if (!passwordInput) {
      setPasswordErrorMessage('Password is required');
      return false;
    }

    if (passwordInput.length < 8) {
      setPasswordErrorMessage('Password must be at least 8 characters long');
      return false;
    }

    if (!isChecked) {
      setTermsErrorMessage('Acceptance of the Terms and Conditions and Privacy Policy is required to sign up');
      return false;
    }

    setEmailErrorMessage('');
    setPasswordErrorMessage('');
    setNameErrorMessage('');
    setTermsErrorMessage('');

    return true;
  };

  async function handleSignUp({password, email , name }) {
   
    if(loading){
      return;
    }  

    if(!validateForm()){
      Alert.alert('Please Check Your Entries' ,   "Please fill out all required fields and ensure the information provided is valid before proceeding.");
    return;
    }

    setLoading(true);

    try {
      const { isSignUpComplete, userId, nextStep } = await Auth.signUp({
        username:email,
        password,
        attributes:{email,name,
          'custom:Location': "Beirut,LB",
          'custom:PanelArea': "0",
          'custom:PanelCapacity':"0",
          'custom:PanelModel' :"empty",
          'custom:PanelNum': "0"
        },
        options: {
         
          // optional
          autoSignIn: true 
        }
      });
      navigation.navigate('Verify' , {email, password});
    } catch (error) {
      Alert.alert('Oops' , error.message)
      console.log('error signing up:', error);
    }
    setLoading(false);

  }

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
            name="user"
            size={23}
            color="lightgray"
            style={{
              position: "absolute",
              zIndex: 1,
              paddingTop: 27,
              paddingLeft: 19,
            }}
          ></Icon>
          <AppTextInput placeholder="Enter your name"
          value={nameInput}
          onChangeText={text => {
            setName(text);
            setNameErrorMessage(''); // Clear the error message when the user starts typing
          }} ></AppTextInput>
        </View>
          {/* Display the error message if it exists */}
          {errorNameMessage ? (
        <Text style={{ ...FONTS.body4,color: 'tomato', marginBottom: 3, textAlign: 'center' }}>
          {errorNameMessage}
        </Text>
      ) : null}
        
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
            setEmailErrorMessage(''); // Clear the error message when the user starts typing
          }} ></AppTextInput>
        </View>

         {/* Display the error message if it exists */}
        {errorEmailMessage ? (
        <Text style={{ ...FONTS.body4,color: 'tomato', marginBottom: 3, textAlign: 'center' }}>
          {errorEmailMessage}
        </Text>
      ) : null}

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
            value={passwordInput}
            onChangeText={text => {
              setPassword(text);
              setPasswordErrorMessage(''); // Clear the error message when the user starts typing
            }} 
          ></AppTextInput>
        </View>

          {/* Display the error message if it exists */}
          {errorPasswordMessage ? (
        <Text style={{ ...FONTS.body4,color: 'tomato', marginBottom: 3, textAlign: 'center' }}>
          {errorPasswordMessage}
        </Text>
      ) : null}

        
      </View>

      <View style={{ flexDirection: "row", padding: 20, paddingBottom: 10 }}>
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
        {/* Display the error message if it exists */}
        {errorTermsMessage ? (
        <Text style={{ ...FONTS.body4,color: 'tomato', marginHorizontal: 10, textAlign: 'center' }}>
          {errorTermsMessage}
        </Text>
      ) : null}

      <Button
        title={loading? "Creating your account..." : "Sign up"}
        onPress={() => handleSignUp({ password:passwordInput, email:emailInput, name:nameInput })}
        style={{ width: "90%", alignSelf: "center" , marginTop:30 }}
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
