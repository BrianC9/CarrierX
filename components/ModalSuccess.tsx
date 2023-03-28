import { useRouter } from "expo-router";
import React from "react";
import { Modal, SafeAreaView, View, TouchableOpacity,Text,Image } from "react-native";
import { COLORS, SIZES, icons, FONT, SHADOWS } from "../constants";
interface ModalSuccessProps{
    succseModalVisible:boolean,
    setSuccessModalVisible:Function
}
function ModalSuccess({succseModalVisible,setSuccessModalVisible}:ModalSuccessProps) {
    const router = useRouter()
  return (
    <Modal
      visible={succseModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => {
        setSuccessModalVisible(false);
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
            source={icons.success}
            resizeMode="contain"
            style={{ width: 120, height: 120 }}
          />
          <Text
            style={{
              fontFamily: FONT.medium,
              fontSize: SIZES.large,
              textAlign: "center",
            }}
          >
            Parcel successfully delivered to the carrier
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
              router.push("/");
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: SIZES.medium,
                color: COLORS.lightWhite,
              }}
            >
              GO TO PARCEL LIST
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

export default ModalSuccess;
