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
  
  const Register2 = ({ navigation }) => {
    
        const animationRef = useRef(null);
      
        const playAnimation = () => {
          if (animationRef.current) {
            animationRef.current.play(); // Start the animation
          }
        };
  
    return (
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
    <View>
      <Icon
        name="id-card"
        size={22}
        color="lightgray"
        style={{
          position: "absolute",
          zIndex: 1,
          paddingTop: 27,
          paddingLeft: 17,
        }}
      ></Icon>
      <AppTextInput placeholder="Enter your full name"></AppTextInput>
      </View>

      <View>
      <IonIcon
        name="location-sharp"
        size={26}
        color="lightgray"
        style={{
          position: "absolute",
          zIndex: 1,
          paddingTop: 27,
          paddingLeft: 15,
        }}
      ></IonIcon>
      <AppTextInput placeholder="Enter your location"></AppTextInput>
      </View>

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



<LottieView
      ref={animationRef}
      loop={false} 
      source={require("../assets/animations/confetti.json")}
          
     style={{  zIndex:0, width:400, height:400, position:'absolute' , top:630,
      alignSelf:'center'}}
    />
      <Button
    title="Start Saving Energy!"
    onPress={playAnimation} 
    style={{ width: "90%", margin:33, alignSelf:'center', zindex:1  }}
  ></Button>


      </ScrollView>
    );
  };
  
  export default Register2;
  