import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState , useEffect } from "react";
import { FONTS, SIZES, COLORS, gifs } from "../constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import SemiCircle from "../components/SemiCircle";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { CartesianChart, Bar, Line } from "victory-native";
import { LinearGradient, useFont, vec } from "@shopify/react-native-skia";
import poppins from "../assets/fonts/Poppins-Medium.ttf";
import { useAuth } from '../context/AuthContext';


const Analytics = ({ navigation }) => {
  const font = useFont(poppins, 12);
  const {user} =useAuth();

  // State to store the generated values
  const [data, setData] = useState({
    dayData: [],
    weekData: [],
    monthData: [],
    totalEnergyWeek: 0,
    totalEnergyMonth: 0,
    deforestationReduced: 0,
    CO2Reduced: 0,
  });

  // Function to generate random values
  const generateRandomValues = () => {
    const dayData = [
      { x: "6 AM", y: Math.random() * 50 + 50 },
      { x: "8 AM", y: Math.random() * 50 + 100 },
      { x: "10 AM", y: Math.random() * 50 + 150 },
      { x: "12 PM", y: Math.random() * 50 + 200 },
      { x: "2 PM", y: Math.random() * 50 + 200 },
      { x: "4 PM", y: Math.random() * 50 + 150 },
      { x: "6 PM", y: Math.random() * 50 + 100 },
    ];

    const weekData = [
      { x: "Mon", y: Math.random() * 20 + 30 },
      { x: "Tues", y: Math.random() * 20 + 40 },
      { x: "Wed", y: Math.random() * 20 + 50 },
      { x: "Thurs", y: Math.random() * 20 + 20 },
      { x: "Fri", y: Math.random() * 20 + 20 },
      { x: "Sat", y: Math.random() * 20 + 20 },
      { x: "Sun", y: Math.random() * 20 + 20 },
    ];

    const monthData = [
      { x: "Jan", y: Math.random() * 50 + 50 },
      { x: "Feb", y: Math.random() * 50 + 100 },
      { x: "Mar", y: Math.random() * 50 + 150 },
      { x: "Apr", y: Math.random() * 50 + 200 },
      { x: "May", y: Math.random() * 50 + 250 },
      { x: "Jun", y: Math.random() * 50 + 300 },
      { x: "Jul", y: Math.random() * 50 + 300 },
      { x: "Aug", y: Math.random() * 50 + 250 },
      { x: "Sep", y: Math.random() * 50 + 200 },
      { x: "Oct", y: Math.random() * 50 + 150 },
      { x: "Nov", y: Math.random() * 50 + 100 },
      { x: "Dec", y: Math.random() * 50 + 50 },
    ];

    const totalEnergyWeek = weekData.reduce((sum, data) => sum + data.y, 0).toFixed(0);
    const totalEnergyMonth = monthData.reduce((sum, data) => sum + data.y, 0).toFixed(0);
    const deforestationReduced = Math.floor(Math.random() * 500 + 10);
    const CO2Reduced = (Math.random() * 1000 + 500).toFixed(2);

    setData({
      dayData,
      weekData,
      monthData,
      totalEnergyWeek,
      totalEnergyMonth,
      deforestationReduced,
      CO2Reduced,
    });
  };

  // Use useEffect to regenerate values when user.email changes
  useEffect(() => {
    generateRandomValues();
  }, [user?.email]);

  const { dayData, weekData, monthData, totalEnergyWeek, totalEnergyMonth, deforestationReduced, CO2Reduced } = data;



  const [selectedIndex, setSelectedIndex] = useState(0);

 
  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1, marginLeft: 3 }}>
      <View style={{ margin: 20 }}>
        <Text
          style={{
            fontFamily: "poppins-thin",
            fontSize: 20,
            fontWeight: "500",
            color: COLORS.darkGray,
            marginBottom: 20,
          }}
        >
          Energy Generated
        </Text>

        <SegmentedControlTab
          values={["Day", "Week", "Month"]}
          selectedIndex={selectedIndex}
          onTabPress={(index) => setSelectedIndex(index)}
          tabsContainerStyle={styles.segmentedControl}
          tabStyle={styles.tabStyle}
          activeTabStyle={styles.activeTabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
          borderRadius={40}
        />

        <View style={{ height: 290 }}>
          <CartesianChart
data={selectedIndex === 0 ? dayData : selectedIndex === 1 ? weekData : monthData}
xKey="x"
            yKeys={["y"]}
            domainPadding={{ left: 20, right: 20, top: 20, bottom: 70 }}
            axisOptions={{
              font,
              tickCount: {x:selectedIndex === 2 ? 12 : 7, y:7},
              lineColor: "white",
            }}
          >
            {({ points, chartBounds }) => (
              <Bar
                chartBounds={chartBounds}
                points={points.y}
                roundedCorners={{
                  topLeft: 60,
                  topRight: 60,
                  bottomLeft: 60,
                  bottomRight: 60,
                }}
                barWidth={23}
              >
                <LinearGradient
                  start={vec(0, 0)}
                  end={vec(0, 400)}
                  colors={[COLORS.green, COLORS.gray]}
                />
              </Bar>
            )}
          </CartesianChart>
        </View>

        <View style={styles.energyContainer}>
          <View style={{ paddingTop: 10, flexDirection: "row" }}>
            <Icon name="lightning-bolt" size={50} color={COLORS.green} />
            <View>
              <Text
                style={{
                  fontFamily: "poppins-medium",
                  fontSize: 15,
                  color: "whitesmoke",
                  marginBottom: 8,
                  alignSelf: "center",
                }}
              >
                This Week
              </Text>
              <Text
                style={{
                  fontSize: 23,
                  fontWeight: "700",
                  color: "whitesmoke",
                  marginBottom: 10,
                  alignSelf: "center",
                }}
              >
                {totalEnergyWeek} kWh
              </Text>
            </View>
          </View>

          <View
            style={{
              width: 1.85,
              height: 60,
              backgroundColor: "#D3D7E2",
              borderRadius: 10,
              alignSelf: "center",
            }}
          ></View>

          <View style={{ paddingTop: 10, flexDirection: "row" }}>
            <Icon
              name="calendar-month-outline"
              size={43}
              color={COLORS.green}
              style={{ marginVertical: 5, marginRight: 8 }}
            />
            <View>
              <Text
                style={{
                  fontFamily: "poppins-medium",
                  fontSize: 15,
                  color: "whitesmoke",
                  marginBottom: 8,
                  alignSelf: "center",
                }}
              >
                This Month
              </Text>
              <Text
                style={{
                  fontSize: 23,
                  fontWeight: "700",
                  color: "whitesmoke",
                  marginBottom: 10,
                  alignSelf: "center",
                }}
              >
                {totalEnergyMonth} kWh
              </Text>
            </View>
          </View>
        </View>

        <Text
          style={{
            fontFamily: "poppins-thin",
            fontSize: 21.4,
            fontWeight: "500",
            color: COLORS.darkGray,
            marginBottom: 20,
          }}
        >
          Statistics
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={[
              styles.statContainer,
              { backgroundColor: COLORS.green, opacity: 0.8 },
            ]}
          >
            <Text style={[styles.statText, { color: "whitesmoke" }]}>
              Deforestation
            </Text>
            <Text
              style={[styles.statText, { marginTop: 0, color: "whitesmoke" }]}
            >
              Reduced
            </Text>
            <Text
              style={[
                styles.statText,
                { marginTop: 20, fontSize: 27, color: "whitesmoke" },
              ]}
            >
              {deforestationReduced}
            </Text>

            <Icon
              name="forest"
              size={90}
              color={"whitesmoke"}
              style={{ marginRight: 10, alignSelf: "flex-end", marginTop: -10 }}
            />
          </View>

          <View style={styles.statContainer}>
            <Text style={styles.statText}>CO2</Text>
            <Text style={[styles.statText, { marginTop: 0 }]}>Reduced</Text>
            <Text style={[styles.statText, { marginTop: 20, fontSize: 27 }]}>
              {CO2Reduced} Kg
            </Text>
            <Icon
              name="leaf"
              size={65}
              color={COLORS.darkGray}
              style={{ marginRight: 10, alignSelf: "flex-end", marginTop: 10 }}
            />
          </View>
        </View>

        <View style={{ height: 60 }}></View>
      </View>
    </ScrollView>
  );
};

