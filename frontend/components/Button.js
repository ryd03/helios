import {Text, TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react'
import {COLORS, FONTS, SIZES} from '../constants'


const Button = (props) =>{
    return (
        <TouchableOpacity
        style={{
            ...styles.btn,
            ...props.style
        }}
        onPress = {props.onPress}
        >
            <Text style={{
                ...FONTS.body2,
                fontFamily: "medium",
                color: COLORS.white,
                ...props.titleStyle
            }}>
                {props.title}
            </Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    btn:{
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding2,
        borderColor: COLORS.darkGray,
        borderWidth: 1,
        borderRadius: 30,
        alignItems: 'center',
        justifContent: 'center',
        backgroundColor: COLORS.darkGray,
        height:'7.3%'
    }
})

export default Button