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

const EditLocation= ({ navigation }) => {

  const {user , signedIn} = useAuth();

  const [LocationInput, setLocation] = useState(user?.attributes?.["custom:Location"]);
 
  const [errorLocationMessage, setLocationErrorMessage] = useState('');

  const [loading, setLoading] = useState(false);

  const validateForm = () => {

    if (!LocationInput) {
      setLocationErrorMessage('Location is required');
      return false;
    }

    setLocationErrorMessage('');
    
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
            'custom:Location': LocationInput
          });
  
      console.log(await Auth.currentAuthenticatedUser())
      await signedIn(await Auth.currentAuthenticatedUser());
      navigation.goBack();
  
    } catch (err) {
      console.log(err);
    }

    setLoading(false);

  }
    
  return (
   
    <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
      <TouchableOpacity onPress={()=> navigation.goBack()}>
      <IonIcon name="arrow-back" size={35}
      style={{marginLeft:10}}></IonIcon>

      </TouchableOpacity>
<View style={{ backgroundColor: "white", padding: 20, paddingTop: 20 }}>

      <LottieView
        source={require("../assets/animations/editLocation.json")}
        autoPlay
        style={{
          width: 230,
          height: 230,
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
      >Edit Panels' Location</Text>


  
  </View>

  <View style={{ width: "90%", alignSelf: "center" }}>
 
  <Text style={styles.sectionTitle}>Location*</Text>
  
<CitySelector
onSelect={(selectedItem, index) => {
  setLocation(selectedItem.city); 
}}defaultValue={{"city": LocationInput}}/>

   {/* Display the error message if it exists */}
   {errorLocationMessage ? (
   <Text style={{ ...FONTS.body4,color: 'tomato', marginBottom: 3, textAlign: 'center' }}>
     {errorLocationMessage}
   </Text>
 ) : null}

 </View>
 

    <Button
  title={loading? "Saving..." : "Save Changes"}
  style={{ width: "90%", height:55, margin:33, alignSelf:'center', zindex:1  }}
  onPress={()=> updateUserAttributes()}
></Button>



    </ScrollView>
  );
};

export default EditLocation;


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