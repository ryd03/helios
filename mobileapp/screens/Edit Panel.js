import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
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
  import { useAuth } from '../context/AuthContext';
  import SelectDropdown from 'react-native-select-dropdown'
  import { Auth } from 'aws-amplify';
  import CitySelector from "../components/CitySelector";

  const EditPanel= ({ navigation }) => {
    const integerRegex = /^\d+$/;
    const numberRegex = /^\d+(\.\d+)?$/;


    const {user , signedIn} = useAuth();

    const [PanelAreaInput, setPanelArea] = useState(user?.attributes?.["custom:PanelArea"]);
    const [PanelCapacityInput, setPanelCapacity] = useState(user?.attributes?.["custom:PanelCapacity"]);
    const [PanelModelInput, setPanelModel] = useState(user?.attributes?.["custom:PanelModel"]);
    const [PanelNumInput, setPanelNum] = useState(user?.attributes?.["custom:PanelNum"]);

    const [errorPanelAreaMessage, setPanelAreaErrorMessage] = useState('');
    const [errorPanelCapacityMessage, setPanelCapacityErrorMessage] = useState('');
    const [errorPanelModelMessage, setPanelModelErrorMessage] = useState('');
    const [errorPanelNumMessage, setPanelNumErrorMessage] = useState('');

    const [loading, setLoading] = useState(false);

    const validateForm = () => {
  
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
        console.log(await Auth.currentAuthenticatedUser())
        const result = await Auth.updateUserAttributes(user, {
              'custom:PanelArea': PanelAreaInput,
              'custom:PanelCapacity':PanelCapacityInput,
              'custom:PanelModel' :PanelModelInput,
              'custom:PanelNum': PanelNumInput   });
    
        console.log(await Auth.currentAuthenticatedUser())
        await signedIn(await Auth.currentAuthenticatedUser());
        navigation.goBack();
    
      } catch (err) {
        console.log(err);
      }

      setLoading(false);

    }
      
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
<View style={{ backgroundColor: "white", padding: 20, paddingTop: 20 }}>

        <LottieView
          source={require("../assets/animations/editPanel.json")}
          autoPlay
          loop={false}
          style={{
            width: 200,
            height: 200,
            alignSelf: "center",
            marginVertical: 0,
          }}
        />
<Text
          style={{
            ...FONTS.body1,
            fontFamily: "medium",
            letterSpacing: -1,
            alignSelf: "center",
          }}
        >Edit Panel Properties</Text>


    
    </View>

    <View style={{ width: "90%", alignSelf: "center" }}>
   



<Text style={styles.sectionTitle}>Solar Panel Model*</Text>

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
   value={PanelModelInput}
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

<Text style={styles.sectionTitle}>Number of Solar panels*</Text>

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

   value={PanelNumInput}
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


<Text style={styles.sectionTitle}>Area of a Panel (m^2)*</Text>

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
   value={PanelAreaInput}
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

<Text style={styles.sectionTitle}>capacity of a Panel (kWp)*</Text>

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

   value={PanelCapacityInput}
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
   

      <Button
    title={loading? "Saving..." : "Save Changes"}
    style={{ width: "90%", height:55, margin:33, alignSelf:'center', zindex:1  }}
    onPress={()=> updateUserAttributes()}
  ></Button>



      </ScrollView>
      </KeyboardAvoidingView>
    );
  };
  
  export default EditPanel;
  

  const styles = StyleSheet.create({
    sectionTitle: {
      fontSize: 12,
      fontWeight: "600",
      color: "#9e9e9e",
      textTransform: "uppercase",
      letterSpacing: 1.1,
      fontFamily:"poppins-semibold",
      marginLeft:8,
      marginTop:10
    }
  })