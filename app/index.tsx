import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { Stack } from "expo-router";

import { COLORS, FONT, icons, SHADOWS, SIZES } from "../constants";
import parcelsList from "../data/parcels_mm.json";
import ParcelSlot from "../components/ParcelSlot";
import { getUniqueParcelList } from "../utils/formatDate";
import { useState } from "react";
export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const uniqueParcelLists = getUniqueParcelList(parcelsList);
  console.log(uniqueParcelLists);
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
            borderColor: "rgb(255, 0, 0)",
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            height: 60,
            backgroundColor: "#ff0000",
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
              
            }}
          >
            <Text style={{ fontSize: SIZES.xLarge, fontFamily: FONT.medium,textAlign:'center' }}>
              Parcel and Carrier Information
            </Text>

            <View>
              <TextInput
                placeholder="Parcel ID"
                style={{ backgroundColor: COLORS.lightWhite,fontSize:SIZES.large }}
              ></TextInput>
            </View>
            <View>
            <TextInput placeholder="Parcel Carrier"></TextInput>
            </View>
            <TouchableOpacity
              style={{  backgroundColor: COLORS.tertiary }}
              onPress={hideModal}
            >
              <Text style={{ textAlign: "center" }}>Save</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
