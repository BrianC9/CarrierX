import { Stack, useRouter, useSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image, Modal, SafeAreaView, Text, TextInput, TouchableOpacity, View
} from "react-native";
import ModalDriverData from "../../components/ModalDriverData";
import ModalError from "../../components/ModalError";
import ModalSuccess from "../../components/ModalSuccess";
import ParcelDetails from "../../components/ParcelDetails";
import { COLORS, FONT, icons, SHADOWS, SIZES } from "../../constants";
import parcelLists from "../../data/parcels_mm.json";
import { Parcel } from "../../types";
import { getListOfItems } from "../../utils/getListOfItems";

function ParcelList() {
  const [modalVisible, setModalVisible] = useState(false);
  const [succseModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const router = useRouter();
  const showModal = () => {
    setModalVisible(true);
  };
  const hideModal = () => setModalVisible(false);
  const params = useSearchParams();
  const item = parcelLists.find(
    (parcelList: Parcel) => parcelList.id.$oid === params.oid
  );
  const listOfItems = getListOfItems(item?.items ?? []);
  const [driverData, setDriverData] = useState({
    nameDriver: "",
    plate: "",
  });
  
  const handleDataFromTheDriver = () => {
    
    //Data validationg
    
    if (
      driverData.nameDriver.trim() === "" ||
      driverData.plate.trim() === ""
    ) {
      setErrorModalVisible(true);
    } else {
      // Check if the driver || license plate is on the registry
      setModalVisible(false);
      setSuccessModalVisible(true);
      setDriverData({nameDriver:'',plate:''})
    }
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.lightWhite,
        flex: 1,
        justifyContent: "space-between",
        padding: SIZES.medium,
      }}
    >
      <Stack.Screen
        options={{
          title: `${params.oid?.toString().toLocaleUpperCase()} Parcel List`,
          headerShadowVisible: false,
          headerTitleStyle: {
            fontSize: SIZES.medium + 4,
            fontFamily: FONT.medium,
          },
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          },
          headerTitleAlign: "left",
        }}
      />
      <View>
        {listOfItems.map((item, index) => (
          <ParcelDetails
            key={item.id.$oid}
            isLast={index === listOfItems.length - 1}
            item={item}
          />
        ))}
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.red,
          padding: SIZES.medium,
          ...SHADOWS.medium,
        }}
        onPress={showModal}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: SIZES.large,
            color: COLORS.lightWhite,
          }}
        >
          DELIVERY
        </Text>
      </TouchableOpacity>
      <ModalSuccess succseModalVisible={succseModalVisible} setSuccessModalVisible={setSuccessModalVisible}/>
      <ModalError setErrorModalVisible={setErrorModalVisible} errorModalVisible={errorModalVisible}/>
      <ModalDriverData modalVisible={modalVisible} driverData={driverData} hideModal={hideModal} setDriverData={setDriverData} handleDataFromTheDriver={handleDataFromTheDriver}/>
    </SafeAreaView>
  );
}

export default ParcelList;
