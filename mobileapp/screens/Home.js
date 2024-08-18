import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React ,{useEffect, useState } from "react";
import { FONTS, SIZES, COLORS, gifs } from "../constants";
import IonIcon from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import CircularProgress from "../components/CircleProgress";
import {Auth} from 'aws-amplify';
import { useAuth } from "../context/AuthContext";


const BASE_URL = `https://api.openweathermap.org/data/2.5`;
const OPEN_WEATHER_KEY = "3271083e024cd405ac9b7ef4505ae533";

const weatherToGifMap = {
  "Clear": gifs.sunny,
  "Clouds": gifs.cloudy,
  "Rain": gifs.rainy,
  "Drizzle": gifs.rainy,
  "Thunderstorm": gifs.stormy,
  "Snow": gifs.snowy,
  "Mist": gifs.cloudy,
  "Fog": gifs.cloudy,
  "Haze": gifs.cloudy,
  "Smoke": gifs.cloudy,
  "Dust": gifs.cloudy,
  "Sand": gifs.cloudy,
  "Ash": gifs.cloudy,
  "Squall": gifs.stormy,
  "Tornado": gifs.stormy,
};//to display weather icon
const Home = ({ navigation }) => {

  const {user , weatherDefault , updateWeather} = useAuth();
  const [weather, setWeather] = useState(weatherDefault);
  //for statistics which are currently randomized due to abscense of hardware
  const cloudiness =weather?.clouds?.all; // Random cloudiness between 0% and 100%
  const weatherMain = weather?.weather[0]?.main;

  const maxSolarPower = 80; // Peak solar power when there's no cloudiness
  const minSolarPower = 10;  // Minimal solar power when fully cloudy

  // Calculate solar power based on cloudiness
  const solarPower = (maxSolarPower - ((maxSolarPower - minSolarPower) * (cloudiness / 100))).toFixed(0);
  const maxBattery = 100; // Maximum battery percentage
  const minBattery = 20;  // Minimum battery percentage
  const sp = Math.floor(Math.random() * 71) + 10;
  // Calculate battery percentage based on solar power
  const batteryPercentage = (minBattery + ((solarPower / maxSolarPower) * (maxBattery - minBattery))).toFixed(0);

  const fetchWeather = async () => {
    if (!user?.attributes?.["custom:Location"]) {
      return;
    }

    const results = await fetch(
      `${BASE_URL}/weather?q=${user?.attributes?.["custom:Location"]}&appid=${OPEN_WEATHER_KEY}&units=metric`
    );
    const data = await results.json();
    console.log(data)
    setWeather(data);
    updateWeather(data);
  };

  useEffect(() => {
    fetchWeather(); // Initial fetch

    const intervalId = setInterval(async() => {
      await fetchWeather();
    }, 60000); // 60000 milliseconds = 1 minute

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [user?.attributes?.["custom:Location"]]); 

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
            Hello, {user?.attributes?.name?.split(' ')[0]}.
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
            {user?.attributes?.["custom:Location"]}

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
              source={weatherToGifMap[weather?.weather[0]?.main] || gifs.sunny}
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
            >{weather?.main?.temp? Math.round(weather?.main?.temp) : 0}</Text>
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
              <Text style={styles.weatherValue}>{weather?.wind?.speed} m/s</Text>
            </View>
            <View style={styles.weatherSmallContainer}>
              <IonIcon name="water" size={33} color={COLORS.blue} />
              <Text style={styles.weatherText}>Humidity</Text>
              <Text style={styles.weatherValue}>{weather?.main?.humidity}%</Text>
            </View>
            <View style={styles.weatherSmallContainer}>
              <Fontisto name="cloudy-gusts" size={26} color={COLORS.blue} />
              <Text style={styles.weatherText}>Cloudiness</Text>
              <Text style={styles.weatherValue}>{weather?.clouds?.all}%</Text>
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
              <Text style={styles.solarText}> Solar Power</Text>
            </View>
            <Text style={styles.solarValue}>{solarPower} kW</Text>
          </View>
          <View
            style={[styles.solarContainer, { backgroundColor: COLORS.green }]}
          >
            <View style={{ flexDirection: "row", margin: 10 }}>
              <IonIcon name="sparkles-outline" color={COLORS.white} size={20} />
              <Text style={styles.solarText}> Solar Prediction</Text>
            </View>
            <Text style={styles.solarValue}>{sp} kWh</Text>
          </View>
        </View>

          <View style={[styles.solarContainer, {width:'97%' , 
                flexDirection:'row', justifyContent:'space-evenly', alignSelf:'center'
          }]}>
                            <IonIcon name="battery-half" size={29} color={COLORS.gray} style={{transform: [{ rotate: '-90deg' }] , marginLeft:20 }}/>

<Text style={{fontFamily:'poppins-medium' , fontSize:20 , color:COLORS.white , marginTop:22, marginLeft:-40
      

}}>Battery Percentage</Text>
<View style={{margin:5}}>
      <CircularProgress size={67} strokeWidth={3} percentage={batteryPercentage} color={COLORS.green}
      borderColor='whitesmoke' />
      <Text style={{position:'absolute' , alignSelf:'center', top:20 , ...FONTS.body1 , color:COLORS.white}}>{batteryPercentage}</Text>

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
