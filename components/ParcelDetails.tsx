import { useRouter, useSearchParams } from "expo-router";
import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import { COLORS, FONT, icons, SIZES } from "../constants";
import { Item } from "../types";

interface DeliveryParcelDetails {
  item: Item;
  isLast: boolean;
}
function ParcelDetails({ item, isLast }: DeliveryParcelDetails) {
  const params = useSearchParams();
  console.log(params);
  const getImageSource = (type: string) => {
    switch (type.toLocaleLowerCase()) {
      case "phone":
        return icons.phone;
        break;
      case "pc":
        return icons.laptop;
        break;
      case "smartwatch":
        return icons.smartwatch;
        break;
      default:
        return icons.devices;
        break;
    }
  };
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          gap: SIZES.medium,

          padding: SIZES.medium,
          borderBottomWidth: !isLast ? 2 : 0,
          borderBottomColor: COLORS.gray2,
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            padding: SIZES.xSmall,
            backgroundColor: "rgba(223, 0, 0, 0.1)",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: SIZES.xSmall,
          }}
        >
          <Image source={getImageSource(item.type)} resizeMode="contain" />
        </View>
        <View>
          <Text style={{ fontFamily: FONT.medium }}>
            {item.id.$oid.toLocaleUpperCase()}
          </Text>
          <Text style={styles.secondaryText}>{item.weigth} g</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  secondaryText: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    fontFamily: FONT.medium,
  },
});
export default ParcelDetails;
