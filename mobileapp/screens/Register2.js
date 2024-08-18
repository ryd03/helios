import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
    KeyboardAvoidingView,
    Platform

  } from "react-native";
  import React, { useState , useRef } from "react";
  import { FONTS, SIZES, COLORS } from "../constants";
  import { Ionicons } from "@expo/vector-icons";
  import AppTextInput from "../components/AppTextInput";
  import Button from "../components/Button";
  import Icon from "react-native-vector-icons/FontAwesome";
  import Icon6 from "react-native-vector-icons/FontAwesome6";
  import Octicons from "react-native-vector-icons/Octicons";
  import IonIcon from "react-native-vector-icons/Ionicons";
  import LottieView from "lottie-react-native";
  import { Auth } from 'aws-amplify';
  import { useAuth } from '../context/AuthContext';
  import CitySelector from "../components/CitySelector";


  const Register2 = ({ navigation }) => {

    const integerRegex = /^\d+$/;
    const numberRegex = /^\d+(\.\d+)?$/;


    const { signedIn} = useAuth();
    const [LocationInput, setLocation] = useState('');
    const [PanelAreaInput, setPanelArea] = useState('');
    const [PanelCapacityInput, setPanelCapacity] = useState('');
    const [PanelModelInput, setPanelModel] = useState('');
    const [PanelNumInput, setPanelNum] = useState('');

    const [errorLocationMessage, setLocationErrorMessage] = useState('');
    const [errorPanelAreaMessage, setPanelAreaErrorMessage] = useState('');
    const [errorPanelCapacityMessage, setPanelCapacityErrorMessage] = useState('');
    const [errorPanelModelMessage, setPanelModelErrorMessage] = useState('');
    const [errorPanelNumMessage, setPanelNumErrorMessage] = useState('');

    const [loading, setLoading] = useState(false);

   
  const validateForm = () => {

    if (!LocationInput) {
      setLocationErrorMessage('Location is required');
      return false;
    }

    if (!PanelModelInput) {
      setPanelModelErrorMessage('Panel\'s Model is required');
      return false;
    }

    if (!PanelAreaInput) {
      setPanelAreaErrorMessage('Panel Area is required');
      return false;
    }

    if (!numberRegex.test(PanelAreaInput)) {
      setPanelAreaErrorMessage('Panel Area requires a positive numeric value');
      return false;
    }

    if (!PanelNumInput) {
      setPanelNumErrorMessage('Number of panels is required');
      return false;
    }

    if (!integerRegex.test(PanelNumInput)) {
      setPanelNumErrorMessage('Panel number requires a positive integer');
      return false;
    }

    if (!PanelCapacityInput) {
      setPanelCapacityErrorMessage('Panel Capacity is required');
      return false;
    }
    if (!numberRegex.test(PanelCapacityInput)) {
      setPanelCapacityErrorMessage('Panel Capacity requires a positive numeric value');
      return false;
    }

    setLocationErrorMessage('');
    setPanelModelErrorMessage('');
    setPanelAreaErrorMessage('');
    setPanelNumErrorMessage('');
    setPanelCapacityErrorMessage('');

    
    return true;
  };
async function updateUserAttributes() {
  if(loading){
    return;
  }  

  if(!validateForm()){
    Alert.alert('Please Check Your Entries' , "Please fill out all required fields and ensure the information provided is valid before proceeding.");
  return;
  }

  setLoading(true);
  try {

    const user = await Auth.currentAuthenticatedUser();
    const result = await Auth.updateUserAttributes(user, {
          'custom:Location': LocationInput,
          'custom:PanelArea': PanelAreaInput,
          'custom:PanelCapacity':PanelCapacityInput,
          'custom:PanelModel' :PanelModelInput,
          'custom:PanelNum': PanelNumInput    });

    playAnimation();
    console.log(await Auth.currentAuthenticatedUser())
    await signedIn(await Auth.currentAuthenticatedUser());

    navigation.navigate('Main');

  } catch (err) {
    Alert.alert('Oops' , err.message)
    console.log(err);
  }

  setLoading(false);

}
        const animationRef = useRef(null);
      
        const playAnimation = () => {
          if (animationRef.current) {
            animationRef.current.play(); // Start the animation
          }
        };
  
    return (
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 20} // Adjust this value as needed
      style={{ flex: 1  }}
    >
      <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
        <IonIcon name="arrow-back" size={35}
        style={{marginLeft:10}}></IonIcon>

        </TouchableOpacity>
<View style={{ backgroundColor: "white", padding: 20, paddingTop: 60 }}>
      <Text
        style={{
          ...FONTS.largeTitle,
          color: COLORS.green,
          letterSpacing: -2,
        }}
      >
        Almost
      </Text>

      <Text
        style={{
          ...FONTS.largeTitle,
          color: COLORS.darkGray,
          letterSpacing: -2,
        }}
      >
        done!
      </Text>

      <LottieView
          source={require("../assets/animations/register2.json")}
          autoPlay
          loop
          style={{ width: 150, height: 150 , position:'absolute' , marginLeft:250,
          marginTop:10, zIndex:0 }}
        />
      <Text
        style={{ ...FONTS.body4, color: "silver", paddingVertical: 20, zIndex:1 }}
      >
To complete your account setup, we need to gather a bit more information from you.      </Text>
    </View>

   
    <View style={{ width: "90%", alignSelf: "center" }}>
   
    <CitySelector
onSelect={(selectedItem, index) => {
  setLocation(selectedItem.city); 
}}/>

        {/* Display the error message if it exists */}
        {errorLocationMessage ? (
        <Text style={{ ...FONTS.body4,color: 'tomato', marginBottom: 3, textAlign: 'center' }}>
          {errorLocationMessage}
        </Text>
      ) : null}

      <View>
      <Icon6
        name="solar-panel"
        size={20}
        color="lightgray"
        style={{
          position: "absolute",
          zIndex: 1,
          paddingTop: 27,
          paddingLeft: 17,
        }}
      ></Icon6>
      <AppTextInput placeholder="Solar Panels' Model"
       onChangeText={text => {
        setPanelModel(text);
        setPanelModelErrorMessage(''); // Clear the error message when the user starts typing
      }} ></AppTextInput>
      </View>

  {/* Display the error message if it exists */}
  {errorPanelModelMessage ? (
        <Text style={{ ...FONTS.body4,color: 'tomato', marginBottom: 3, textAlign: 'center' }}>
          {errorPanelModelMessage}
        </Text>
      ) : null}

      <View>
      <Octicons
        name="number"
        size={23}
        color="lightgray"
        style={{
          position: "absolute",
          zIndex: 1,
          paddingTop: 27,
          paddingLeft: 22,
        }}
      ></Octicons>
      <AppTextInput placeholder="Number of Panels"
         keyboardType="number-pad" 

       onChangeText={text => {
        setPanelNum(text);
        setPanelNumErrorMessage(''); // Clear the error message when the user starts typing
      }} ></AppTextInput>
      </View>

        {/* Display the error message if it exists */}
        {errorPanelNumMessage ? (
        <Text style={{ ...FONTS.body4,color: 'tomato', marginBottom: 3, textAlign: 'center' }}>
          {errorPanelNumMessage}
        </Text>
      ) : null}

      <View>
      <IonIcon
        name="resize"
        size={24}
        color="lightgray"
        style={{
          position: "absolute",
          zIndex: 1,
          paddingTop: 27,
          paddingLeft: 17,
        }}
      ></IonIcon>
      <AppTextInput placeholder="Area of a single panel (m^2)"
         keyboardType="number-pad" 
       onChangeText={text => {
        setPanelArea(text);
        setPanelAreaErrorMessage(''); // Clear the error message when the user starts typing
      }} ></AppTextInput>
      </View>

        {/* Display the error message if it exists */}
        {errorPanelAreaMessage ? (
        <Text style={{ ...FONTS.body4,color: 'tomato', marginBottom: 3, textAlign: 'center' }}>
          {errorPanelAreaMessage}
        </Text>
      ) : null}

      <View>
      <IonIcon
        name="speedometer"
        size={24}
        color="lightgray"
        style={{
          position: "absolute",
          zIndex: 1,
          paddingTop: 27,
          paddingLeft: 17,
        }}
      ></IonIcon>
      <AppTextInput placeholder="Capacity of a single panel (Kwp)"
         keyboardType="number-pad" 

       onChangeText={text => {
        setPanelCapacity(text);
        setPanelCapacityErrorMessage(''); // Clear the error message when the user starts typing
      }} ></AppTextInput>
      </View>

        {/* Display the error message if it exists */}
        {errorPanelCapacityMessage ? (
        <Text style={{ ...FONTS.body4,color: 'tomato', marginBottom: 3, textAlign: 'center' }}>
          {errorPanelCapacityMessage}
        </Text>
      ) : null}


      </View>


<LottieView
      ref={animationRef}
      loop={false} 
      source={require("../assets/animations/confetti.json")}
          
     style={{  zIndex:0, width:400, height:400, position:'absolute' , top:730,
      alignSelf:'center'}}
    />
      <Button
    title="Start Saving Energy!"
    onPress={updateUserAttributes} 
    style={{ width: "90%", margin:33, alignSelf:'center', zindex:1  }}
  ></Button>


      </ScrollView>
      </KeyboardAvoidingView>
    );
  };
  
  export default Register2;
  