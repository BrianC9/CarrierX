import { useSearchParams, useRouter, Stack } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Image,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import DeliveryParcel from "../../components/DeliveryParcel";
import ModalForm from "../../components/ModalForm";
import ParcelDetails from "../../components/ParcelDetails";
import ParcelSlot from "../../components/ParcelSlot";
import { COLORS, FONT, SIZES, SHADOWS, icons } from "../../constants";
import parcelLists from "../../data/parcels_mm.json";
import { Item, Parcel } from "../../types";
import { formatDate, getListOfItems } from "../../utils/formatDate";

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
    if (
      driverData.nameDriver.trim() === "" ||
      driverData.nameDriver.trim() === ""
    ) {
      setErrorModalVisible(true);
    } else {
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
