import {
  Image, SafeAreaView,
  ScrollView, TouchableOpacity, View
} from "react-native";

import { Stack } from "expo-router";

import { useState } from "react";
import ModalHome from "../components/ModalHome";
import ParcelSlot from "../components/ParcelSlot";
import { COLORS, FONT, icons, SHADOWS, SIZES } from "../constants";
import parcelsList from "../data/parcels_mm.json";
import { getUniqueParcelList } from "../utils/getUniqueParcelLists";
export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [parcelID, setParcelID] = useState("");
  const [carrierSelected, setCarrierSelected] = useState(
    ''
  );
 

  const showModal = () => {
    setModalVisible(true);
  };
  const handleAddParcel = () =>{
    // add parcel to the corresponding day
    hideModal()
    setParcelID('')
  }
  const hideModal = () => setModalVisible(false);
  const uniqueParcelLists = getUniqueParcelList(parcelsList);
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.lightWhite,
        paddingHorizontal: SIZES.large,
        paddingTop: SIZES.medium,
        flex: 1,
      }}
    >
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          },
          headerTitleStyle: {
            fontSize: SIZES.xLarge + 4,
            fontFamily: FONT.medium,
          },
          headerTitle: "Parcel Lists",
          headerTitleAlign:'left',
          headerShadowVisible: false,
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {uniqueParcelLists.map((parcel, index) => (
            <ParcelSlot
              key={parcel.parcel.id.$oid}
              parcelList={parcel}
              isLast={index === uniqueParcelLists.length - 1}
            />
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          alignItems: "center",
          width: "100%",
          backgroundColor: COLORS.lightWhite,
          paddingVertical: 15,
        }}
      >
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: COLORS.red,
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            height: 60,
            backgroundColor: COLORS.red,
            borderRadius: 50,
            ...SHADOWS.medium,
          }}
          onPress={showModal}
        >
          <Image
            source={icons.addIcon}
            resizeMode="contain"
            style={{ width: "80%", height: "80%" }}
          />
        </TouchableOpacity>
      </View>
      <ModalHome setParcelID={setParcelID} modalVisible={modalVisible} hideModal={hideModal} carrierSelected={carrierSelected} handleAddParcel = {handleAddParcel} setCarrierSelected={setCarrierSelected} parcelID={parcelID}/>
    </SafeAreaView>
  );
}
