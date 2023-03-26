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
import { Parcel } from "../types";
import { getUniqueParcelList } from "../utils/formatDate";
export default function Home() {

const uniqueParcelLists=getUniqueParcelList(parcelsList)
console.log(uniqueParcelLists);
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.lightWhite,
        paddingHorizontal: SIZES.large,
        paddingTop:SIZES.medium,
        flex: 1,
      }}
    >
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          },
          headerTitleStyle: { fontSize: SIZES.xLarge+4 },
          headerTitle: "Parcel Lists",
          headerShadowVisible: false,
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {uniqueParcelLists.map((parcel,index) => (<ParcelSlot key={parcel.parcel.id.$oid} parcelList={parcel} isLast={index === uniqueParcelLists.length-1 } />
))}
        </View>
      </ScrollView>
      <View
        style={{
          alignItems: "center",
          width: "100%",
          backgroundColor: COLORS.lightWhite,
          paddingVertical: 10,
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
            ...SHADOWS.medium,
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
