import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { FONTS, SIZES, COLORS, gifs } from "../constants";
import IonIcon from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import CircularProgress from "../components/CircleProgress";


const Home = ({ navigation }) => {
  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ margin: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontFamily: "poppins-thin",
              fontSize: 25,
              fontWeight: "500",
              color: COLORS.darkGray,
            }}
          >
            Hello, Rawan.
          </Text>

          <TouchableOpacity>
            <IonIcon name="notifications" size={29} color={COLORS.darkGray} />
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 40,
                backgroundColor: "pink",
                right: -20,
                top: -30,
              }}
            ></View>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "500",
            color: "silver",
          }}
        >
          Last synced 1 min ago
        </Text>

        <Text
          style={{
            fontFamily: "poppins-thin",
            fontSize: 25,
            fontWeight: "500",
            color: COLORS.darkGray,
            marginTop: 50,
            marginBottom: 0,
          }}
        >
          Today
        </Text>

        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <IonIcon name="location-sharp" size={25} color={COLORS.green} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "silver",
              lineHeight: 30,
            }}
          >
            Beirut, Lebanon{" "}
          </Text>
        </View>

        <View
          style={{
            width: 370,
            height: 300,
            backgroundColor: "#F2F2F2",
            borderRadius: 10,
            alignSelf: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Image
              source={gifs.sunny}
              style={{
                width: 200,
                height: 200,
                top: -30,
                position: "absolute",
              }}
            />
            <Text
              style={{
                fontFamily: "poppins-light",
                fontSize: 85,
                color: COLORS.darkGray,
                fontWeight: "500",
                position: "absolute",
                top: 10,
                right: 40,
                transform: [{ scaleY: 1.055 }],
              }}
            >
              32
            </Text>
            <Text
              style={{
                fontFamily: "poppins-light",
                fontSize: 40,
                color: COLORS.darkGray,
                fontWeight: "500",
                position: "absolute",
                top: 5,
                right: 33,
              }}
            >
              °
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              top: 160,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <View style={styles.weatherSmallContainer}>
              <Fontisto name="wind" size={26} color={COLORS.blue} />
              <Text style={styles.weatherText}>Wind</Text>
              <Text style={styles.weatherValue}>7.2 m/s</Text>
            </View>
            <View style={styles.weatherSmallContainer}>
              <IonIcon name="water" size={33} color={COLORS.blue} />
              <Text style={styles.weatherText}>Humidity</Text>
              <Text style={styles.weatherValue}>66%</Text>
            </View>
            <View style={styles.weatherSmallContainer}>
              <Fontisto name="cloudy-gusts" size={26} color={COLORS.blue} />
              <Text style={styles.weatherText}>Cloudiness</Text>
              <Text style={styles.weatherValue}>20%</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 26,
          }}
        >
          <View style={styles.solarContainer}>
            <View style={{ flexDirection: "row", margin: 10 }}>
              <Fontisto name="day-sunny" color={COLORS.white} size={22} />
              <Text style={styles.solarText}> Solar Production</Text>
            </View>
            <Text style={styles.solarValue}>180 kWh</Text>
          </View>
          <View
            style={[styles.solarContainer, { backgroundColor: COLORS.green }]}
          >
            <View style={{ flexDirection: "row", margin: 10 }}>
              <IonIcon name="sparkles-outline" color={COLORS.white} size={20} />
              <Text style={styles.solarText}> Solar Prediction</Text>
            </View>
            <Text style={styles.solarValue}>100 kWh</Text>
          </View>
        </View>

          <View style={[styles.solarContainer, {width:'97%' , 
                flexDirection:'row', justifyContent:'space-evenly', alignSelf:'center'
          }]}>
                            <IonIcon name="battery-half" size={29} color={COLORS.gray} style={{transform: [{ rotate: '-90deg' }] , marginLeft:20 }}/>

<Text style={{fontFamily:'poppins-medium' , fontSize:20 , color:COLORS.white , marginTop:22, marginLeft:-40
      

}}>Battery Percentage</Text>
<View style={{margin:5}}>
      <CircularProgress size={67} strokeWidth={3} percentage={80} color={COLORS.green}
      borderColor='whitesmoke' />
      <Text style={{position:'absolute' , alignSelf:'center', top:20 , ...FONTS.body1 , color:COLORS.white}}>80</Text>

</View>
          </View>

      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  weatherSmallContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 110,
    height: 130,
    backgroundColor: "whitesmoke",
    borderRadius: 20,
    borderColor: "#D3D7E2",
    marginHorizontal: 5,
    justifyContent: "space-evenly",
    shadowOffset: 300,
    shadowOpacity: 0.17,
    shadowColor: "silver",
  },
  weatherText: {
    fontFamily: "poppins-medium",
    fontsize: 17,
  },
  weatherValue: {
    ...FONTS.h2,
    fontFamily: "poppins-semibold",
  },
  solarContainer: {
    width: "48%",
    height: 80,
    backgroundColor: COLORS.darkGray,
    borderRadius: 18,
    justifyContent: "flex-start",
    shadowOffset:100,
    shadowOpacity:0.2,
    shadowColor:COLORS.darkGray,
    shadowRadius:5
  },
  solarText: {
    fontFamily: "poppins",
    color: COLORS.white,
    fontSize: 16,
  },
  solarValue: {
    ...FONTS.h2,
    fontFamily: "poppins-semibold",
    color: COLORS.white,
    marginLeft: 10,
  },
});
