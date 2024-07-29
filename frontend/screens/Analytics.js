import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { FONTS, SIZES, COLORS, gifs } from "../constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import SemiCircle from "../components/SemiCircle";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { CartesianChart, Bar, Line } from "victory-native";
import { LinearGradient, useFont, vec } from "@shopify/react-native-skia";
import poppins from "../assets/fonts/Poppins-Medium.ttf";

const Analytics = ({ navigation }) => {
  const font = useFont(poppins, 12);

  const dayData = [
    { x: "6 AM", y: 100 },
    { x: "8 AM", y: 150 },
    { x: "10 AM", y: 200 },
    { x: "12 PM", y: 250 },
    { x: "2 PM", y: 300 },
    { x: "4 PM", y: 350 },
    { x: "6 PM", y: 400 },  
  ];

  const weekData = [
    { x: "Mon", y: 30 },
    { x: "Tues", y: 45 },
    { x: "Wed", y: 60 },
    { x: "Thurs", y: 15 },
    { x: "Fri", y: 15 },
    { x: "Sat", y: 15 },
    { x: "Sun", y: 15 },
  ];

  const monthData = [
    { x: "Jan", y: 100 },
    { x: "Feb", y: 150 },
    { x: "Mar", y: 200 },
    { x: "Apr", y: 250 },
    { x: "May", y: 300 },
    { x: "Jun", y: 350 },
    { x: "Jul", y: 400 },
    { x: "Aug", y: 450 },
    { x: "Sep", y: 500 },
    { x: "Oct", y: 550 },
    { x: "Nov", y: 600 },
    { x: "Dec", y: 650 },
  ];

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
                103.6 kwh
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
                506.7 kwh
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
              615
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
              4470 Kg
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
