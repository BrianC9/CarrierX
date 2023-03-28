import React from "react";
import { Modal, SafeAreaView, View, TouchableOpacity,Text,Image } from "react-native";
import { COLORS, SIZES, icons, FONT, SHADOWS } from "../constants";
interface ModalErrorProps{
    errorModalVisible:boolean,
    setErrorModalVisible:Function
}
function ModalError({errorModalVisible,setErrorModalVisible}:ModalErrorProps) {
  return (
    <Modal
      visible={errorModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => {
        setErrorModalVisible(false);
      }}
    >
      <SafeAreaView
        style={{
          backgroundColor: "#000000aa",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            height: "50%",
            width: "80%",
            backgroundColor: COLORS.lightWhite,
            padding: SIZES.medium,
            borderRadius: SIZES.medium,
            gap: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={icons.error}
            resizeMode="contain"
            style={{ width: 120, height: 140 }}
          />
          <Text
            style={{
              fontFamily: FONT.medium,
              fontSize: SIZES.large,
              textAlign: "center",
            }}
          >
            Some information is wrong
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.red,
              paddingVertical: SIZES.medium,
              paddingHorizontal: SIZES.large,
              ...SHADOWS.medium,
              borderRadius: SIZES.small,
            }}
            onPress={() => {
              setErrorModalVisible(false);
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: SIZES.medium,
                color: COLORS.lightWhite,
              }}
            >
              BACK
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

export default ModalError;
