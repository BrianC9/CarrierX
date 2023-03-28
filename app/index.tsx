import {
  Image,
  Modal, SafeAreaView,
  ScrollView, Text, TextInput, TouchableOpacity, View
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

import { Stack } from "expo-router";

import { useState } from "react";
import ParcelSlot from "../components/ParcelSlot";
import { COLORS, FONT, icons, SHADOWS, SIZES } from "../constants";
import carrierList from "../data/carriers_mm.json";
import parcelsList from "../data/parcels_mm.json";
import { getUniqueParcelList } from "../utils/getUniqueParcelLists";
export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [parcelID, setParcelID] = useState("");
  const [carrierSelected, setCarrierSelected] = useState(
    ''
  );
  const [selected, setSelected] = useState("");
  const optionsData = carrierList.map(item => {
    return {
      key: item.id.$oid, value:item.id.$oid.toLocaleUpperCase()
    }
  })

  const showModal = () => {
    setModalVisible(true);
  };
  const handleAddParcel = () =>{
    // add parcel to the corresponding day
    hideModal()
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
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={hideModal}
        
      >
        <SafeAreaView
          style={{
            backgroundColor: "#000000aa",
            flex: 1,
            flexDirection: "column-reverse",
          }}
          
        >
          <View
            style={{
              height: "40%",
              backgroundColor: COLORS.lightWhite,
              opacity: 1,
              padding: SIZES.medium,
              borderTopLeftRadius: SIZES.medium,
              borderTopRightRadius: SIZES.medium,
              gap: 10,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: SIZES.xLarge,
                fontFamily: FONT.medium,
                textAlign: "center",
              }}
            >
              Parcel and Carrier Information
            </Text>
            <View style={{ gap: SIZES.medium }}>
              <View
                style={{
                  borderWidth: 2,
                  borderColor: COLORS.gray2,
                  borderRadius: SIZES.xSmall / 2,
                }}
              >
                <Text
                  style={{
                    position: "absolute",
                    bottom: 45,
                    left: 10,
                    backgroundColor: COLORS.lightWhite,
                    paddingHorizontal: SIZES.xSmall,
                    color: COLORS.gray,
                    zIndex: 100,
                    fontSize:SIZES.small,

                  }}
                >
                  Parcel id
                </Text>
                <TextInput
                  placeholder="641DB7B2FC13"
                  value={parcelID}
                  onChangeText={(text)=>setParcelID(text)}
                  style={{
                    backgroundColor: COLORS.lightWhite,
                    fontSize: SIZES.large,
                    padding: SIZES.small + 2,
                  }}
                ></TextInput>
              </View>
                <Text
                  style={{
                    position: "absolute",
                    bottom: 115,
                    left: 10,
                    backgroundColor: COLORS.lightWhite,
                    paddingHorizontal: SIZES.xSmall,
                    color: COLORS.gray,
                    fontSize:SIZES.small,
                    zIndex: 100,
                  }}
                >
                  Carrier
                </Text>
                <SelectList

                  setSelected={setCarrierSelected}
                  data={optionsData}
                  save="value"
                  search={false}
                  placeholder='HET32R0GR6NA'
                  fontFamily={FONT.medium}
                  boxStyles={{borderWidth:2, borderColor:COLORS.gray2,borderRadius:SIZES.small/2}}
                  inputStyles={{fontFamily:FONT.medium,fontSize:SIZES.large,color:COLORS.gray2}}
                />
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.red,
                  padding: SIZES.medium,
                  ...SHADOWS.medium,
                }}
                onPress={handleAddParcel}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: SIZES.large,
                    color: COLORS.lightWhite,
                  }}
                >
                  ADD
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