export default Analytics;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  segmentedControl: {
    width: "80%",
    height: 37,
    alignSelf: "center",
    backgroundColor: "whitesmoke",
    borderColor: COLORS.grayBorder,
    borderWidth: 0.2,
    borderRadius: 30,
  },
  tabStyle: {
    borderWidth: 0,
    backgroundColor: "whitesmoke",
    width: 10,
  },
  activeTabStyle: {
    backgroundColor: COLORS.darkGray,
    opacity: 1,
    borderRadius: 30,
  },
  tabTextStyle: {
    color: COLORS.darkGray,
    fontWeight: "500",
  },
  activeTabTextStyle: {
    color: COLORS.white,
    fontWeight: "800",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  energyContainer: {
    width: "99%",
    height: 80,
    backgroundColor: COLORS.darkGray,
    borderRadius: 18,
    shadowOffset: 100,
    shadowOpacity: 0.3,
    shadowColor: COLORS.darkGray,
    shadowRadius: 10,
    alignSelf: "center",
    marginVertical: 40,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  energyText: {
    fontFamily: "poppins",
    color: COLORS.white,
    fontSize: 16,
  },
  energyValue: {
    ...FONTS.h2,
    fontFamily: "poppins-semibold",
    color: COLORS.white,
    marginLeft: 10,
  },

  statContainer: {
    backgroundColor: "whitesmoke",
    height: 195,
    width: 180,
    borderRadius: 24,
  },
  statText: {
    fontSize: 20,
    color: COLORS.black,
    marginTop: 15,
    marginLeft: 10,
    fontWeight: "600",
  },
});
