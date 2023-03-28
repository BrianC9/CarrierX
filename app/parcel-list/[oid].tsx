import { Stack, useSearchParams } from "expo-router";
import { SafeAreaView, Text,View } from "react-native";
import DeliveryParcel from "../../components/DeliveryParcel";
import { COLORS, FONT, SIZES } from "../../constants";
import parcelLists from "../../data/parcels_mm.json";
import { Parcel } from "../../types";
import { formatDate } from "../../utils/formatDate";

function ParcelList() {
  const params = useSearchParams();
  const item = parcelLists.find(
    (parcelList: Parcel) => parcelList.id.$oid === params.oid
  );
  const parcelsForThatDate = parcelLists.filter(
    (parcel) => parcel.deliveryDate === item?.deliveryDate
  );

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.lightWhite,
        flex: 1,
        padding: SIZES.medium,
      }}
    >
      <Stack.Screen
        options={{
          title: `Parcel List ${formatDate(
            item?.deliveryDate ?? ""
          ).toLocaleDateString()}`,
          headerShadowVisible: false,
          headerTitleStyle: {
            fontSize: SIZES.xLarge + 4,
            fontFamily: FONT.medium,
          },
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          },
          headerTitleAlign: "left",
        }}
      />
      <Text>{params.nItems} to be picked up</Text>
      <View>
        {parcelsForThatDate.map((parcel, index) => (
          <DeliveryParcel
            key={parcel.id.$oid}
            parcel={parcel}
            isLast={index === parcelsForThatDate.length - 1}
            isDelivered={
              formatDate(parcel.deliveryDate) <= formatDate(parcel.pickupDate)
            }
          ></DeliveryParcel>
        ))}
      </View>
    </SafeAreaView>
  );
}

export default ParcelList;
