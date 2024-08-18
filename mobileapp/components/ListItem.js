import {
    View,
    useWindowDimensions,
    ImageURISource,
    StyleSheet,
  } from 'react-native';
  import React from 'react';
  import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
  } from 'react-native-reanimated';
  import LottieView from "lottie-react-native";
import { FONTS } from '../constants';

  
  
  const ListItem = ({ item, index, x }) => {
    const { width: SCREEN_WIDTH } = useWindowDimensions();
    const rnImageStyle = useAnimatedStyle(() => {
      const translateY = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [100, 0, 100],
        Extrapolate.CLAMP
      );
      const opacity = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [0, 1, 0],
        Extrapolate.CLAMP
      );
      return {
        opacity,
        width: SCREEN_WIDTH * 0.7,
        height: SCREEN_WIDTH * 0.7,
        transform: [{ translateY}],
      };
    }, [index, x]);
  
    const rnTextStyle = useAnimatedStyle(() => {
      const translateY = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [100, 0, 100],
        Extrapolate.CLAMP
      );
      const opacity = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [0, 1, 0],
        Extrapolate.CLAMP
      );
      return {
        opacity,
        transform: [{ translateY}],
      };
    }, [index, x]);
    return (
      <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
        
       
         {item.image ? (
          <View>
        <LottieView
        source={item.animation}
        autoPlay
        loop
        style={{ width: 330, height: 330 ,alignSelf:'center',
          
        }}
      />
       <Animated.Image
          source={item.image}
          style={{position:'absolute' , width:160 , height:160, 
            alignSelf:'center' , marginTop:60
          }}
        />
      </View>
      
      ) : (
        <LottieView
        source={item.animation}
        autoPlay
        loop
        style={{ width: 230, height: 230 }}
      />
       
      )}
        <Animated.Text style={[{...FONTS.body1, fontFamily:'poppins-semibold',
            marginHorizontal:15, alignSelf:'flex-start'
        } , rnTextStyle]}>
          {item.text}
        </Animated.Text>

      </View>
    );
  };
  
  export default React.memo(ListItem);
  
  const styles = StyleSheet.create({
    itemContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    textItem: {
      fontWeight: '600',
      lineHeight: 41,
      fontSize: 34,
    },

    image:
    {
      width:100,
      height:100
    }
  });