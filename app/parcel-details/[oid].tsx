import { Stack, useRouter, useSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image, Modal, SafeAreaView, Text, TextInput, TouchableOpacity, View
} from "react-native";
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
      driverData.nameDriver.trim() === ""
    ) {
      setErrorModalVisible(true);
    } else {
      // Check if the driver || license plate is on the registry
      setModalVisible(false);
      setSuccessModalVisible(true);
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
              Delivery Information
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
                    fontSize: SIZES.small,
                  }}
                >
                  Driver's Name
                </Text>
                <TextInput
                  placeholder="Manfred Stager"
                  value={driverData.nameDriver}
                  onChangeText={(text) => {
                    setDriverData((prevState) => ({
                      ...prevState,
                      nameDriver: text,
                    }));
                  }}
                  style={{
                    backgroundColor: COLORS.lightWhite,
                    fontSize: SIZES.large,
                    padding: SIZES.small + 2,
                  }}
                />
              </View>
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
                    bottom: 50,
                    left: 10,
                    backgroundColor: COLORS.lightWhite,
                    paddingHorizontal: SIZES.xSmall,
                    color: COLORS.gray,
                    fontSize: SIZES.small,
                    zIndex: 100,
                  }}
                >
                  License Plate
                </Text>
                <TextInput
                  placeholder="3859FYF"
                  value={driverData.plate}
                  onChangeText={(text) => {
                    setDriverData((prevState) => ({
                      ...prevState,
                      plate: text,
                    }));
                  }}
                  style={{
                    backgroundColor: COLORS.lightWhite,
                    fontSize: SIZES.large,
                    padding: SIZES.small + 2,
                  }}
                ></TextInput>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.red,
                  padding: SIZES.medium,
                  ...SHADOWS.medium,
                }}
                onPress={handleDataFromTheDriver}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: SIZES.large,
                    color: COLORS.lightWhite,
                  }}
                >
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

export default ParcelList;
