import React from "react";
import {
  Modal,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES, FONT, SHADOWS } from "../constants";
interface ModalDriverDataProps {
  modalVisible: boolean;
  hideModal: Function | any;
  driverData: { nameDriver: string; plate: string };
  handleDataFromTheDriver: Function | any;
  setDriverData: Function;
}
function ModalDriverData({
  handleDataFromTheDriver,
  modalVisible,
  hideModal,
  driverData,
  setDriverData,
}: ModalDriverDataProps) {
  return (
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
  );
}

export default ModalDriverData;
