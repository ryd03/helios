import {
  View,
    TextInput,
    
  } from "react-native";
  import React, { useState } from "react";
  import {COLORS, SIZES, FONTS} from '../constants'
  
  const AppTextInput = ({ ...otherProps }) => {

    const [focused, setFocused] = useState(false);
    return (
    
  <TextInput
      
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholderTextColor={'silver'}
        style={[
          {
            fontFamily: "regular",
            fontSize: SIZES.font,
            padding: 17 ,
            backgroundColor: COLORS.gray,
            borderRadius: 20,
            marginVertical: 10,
            borderColor: 'lightgray',
            borderWidth:0,
            paddingLeft:50

          },
          focused && {
            borderColor:'gray',
            borderWidth:2,
            shadowOffset: { width: 4, height: 10 },
            shadowColor: COLORS.green,
            shadowOpacity: 0.2,
            shadowRadius: 10,
            paddingLeft:50
          },
        ]}
        {...otherProps}
      />

    );
  };
  
  export default AppTextInput;
  
