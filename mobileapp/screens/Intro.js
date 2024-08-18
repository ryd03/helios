import { useCallback, useRef } from 'react';
import {
  ImageURISource,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  ViewToken,
} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import ListItem from '../components/ListItem';
import PaginationElement from '../components/PaginationElement';
import Button from '../components/Button';
import { images } from '../constants';

const pages = [
  {
    text: 'Advanced AI power output predictions to optimize your energy use.',
    animation: require("../assets/animations/wand.json")

  },
  {
    text: 'Live updates on the current power production.',
    animation: require("../assets/animations/solar planet animation.json")
  },
  {
    text: 'Monitor and optimize your battery capacity.',
    image: images.battery,
    animation: require("../assets/animations/test1.json")


  },
 
];



const  Intro = ({ navigation }) => {
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const flatListRef = useAnimatedRef();

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    flatListIndex.value = viewableItems[0].index ?? 0;
  }, []);


  const scrollHandle = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const renderItem = useCallback(({ item, index }) => {
  return <ListItem item={item} index={index} x={x} />;
}, [x]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={scrollHandle}
        horizontal
        scrollEventThrottle={16}
        pagingEnabled={true}
        data={pages}
        keyExtractor={(_, index) => index.toString()}
        bounces={false}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
      />
      <View style={styles.bottomContainer}>
        <PaginationElement length={pages.length} x={x} />

         <Button title="Get Started" onPress={()=>navigation.navigate('Register')}
         style={{ width: "90%", alignSelf: "center" , height:'27%',
          paddingTop: 17, marginTop:60, fontFamily:'poppins-thin'
        }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  bottomContainer: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default Intro;
