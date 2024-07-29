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
  
  const EditPanel= ({ navigation }) => {
    
      
    return (
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

    <View style={{ width: "90%", alignSelf: "center" , marginTop:40}}>
    


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
      <AppTextInput placeholder="Solar Panels' Model"></AppTextInput>
      </View>


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
      <AppTextInput placeholder="Number of Panels"></AppTextInput>
      </View>

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
      <AppTextInput placeholder="Panel Size WxH  "></AppTextInput>
      </View>


      </View>


      <Button
    title="Save Changes"
    style={{ width: "90%", height:55, margin:33, alignSelf:'center', zindex:1  }}
    onPress={()=> navigation.goBack()}
  ></Button>



      </ScrollView>
    );
  };
  
  export default EditPanel;
  