import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Stack } from "expo-router";

import { COLORS, icons, SHADOWS, SIZES } from "../constants";
import parcelsList from "../data/parcels_mm.json";
import ParcelSlot from "../components/ParcelSlot";
export default function Home() {
  return (
    <SafeAreaView 
      style={{
        backgroundColor: COLORS.lightWhite,
        padding: SIZES.large,
        flex: 1,
        
      }}
    >
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          },
          headerTitleStyle: { fontSize: SIZES.xLarge },
          headerTitle: "Parcel Lists",
          headerShadowVisible: false,
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {parcelsList.map((parcel) => (
            <ParcelSlot key={parcel.id.$oid} parcel={parcel} />
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          alignItems: "center",
          width: "100%",
          backgroundColor: COLORS.lightWhite,
          paddingVertical:10
        }}
      >
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "rgb(255, 0, 0)",
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            height: 60,
            backgroundColor: "#ff0000",
            borderRadius: 50,
           ...SHADOWS.medium
          }}
        >
          <Image
            source={icons.addIcon}
            resizeMode="contain"
            style={{ width: "80%", height: "80%" }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
