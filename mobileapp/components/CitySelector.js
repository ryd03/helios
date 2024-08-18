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
  import Icon from "react-native-vector-icons/Feather";
  import IonIcon from "react-native-vector-icons/Ionicons";

  import React, { useState , useRef } from "react";
    import SelectDropdown from 'react-native-select-dropdown'
    import {COLORS, SIZES, FONTS , cities} from '../constants'
    
    const CitySelector = ({ ...otherProps }) => {
  
      const [focused, setFocused] = useState(false);
      return (
        <SelectDropdown
    search='true'
    data={cities}
    onFocus={() => setFocused(true)}
    onBlur={() => setFocused(false)}
    onSelect={(selectedItem, index) => {
      console.log(selectedItem, index);
    }}
    renderButton={(selectedItem, isOpened) => {
      return (
        <View style={focused? styles.dropdownButtonStyleFocused: styles.dropdownButtonStyle}>
            <IonIcon
     name="location-sharp"
     size={26}
     color="lightgray"
     style={{
       position: "absolute",
       zIndex: 1,
       paddingTop: 16,
       paddingLeft: 15,
     }}
   ></IonIcon>
         
          <Text style={styles.dropdownButtonTxtStyle}>
            {(selectedItem && selectedItem.city) || 'Select your city'}
          </Text>
          <Icon size={35} name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
        </View>
      );
    }}
    renderItem={(item, index, isSelected) => {
      return (
        <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
          <Text style={styles.dropdownItemTxtStyle}>{item.city}</Text>
        </View>
      );
    }}
    showsVerticalScrollIndicator={false}
    dropdownStyle={styles.dropdownMenuStyle}
    searchInputStyle={styles.searchInputStyle}
    {...otherProps}

  />
    
  
      );
    };
    
    export default CitySelector;
    
    const styles = StyleSheet.create({
        dropdownButtonStyle: {

        fontFamily: "regular",
        fontSize: SIZES.font,
        padding: 17 ,
        backgroundColor: COLORS.gray,
        borderRadius: 20,
        marginVertical: 10,
        borderColor: 'lightgray',
        borderWidth:0,
        paddingLeft:50,
        flexDirection:'row',
        justifyContent:'space-between',
        height:55
              
                        
        },

        dropdownButtonStyleFocused: {

            
        fontFamily: "regular",
        fontSize: SIZES.font,
        padding: 17 ,
        backgroundColor: COLORS.gray,
        borderRadius: 20,
        marginVertical: 10,
        borderColor: 'lightgray',
        borderWidth:0,
        paddingLeft:50,
        flexDirection:'row',
        justifyContent:'space-between',
        height:55,
            borderWidth:2,
            shadowOffset: { width: 4, height: 10 },
            shadowColor: COLORS.green,
            shadowOpacity: 0.2,
            shadowRadius: 10,
            paddingLeft:50
                  
                            
            },

        dropdownButtonTxtStyle: {
          fontFamily:'poppins',
          fontSize:14.5,
        },
        dropdownButtonArrowStyle: {
          color:'silver',
          marginTop:-5
        },
     
        dropdownMenuStyle: {
          backgroundColor: 'whitesmoke',
          borderRadius: 30,
        },
        dropdownItemStyle: {
          width: '100%',
          flexDirection: 'row',
          paddingHorizontal: 12,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 20,
          borderBottomWidth:1,
          borderBottomColor: COLORS.gray
        },
        dropdownItemTxtStyle: {
          flex: 1,
          fontFamily:'poppins',
          fontSize:14.5,
    
        },
        searchInputStyle:{
            backgroundColor:COLORS.gray,
            borderBottomWidth:2,
            shadowOffset: { width: 4, height: 10 },
            shadowColor: COLORS.green,
            shadowOpacity: 0.2,
            shadowRadius: 10,
            paddingLeft:50
        }
      
      });