import { Dimensions } from "react-native";
const { height, width } = Dimensions.get('window');

export const COLORS = {
  
    white: "#FFFFFF",
    black: "#000000",
    darkGray: "#2C2C2C",
    green: "#79BB31",
    pink: "#FFE0E5",
    screen: "#F7F9FA",
    gray: "#EAEAEA",
    blue: "#B0D5FF",
    violet: "#A9AEFF",
    aqua: "#B4EDCF",
    gray2: "#e4e5e6",
    glass:"#F3F6FF",
    glassBorder: "#F5F7FF",
    cloud: "#99CCFF",
    violet2:'#81b0ff',
    grayBorder: '#D3D7E2'
  
 
};

export const SIZES = {
     // Global SIZES
     base: 8,
     font: 14,
     radius: 30,
     padding: 8,
     padding2: 12,
     padding3: 16,
 
     // FONTS Sizes
     largeTitle: 50,
     h1: 36,
     h2: 22,
     h3: 16,
     h4: 14,
     body1: 30,
     body2: 20,
     body3: 16,
     body4: 14,
 
     // App Dimensions
     width,
     height,
};

export const FONTS = {

    largeTitle: {  fontFamily: 'poppins-medium', fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: 'bold', fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: 'bold', fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: 'bold', fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: 'bold', fontSize: SIZES.h4, lineHeight: 20 },
    body1: { fontFamily: 'regular', fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: 'regular', fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: 'regular', fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: 'regular', fontSize: SIZES.body4, lineHeight: 20 },
};


const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;