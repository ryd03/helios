import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { images, icons, COLORS, FONTS, gifs } from "../constants";
import { MaterialIcons } from "@expo/vector-icons";


export default function Settings({ navigation }) {
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });

 
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
     
      <ScrollView>

      <Image source={gifs.logo} style={{height:220, width:220, alignSelf:'center',
      }}/>

<Text style={styles.logoName}>Helios</Text>


          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>

            <TouchableOpacity
              onPress={() => 
                navigation.navigate('EditPanel')}
              style={styles.row}
            >
              <View
                style={[styles.rowIcon, { backgroundColor: COLORS.green
                 }]}
              >
                <FeatherIcon color="#fff" name="edit-3" size={20} />
              </View>

              <Text style={styles.rowLabel}>Edit Panel Properties</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>

            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: COLORS.darkGray }]}>
                <FeatherIcon color="#fff" name="moon" size={20} />
              </View>

              <Text style={styles.rowLabel}>Dark Mode</Text>

              <View style={styles.rowSpacer} />

              <Switch
                onValueChange={(darkMode) => setForm({ ...form, darkMode })}
                value={form.darkMode}
                trackColor={{  true: COLORS.green }}

              />
            </View>

            

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: COLORS.green }]}>
                <FeatherIcon color="#fff" name="navigation" size={20} />
              </View>

              <Text style={styles.rowLabel}>Location</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>

            <View style={styles.row}>
              <View
                style={[styles.rowIcon, { backgroundColor: 'pink' }]}
              >
                <FeatherIcon color="#fff" name="at-sign" size={20} />
              </View>

              <Text style={styles.rowLabel}>Email Notifications</Text>

              <View style={styles.rowSpacer} />

              <Switch
                onValueChange={(emailNotifications) =>
                  setForm({ ...form, emailNotifications })
                }
                value={form.emailNotifications}
                trackColor={{  true: COLORS.green }}

              />
            </View>

            <View style={styles.row}>
              <View
                style={[styles.rowIcon, { backgroundColor: COLORS.darkGray }]}
              >
                <FeatherIcon color="#fff" name="bell" size={20} />
              </View>

              <Text style={styles.rowLabel}>Push Notifications</Text>

              <View style={styles.rowSpacer} />

              <Switch
                onValueChange={(pushNotifications) =>
                  setForm({ ...form, pushNotifications })
                }
                value={form.pushNotifications}
        trackColor={{  true: COLORS.green }}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resources</Text>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: 'pink' }]}>
                <FeatherIcon color="#fff" name="flag" size={20} />
              </View>

              <Text style={styles.rowLabel}>Report Bug</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: COLORS.green }]}>
                <FeatherIcon color="#fff" name="mail" size={20} />
              </View>

              <Text style={styles.rowLabel}>Contact Us</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}
            >
              <View
                style={[styles.rowIcon, { backgroundColor: "gold" }]}
              >
                <FeatherIcon color="white" name="star" size={20} />
              </View>

              <Text style={styles.rowLabel}>Rate in App Store</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Log out</Text>

            <TouchableOpacity  style={styles.row}>
              <View
                style={[styles.rowIcon, { backgroundColor: COLORS.cherryRed }]}
              >
                <MaterialIcons color={COLORS.darkGray} name="logout" size={20} />
              </View>

              <Text style={styles.rowLabel}>Log out</Text>

              <View style={styles.rowSpacer} />
            </TouchableOpacity>
          </View>

          <View style={{height:70}}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
 
  logoName: {
    marginTop: -20,
    fontSize: 30,
    fontWeight: "600",
    color: COLORS.darkGray,
    textAlign: "center",
    letterSpacing: 1.5,
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: "#989898",
    textAlign: "center",
  },
  /** Section */
  section: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: "600",
    color: "#9e9e9e",
    textTransform: "uppercase",
    letterSpacing: 1.1,
    fontFamily:"poppins-semibold"
  },
  /** Row */
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: "400",
    color: COLORS.darkGray,
    fontFamily:"poppins-medium"
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
